import { NextFunction, Response } from "express";
import { errorCheck } from "../helper/hasErrorFunction";
import { csvFile } from "../helper/objectToCSV";
import { pdfFileGenerate } from "../helper/pdfFileForCreateorder";
import { pdfFile } from "../helper/pdfGenerate";
import { responseOfAllService } from "../helper/response";
import { CustomError } from "../interface/errorInterface";
import { RequestExtends } from "../interface/reqInterface";
import { isProductValidate } from "../middleware/productValidate";
import { isQtyValidate } from "../middleware/qtyValidate";
import { orderProductService } from "../services/orderProductService";
import { orderService } from "../services/orderService";
import { productService } from "../services/productService";

export let orderId: number;
const getOrderController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const data= await orderService.getOrderData()
        if(!req.id)
            {
                throw new CustomError(400,"Req id is not Found")
            }
        await responseOfAllService(res,req.id,"Data Fetched Successfully",data)

    } catch (error) {
        next(error);
    }   

}
const jsonToCsvController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const data = await csvFile();
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "CSV File Created Successfully", data)
    } catch (error) {
        next(error)
    }
}

const pdfController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        
        const data = await pdfFile();
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "PDF File Created Successfully", data)

    } catch (error) {
        next(error)
    }
}

const createOrderController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {

        await errorCheck(req);

        const data = req.body;
        const { orderProduct } = data
        await isProductValidate(orderProduct)
        const totalAmount = await isQtyValidate(orderProduct);

        const createOrder = await orderService.createOrderData(data, req.user, totalAmount);

        orderId = createOrder.id;
        await orderProductService.createOrderProducts(orderProduct, orderId);
        await orderProductService.updateOrderProduct(orderProduct);

        await pdfFileGenerate(orderId);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Order Placed Successfully", createOrder)


    } catch (error) {
        next(error)
    }
}

const deleteOrderController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const bodyParams = Number(req.params.id);

        await productService.updateStock(bodyParams);

        await orderProductService.deleteOrderProduct(bodyParams);

        const deletedData = await orderService.deleteOrderData(bodyParams);

        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Order Deleted Successfully", deletedData)

    } catch (error) {
        next(error);
    }

}

const updateOrderController = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req);
        const data = req.body;
        const { isDelivered } = data
        const { orderProduct } = data
        await isProductValidate(orderProduct)
        const totalAmount = await isQtyValidate(orderProduct);
        const bodyParams = Number(req.params.id);
        if (isDelivered == false) {

            const create = await orderService.updateOrder(data, bodyParams, totalAmount);
            const updateProduct = await productService.updateStock(bodyParams);

            await orderProductService.deleteOrderProduct(bodyParams);
            const createOrderProduct = await orderProductService.createOrderProducts(orderProduct, bodyParams);
            const orderData = await orderProductService.updateOrderProduct(orderProduct);
            if (!req.id) {
                throw new CustomError(400, "Req id is not Found")
            }
            console.log(orderData);

            await responseOfAllService(res, req.id, "Order Updated Successfully", create)
 
        }
        else {
            throw new CustomError(400, "Order is Delivered So you cannot edit this order")
        }

    } catch (error) {
        next(error);
    }

}

export const orderController = {
    getOrderController,
    createOrderController, updateOrderController, deleteOrderController, jsonToCsvController, pdfController
}