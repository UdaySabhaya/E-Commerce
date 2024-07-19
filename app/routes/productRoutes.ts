import express from "express";
import { isAuthenticate } from "../middleware/authenticate";
import { productController } from "../controller/productController";
import { isAdmin } from "../middleware/isAdmin";

const router  = express.Router();

router.get("/product",isAuthenticate,productController.getProductController);
router.post("/product",isAuthenticate,isAdmin,productController.createProductController);
router.put("/product/:id",isAuthenticate,isAdmin,productController.updateProductController);
router.delete("product/:id",isAuthenticate,isAdmin,productController.deleteProductController);

export default router