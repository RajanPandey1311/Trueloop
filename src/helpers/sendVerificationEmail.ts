// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//     email:string,
//     username: string,
//     verifyCode: string,
// ):Promise<ApiResponse>{
//     try {
//         await resend.emails.send({
//             from:'onboarding@resend.dev',
//             to: email,
//             subject:'Trueloop Verification Code',
//             react: VerificationEmail({ username, otp: verifyCode}),
//         });
//         return {success: true, message: "Verification email send successfully"}
//     } catch (emailError) {
//         console.log("Error sending verification email:",emailError);
//         return {success:false ,message: "Failed to send Verification email"}
//     }
// }

import nodemailer from 'nodemailer';
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
          body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
          }
          .header h2 {
            color: #333333;
          }
          .content {
            margin-top: 20px;
          }
          .content p {
            color: #666666;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .content .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            text-align: center;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #999999;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>Hello, ${username}</h2>
          </div>
          <div class="content">
            <p>Thank you for registering on Trueloop! Please use the following verification code to complete your registration:</p>
            <p class="otp">${verifyCode}</p>
            <p>If you did not request this verification code, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2024 Trueloop, All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER, 
      to: email,                   
      subject: 'Trueloop Verification Code',
      html: emailHTML, 
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send Verification email" };
  }
}
