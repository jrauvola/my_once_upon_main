"use client";

import { useEffect, useState, memo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Sparkle, Star, Circle } from "@phosphor-icons/react";

const FloatingElement = memo(function FloatingElement({
  icon: Icon,
  size,
  color,
  top,
  left,
  parallaxFactor,
  mouseXSpring,
  mouseYSpring,
  delay,
  duration,
}: {
  icon: any;
  size: number;
  color: string;
  top: string;
  left: string;
  parallaxFactor: number;
  mouseXSpring: any;
  mouseYSpring: any;
  delay: number;
  duration: number;
}) {
  const x = useTransform(mouseXSpring, [-1, 1], [-parallaxFactor, parallaxFactor]);
  const y = useTransform(mouseYSpring, [-1, 1], [-parallaxFactor, parallaxFactor]);

  return (
    <motion.div
      className={`absolute pointer-events-none ${color} z-0`}
      style={{ top, left, x, y }}
      animate={{
        y: ["0%", "-15%", "0%"],
        opacity: [0.45, 0.85, 0.45],
        rotate: [0, 60, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon weight="fill" style={{ width: size, height: size }} />
    </motion.div>
  );
});

// Each trail particle follows the cursor with progressively laggier spring physics
const TrailParticle = memo(function TrailParticle({
  rawMouseX,
  rawMouseY,
  size,
  opacity,
  color,
  springConfig,
  offset,
}: {
  rawMouseX: any;
  rawMouseY: any;
  size: number;
  opacity: number;
  color: string;
  springConfig: { damping: number; stiffness: number; mass: number };
  offset: number;
}) {
  const sx = useSpring(rawMouseX, springConfig);
  const sy = useSpring(rawMouseY, springConfig);
  const tx = useTransform(sx as any, (v: number) => v - size / 2 + offset);
  const ty = useTransform(sy as any, (v: number) => v - size / 2 + offset);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        x: tx,
        y: ty,
        opacity,
        background: color,
        boxShadow: `0 0 ${size * 1.5}px ${color}`,
      }}
    />
  );
});

// Click ripple spawned at click coordinates
function ClickRipple({ x, y, id }: { x: number; y: number; id: number }) {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none rounded-full"
      style={{
        top: y - 4,
        left: x - 4,
        width: 8,
        height: 8,
        border: "2px solid rgba(56, 189, 248, 0.5)",
      }}
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 12, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

const MagicCursor = memo(function MagicCursor({
  rawMouseX,
  rawMouseY,
}: {
  rawMouseX: any;
  rawMouseY: any;
}) {
  // Glow spotlight — soft spring, centered on cursor
  const glowSpring = { damping: 35, stiffness: 120, mass: 1 };
  const glowSx = useSpring(rawMouseX, glowSpring);
  const glowSy = useSpring(rawMouseY, glowSpring);
  const glowTx = useTransform(glowSx as any, (v: number) => v - 160);
  const glowTy = useTransform(glowSy as any, (v: number) => v - 160);

  // Inner ring — tighter spring for a snappy "Liquid Glass" core
  const coreSpring = { damping: 25, stiffness: 200, mass: 0.8 };
  const coreSx = useSpring(rawMouseX, coreSpring);
  const coreSy = useSpring(rawMouseY, coreSpring);
  const coreTx = useTransform(coreSx as any, (v: number) => v - 16);
  const coreTy = useTransform(coreSy as any, (v: number) => v - 16);

  // Trail particles — each with progressively laggier physics
  const trail = [
    { size: 10, opacity: 0.5, color: "rgba(56, 189, 248, 0.6)", spring: { damping: 18, stiffness: 100, mass: 1.2 }, offset: 0 },
    { size: 8,  opacity: 0.4, color: "rgba(129, 204, 252, 0.5)", spring: { damping: 16, stiffness: 80, mass: 1.6 },  offset: 2 },
    { size: 7,  opacity: 0.35, color: "rgba(190, 148, 255, 0.45)", spring: { damping: 14, stiffness: 65, mass: 2.0 },  offset: -2 },
    { size: 6,  opacity: 0.3, color: "rgba(244, 114, 182, 0.4)", spring: { damping: 12, stiffness: 50, mass: 2.5 },  offset: 3 },
    { size: 5,  opacity: 0.25, color: "rgba(244, 114, 182, 0.35)", spring: { damping: 10, stiffness: 40, mass: 3.0 },  offset: -3 },
    { size: 4,  opacity: 0.2, color: "rgba(253, 186, 116, 0.3)", spring: { damping: 8, stiffness: 30, mass: 3.5 },   offset: 1 },
  ];

  // Click ripples managed via state (only for spawn events, not continuous animation)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev.slice(-4), { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 800);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* Soft ambient glow */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          x: glowTx,
          y: glowTy,
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.10) 0%, rgba(244, 114, 182, 0.04) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* "Liquid Glass" core ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none"
        style={{
          x: coreTx,
          y: coreTy,
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(56, 189, 248, 0.15)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Fairy-dust trail particles */}
      {trail.map((p, i) => (
        <TrailParticle
          key={`trail-${i}`}
          rawMouseX={rawMouseX}
          rawMouseY={rawMouseY}
          size={p.size}
          opacity={p.opacity}
          color={p.color}
          springConfig={p.spring}
          offset={p.offset}
        />
      ))}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <ClickRipple key={r.id} x={r.x} y={r.y} id={r.id} />
        ))}
      </AnimatePresence>
    </>
  );
});

