const pdfTemplate = ({
    name,
    phoneNumber,
    email,
    notes,
    items,
    dueDate,
    issuedDate,
    totalQuantity,
    totalAmount,
    invoiceNumber
  }) => {
    const formattedItems = items
      ?.map(
        (item) => `
          <tr>
            <td style="font-size: 9px">${item.itemName}</td>
            <td style="font-size: 9px">${item.quantity}</td>
            <td style="font-size: 9px">${item.unitPrice}</td>
            <td style="font-size: 9px">${item.quantity * item.unitPrice}</td>
          </tr>
        `
      )
      .join('');
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      
      .invoice-container {
        padding: 0;
        padding-top: 10px;
        font-family: 'Roboto', sans-serif;
        width: 530px;
        margin: 0px auto;
      }
      
      table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      table td, table th {
        border: 1px solid rgb(247, 247, 247);
        padding: 10px;
      }
      
      table tr:nth-child(even){background-color: #f8f8f8;}
      
      table tr:hover {background-color: rgb(243, 243, 243);}
      
      table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #FFFFFF;
        color: rgb(78, 78, 78);
      }
      
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 5px;
      }
      
      .address {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 0px 15px 0px;
        font-size: 12px;
        margin-top: -20px;
      }
      
      .status {
        text-align: right;
      }
      
      .receipt-id {
        text-align: right;
      }
      
      .title {
        font-weight: 100;
        text-transform: uppercase;
        color: gray;
        letter-spacing: 2px;
        font-size: 8px;
      }
      
      .summary {
        margin-top: 2px;
        margin-right: 0px;
        margin-left: 50%;
        margin-bottom: 15px;
      }
      
      img {
        width: 100px;
      }
      
      </style>
      </head>
      <body>
      <div class="invoice-container">
      <section class="header">
      <p style="font-size: 8px">
        Time issued:
        <b>${new Date().toLocaleTimeString()}</b>
      </p>
      <div>
        <img style="height: 50px; width: 100px" src="https://res.cloudinary.com/startupbuz/image/upload/v1684966014/logo-dark_sxoghr.png" />
        <p style="font-size: 11px">Lagos, Nigeria<p/>
        </p>
      </div>
      </section>
      <section class="address">
      <div>
        <p class="title">From:</p>
        <h4 style="font-size: 14px; line-height: 5px">Novu Connect Hackathon</h4>
        <p style="font-size: 11px; line-height: 5px">inf@connectme.com</p>
        <p style="font-size: 11px; line-height: 5px">+149-294-92485</p>
      </div>
      
      <div style="margin-bottom: 100px; margin-top: 20px">
        <p class="title">Bill to:</p>
        <h4 style="font-size: 11px; line-height: 8px"> Name: ${name}</h4>
        <p style="font-size: 11px; line-height: 8px">Email Address: ${email}</p>
        <p style="font-size: 11px; line-height: 8px">Phone Number: ${phoneNumber}</p>
      </div>
      
      <div class="status" style="margin-top: -200px">
        <p class="title" style="font-size: 8px">Invoice Number</p>
        <p style="font-size: 13px">${invoiceNumber}</p>
        <p class="title" style="font-size: 8px">Date Issued</p>
        <p style="font-size: 9px">${new Date(issuedDate).toLocaleDateString()}</p>
        <p class="title" style="font-size: 8px">Due Date</p>
        <p style="font-size: 9px">${new Date(dueDate).toLocaleDateString()}</p>
        <p class="title" style="font-size: 8px">Amount</p>
        <h3 style="font-size: 12px"> $ ${totalAmount}</h3>
      </div>
      </section>
      
      <table>
       <tr>
         <th style="font-size: 9px">Item</th>
         <th style="font-size: 9px">Quantity</th>
         <th style="font-size: 9px">Price ($)</th>
         <th style="font-size: 9px">Amount</th>
       </tr>
       ${formattedItems}
      </table>
      
      <section class="summary">
        <table>
          <tr>
            <th style="font-size: 9px">Invoice Summary</th>
            <th></th>
          </tr>
          <tr>
            <td style="font-size: 10px">Total Quantity</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">${totalQuantity}</td>
          </tr>
          <tr>
            <td style="font-size: 10px">Total Amount</td>
            <td style="text-align: right; font-size: 9px; font-weight: 700">$ ${totalAmount}</td>
          </tr>
        </table>
      </section>
      
      <div>
        <h4 style="font-size: 9px">Note</h4>
        <p style="font-size: 9px">${notes}</p>
      </div>
      
      </div>
      </body>
      </html>`;
  };
  
  module.exports = pdfTemplate;
