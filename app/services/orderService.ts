import { prisma } from "../config/db";
import { CustomError } from "../interface/errorInterface";
import { orderInterface } from "../interface/orderInterface";
import { userInterface } from "../interface/userInterface";


const getOrderData = async () => {

    const data = await prisma.order.findMany({
        include:{
            orderByUser:true
        }
    })
    return data;
}

const createOrderData = async (data: orderInterface, User: userInterface,totalAmount:number) => {
    const couponData = await prisma.coupon.findUnique({
        where: {
            code: data.couponCode
        }
    })
    if (!couponData) {
        throw new CustomError(400, "Coupon Does not Exist")
    }

    await prisma.coupon.update({
        where: {
            code: data.couponCode
        }, data:
        {
            applyCount: {
                increment: 1
            }
        }
    })


    const CurrentDate = new Date().getTime();
    if (CurrentDate > couponData.expDate.getTime()) {
        throw new CustomError(400, "Coupon Expired")
    }

    let Amount = 0;
    let discount = 0;
    if (totalAmount < couponData.amountRange) {
        Amount = totalAmount;
        discount = 0

        throw new CustomError(400, "Coupon is not applicable")
    }
    if (couponData?.isPercentage == true) {
        discount = (totalAmount * couponData?.value) / 100;
        Amount = totalAmount - discount;
        console.table([discount, Amount])
    }
    else {
        Amount = totalAmount - couponData?.value;
        discount = couponData?.value;
    }


    const createOrder = await prisma.order.create({

        data: {
            amount: Amount,
            description: data.description,
            orderBy: data.orderBy,
            isDelivered: data.isDelivered,
            createdBy: Number(User.id),
            updatedBy: Number(User.id),
            discount: discount,
            orderByUser: {
                connect: {
                    id: User.id
                }
            },
            coupon: {
                connect: {
                    id: couponData.id
                }
            }
        }
    })

    return createOrder;
}

const deleteOrderData = async (orderId: number) => {

    const deletedata = await prisma.order.delete({
        where: {
            id: orderId
        }
    })
    if (deletedata.couponId) {
        await prisma.coupon.update({
            where: {
                id: deletedata?.couponId
            },
            data:
            {
                applyCount: {
                    decrement: 1
                }
            }
        })
    }



    return deletedata;
}
const updateOrder = async (data: orderInterface, orderID: number,totalAmount:number) => {
    const couponData = await prisma.coupon.findUnique({
        where: {
            code: data.couponCode
        }
    })
    console.log(couponData);
    
    if (!couponData) {
        throw new CustomError(400, "Coupon Does not Exist")
    }
    const CurrentDate = new Date().getTime();
    if (CurrentDate > couponData.expDate.getTime()) {
        throw new CustomError(400, "Coupon Expired")
    }

    let Amount = 0;
    let discount = 0;
    
    if (totalAmount < couponData.amountRange) {
        Amount = totalAmount;
        discount = 0

        throw new CustomError(400, "Coupon is not applicable")
    }
    if (couponData?.isPercentage == true) {
        discount = (totalAmount * couponData?.value) / 100;
        Amount = totalAmount - discount;
    }
    else {
        Amount = totalAmount - couponData?.value;
        discount = couponData?.value;
    }
    const data1 = await prisma.order.update({
        where: {
            id: orderID
        },
        data: {
            amount: Amount,
            discount:discount
        }
    })
return data1;

}
export const orderService = {
    getOrderData, createOrderData, deleteOrderData, updateOrder
}