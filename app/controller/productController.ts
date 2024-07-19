import express, { NextFunction, Request, Response } from "express";
import { productService } from "../services/productService";
import { RequestExtends } from "../interface/reqInterface";
import { errorCheck } from "../helper/hasErrorFunction";
import { CustomError } from "../interface/errorInterface";
import { responseOfAllService } from "../helper/response";


const getProductController = async(req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const data= await productService.getProducts();
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Product Fetched Successfully", data)

    } catch (error) {
        next(error);
    }
}


const createProductController = async(req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req);
        const data = req.body;
        
        const create = await productService.createProducts(data);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Product Created Successfully", create)


    } catch (error) {
        next(error)
    }
}


const deleteProductController = async(req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const bodyParams = Number(req.params.id);
        console.log(bodyParams);
        
        const deletedData = await productService.deleteProduct(bodyParams);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Product Deleted Successfully", deletedData)

    } catch (error) {
        next(error);
    }

}

const updateProductController = async(req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        await errorCheck(req);
        const data = req.body;
        const bodyParams = Number(req.params.id);
        const create = await productService.updateProduct(data,bodyParams);
        if (!req.id) {
            throw new CustomError(400, "Req id is not Found")
        }
        await responseOfAllService(res, req.id, "Product Updated Successfully", create)
 
    } catch (error) {
        next(error);
    }

}

export const productController = {
    getProductController,
    createProductController, updateProductController,deleteProductController
}