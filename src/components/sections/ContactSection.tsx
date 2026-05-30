import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";
import SectionLabel from "@/components/shared/SectionLabel";
import SocialIconButton from "@/components/shared/SocialIconButton";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    gsap.from(leftRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(rightRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rightRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", serviceType: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      data-section="contact"
      className="bg-surface-light section-padding"
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left - Form */}
          <div ref={leftRef}>
            <SectionLabel text="GET IN TOUCH" />
            <h2 className="text-black font-medium mt-4 mb-8" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
              Let&apos;s Start a Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3.5 border border-black/[0.06] rounded-md bg-white text-text-charcoal placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all"
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 border border-black/[0.06] rounded-md bg-white text-text-charcoal placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all"
              />
              <input
                type="tel"
                placeholder="+971 XX XXX XXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3.5 border border-black/[0.06] rounded-md bg-white text-text-charcoal placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all"
              />
              <select
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                className="w-full px-4 py-3.5 border border-black/[0.06] rounded-md bg-white text-text-charcoal focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all appearance-none"
              >
                <option value="">Select a service type</option>
                <option value="sticker">Sticker Printing</option>
                <option value="banner">Banner Printing</option>
                <option value="uv">UV Printing</option>
                <option value="materials">Materials Only</option>
                <option value="custom">Custom Project</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3.5 border border-black/[0.06] rounded-md bg-white text-text-charcoal placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-brand-orange text-white py-4 rounded-md text-sm font-medium hover:bg-brand-orange-dark hover:scale-[1.01] transition-all duration-200 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <p className="text-green-600 text-sm">Thank you! We&apos;ll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm">Please fill in all required fields correctly.</p>
              )}
            </form>
          </div>

          {/* Right - Contact Info */}
          <div ref={rightRef} className="lg:pt-20">
            <h3 className="text-brand-orange text-xl font-medium mb-6">MODERN COLORS</h3>
            <div className="space-y-2 mb-8 text-text-charcoal">
              <p>Al Quoz Industrial Area 3</p>
              <p>Dubai, United Arab Emirates</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-text-charcoal">
                <Phone size={16} className="text-brand-orange" />
                <span>+971 4 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-text-charcoal">
                <Mail size={16} className="text-brand-orange" />
                <span>info@moderncolors.ae</span>
              </div>
              <div className="flex items-center gap-3 text-text-charcoal">
                <MessageCircle size={16} className="text-brand-orange" />
                <span>+971 50 XXX XXXX</span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-text-muted">Saturday — Thursday: 8:00 AM - 6:00 PM</p>
              <p className="text-sm text-text-muted">Friday: Closed</p>
            </div>

            <div className="flex gap-3">
              <SocialIconButton icon={Instagram} href="#" />
              <SocialIconButton icon={Facebook} href="#" />
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-200"
              >
                <WhatsAppIcon />
              </a>
              <SocialIconButton icon={Linkedin} href="#" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
