import ObjectsToCsv from "objects-to-csv";
import { orderService } from "../services/orderService";

export const csvFile = async()=>{
    const orderData = await orderService.getOrderData();

    const reqData = orderData.map((order) => {
        return {
            orderId: order.id,
            customerName: order.orderByUser.name,
            createdAt: order.createdAt.toISOString(),
            amount: order.amount,
            discount: order.discount,
            totalAmount: order.amount + order.discount
        }
    })
    const csv = new ObjectsToCsv(reqData);

    // Save to file:
    await csv.toDisk('public/order.csv');
    // Return the CSV file as string:
    const csvString = await csv.toString();
    return csvString;
}