// generateMediaManifest.js
const fs = require("fs");
const path = require("path");

const mediaDir = path.join(__dirname, "public", "media");
const manifestPath = path.join(mediaDir, "manifest.json");

function updateManifest() {
  // Ensure media directory exists
  if (!fs.existsSync(mediaDir)) {
    console.warn("⚠️ media directory does not exist. Creating...");
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  // Read all files in media directory
  const files = fs.readdirSync(mediaDir)
    .filter(file => /\.(png|jpe?g|gif|mp4|webm)$/i.test(file)) // only allowed formats
    .sort(); // keep alphabetical

  // Write updated list to manifest.json
  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));
  console.log(`✅ Media manifest updated (${files.length} files)`);
}

updateManifest();
