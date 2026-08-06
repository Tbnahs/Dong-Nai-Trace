import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();

const GEOJSON_DIR = path.resolve(
  process.cwd(),
  "../portal/public/geojson"
);

router.get("/geojson/wards", (_req, res) => {
  const filePath = path.join(GEOJSON_DIR, "dongnai_wards.geojson");
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "GeoJSON not found" });
    return;
  }
  res.setHeader("Content-Type", "application/geo+json");
  res.setHeader("Cache-Control", "public, max-age=3600");
  fs.createReadStream(filePath).pipe(res);
});

router.get("/geojson/province", (_req, res) => {
  const filePath = path.join(GEOJSON_DIR, "province.geojson");
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "GeoJSON not found" });
    return;
  }
  res.setHeader("Content-Type", "application/geo+json");
  res.setHeader("Cache-Control", "public, max-age=3600");
  fs.createReadStream(filePath).pipe(res);
});

export default router;
