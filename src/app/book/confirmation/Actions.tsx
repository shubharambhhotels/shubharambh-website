"use client";

import { Download, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ConfirmationActions({
  bookingRef,
  room,
  checkin,
  checkout,
}: {
  bookingRef: string;
  room: string;
  checkin: string;
  checkout: string;
}) {
  const handleDownload = () => {
    const content = `
SHUBHARAMBH HOTEL & BANQUET HALL
Near Naini-Saini Airport, Pithoragarh, Uttarakhand - 262501
Phone: +91 9897580016
Email: shubharambh.banquet2026@gmail.com
${"─".repeat(50)}

BOOKING CONFIRMATION

Booking Reference : ${bookingRef}
Room              : ${room}
Check-in          : ${checkin}
Check-out         : ${checkout}
Status            : Confirmed

${"─".repeat(50)}
Check-in time: 1:00 PM | Check-out time: 11:00 AM

Thank you for choosing Shubharambh Hotel.
We look forward to welcoming you to Pithoragarh.
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Booking-${bookingRef}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleDownload}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        <Download size={15} />
        Download Invoice
      </button>
          
        <a href="https://wa.me/919897580016"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 font-hind font-semibold text-sm tracking-wide hover:bg-[#1da851] transition-colors w-full"
      >
        <MessageCircle size={16} />
        WhatsApp Us for Assistance
      </a>
      <Link href="/" className="btn-secondary w-full text-center block">
        Return to Home
      </Link>
    </div>
  );
}