import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  bookingRef: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const formattedAmount = (data.totalAmount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  await transporter.sendMail({
    from: `"Shubharambh Hotel" <${process.env.SMTP_USER}>`,
    to: data.guestEmail,
    subject: `Booking Confirmed — ${data.bookingRef} | Shubharambh Hotel Pithoragarh`,
    html: `
      <div style="font-family:'Hind',sans-serif;max-width:600px;margin:0 auto;background:#F7F3EA;padding:32px;">
        <h1 style="font-family:'Playfair Display',serif;color:#A44A1E;margin-bottom:4px;">
          Booking Confirmed
        </h1>
        <p style="color:#7A6E65;font-size:13px;margin-top:0;">Shubharambh Hotel & Banquet Hall, Pithoragarh</p>
        <hr style="border:none;border-top:1px solid #C9B8A5;margin:24px 0;">
        <p>Dear <strong>${data.guestName}</strong>,</p>
        <p style="color:#3A3530;line-height:1.7;">
          Thank you for choosing Shubharambh. Your booking is confirmed. We look forward to welcoming you to the Kumaon Himalayas.
        </p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;background:#fff;border:1px solid #C9B8A5;">
          <tr style="background:#234232;color:#fff;">
            <td colspan="2" style="padding:12px 16px;font-family:'Playfair Display',serif;font-size:14px;">
              Booking Summary
            </td>
          </tr>
          <tr><td style="padding:10px 16px;color:#7A6E65;border-bottom:1px solid #E8DDD0;">Booking Ref</td><td style="padding:10px 16px;font-weight:600;border-bottom:1px solid #E8DDD0;">${data.bookingRef}</td></tr>
          <tr><td style="padding:10px 16px;color:#7A6E65;border-bottom:1px solid #E8DDD0;">Room</td><td style="padding:10px 16px;border-bottom:1px solid #E8DDD0;">${data.roomName}</td></tr>
          <tr><td style="padding:10px 16px;color:#7A6E65;border-bottom:1px solid #E8DDD0;">Check-in</td><td style="padding:10px 16px;border-bottom:1px solid #E8DDD0;">${data.checkIn}</td></tr>
          <tr><td style="padding:10px 16px;color:#7A6E65;border-bottom:1px solid #E8DDD0;">Check-out</td><td style="padding:10px 16px;border-bottom:1px solid #E8DDD0;">${data.checkOut}</td></tr>
          <tr><td style="padding:10px 16px;color:#7A6E65;border-bottom:1px solid #E8DDD0;">Nights</td><td style="padding:10px 16px;border-bottom:1px solid #E8DDD0;">${data.nights}</td></tr>
          <tr><td style="padding:10px 16px;color:#7A6E65;font-weight:600;">Total</td><td style="padding:10px 16px;color:#A44A1E;font-size:18px;font-family:'Playfair Display',serif;font-weight:700;">${formattedAmount}</td></tr>
        </table>
        <p style="color:#3A3530;line-height:1.7;">
          For assistance, WhatsApp us at <strong>+91 98765 43210</strong> or reply to this email.
        </p>
        <p style="color:#7A6E65;font-size:12px;margin-top:32px;">
          Shubharambh Hotel & Banquet Hall &middot; Pithoragarh, Uttarakhand 262501
        </p>
      </div>
    `,
  });
}
