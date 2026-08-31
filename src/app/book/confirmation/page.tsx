import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Download, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your Shubharambh Hotel booking is confirmed. Your Himalayan stay begins here.",
};

export default function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: { ref?: string; room?: string; checkin?: string; checkout?: string };
}) {
  const ref = searchParams.ref ?? "BKG" + Date.now();
  const room = searchParams.room ?? "Mountain View Deluxe";
  const checkin = searchParams.checkin ?? "—";
  const checkout = searchParams.checkout ?? "—";

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest/10 mb-5">
            <CheckCircle size={40} className="text-forest" strokeWidth={1.5} />
          </div>
          <span className="eyebrow text-center block">Reservation Confirmed</span>
          <h1 className="font-playfair text-4xl text-charcoal mt-1">
            Your Himalayan<br />Stay Begins Here
          </h1>
          <div className="divider divider-center mt-4" />
          <p className="font-hind text-text-muted mt-4 leading-relaxed">
            A confirmation email with your invoice has been sent. We look forward to welcoming you to Pithoragarh.
          </p>
        </div>

        {/* Booking summary card */}
        <div className="bg-white border border-stone-light mb-6">
          <div className="bg-charcoal px-6 py-4">
            <p className="font-hind text-[10px] uppercase tracking-widest text-white/50 mb-1">
              Booking Reference
            </p>
            <p className="font-playfair text-xl text-white font-semibold">{ref}</p>
          </div>
          <div className="p-6 flex flex-col gap-3">
            {[
              { label: "Property", value: "Shubharambh Hotel & Banquet Hall" },
              { label: "Room", value: room },
              { label: "Check-in", value: checkin },
              { label: "Check-out", value: checkout },
              { label: "Status", value: "Confirmed", highlight: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between border-b border-stone-light pb-2 last:border-0 last:pb-0">
                <span className="font-hind text-sm text-text-muted">{row.label}</span>
                <span className={`font-hind text-sm font-semibold ${row.highlight ? "text-forest" : "text-charcoal"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Download size={15} />
            Download Invoice
          </button>
          <a
            href="https://wa.me/919876543210"
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

        <p className="font-hind text-xs text-text-muted text-center mt-6 leading-relaxed">
          Check-in time is 12:00 PM · Check-out time is 11:00 AM<br />
          Near Naini-Saini Airport, Pithoragarh, Uttarakhand 262501
        </p>
      </div>
    </div>
  );
}
