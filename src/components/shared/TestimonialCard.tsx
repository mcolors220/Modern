import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  index: number;
}

export default function TestimonialCard({ quote, name, role, company, index }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: index * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white border border-black/[0.06] rounded-md p-10 max-w-[360px]"
    >
      <span className="text-brand-orange text-[32px] leading-none font-serif">&ldquo;</span>
      <p className="text-text-charcoal italic leading-relaxed mb-6 -mt-2">{quote}</p>
      <h4 className="text-lg font-medium text-text-charcoal">{name}</h4>
      <p className="text-sm text-text-muted">{role}</p>
      <p className="text-xs font-mono text-brand-orange tracking-wider mt-1">{company}</p>
    </div>
  );
}
