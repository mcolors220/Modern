import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionLabel from "@/components/shared/SectionLabel";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
  }, []);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-section="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-surface-offwhite flex items-center overflow-hidden"
    >
      {/* Subtle noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Logo watermark */}
      <div className="absolute right-[10vw] top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.04]">
        <svg width="300" height="300" viewBox="0 0 100 100">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#F39C12" strokeWidth="2" />
          <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill="none" stroke="#5D6D7E" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-[6vw] w-full py-24">
        <div className="max-w-[600px]">
          <div ref={labelRef} className="opacity-0">
            <SectionLabel text="DIGITAL PRINTING EXCELLENCE" />
          </div>

          <h1 className="mt-4 mb-6">
            <div ref={line1Ref} className="opacity-0 translate-y-8 text-text-charcoal font-medium leading-[1.1]" style={{ fontSize: "clamp(36px, 5.5vw, 90px)", letterSpacing: "-0.02em" }}>
              Where Precision
            </div>
            <div ref={line2Ref} className="opacity-0 translate-y-8 font-medium leading-[1.1]" style={{ fontSize: "clamp(36px, 5.5vw, 90px)", letterSpacing: "-0.02em" }}>
              <span className="text-text-charcoal">Meets </span>
              <span className="text-brand-orange">Color</span>
            </div>
          </h1>

          <p
            ref={subtitleRef}
            className="opacity-0 translate-y-5 text-text-muted text-base md:text-lg leading-relaxed max-w-[480px] mb-8"
          >
            MODERN COLORS delivers premium sticker, banner, and UV printing services with cutting-edge technology and unmatched quality.
          </p>

          <div ref={ctaRef} className="opacity-0 translate-y-5 flex flex-wrap gap-4">
            <button
              onClick={scrollToServices}
              className="bg-brand-orange text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-brand-orange-dark hover:scale-[1.03] transition-all duration-200"
            >
              Explore Services
            </button>
            <button
              onClick={scrollToPortfolio}
              className="border border-brand-orange text-brand-orange px-8 py-4 rounded-md text-sm font-medium hover:bg-brand-orange hover:text-white transition-all duration-200"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
