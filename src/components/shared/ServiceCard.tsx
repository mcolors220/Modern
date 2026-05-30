import { useRef, useEffect } from "react";
import { Check, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  index: number;
}

export default function ServiceCard({ title, description, features, icon, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
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
      className="group bg-surface-offwhite border border-black/[0.06] rounded-md p-12 pb-10 transition-all duration-300 hover:border-[#F39C12]/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
    >
      <div className="w-12 h-12 text-brand-orange mb-6">{icon}</div>
      <h3 className="text-xl font-medium text-text-charcoal mb-3">{title}</h3>
      <p className="text-text-muted text-base leading-relaxed mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-charcoal">
            <Check className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#services"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline transition-all"
      >
        Learn More <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  );
}
