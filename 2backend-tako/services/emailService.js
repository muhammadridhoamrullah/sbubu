const nodemailer = require("nodemailer");

const myEmail = process.env.EMAIL;
const myPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myEmail,
    pass: myPassword,
  },
});

async function sendVerificationEmail(data) {
  const mailOptions = {
    from: myEmail,
    to: data.email,
    subject: `Tako - Email Verification`,
    html: `
        <h1>Welcome to Tako, ${data.username}!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${data.link}">VERIFY EMAIL</a>
        <p>If you did not sign up for this account, please ignore this email.</p>
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>Tako Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
};
