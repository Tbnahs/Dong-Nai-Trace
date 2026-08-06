import { Router, type IRouter } from "express";
import healthRouter from "./health";
import geojsonRouter from "./geojson";

const router: IRouter = Router();

router.use(healthRouter);
router.use(geojsonRouter);

export default router;
