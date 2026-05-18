import nodemailer from "nodemailer";
export async function sendEmail({ to, subject, html }) {
 try {
   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: to || process.env.EMAIL,
    subject: subject || "Hello",
    html: html || "<h1>hello</h1>",
  });
    return info.accepted.length > 0;

 } catch (error) {
  console.log(error.message)
  return false;
 }
}
