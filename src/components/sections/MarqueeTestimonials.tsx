import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { marqueeItems, testimonials } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    gsap.from(el, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
  }, []);

  // Double the items for seamless loop
  const allItems = [...marqueeItems, ...marqueeItems];

  return (
    <div
      ref={marqueeRef}
      className="relative h-20 overflow-hidden border-y border-black/[0.06] bg-surface-offwhite"
    >
      {/* Edge gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-offwhite to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-offwhite to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee items-center h-full whitespace-nowrap">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-6 mx-6">
            <span className="text-text-muted text-lg md:text-xl font-medium hover:text-brand-orange transition-colors cursor-default">
              {item}
            </span>
            <span className="text-brand-orange text-xs">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeTestimonials() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section className="bg-surface-offwhite pt-20 pb-24">
      {/* Marquee */}
      <Marquee />

      {/* Testimonials */}
      <div className="max-w-[1160px] mx-auto px-[6vw] mt-20">
        <div ref={headerRef} className="text-center mb-12">
          <SectionLabel text="CLIENT STORIES" centered />
          <h2 className="text-black font-medium mt-4" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
            Trusted by Businesses Across the UAE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              company={t.company}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