const SPARKLES = [
  { icon: Sparkle, size: 20, color: "text-sky-300/50", top: "12%", left: "8%", parallaxFactor: 25, delay: 0, duration: 5 },
  { icon: Star, size: 14, color: "text-pink-300/50", top: "22%", left: "88%", parallaxFactor: 40, delay: 1.2, duration: 6 },
  { icon: Circle, size: 6, color: "text-sky-200/55", top: "8%", left: "65%", parallaxFactor: 15, delay: 0.5, duration: 4 },
  { icon: Sparkle, size: 16, color: "text-pink-300/45", top: "48%", left: "4%", parallaxFactor: 30, delay: 2, duration: 5.5 },
  { icon: Star, size: 24, color: "text-sky-300/40", top: "58%", left: "92%", parallaxFactor: 50, delay: 0.8, duration: 7 },
  { icon: Sparkle, size: 22, color: "text-sky-300/45", top: "78%", left: "12%", parallaxFactor: 35, delay: 0.3, duration: 5.5 },
  { icon: Star, size: 16, color: "text-pink-300/40", top: "88%", left: "82%", parallaxFactor: 28, delay: 1.8, duration: 5 },
  { icon: Sparkle, size: 10, color: "text-pink-300/40", top: "38%", left: "18%", parallaxFactor: 18, delay: 1.1, duration: 5.2 },
  { icon: Star, size: 12, color: "text-sky-300/40", top: "68%", left: "10%", parallaxFactor: 22, delay: 2.2, duration: 6 },
  { icon: Sparkle, size: 14, color: "text-sky-200/45", top: "5%", left: "42%", parallaxFactor: 20, delay: 0.2, duration: 5.5 },
  { icon: Star, size: 10, color: "text-pink-300/45", top: "18%", left: "55%", parallaxFactor: 18, delay: 1.5, duration: 4.5 },
  { icon: Sparkle, size: 18, color: "text-sky-300/45", top: "35%", left: "78%", parallaxFactor: 32, delay: 0.7, duration: 6 },
  { icon: Star, size: 8, color: "text-pink-200/50", top: "52%", left: "28%", parallaxFactor: 14, delay: 2, duration: 4 },
  { icon: Sparkle, size: 12, color: "text-sky-300/50", top: "72%", left: "45%", parallaxFactor: 24, delay: 0.4, duration: 5.8 },
  { icon: Star, size: 16, color: "text-pink-300/45", top: "42%", left: "92%", parallaxFactor: 28, delay: 1, duration: 6.2 },
  { icon: Sparkle, size: 8, color: "text-sky-200/50", top: "85%", left: "35%", parallaxFactor: 12, delay: 1.8, duration: 4.2 },
  { icon: Star, size: 14, color: "text-pink-200/45", top: "28%", left: "22%", parallaxFactor: 26, delay: 0.9, duration: 5.5 },
];

export const InteractiveBackground = memo(function InteractiveBackground() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 2 });
  const mouseYSpring = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 2 });

  useEffect(() => {
    setMounted(true);

    rawMouseX.set(window.innerWidth / 2);
    rawMouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rawMouseX, rawMouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {SPARKLES.map((el, i) => (
        <FloatingElement
          key={`sparkle-${i}`}
          icon={el.icon}
          size={el.size}
          color={el.color}
          top={el.top}
          left={el.left}
          parallaxFactor={el.parallaxFactor}
          mouseXSpring={mouseXSpring}
          mouseYSpring={mouseYSpring}
          delay={el.delay}
          duration={el.duration}
        />
      ))}

      <MagicCursor rawMouseX={rawMouseX} rawMouseY={rawMouseY} />
    </div>
  );
});
