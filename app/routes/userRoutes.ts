import express from "express";
import { isAuthenticate } from "../middleware/authenticate";
import { userController } from "../controller/userController";
import { loginValidation, signUpValidation } from "../middleware/userValidation";
import { isAdmin } from "../middleware/isAdmin";

const router  = express.Router();

router.get("/user",isAuthenticate,isAdmin,userController.getUser);
router.get("/profile",isAuthenticate,userController.getProfileDetails);

router.post("/signup",signUpValidation,userController.signUpUser);
router.post("/login",loginValidation,userController.loginUser);

router.put("/user",isAuthenticate,userController.updateUser);
router.delete("/user/:id",isAuthenticate,isAdmin,userController.deleteUser);

export default router;