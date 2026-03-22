"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpenText, Sparkle, Star } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";
import { memo, useEffect } from "react";
import { withBasePath } from "../lib/withBasePath";

const FloatingStars = memo(function FloatingStars() {
  const stars = [
    { top: "12%", left: "10%", size: 16, delay: 0, color: "text-sky-300/60" },
    { top: "25%", left: "80%", size: 12, delay: 0.4, color: "text-pink-300/60" },
    { top: "60%", left: "15%", size: 10, delay: 0.8, color: "text-sky-200/60" },
    { top: "75%", left: "70%", size: 14, delay: 1.2, color: "text-pink-300/55" },
    { top: "40%", left: "50%", size: 8, delay: 1.6, color: "text-sky-300/55" },
    { top: "8%", left: "72%", size: 11, delay: 0.3, color: "text-sky-300/55" },
    { top: "52%", left: "88%", size: 9, delay: 1, color: "text-pink-300/50" },
    { top: "82%", left: "22%", size: 13, delay: 0.6, color: "text-sky-200/55" },
    { top: "32%", left: "38%", size: 7, delay: 1.4, color: "text-pink-300/50" },
    { top: "18%", left: "45%", size: 10, delay: 0.2, color: "text-sky-300/55" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.45, 0.85, 0.45],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
          className={`absolute ${s.color}`}
          style={{ top: s.top, left: s.left }}
        >
          <Sparkle weight="fill" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </div>
  );
});

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  // Animated number logic
  const targetNumber = 1247803;
  const animatedValue = useSpring(1240000, {
    stiffness: 40,
    damping: 15,
    mass: 1,
  });

  useEffect(() => {
    animatedValue.set(targetNumber);
  }, [animatedValue, targetNumber]);

  const displayValue = useTransform(animatedValue, (current) => {
    return Math.floor(current).toLocaleString();
  });

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col md:flex-row overflow-x-hidden">
      <FloatingStars />

      {/* Left — Text content (full width on mobile so nothing is cut off) */}
      <div className="w-full min-w-0 md:w-[55%] flex items-center px-4 sm:px-6 md:px-20 py-16 sm:py-24 md:py-0 relative z-10 flex-shrink-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl w-full"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="h-7 w-7 rounded-full bg-sky-400/10 flex items-center justify-center">
              <Star weight="fill" className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <span className="text-sm font-medium tracking-wide text-zinc-500">
              Built for young readers
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.95] text-zinc-950 font-medium mb-8"
          >
            Where every story{" "}
            <br className="hidden md:block" />
            <span className="text-sky-400">finds a reader.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-[48ch] mb-12"
          >
            Once Upon is the reading app that grows with your child.
            Personalized stories, read-along narration, and a library
            designed to spark imagination from the very first page.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <MagneticButton className="bg-sky-400 text-white rounded-full px-8 py-4 text-base font-medium shadow-[0_8px_24px_rgba(56,189,248,0.3)] hover:bg-sky-500 transition-colors group">
              <span className="flex items-center gap-3">
                Join the Waitlist
                <ArrowRight weight="bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>
            <a
              href="#how-it-works"
              className="text-zinc-500 font-medium text-base hover:text-zinc-950 transition-colors px-4 py-4"
            >
              See How it Works
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right — Dragon illustration (full width on mobile, stacks below text) */}
      <div className="w-full min-w-0 md:w-[45%] min-h-[50dvh] h-[60dvh] sm:h-[55dvh] md:h-auto relative overflow-hidden flex-shrink-0">
        {/* Generated background image — full bleed on mobile so no white strip */}
        <div className="absolute inset-0 md:rounded-bl-[8rem] overflow-hidden bg-gradient-to-br from-sky-50 via-pink-50/50 to-sky-50/30">
          <motion.img
            src={withBasePath("/hero-bg.png")}
            alt="Magical starry night forest background"
            className="w-full h-full object-cover object-center opacity-90 mix-blend-multiply"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-pink-50/60 to-transparent" />
        </div>

        {/* Fade edge so image blends into the left text area (desktop only) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[--color-page-bg] to-transparent z-10 hidden md:block" />

        {/* Dragon hero illustration — centered and visible on all screens */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 60, damping: 18, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-[25] md:z-[5]"
        >
          {/* Subtle glow behind dragon to separate from new background */}
          <div className="absolute w-[60%] h-[60%] bg-white/40 rounded-full blur-[60px]" />

          <motion.img
            src={withBasePath("/dragon-transparent.png")}
            alt="Friendly baby dragon reading a book"
            className="w-[88%] max-w-[380px] sm:w-[85%] sm:max-w-[480px] md:w-[110%] md:max-w-[560px] h-auto object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.18)] origin-bottom md:-ml-12 cursor-pointer relative z-10"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: -2, transition: { type: "spring", stiffness: 300, damping: 12 } }}
            whileTap={{ scale: 0.95 }}
            draggable={false}
          />
        </motion.div>

        {/* Stories Read widget — strictly inside the dragon column, never bleeds into text area */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring" as const, stiffness: 100, damping: 20 }}
          className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-16 md:right-8 lg:right-12 left-auto w-[calc(100%-2rem)] sm:w-auto max-w-[280px] md:max-w-none bg-white/90 backdrop-blur-xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_40px_-15px_rgba(0,0,0,0.15)] p-3 sm:p-5 rounded-2xl sm:rounded-3xl flex items-center gap-3 sm:gap-4 z-[30] cursor-pointer hover:scale-105 transition-transform min-w-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 shadow-inner flex-shrink-0">
            <BookOpenText weight="fill" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-0.5">
              Stories Read
            </p>
            <motion.span className="text-xl sm:text-2xl font-black text-zinc-800 tracking-tight tabular-nums" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {displayValue}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
