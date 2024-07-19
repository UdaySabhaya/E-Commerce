import { body, check } from "express-validator";

export const Ordervalidation=[
    body("orderProduct.*.productId").notEmpty().isNumeric().withMessage("productId should be numeric and not empty"),
    body("orderProduct.*.qty").notEmpty().isNumeric().withMessage("qty should be numeric and not empty")
]
