import { prisma } from "../config/db"
import { CustomError } from "../interface/errorInterface";
import { orderProduct } from "../interface/orderProductInterface";

export const isQtyValidate = async (data: orderProduct[]) => {
   let totalAmount: number = 0;
   await Promise.all(data.map(async (e: orderProduct) => {
      const product = await prisma.products.findFirst({
         where: {
            AND: {
               stock: {
                  gte: e.qty
               },
               id: e.productId
            }

         },
         select: {
            price: true,
            productName: true,
            id: true
         }
      })

      if (!product) {
         throw new CustomError(400, "Quantity should less than stock")
      }

         totalAmount += e.qty * (product.price);
      }));
      return totalAmount;

}
