import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProcessStep from "@/components/shared/ProcessStep";
import { processSteps } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(stepsRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: stepsRef.current,
        start: "top 80%",
        once: true,
      },
    });

    gsap.from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="bg-brand-orange section-padding">
      <div className="max-w-[1160px] mx-auto">
        {/* Process Steps */}
        <div
          ref={stepsRef}
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6 mb-16"
        >
          {processSteps.map((step, i) => (
            <ProcessStep
              key={step.id}
              number={step.number}
              title={step.title}
              description={step.description}
              index={i}
              isLast={i === processSteps.length - 1}
            />
          ))}
        </div>

        {/* CTA Block */}
        <div ref={ctaRef} className="text-center">
          <h2 className="text-white font-medium mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-white/85 max-w-[520px] mx-auto mb-8">
            Get a free quote today. Our team is standing by to help you create something extraordinary.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-white text-brand-orange px-12 py-4 rounded-md text-sm font-medium hover:bg-surface-light hover:scale-[1.03] transition-all duration-200"
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}
