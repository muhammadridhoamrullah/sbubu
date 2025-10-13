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
    subject: `SBUBU - Email Verification`,
    html: `
        <h1>Welcome to SBUBU, ${data.username}!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${data.link}">VERIFY EMAIL</a>
        <p>If you did not sign up for this account, please ignore this email.</p>
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>SBUBU Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendLoginNotificationEmail(data) {
  const mailOptions = {
    from: myEmail,
    to: data.email,
    subject: `SBUBU - New Login Notification`,
    html: `
        
        <h1>Hello, ${data.username}!</h1>
        <p>We noticed a new login to your account.</p>
        <p>If this was you, you can safely ignore this email. If you did not log in, please secure your account immediately.</p>
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>SBUBU Team</p>
                `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendLoginNotificationEmail,
};
