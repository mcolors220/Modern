import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MaterialCardProps {
  name: string;
  description: string;
  index: number;
}

export default function MaterialCard({ name, description, index }: MaterialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
  }, [index]);

  return (
    <div ref={cardRef} className="flex items-start gap-3 p-4">
      <span className="w-2 h-2 rounded-full bg-brand-orange mt-2 shrink-0" />
      <div>
        <h3 className="text-lg font-medium text-text-charcoal mb-1">{name}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
