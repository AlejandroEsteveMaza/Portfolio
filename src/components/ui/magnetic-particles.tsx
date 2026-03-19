"use client";
import React, { useEffect, useRef, useState } from "react";

type MagneticParticlesProps = {
  className?: string;
  colors?: string[];
  density?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  magnetRadius?: number;
  magnetStrength?: number;
  breathingSpeed?: number;
  breathingIntensity?: number;
};

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  drift: number;
  phase: number;
  wander: number;
  color: Rgb;
};

const DEFAULT_COLORS = ["--purple", "--blue", "--black"];

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const randomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const parseColor = (value: string): Rgb | null => {
  const rgbMatch = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return { r: Number(r), g: Number(g), b: Number(b) };
  }

  const hex = value.replace("#", "");
  if (hex.length === 3 || hex.length === 6) {
    const full =
      hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const r = Number.parseInt(full.slice(0, 2), 16);
    const g = Number.parseInt(full.slice(2, 4), 16);
    const b = Number.parseInt(full.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return { r, g, b };
    }
  }

  return null;
};

const resolveColorValue = (
  color: string,
  computedStyle: CSSStyleDeclaration
) => {
  const trimmed = color.trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("var(")) {
    const key = trimmed.slice(4, -1).trim();
    return computedStyle.getPropertyValue(key).trim();
  }

  if (trimmed.startsWith("--")) {
    return computedStyle.getPropertyValue(trimmed).trim();
  }

  return trimmed;
};

const resolvePalette = (element: HTMLElement, colors: string[]): Rgb[] => {
  const computedStyle = getComputedStyle(element);
  const resolved = colors
    .map((color) => resolveColorValue(color, computedStyle))
    .filter(Boolean)
    .map((color) => parseColor(color))
    .filter((color): color is Rgb => Boolean(color));

  if (resolved.length) {
    return resolved;
  }

  return [
    { r: 84, g: 37, b: 179 },
    { r: 17, g: 37, b: 218 },
    { r: 37, g: 37, b: 37 },
  ];
};

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
};

export const MagneticParticles = ({
  className,
  colors = DEFAULT_COLORS,
  density = 16000,
  minSize = 1.0,
  maxSize = 3.4,
  speed = 0.20,
  magnetRadius = 180,
  magnetStrength = 1.2,
  breathingSpeed = 0.28,
  breathingIntensity = 0.006,
}: MagneticParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const rectRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let palette = resolvePalette(canvas, colors);

    const createParticles = () => {
      const { width, height } = sizeRef.current;
      if (width <= 0 || height <= 0) {
        particlesRef.current = [];
        return;
      }

      const count = clamp(
        Math.round((width * height) / density),
        36,
        140
      );

      particlesRef.current = Array.from({ length: count }, () => {
        const radius = randomBetween(minSize, maxSize);
        const angle = Math.random() * Math.PI * 2;
        const velocity = randomBetween(speed * 0.35, speed);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          radius,
          alpha: randomBetween(0.12, 0.32),
          drift: randomBetween(2, 10),
          phase: Math.random() * Math.PI * 2,
          wander: randomBetween(0.6, 1.2),
          color: palette[Math.floor(Math.random() * palette.length)],
        };
      });
    };

    const updateRect = () => {
      const rect = canvas.getBoundingClientRect();
      rectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
      pointerRef.current.active = false;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      rectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (
        width === sizeRef.current.width &&
        height === sizeRef.current.height &&
        dpr === sizeRef.current.dpr
      ) {
        return;
      }

      sizeRef.current = { width, height, dpr };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      palette = resolvePalette(canvas, colors);
      createParticles();
      drawStatic();
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = rectRef.current;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isActive = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointerRef.current = {
        x,
        y,
        active: isActive,
      };
    };

    const draw = (time: number, animate: boolean) => {
      const { width, height } = sizeRef.current;
      if (width <= 0 || height <= 0) {
        return;
      }

      const t = time * 0.001;
      const centerX = width / 2;
      const centerY = height / 2;
      const breathe = Math.sin(t * breathingSpeed) * breathingIntensity;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        if (animate) {
          const wanderForce = particle.wander * 0.03;
          particle.vx += Math.cos(t * 0.35 + particle.phase) * wanderForce;
          particle.vy += Math.sin(t * 0.35 + particle.phase) * wanderForce;

          if (pointerRef.current.active) {
            const dx = pointerRef.current.x - particle.x;
            const dy = pointerRef.current.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            if (distance < magnetRadius) {
              const force =
                ((magnetRadius - distance) / magnetRadius) * magnetStrength;
              particle.vx += (dx / distance) * force * 0.18;
              particle.vy += (dy / distance) * force * 0.18;
            }
          }

          particle.vx *= 0.96;
          particle.vy *= 0.96;

          const maxSpeed = speed;
          const magnitude = Math.hypot(particle.vx, particle.vy);
          if (magnitude > maxSpeed) {
            particle.vx = (particle.vx / magnitude) * maxSpeed;
            particle.vy = (particle.vy / magnitude) * maxSpeed;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          const margin = 40;
          if (particle.x < -margin) {
            particle.x = width + margin;
          } else if (particle.x > width + margin) {
            particle.x = -margin;
          }

          if (particle.y < -margin) {
            particle.y = height + margin;
          } else if (particle.y > height + margin) {
            particle.y = -margin;
          }
        }

        const driftX =
          Math.sin(t * particle.wander + particle.phase) * particle.drift;
        const driftY =
          Math.cos(t * particle.wander + particle.phase) * particle.drift;
        const breathX = (particle.x - centerX) * breathe;
        const breathY = (particle.y - centerY) * breathe;

        const drawX = particle.x + driftX + breathX;
        const drawY = particle.y + driftY + breathY;

        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = (time: number) => {
      draw(time, true);
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const drawStatic = () => {
      draw(0, false);
    };

    resize();

    const supportsResizeObserver = typeof ResizeObserver !== "undefined";
    let resizeObserver: ResizeObserver | null = null;

    if (supportsResizeObserver) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", updatePointer);
    }
    window.addEventListener("scroll", updateRect, { passive: true });

    if (!prefersReducedMotion) {
      animationRef.current = window.requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }

      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateRect);
    };
  }, [
    colors,
    density,
    minSize,
    maxSize,
    speed,
    magnetRadius,
    magnetStrength,
    breathingSpeed,
    breathingIntensity,
    prefersReducedMotion,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className={className}
    />
  );
};
