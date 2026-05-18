import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // ← must be a Gmail App Password, NOT your regular password
      },
      tls: {
        rejectUnauthorized: false, // needed for some serverless environments
      },
    });

    const info = await transporter.sendMail({
      from: `"DriveEase" <${process.env.EMAIL}>`,
      to: to || process.env.EMAIL,
      subject: subject || "Hello",
      html: html || "<h1>hello</h1>",
    });

    return info.accepted.length > 0;
  } catch (error) {
    console.error("sendEmail error:", error.message);
    return false;
  }
}
