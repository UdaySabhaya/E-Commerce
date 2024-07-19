import express from "express";
import { isAuthenticate } from "../middleware/authenticate";
import { orderController } from "../controller/orderController";
import { isAdmin } from "../middleware/isAdmin";
import { Ordervalidation } from "../middleware/orderValidation";

const app= express();
const router  = express.Router();

router.get("/order",isAuthenticate,isAdmin,orderController.getOrderController);
router.get("/order/JSON",orderController.jsonToCsvController);
router.get("/order/PDF",orderController.pdfController);

router.post("/order",isAuthenticate,Ordervalidation,orderController.createOrderController);
router.put("/order/:id",isAuthenticate,orderController.updateOrderController);
router.delete("/order/:id",isAuthenticate,orderController.deleteOrderController);

export default router