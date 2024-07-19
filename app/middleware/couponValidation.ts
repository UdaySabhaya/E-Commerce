import { body } from "express-validator";

export const couponValidation=[
    body('code').notEmpty().withMessage("Coupon Code should be there"),
    body('amountRange').notEmpty().isNumeric().withMessage("amountRange should be numeric and not empty"),
    body('value').notEmpty().withMessage("Value Code should be there"),
    body('isPercentage').notEmpty().withMessage("isPercentage should be there"),
    body('expDate').notEmpty().withMessage("expDate should be there"),
   
]