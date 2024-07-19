
import { prisma } from "../config/db";
import { couponInterface } from "../interface/couponInterface";
import { CustomError } from "../interface/errorInterface";

const createCoupon = async (data: couponInterface) => {

    const couponExist = await prisma.coupon.findFirst({
        where: {
            code: data.code
        }
    })

    if (couponExist) {
        throw new CustomError(400, "Coupon Already Exist");
    }
    const { isPercentage } = data;
    if (data.amountRange < 0) {
        throw new CustomError(400, "Amount Range Should be greater then 0")
    }
    if (isPercentage === true) {
        if (data.value > 100) {

            throw new CustomError(400, "Percentage Should less than 100")
        }
        if (data.value < 0) {

            throw new CustomError(400, "Percentage Should greater then 0")
        }
    }
    if (isPercentage === false) {

        if (data.value < 0) {
            throw new CustomError(400, "value Should greater then 0")
        }
    }


    const couponData = await prisma.coupon.create({
        data: {
            code: data.code,
            amountRange: data.amountRange,
            value: data.value,
            isPercentage: data.isPercentage,
            expDate: data.expDate,
            applyCount: data.applyCount
        }
    })
    console.log("Egsgs");
    console.log(couponData);

    return couponData;

}
const getCoupon = async () => {
    const couponData = await prisma.coupon.findMany({})
    return couponData;
}
const updateCoupon = async (data: couponInterface, couponID: number) => {
    const updatedData = await prisma.coupon.update({
        where: {
            id: couponID
        },
        data: {
            code: data.code,
            amountRange: data.amountRange,
            value: data.value,
            isPercentage: data.isPercentage,
            expDate: data.expDate
        }
    })
    console.log(updatedData);
    return updatedData;
}
const deleteCoupon = async (couponID: number) => {
    const deleteCoupon = await prisma.coupon.delete({
        where: {
            id: couponID
        }
    })
    return deleteCoupon;
}

export const couponService = {
    createCoupon, getCoupon, updateCoupon, deleteCoupon
}