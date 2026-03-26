import prisma from "../../../Global/db.js";
import { generateOTP } from "../../../Global/utils/generate_otp.js";
import transporter from "../../../Global/nodemailer/node.js";

export const ForgotPasswordService = async (email) => {

    try {


        const find_email = await prisma.user.findUnique({
            data: {
                email: email
            }
        })

        if (!find_email) {
            throw new Error('Email Validation Failed')
        }

        const otp = generateOTP();
        const expiresOn = new Date(Date.now() + 15 * 60 + 1000);
        const otp_data = await prisma.OTP.create({
            data: {

                email: email,
                otp: otp.toString(),
                expiresOn
            }
        })

        let mailoptions = {

            from: "eventnest.official.main@gmail.com",
            to: email,
            subject: "Password Change Code ",
            text: "Please find the code to reset the password.",
            html: `
               
           <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
      
      <h1 style="color: #4CAF50; text-align: center;margin-bottom:20px;">
        Enter this code to reset your password
      </h1>

      <div style="text-align:center;">
        <div style="
          display: inline-block;
          padding: 12px 25px;
          background-color: #ffffff;
          border: 2px dashed #4CAF50;
          border-radius: 8px;
          font-size: 22px;
          letter-spacing: 4px;
          font-weight: bold;
          color: #333;">
          ${code}
        </div>
      </div>

      <p style="color:#555; text-align:center; margin-top:25px; font-size: 14px;">
        If you did not request this, you can safely ignore this email.
      </p>

    </div>
            `
        }

        await transporter.sendMail(mailoptions);

        return true;



    }
    catch (er) {
        throw er;
    }
}
