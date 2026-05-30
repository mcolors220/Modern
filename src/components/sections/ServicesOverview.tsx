import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

// SVG Icons for services
const StickerIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4L8 14v20l16 10 16-10V14L24 4z" />
    <path d="M24 4v20" />
    <path d="M24 24L8 14" />
    <path d="M24 24l16-10" />
    <path d="M16 28l8 5 8-5" />
    <path d="M32 18L28 15" strokeDasharray="2 2" />
  </svg>
);

const BannerIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 8h32v28c0 2-2 4-4 4H12c-2 0-4-2-4-4V8z" />
    <path d="M8 16h32" />
    <path d="M18 40l6-6 6 6" />
    <path d="M16 24c2-2 4-1 6 0s4 2 6 0" />
  </svg>
);

const UVIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 8l14 8v16l-14 8-14-8V16l14-8z" />
    <path d="M24 16v16" />
    <path d="M16 20l8-4 8 4" />
    <line x1="8" y1="8" x2="12" y2="4" />
    <line x1="40" y1="8" x2="36" y2="4" />
    <line x1="24" y1="2" x2="24" y2="6" />
    <line x1="4" y1="24" x2="8" y2="24" />
    <line x1="40" y1="24" x2="44" y2="24" />
  </svg>
);

const serviceIcons = [<StickerIcon key="s" />, <BannerIcon key="b" />, <UVIcon key="u" />];

export default function ServicesOverview() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section id="services" data-section="services" className="bg-white section-padding">
      <div className="max-w-[1160px] mx-auto">
        <div ref={headerRef} className="text-center mb-14">
          <SectionLabel text="OUR SERVICES" centered />
          <h2 className="text-black font-medium mt-4" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
            Three Pillars of Printing Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={serviceIcons[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
