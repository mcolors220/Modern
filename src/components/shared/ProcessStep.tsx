import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

export default function ProcessStep({ number, title, description, index, isLast }: ProcessStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, [index]);

  return (
    <div ref={stepRef} className="relative flex flex-col items-center text-center max-w-[220px]">
      <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center mb-4">
        <span className="text-xs font-medium text-white tracking-wider">{number}</span>
      </div>
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-[calc(50%+30px)] w-[calc(100%-30px)] h-[2px] bg-white/30" />
      )}
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-white/80 leading-relaxed">{description}</p>
    </div>
  );
}
