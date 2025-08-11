import React, { useEffect, useState } from "react";

export default function Home() {
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    fetch("/media/manifest.json?_t=" + Date.now()) // cache-busting
      .then(res => res.json())
      .then(setMediaFiles)
      .catch(console.error);
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    },
    mediaWrapper: {
      marginBottom: "20px",
      width: "100%",
      maxWidth: "600px",
    },
    media: {
      width: "100%",
      borderRadius: "10px",
    }
  };

  return (
    <div style={styles.container}>
      {mediaFiles.map((file, index) => {
        const isVideo = /\.(mp4|webm)$/i.test(file);
        return (
          <div key={index} style={styles.mediaWrapper}>
            {isVideo ? (
              <video src={`/media/${file}`} controls style={styles.media} />
            ) : (
              <img src={`/media/${file}`} alt={file} style={styles.media} />
            )}
          </div>
        );
      })}
    </div>
  );
}
