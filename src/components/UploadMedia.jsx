// src/components/UploadMedia.jsx
import React, { useState } from "react";
import { Modal, Button, Progress, message, Input } from "antd";
import { storage, firestore } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UploadMedia({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Overall progress

  // Handle multiple file selection
  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setFiles([]);
    setUploading(false);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      message.error("Please enter a title.");
      return;
    }
    if (!description.trim()) {
      message.error("Please enter a description.");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      message.error("Please enter a valid price.");
      return;
    }
    if (files.length === 0) {
      message.error("Please select at least one image or video.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = [];

      // Upload files sequentially or in parallel
      // Here parallel with Promise.all but track progress overall manually
      // We'll upload one by one for simpler progress tracking:

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);

        await new Promise((resolve, reject) => {
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calculate overall progress across all files
              const progressCurrent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / files.length);
              setUploadProgress((prev) => {
                const newProgress = prev + progressCurrent;
                return Math.min(newProgress * 100, 100);
              });
            },
            (error) => {
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              uploadedUrls.push(downloadURL);
              resolve();
            }
          );
        });
      }

      // After all uploads complete, save product metadata in Firestore
      const docRef = await addDoc(collection(firestore, "products"), {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        mediaUrls: uploadedUrls,
        createdAt: serverTimestamp(),
      });

      message.success("Product uploaded successfully!");
      resetForm();
      onClose();
      console.log("Firestore doc id:", docRef.id);
    } catch (error) {
      console.error(error);
      message.error("Upload failed: " + error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Modal
      title="Upload Product"
      open={open}
      onCancel={() => {
        if (!uploading) {
          resetForm();
          onClose();
        }
      }}
      footer={[
        <Button
          key="cancel"
          disabled={uploading}
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          disabled={uploading}
          loading={uploading}
          onClick={handleUpload}
        >
          Upload Product
        </Button>,
      ]}
      destroyOnHidden
      centered
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={uploading}
        style={{ marginBottom: 12 }}
      />

      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={uploading}
        rows={4}
        style={{ marginBottom: 12 }}
      />

      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={uploading}
        min={0}
        style={{ marginBottom: 12 }}
      />

      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFilesChange}
        disabled={uploading}
        style={{ marginBottom: 12 }}
      />

      {uploading && <Progress percent={Math.round(uploadProgress)} />}
    </Modal>
  );
}
