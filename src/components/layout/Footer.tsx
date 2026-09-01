import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  explore: [
    { href: "/rooms", label: "Rooms & Stay" },
    { href: "/experiences", label: "Experiences & Tours" },
    { href: "/events", label: "Events & Banquet" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  destinations: [
    { href: "/experiences#adi-kailash", label: "Adi Kailash Yatra" },
    { href: "/experiences#mansarovar", label: "Kailash Mansarovar" },
    { href: "/experiences#patal-bhuvaneshwar", label: "Patal Bhuvaneshwar" },
    { href: "/experiences#munsyari", label: "Munsyari" },
    { href: "/experiences#panchachuli", label: "Panchachuli Trek" },
    { href: "/experiences#milam", label: "Milam Glacier" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-stone">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-playfair text-2xl text-white mb-1">Shubharambh</h2>
            <p className="font-hind text-[10px] tracking-[0.18em] uppercase text-stone mb-5">
              Hotel & Banquet Hall · Pithoragarh
            </p>
            <p className="font-hind text-sm text-charcoal-light leading-relaxed mb-6">
              A sanctuary of Himalayan warmth and spiritual grace — your gateway to the sacred Kumaon, where every journey begins with an auspicious start.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-charcoal-light leading-relaxed">
                  Near Royal Cinema, Airport Line,
                  Village – Makholigaon,
                  Pithoragarh, Uttarakhand – 262501
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold shrink-0" />
                <span className="text-sm text-charcoal-light">9897580016</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-gold shrink-0" />
                <span className="text-sm text-charcoal-light">shubharambh.banquet2026@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-playfair text-base text-white mb-5">Explore</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-light hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-playfair text-base text-white mb-5">Destinations</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-light hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-playfair text-base text-white mb-5">Travel Updates</h4>
            <p className="text-sm text-charcoal-light leading-relaxed mb-4">
              Seasonal offers, pilgrimage news, and Himalayan travel guides in your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="stay@shubharambhpithoragarh.com"
                className="flex-1 bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-charcoal-light outline-none focus:border-gold transition-colors"
              />
              <button className="bg-saffron px-4 py-2.5 text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-saffron-light transition-colors">
                Go
              </button>
            </div>
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-stone mb-3">Follow Along</p>
              <div className="flex gap-3">
                {[
                  { name: "Facebook", href: "https://www.facebook.com/61586732260917/" },
                  { name: "Instagram", href: "https://www.instagram.com/shubharambhhall.in" },
                  { name: "YouTube", href: "https://youtube.com/@shubharambhhotels" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-charcoal-light hover:text-gold transition-colors border border-white/10 px-3 py-1.5 hover:border-gold/40"
                  >
                    {s.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-charcoal-light">
            &copy; {new Date().getFullYear()} Shubharambh Hotel & Banquet Hall, Pithoragarh. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cancellation Policy"].map((item) => (
              <Link key={item} href="#" className="text-[12px] text-charcoal-light hover:text-gold transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
