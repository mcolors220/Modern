import { ArrowUp, Instagram, Facebook, Linkedin } from "lucide-react";

const footerServices = [
  "Sticker Printing",
  "Banner Printing",
  "UV Printing",
  "Materials",
  "Custom Orders",
];

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// WhatsApp icon component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-gray text-white">
      <div className="max-w-[1160px] mx-auto px-[6vw] pt-20 pb-10">
        {/* Top Row - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              <span className="text-brand-orange font-semibold text-xl">MODERN</span>
              <span className="text-white font-semibold text-xl">COLORS</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Premium digital printing services in Dubai. Specializing in stickers, banners, and UV printing with cutting-edge technology.
            </p>
            <p className="text-white/50 text-xs tracking-wider">ADVERTISING — PRINTING</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wider">SERVICES</h4>
            <ul className="space-y-2.5">
              {footerServices.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/70 text-sm hover:text-brand-orange transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wider">QUICK LINKS</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/70 text-sm hover:text-brand-orange transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wider">CONTACT</h4>
            <div className="space-y-2.5 text-sm text-white/70">
              <p>+971 4 XXX XXXX</p>
              <p>info@moderncolors.ae</p>
              <p>Al Quoz Industrial Area 3<br />Dubai, UAE</p>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <WhatsAppIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/15 mb-6" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} MODERN COLORS. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
