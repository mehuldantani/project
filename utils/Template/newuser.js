const newUser = () => {
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
      font-size: 24px;
      color: #333333;
      margin: 0;
      text-align: center;
      margin-bottom: 20px;
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
    <h1>Welcome To CloudCart</h1>
    <p>Hello there, shopaholic!</p>
    <p>Thanks for joining CloudCart. We're thrilled to have you on board, and we can't wait for you to embark on a shopping adventure like never before!</p>

<p>Get ready to explore an extensive collection of products, discover exclusive deals, and enjoy a seamless shopping experience from the comfort of your fingertips.</p>
    
    <div class="thank-you">
	    <a href="#" class="cta-button">Explore Now</a>
    </div>

    <div class="footer">
      <p>If you have any questions or need further assistance, please don't hesitate to contact our customer support.</p>
      <p>Best regards,</p>
      <p>The CloudCart Team</p>
    </div>
  </div>
</body>
</html>
` };

module.exports = newUser;