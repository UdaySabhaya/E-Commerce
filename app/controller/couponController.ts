import express, { NextFunction, Request, Response } from "express";
import { couponService } from "../services/couponService";
import { RequestExtends } from "../interface/reqInterface";
import { errorCheck } from "../helper/hasErrorFunction";
import { CustomError } from "../interface/errorInterface";
import { responseOfAllService } from "../helper/response";


const getCouponController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const data= await couponService.getCoupon();
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Coupon Fetched Successfully", data)

    } catch (error) {
        next(error);
    }
}


const createCouponController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req);
        const data = req.body;

        const create = await couponService.createCoupon(data);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Coupon Created Successfully", create)

    } catch (error) {
        next(error)
    }
}


const deleteCouponController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const bodyParams = Number(req.params.id);
        console.log(bodyParams);

        const deletedCoupon = await couponService.deleteCoupon(bodyParams);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Coupon Deleted Successfully", deletedCoupon)

    } catch (error) {
        next(error);
    }

}

const updateCouponController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req);
        const data = req.body;
        const bodyParams = Number(req.params.id);
        const create = await couponService.updateCoupon(data,bodyParams);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Coupon Updated Successfully", create)
       
    } catch (error) {
        next(error);
    }

}

export const couponController = {
    getCouponController,
    createCouponController, updateCouponController, deleteCouponController
}