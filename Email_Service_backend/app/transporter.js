import nodemailer from 'nodemailer'


const MAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;

console.log("Gmail App Password loaded:", MAIL_PASSWORD ? `✓ Set (length: ${MAIL_PASSWORD.length})` : "✗ Not set");
console.log("Password value:", MAIL_PASSWORD);

const transporter = nodemailer.createTransport({
     service : "gmail",
     auth :{
        user: "eventnest.official.main@gmail.com", 
          pass: MAIL_PASSWORD,
     },
     tls:{
         rejectUnauthorized: false,  
     },
})

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Transporter Error:", error.message);
    } else {
        console.log("✓ Transporter is ready to send emails");
    }
});

export default transporter