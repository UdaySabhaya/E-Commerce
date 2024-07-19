
import { body } from "express-validator";

export const signUpValidation = [
    body('name').notEmpty().withMessage("Name Field Cannot Be Empty"),
    body('name').matches(/([A-Z]{1})([a-z]+)(\s)([A-Z]{1})([a-z]+){1}/g).withMessage('Please Enter Valid Name'),
    body('password').notEmpty().isStrongPassword().withMessage("Password Field Cannot Be Empty"),
    body('email').notEmpty().withMessage("Email Field Cannot Be Empty"),
    body('email').isEmail().withMessage("Email should be in Proper Format"),
    body('role').notEmpty().withMessage("Role Field Cannot Be Empty"),
    body('password').isStrongPassword().withMessage("Password should be Strong"),
    body('age').isInt().withMessage("Age Shold Be Numeric"),
    body('age').not().isString().withMessage("Age Cannot Be String"),
    body('role').isIn(['Customer', 'Admin']).withMessage("Role Should Be Customer Or Admin")
]

export const loginValidation = [
    // body('password').notEmpty().withMessage("Password Field Cannot Be Empty"),
    body('email').notEmpty().withMessage("Email Field Cannot Be Empty"),
    body('email').isEmail().withMessage("Email should be in Proper Format"),
]