import { prisma } from "../config/db"
import { CustomError } from "../interface/errorInterface";
import { orderProduct } from "../interface/orderProductInterface";

export const isProductValidate = async (data: orderProduct[]) => {

   await Promise.all(data.map(async (e: orderProduct) => {

      const product = await prisma.products.findFirst({
         where: {
            id: e.productId
         }
      })
      if (!product) {
         throw new CustomError(400, "product not found")
      }

   }));

}