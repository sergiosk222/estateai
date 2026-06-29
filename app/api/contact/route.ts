import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/contact";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  propertyType?: string;
  message?: string;
};

function clean(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, 1000);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const company = clean(body.company);
    const city = clean(body.city);
    const propertyType = clean(body.propertyType);
    const message = clean(body.message);

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    const resend = new Resend(resendApiKey);

    const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL;
    const from =
      process.env.RESEND_FROM_EMAIL || "EstateAI <onboarding@resend.dev>";

    const subject = `New EstateAI request from ${name}`;

    const text = `
New EstateAI request

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Company: ${company || "-"}
City: ${city || "-"}
Property type: ${propertyType || "-"}

Message:
${message || "-"}
`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h1>New EstateAI request</h1>

        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "-")}</p>
        <p><strong>City:</strong> ${escapeHtml(city || "-")}</p>
        <p><strong>Property type:</strong> ${escapeHtml(propertyType || "-")}</p>

        <hr />

        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "-").replaceAll("\n", "<br />")}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        { message: "Failed to send request." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Request sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { message: "Unexpected server error." },
      { status: 500 }
    );
  }
}
