import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: string;
  label: string;
  index: number;
}

export default function StatItem({ value, label, index }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const numericMatch = value.match(/^(\d+)/);
  const hasPlus = value.includes("+");
  const hasUnit = value.replace(/\d+/, "").replace(/\+$/, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (numericMatch) {
      const target = parseInt(numericMatch[1], 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        delay: index * 0.2,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(Math.round(obj.val).toString());
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    } else {
      setDisplayValue(value);
    }
  }, [index, numericMatch, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6">
      <span className="text-3xl md:text-4xl font-medium text-brand-orange">
        {displayValue}{hasPlus ? "+" : ""}{hasUnit}
      </span>
      <span className="text-sm text-text-muted mt-1">{label}</span>
    </div>
  );
}
