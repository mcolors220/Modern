import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import { projects } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header entrance
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

    // Horizontal scroll
    const track = trackRef.current;
    if (!track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth + 200;

    gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Parallax on each image
    const images = track.querySelectorAll(".project-image");
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { x: 40 },
        {
          x: -40,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "left right",
            end: "right left",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="portfolio"
      data-section="portfolio"
      ref={sectionRef}
      className="bg-surface-light overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="pt-24 px-[6vw] mb-12">
        <SectionLabel text="FEATURED PROJECTS" />
        <h2 className="text-black font-medium mt-4 mb-3" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
          Work That Speaks
        </h2>
        <p className="text-text-muted max-w-[500px]">
          A selection of our finest printing projects across stickers, banners, and UV printing.
        </p>
      </div>

      {/* Horizontal Gallery Track */}
      <div ref={trackRef} className="flex gap-10 pl-[6vw] pr-[20vw] pb-24">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[320px] md:w-[400px] group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/5] mb-5">
              <img
                src={project.image}
                alt={project.name}
                className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-medium text-text-charcoal mb-1">{project.name}</h3>
            <p className="text-xs font-mono text-brand-orange tracking-wider mb-2">{project.category}</p>
            <p className="text-sm text-text-muted line-clamp-2">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
