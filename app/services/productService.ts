import { prisma } from "../config/db";
import { CustomError } from "../interface/errorInterface";
import { orderProduct } from "../interface/orderProductInterface";
import { product } from "../interface/productInterface";

const createProducts = async (data: product) => {
    const productExist = await prisma.products.findFirst({
        where: {
            productName: data.productName
        }
    })
    if (productExist) {
        throw new CustomError(400, "Product Already Exist");
    }
    const ProductData = await prisma.products.create({
        data: {
            productName: data.productName,
            stock: data.stock,
            price:data.price
        }
    })
    return ProductData;

}
const getProducts = async () => {
    const productData = await prisma.products.findMany({})
    return productData;
}
const updateStock = async (orderId: number) => {
    const data = await prisma.orderProduct.findMany({
        where: {
            orderId: orderId
        }
    })
    console.log(data);
    for (const product of data) {
        const updatedData = await prisma.products.update({
            where: {
                id: product.productId
            },
            data: {
                stock: {
                    increment:product.qty
                }
    
            }
        })
    }
    // return updatedData;
    
}

const updateProduct = async (data:product,productId: number) => {
   
  
        const updatedData = await prisma.products.update({
            where: {
                id: productId
            },
            data: {
                price:data.price,
                productName:data.productName,
                stock:data.stock
    
            }
        })
    return updatedData;
    
}

const deleteProduct = async (productId: number) => {
    const deleteOrder = await prisma.products.delete({
        where: {
            id: productId
        }
    })
    return deleteOrder;
    // console.log(deleteOrder);
}

export const productService = {
    createProducts, getProducts, updateStock, deleteProduct,updateProduct
}