import { NextFunction, Response } from "express";
import { errorCheck } from "../helper/hasErrorFunction";
import { responseOfAllService } from "../helper/response";
import { CustomError } from "../interface/errorInterface";
import { RequestExtends } from "../interface/reqInterface";
import { userService } from "../services/userService";
import { jwtService } from "../utils/jwtService";

const getUser = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const findUserDetails = await userService.getUser();
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Fetch User Data Successfully", findUserDetails)

    } catch (error) {
        next(error)
    }
}
const signUpUser = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req)
        const data = req.body;

        const signUpUserDetails = await userService.signupUser(data)
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "SignIn Successfully", signUpUserDetails)

    } catch (error) {
        next(error)
    }

}
const loginUser = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req)
        try {
            const data = req.body;

            const loggedUser = await userService.login(data);
            data['id'] = loggedUser.id;
            const token = jwtService.signupToken(data);
            if (!req.id) {
                throw new CustomError(400, "Req id is not Found")
            }
            responseOfAllService(res, req.id, "LoggedIn Successfully", token)

        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}
const updateUser = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const updatedData = await userService.updateUser(req.body, req.user.id);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "User Data Updated Successfully", updatedData)

    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req: RequestExtends, res: Response, next: NextFunction) => {

    try {
        const bodyparams = Number(req.params.id);
        const deletedUserData = await userService.deleteUser(bodyparams);

        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "User Data Deleted Successfully", deletedUserData)

    } catch (error) {
        next(error)
    }
}


const getProfileDetails = async (req: RequestExtends, res: Response, next: NextFunction) => {

    try {
        const userDetails = await userService.findUserById(req.user.id)
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "User Data Fetched Successfully", userDetails)
    } catch (error) {
        next(error)
    }
}

export const userController = {
    getUser,
    signUpUser,
    loginUser,
    updateUser,
    deleteUser,
    getProfileDetails
}