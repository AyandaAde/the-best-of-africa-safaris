import FormData from "form-data";
import Mailgun from "mailgun.js";
import { NextResponse } from "next/server";

const mailgun = new Mailgun(FormData);
const DOMAIN = process.env.NEXT_PUBLIC_MAILGUN_DOMAIN!;
const mg = mailgun.client({username: "api", key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY || "key-yourkeyhere"});


export async function POST(req:Request){

    const {fName, lName, email, message} = await req.json();

    const messageData = {
        from: "Contact Form <contact@the-best-of-africa-safaris.com>",
        to: "ayandakay67@gmail.com",
        subject: `New message from ${fName} ${lName}`,
        text: `
        Hi, 

        You have a new message from ${fName} ${lName},
        Email: ${email}

        Message:
        ${message}
          `
    };
    try {
        const emailRes = await mg.messages.create(DOMAIN, messageData);
        console.log(emailRes);
        return new NextResponse("Message successfully sent");
    } catch (error) {
        console.log("Error sending email", error);
        return new NextResponse("Unable to send message", {status: 400});
    };
}