const transporter = require("../config/transporter_config.js");
const config = require("../config/config");
const forgotpw_template = require("./Template/forgotpw_template.js");
const orderplaced = require("./Template/orderplaced.js");
const newUser = require("./Template/newuser.js");

const email = async (options) => {
  let templateContent = "";

  switch (options.template) {
    case "forgotPw":
      templateContent = forgotpw_template(options.name, options.navigateLink);
      break;
    case "orderplaced":
      templateContent = orderplaced(
        options.name,
        options.navigateLink,
        options.orderid,
        options.orderdate,
        options.amount
      );
      break;
    case "newUser":
      templateContent = newUser();
      break;
  }

  const message = {
    from: config.SMTP_MAIL_EMAIL,
    to: options.email,
    subject: options.subject,
    html: templateContent,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.log("Error While Sending Email.");
  }
};

module.exports = email;
