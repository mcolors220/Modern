import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import { carouselItems } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function BrandShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const rotationRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  const itemCount = carouselItems.length;
  const angleStep = 360 / itemCount;

  // Entrance animation
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

  // Auto-rotation
  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.15;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered) {
        rotationRef.current += speed * delta * 0.06;
        setRotation(rotationRef.current);

        // Update active dot based on rotation
        const normalizedRotation = ((rotationRef.current % 360) + 360) % 360;
        const activeIndex = Math.floor(normalizedRotation / angleStep) % 4;
        setActiveDot(activeIndex);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isHovered, angleStep]);

  const handleDotClick = useCallback((dotIndex: number) => {
    const targetRotation = dotIndex * angleStep * 3.25;
    rotationRef.current = targetRotation;
    setRotation(targetRotation);
    setActiveDot(dotIndex);
  }, [angleStep]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface-light pt-32 pb-24 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16 px-[6vw]">
        <SectionLabel text="WHAT WE DO" centered />
        <h2 className="text-black font-medium mt-4 mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
          Crafting Visual Impact
        </h2>
        <div className="w-[60px] h-[2px] bg-brand-orange mx-auto mb-4" />
        <p className="text-text-muted max-w-[500px] mx-auto">
          Explore our range of premium printing services and materials.
        </p>
      </div>

      {/* 3D Carousel */}
      <div
        ref={carouselRef}
        className="relative h-[450px] md:h-[500px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isHovered ? "transform 0.5s ease-out" : "none",
          }}
        >
          {carouselItems.map((item, i) => {
            const angle = i * angleStep;
            const isActive = Math.abs(((rotation % 360) - angle + 360) % 360) < angleStep / 2
              || Math.abs(((rotation % 360) - angle + 360) % 360 - 360) < angleStep / 2;

            return (
              <div
                key={item.id}
                className="absolute left-1/2 top-1/2 w-[200px] md:w-[260px] transition-all duration-500"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(380px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
                    isActive ? "scale-110 shadow-2xl ring-2 ring-brand-orange" : "scale-100 opacity-70"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-[280px] md:h-[340px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm md:text-base font-medium">{item.label}</h3>
                    <p className="text-white/70 text-xs mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-3 mt-10">
        {[0, 1, 2, 3].map((dot) => (
          <button
            key={dot}
            onClick={() => handleDotClick(dot)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeDot === dot
                ? "bg-brand-orange scale-110"
                : "bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Carousel group ${dot + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
