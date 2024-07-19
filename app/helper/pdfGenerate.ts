import { orderService } from "../services/orderService";
import pdf from "html-pdf";

export const pdfFile = async()=>{
    const orderData = await orderService.getOrderData();
    let table = '';
    table += "<table border='1' style='width:100%;word-break:break-word;'>";
    table += "<tr>";
    table += "<th >OrderId</th>";
    table += "<th >Customer Name</th>";
    table += "<th >Created Date</th>";
    table += "<th >Amount</th>";
    table += "<th >Discount</th>";
    table += "<th >Total Amount</th>";
    table += "</tr>";

    const reqData = orderData.map((order) => {
        table += "<tr style='text-align:center;'>";
        table += "<td >" + order.id + "</td>";
        table += "<td >" + order.orderByUser.name + "</td>";
        table += "<td>" + order.createdAt.toISOString() + "</td>";
        table += "<td>" + order.amount + "</td>";
        table += "<td>" + order.discount + "</td>";
        table += "<td>" + (order.amount + order.discount) + "</td>";
        table += "</tr>";
    });

    table += "</table>";
    var options: any = {
        "format": "Legal",
        "orientation": "vertical",
        "border": {
            "top": "0.1in",
        },
        "timeout": "120000"
    };

    pdf.create(table, options).toFile('public/Order.pdf', function (err, result) {
        if (err) return console.log(err);
        console.log("pdf create");
    });
}