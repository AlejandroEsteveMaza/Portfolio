"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  minInterval?: number;
  maxInterval?: number;
  maxParticles?: number;
};

type SparkleParticle = {
  id: string;
  top: number;
  left: number;
  size: number;
  color: string;
  duration: number;
};

const DEFAULT_COLORS = [
  "rgb(84, 37, 179)",
  "rgb(84, 37, 179)",
  "rgb(17, 37, 218)",
  "rgb(37, 37, 37)",
];

const randomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const toRgba = (color: string, alpha: number) => {
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const hex = color.replace("#", "");
  if (hex.length === 3 || hex.length === 6) {
    const full =
      hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  return color;
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

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export const SparklesCore = ({
  className,
  colors = DEFAULT_COLORS,
  minSize = 3,
  maxSize = 8,
  minDuration = 800,
  maxDuration = 1200,
  minInterval = 50,
  maxInterval = 500,
  maxParticles = 18,
}: SparklesProps) => {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const mounted = useMounted();
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const particlesRef = useRef<SparkleParticle[]>([]);

  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setParticles([]);

    const palette = colors.length ? colors : DEFAULT_COLORS;
    const safeMinSize = Math.max(2, minSize);
    const safeMaxSize = Math.max(safeMinSize, maxSize);
    const safeMinDuration = clamp(minDuration, 800, 1200);
    const safeMaxDuration = clamp(maxDuration, safeMinDuration, 1200);
    const safeMinInterval = clamp(minInterval, 50, 500);
    const safeMaxInterval = clamp(maxInterval, safeMinInterval, 500);
    const safeMaxParticles = Math.max(6, Math.min(32, maxParticles));

    const createParticle = () => {
      const size = randomBetween(safeMinSize, safeMaxSize);
      const duration = randomBetween(safeMinDuration, safeMaxDuration);
      return {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        top: randomBetween(5, 95),
        left: randomBetween(5, 95),
        size,
        color: palette[Math.floor(Math.random() * palette.length)],
        duration,
      };
    };

    if (prefersReducedMotion) {
      const staticCount = Math.min(
        Math.max(6, Math.round(safeMaxParticles / 2)),
        12
      );
      const staticParticles = Array.from(
        { length: staticCount },
        createParticle
      );
      setParticles(staticParticles);
      return;
    }

    let active = true;

    const scheduleTimeout = (fn: () => void, delay: number) => {
      const timeoutId = setTimeout(fn, delay);
      timeoutsRef.current.push(timeoutId);
    };

    const spawn = () => {
      if (!active) {
        return;
      }

      if (particlesRef.current.length < safeMaxParticles) {
        const particle = createParticle();
        setParticles((prev) => [...prev, particle]);
        scheduleTimeout(() => {
          setParticles((prev) => prev.filter((item) => item.id !== particle.id));
        }, particle.duration);
      }

      const nextInterval = randomBetween(safeMinInterval, safeMaxInterval);
      scheduleTimeout(spawn, nextInterval);
    };

    spawn();

    return () => {
      active = false;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [
    mounted,
    prefersReducedMotion,
    colors,
    minSize,
    maxSize,
    minDuration,
    maxDuration,
    minInterval,
    maxInterval,
    maxParticles,
  ]);

  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-reduced={prefersReducedMotion ? "true" : "false"}
      className={cn("pointer-events-none", className)}
    >
      {particles.map((particle) => {
        const shadowColor = toRgba(particle.color, 0.18);
        return (
          <span
            key={particle.id}
            className="sparkles-particle"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              color: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${shadowColor}`,
              animationDuration: `${particle.duration}ms`,
            }}
          />
        );
      })}
    </div>
  );
};
