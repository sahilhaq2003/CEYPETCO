const TARGET_BYTES = 3.5 * 1024 * 1024;
const MAX_DIMENSION = 2200;

const canvasBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (blob) resolve(blob);
    else reject(new Error("Could not compress this image"));
  }, type, quality);
});

export default async function compressImageForUpload(file) {
  if (file.size <= TARGET_BYTES) return file;
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    throw new Error("Large GIF and SVG files cannot be compressed automatically. Choose a file under 4 MB.");
  }
  if (typeof createImageBitmap !== "function") {
    throw new Error("This browser cannot compress large images. Choose a file under 4 MB.");
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
    const initialScale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    let width = Math.max(1, Math.round(bitmap.width * initialScale));
    let height = Math.max(1, Math.round(bitmap.height * initialScale));
    let quality = 0.82;

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not prepare this image for upload");
      context.drawImage(bitmap, 0, 0, width, height);

      let blob = await canvasBlob(canvas, "image/webp", quality);
      let extension = "webp";
      if (blob.type !== "image/webp") {
        context.fillStyle = "#fff";
        context.globalCompositeOperation = "destination-over";
        context.fillRect(0, 0, width, height);
        blob = await canvasBlob(canvas, "image/jpeg", quality);
        extension = "jpg";
      }
      if (blob.size <= TARGET_BYTES) {
        const baseName = file.name.replace(/\.[^.]+$/, "");
        return new File([blob], `${baseName}.${extension}`, { type: blob.type });
      }
      width = Math.max(1, Math.round(width * 0.8));
      height = Math.max(1, Math.round(height * 0.8));
      quality = Math.max(0.52, quality - 0.06);
    }
    throw new Error("This image is still too large after compression. Choose a smaller image.");
  } catch (error) {
    if (error.message?.includes("compress") || error.message?.includes("too large") || error.message?.includes("prepare")) throw error;
    throw new Error("Could not read this image. Try a JPG, PNG, or WebP file.");
  } finally {
    bitmap?.close?.();
  }
}
