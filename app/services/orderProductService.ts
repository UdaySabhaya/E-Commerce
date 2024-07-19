import { prisma } from "../config/db";
import { CustomError } from "../interface/errorInterface";
import { orderProduct } from "../interface/orderProductInterface";

const createOrderProducts = async (data: orderProduct[], orderId: number) => {
    data.forEach(element => {
        element['orderId'] = orderId
    });
    const ProductData = await prisma.orderProduct.createMany({
        data: data
    })

    return ProductData;

}
const getOrderProducts = async () => {
    const productData = await prisma.orderProduct.findMany({})
    return productData;
}
const updateOrderProduct = async (data: orderProduct[]) => {

    for (const product of data) {

        const updatedData = await prisma.products.update({
            where: {
                id: product.productId
            },
            data: {
                stock: {
                    decrement: product.qty
                }
            }
        })
      
    }
}
const deleteOrderProduct = async (orderID: number) => {
    const deleteOrder = await prisma.orderProduct.deleteMany({
    where:{
        orderId:orderID
    }
    })
    return deleteOrder;
}

export const orderProductService = {
    createOrderProducts, getOrderProducts, updateOrderProduct, deleteOrderProduct
}