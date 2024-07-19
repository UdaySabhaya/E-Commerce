import { prisma } from "../config/db";
import pdf from "html-pdf";
import { sendEmail } from "../utils/nodeSender";

export const pdfFileGenerate = async (orderId: number) => {
    const createOrderData = await prisma.order.findFirst({
        where: {
            id: orderId
        }, include: {
            orderByUser: true,
            orderProduct: {
                include: {
                    product: true
                }
            },

        }
    })



    let table = `
    <head>
      <style>.clearfix:after {
        content: "";
        display: table;
        clear: both;
      }
      
      
      
      body {
        position: relative;
        width: 21cm;  
        height: 29.7cm; 
        margin: 0 auto; 
        color: #001028;
        background: #FFFFFF; 
        font-family: Arial, sans-serif; 
        font-size: 12px; 
        font-family: Arial;
      }
      
      header {
        padding: 10px 0;
        margin-bottom: 30px;
      }
     
      
      h1 {
        border-top: 1px solid  #5D6975;
        border-bottom: 1px solid  #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        margin: 0 0 20px 0;
        background: url(dimension.png);
      }
      
      #project {
        float: left;
      }
      
      #project div{
        white-space: nowrap;        
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
      }
      
      table tr:nth-child(2n-1) td {
        background: #F5F5F5;
      }
      
      table th,
      table td {
        text-align: center;
      }
      
      table th {
        padding: 5px 20px;
        color: #5D6975;
        border-bottom: 1px solid #C1CED9;
        white-space: nowrap;        
        font-weight: normal;
      }
            
      table td {
        padding: 20px;
      }
        
   
      table td.total {
        text-align: center;
        border-top: 1px solid #5D6975;

      }
      
      table td.grand {
        border-top: 1px solid #5D6975;
        text-align: right;
      }
      
      #notices .notice {
        color: #5D6975;
        font-size: 1.2em;
      }
      
      footer {
        color: #5D6975;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #C1CED9;
        padding: 8px 0;
        text-align: center;
      }
      </style
    </head>
    <body>
      <header class="clearfix">
       
        <h1>INVOICE</h1>
       
        <div id="project">
          <div><h3>CUSTOMER: ${createOrderData?.orderByUser.name.toUpperCase()}</h3> </div>
          <div><h3>EMAIL: ${createOrderData?.orderByUser.email}</h3> <a href="mailto:john@example.com"></a></div>
          <div><h3>DATE: ${createOrderData?.createdAt}</h3></div>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th class="desc">PRODUCT ID</th>
              <th>PRODUCT NAME</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>`
    if (createOrderData) {
        const reqData = createOrderData.orderProduct.map((order) => {
            table += "<tr style='text-align:center;'>";
            table += "<td >" + order.product.id + "</td>";
            table += "<td>" + order.product.productName.toUpperCase() + "</td>";
            table += "<td>" + order.qty + "</td>";
            table += "<td >" + order.product.price + "</td>";
            console.log(order.qty);
            table += "<td>" + (order.qty * order.product.price) + "</td>";
            table += "</tr>";
        });

    }
let sum:number  = Number(createOrderData?.amount) + Number(createOrderData?.discount);
    table += `<tr>
              <td colspan="4" class="grand total">SUBTOTAL</td>
              <td class=" total">${sum}</td>
            </tr>
            <td colspan="4" class="grand total">DISCOUNT</td>
              <td class=" total">${createOrderData?.discount}</td>
            </tr>
            <tr>
              <td colspan="4" class="grand total">GRAND TOTAL</td>
              <td class=" total">${createOrderData?.amount}</td>
            </tr>
          </tbody>
        </table>
        <div id="notices">
          <div>NOTICE:</div>
          <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
        </div>
      </main>
      <footer>
        Invoice was created on a computer and is valid without the signature and seal.
      </footer>
    </body>
  `;
   

    var options: any = {
        "format": "Legal",
        "orientation": "vertical",
        "border": {
            "top": "0.1in",
        },
        "timeout": "120000"
    };

    pdf.create(table, options).toFile('public/OrderCreate.pdf', function (err, result) {
        if (err) return console.log(err);
        console.log("pdf create");
    });

    // await sendEmail({
    //     from: `${process.env.SMTP_EMAIL}`,
    //     to: createOrderData?.orderByUser.email,
    //     subject: "Order Confirmed",
    //     html: `<h1>Hello ${createOrderData?.orderByUser.name} </h1><br/><h2>Please Check your OrderDetails</h2>`,
    //     attachments: [{
    //         filename: 'Invoice.pdf',
    //         path: 'public/OrderCreate.pdf',
    //         contentType: 'application/pdf'
    //     }],
    // })

}