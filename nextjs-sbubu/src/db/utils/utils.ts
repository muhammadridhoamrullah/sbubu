import crypto from "crypto";
import nodemailer from "nodemailer";

export function generateOverlayKey(): string {
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const timeStamp = Date.now().toString(36);

  return `${randomBytes}${timeStamp}`;
}

const myEmail = process.env.EMAIL;
const myPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myEmail,
    pass: myPassword,
  },
});

type dataVerif = {
  email: string;
  username: string;
  link: string;
};

export async function sendVerificationEmail(data: dataVerif) {
  const mailOptions = {
    from: myEmail,
    to: data.email,
    subject: "SBUBU - Verification Email",
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
