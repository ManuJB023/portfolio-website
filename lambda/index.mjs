// lambda/index.mjs
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });

const TO_EMAIL = process.env.TO_EMAIL;     
const FROM_EMAIL = process.env.FROM_EMAIL; 

// More comprehensive CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  "Access-Control-Max-Age": "86400"
};

export const handler = async (event) => {
  // Log the event for debugging
  console.log("Event received:", JSON.stringify(event, null, 2));
  
  // Always handle OPTIONS requests first
  if (event.httpMethod === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return { 
      statusCode: 200, 
      headers: corsHeaders, 
      body: JSON.stringify({ message: "CORS preflight successful" })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return { 
        statusCode: 400, 
        headers: corsHeaders, 
        body: JSON.stringify({ error: "Missing fields" }) 
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { 
        statusCode: 400, 
        headers: corsHeaders, 
        body: JSON.stringify({ error: "Invalid email" }) 
      };
    }

    console.log(`Attempting to send email from ${name} <${email}>`);

    const params = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `Portfolio Contact: ${name}` },
        Body: {
          Text: { Data: `New contact form submission:\n\nFrom: ${name}\nEmail: ${email}\nMessage:\n${message}` },
        },
      },
    };

    await ses.send(new SendEmailCommand(params));
    console.log("Email sent successfully");

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("SES error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Internal error sending email." }),
    };
  }
};
