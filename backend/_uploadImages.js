const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: "e9fb61tl",
  api_key: "138491812554666",
  api_secret: "AJd3qDav07kdLP3E3JoZUDt_Iuw",
});

const dir = "C:/Users/sahil/Desktop/projects/Cepetco/ceypetco-redesign/frontend/public/images";
const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f));
const PUBLIC_ID_PREFIX = "ceypetco/images/";

console.log("Uploading", files.length, "files...");

(async () => {
  const results = [];
  let ok = 0, fail = 0;
  for (const f of files) {
    const publicId = PUBLIC_ID_PREFIX + f.replace(/\.[^.]+$/, "");
    try {
      const r = await cloudinary.uploader.upload(path.join(dir, f), {
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
      });
      results.push({ file: f, publicId, url: r.secure_url });
      ok++;
      console.log("OK   ", f, "->", r.secure_url);
    } catch (e) {
      fail++;
      console.log("FAIL ", f, "::", e.message.split("\n")[0]);
    }
  }
  console.log(`\nDONE: ${ok} ok, ${fail} failed`);
  fs.writeFileSync(
    "C:/Users/sahil/Desktop/projects/Cepetco/ceypetco-redesign/backend/_imgMap.json",
    JSON.stringify(results, null, 2)
  );
  console.log("Mapping written to _imgMap.json");
})().catch((e) => { console.error(e); process.exit(1); });
