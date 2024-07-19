import  express  from "express";
import orderRoutes from "./orderRoutes";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes"
import couponRoutes from "./couponRoutes"
import { customError } from "../middleware/errorHandler";
import { requestLogger } from "../middleware/loggerhandler";
const router= express.Router();

router.use(requestLogger);

router.use("/api/v1",orderRoutes)
router.use("/api/v1",userRoutes)
router.use("/api/v1",productRoutes)
router.use("/api/v1",couponRoutes)


router.use(customError)
export default router