const orderPlaced = (name, navigateLink,orderid,orderdate,amount) => {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Order Confirmation</title>
      <style>
        /* CSS Styles */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          margin: 0 0 20px;
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          color: #007bff;
        }
    
        p {
          color: #666666;
          margin-bottom: 20px;
        }
    
        .order-details {
          margin-bottom: 30px;
        }
    
        .order-details p {
          margin: 0;
          font-size: 16px;
        }
    
        .order-details .label {
          font-weight: bold;
        }
    
        .order-details .value {
          color: #3498db;
        }
    
        .thank-you {
          text-align: center;
        }
    
        .thank-you p {
          margin: 0;
          font-size: 18px;
          color: #333333;
        }
    
        .cta-button {
          display: inline-block;
          background-color: #3498db;
          color: #ffffff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 20px;
        }
    
        .footer {
          text-align: center;
          margin-top: 30px;
        }
    
        .footer p {
          color: #999999;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for placing your order on CloudCart. We're excited to let you know that your order has been successfully placed and is being processed.</p>
        
        <div class="order-details">
          <p class="label">Order ID:</p>
          <p class="value"># ${orderid}</p><br>
          <p class="label">Order Date:</p>
          <p class="value">${orderdate}</p><br>
          <p class="label">Total Amount:</p>
          <p class="value">${amount}</p>
        </div>
    
        <div class="thank-you">
          <p>Thank you for choosing CloudCart!</p>
          <a href="${navigateLink}" class="cta-button">Track Order</a>
        </div>
    
        <div class="footer">
          <p>If you have any questions or need further assistance, please don't hesitate to contact our customer support.</p>
          <p>Best regards,</p>
          <p>The CloudCart Team</p>
        </div>
      </div>
    </body>
    </html>
    `;
};

module.exports = orderPlaced;
