const router = require("express").Router();

const MAX_BYTES = 10 * 1024 * 1024;

const readImage = async (url) => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000),
    headers: { Accept: "image/avif,image/webp,image/*;q=0.8" },
  });
  const type = response.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if (!response.ok || !type?.startsWith("image/")) return null;
  if (Number(response.headers.get("content-length")) > MAX_BYTES) return null;

  const chunks = [];
  let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
    if (total > MAX_BYTES) return null;
    chunks.push(chunk);
  }
  return { body: Buffer.concat(chunks), type };
};

router.get("/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const resourceKey = String(req.query.resourcekey || "");
  if (!/^[A-Za-z0-9_-]{10,128}$/.test(fileId) ||
      (resourceKey && !/^[A-Za-z0-9_-]{1,128}$/.test(resourceKey))) {
    return res.status(400).json({ success: false, message: "Invalid Google Drive image link" });
  }

  const params = new URLSearchParams({ id: fileId, sz: "w1600" });
  if (resourceKey) params.set("resourcekey", resourceKey);
  const viewParams = new URLSearchParams({ export: "view", id: fileId });
  if (resourceKey) viewParams.set("resourcekey", resourceKey);
  try {
    const image = await readImage(`https://drive.google.com/thumbnail?${params}`)
      || await readImage(`https://drive.google.com/uc?${viewParams}`);
    if (!image) return res.status(404).json({ success: false, message: "Public Google Drive image unavailable" });
    res.set("Cache-Control", "public, max-age=3600");
    res.type(image.type).send(image.body);
  } catch {
    res.status(502).json({ success: false, message: "Could not load Google Drive image" });
  }
});

module.exports = router;
