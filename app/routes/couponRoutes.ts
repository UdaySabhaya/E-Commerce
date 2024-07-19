import express from "express";
import { isAuthenticate } from "../middleware/authenticate";
import { couponController } from "../controller/couponController";
import { isAdmin } from "../middleware/isAdmin";

const router  = express.Router();

router.get("/coupon",isAuthenticate,couponController.getCouponController);
router.post("/coupon",isAuthenticate,isAdmin,couponController.createCouponController);
router.put("/coupon/:id",isAuthenticate,isAdmin,couponController.updateCouponController);
router.delete("/coupon/:id",isAuthenticate,isAdmin,couponController.deleteCouponController);

export default router