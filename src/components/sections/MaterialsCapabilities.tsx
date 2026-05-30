import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import MaterialCard from "@/components/shared/MaterialCard";
import StatItem from "@/components/shared/StatItem";
import { materials, stats } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

// Simplex noise implementation for the grid
class SimplexNoise {
  private grad3: number[][];
  private p: number[];
  private perm: number[];

  constructor() {
    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) this.p[i] = Math.floor(Math.random() * 256);
    this.perm = [];
    for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
  }

  private dot(g: number[], x: number, y: number, z: number) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  noise(xin: number, yin: number, zin: number): number {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const X0 = i - t, Y0 = j - t, Z0 = k - t;
    const x0 = xin - X0, y0 = yin - Y0, z0 = zin - Z0;
    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0); }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1); }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2); }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) { t3 *= t3; n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3); }
    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

export default function MaterialsCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseLerpedRef = useRef({ x: 0.5, y: 0.5 });
  const headerRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef(new SimplexNoise());

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    const cols = 60;
    const rows = 25;
    const noise = noiseRef.current;
    let time = 0;
    let animId: number;

    const draw = () => {
      time += 0.008;
      const w = canvas.width;
      const h = canvas.height;
      const cellW = w / cols;

      // Lerp mouse
      mouseLerpedRef.current.x += (mouseRef.current.x - mouseLerpedRef.current.x) * 0.1;
      mouseLerpedRef.current.y += (mouseRef.current.y - mouseLerpedRef.current.y) * 0.1;

      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;

          const angle = noise.noise(x / 8 + 1, y / 8 + 1, time) * Math.PI * 2;
          const waveX = Math.sin(angle) * 2;
          const waveY = Math.cos(angle) * 2;

          // Mouse repulsion
          const dx = nx - mouseLerpedRef.current.x;
          const dy = ny - mouseLerpedRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseRadius = 0.15;
          let mx = 0, my = 0;
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 8;
            mx = (dx / dist) * force;
            my = (dy / dist) * force;
          }

          const size = (Math.sin(waveX) + 1.2) * cellW * 0.35;
          const cx = nx * w + waveX * 2 + mx * w * 0.05;
          const cy = ny * h + waveY * 2 + my * h * 0.05;

          const alpha = 0.15 + (Math.sin(waveX) * 0.1);
          ctx.fillStyle = `rgba(243, 156, 18, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(cx - size / 2, cy - size / 2, size, size, size * 0.2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Header entrance
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
    <section
      id="about"
      data-section="about"
      ref={sectionRef}
      className="relative bg-surface-light overflow-hidden"
    >
      {/* Animated Noise Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Content Overlay */}
      <div className="relative z-10 section-padding">
        <div className="max-w-[1160px] mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center max-w-[800px] mx-auto mb-14">
            <SectionLabel text="MATERIALS & CAPABILITIES" centered />
            <h2 className="text-black font-medium mt-4 mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 54px)", letterSpacing: "-0.02em" }}>
              Endless Possibilities
            </h2>
            <p className="text-text-muted">
              We work with an extensive range of materials and substrates. From flexible vinyl to rigid acrylic, our advanced equipment handles it all with precision.
            </p>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {materials.map((material, i) => (
              <MaterialCard
                key={material.id}
                name={material.name}
                description={material.description}
                index={i}
              />
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-0 py-8 border-t border-black/[0.06]">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center">
                <StatItem
                  value={stat.value}
                  label={stat.label}
                  index={i}
                />
                {/* eslint-disable-next-line */}
                {i < stats.length - 1 && (
                  <div className="hidden md:block w-px h-12 bg-black/[0.06] mx-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
