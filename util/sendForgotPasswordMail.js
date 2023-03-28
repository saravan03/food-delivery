const sgMail = require("@sendgrid/mail");
const config = require("config");

sgMail.setApiKey(config.get("mail.api_key"));

const sendForgotPasswordMail = async (data) => {
  console.log("API KEY ", config.get("mail.api_key"));
  const mailOptions = {
    from: config.get("mail.from"),
    to: data.to,
    cc: config.get("mail.cc"),
    subject: "Forgot Password - Food Order App",
    text: `Hi, Please use the given password to log-in to your account. Once logged in, please change the password for your account security. Your new passwod is - ${data.password}`,
  };

  await sgMail
    .send(mailOptions)
    .then(() => {
      console.debug("Email sent successfully");
    })
    .catch((error) => {
      console.log(error);
      console.debug("Email not sent");
    });
};

module.exports = { sendForgotPasswordMail };
