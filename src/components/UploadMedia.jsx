import React, { useState } from "react";
import { Modal, Upload, Button, Typography, message as antdMessage } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const { Title } = Typography;

export default function UploadMedia({ open, onClose }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const storage = getStorage();

  const handleUpload = ({ file }) => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (error) => {
        antdMessage.error("Upload failed: " + error.message);
        setUploading(false);
        setProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          antdMessage.success("Upload successful!");
          console.log("File available at:", downloadURL);
          setUploading(false);
          setProgress(0);
          onClose();
        });
      }
    );
  };

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>Upload Image or Video</Title>}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
    >
      <Upload
        accept="image/*,video/*"
        showUploadList={false}
        customRequest={handleUpload}
        disabled={uploading}
      >
        <Button icon={<UploadOutlined />} type="primary" loading={uploading} block>
          {uploading ? `Uploading... ${progress}%` : "Select File to Upload"}
        </Button>
      </Upload>
    </Modal>
  );
}
