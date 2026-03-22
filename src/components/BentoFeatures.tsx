"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, memo, useRef } from "react";
import {
  BookOpen,
  SpeakerHigh,
  MoonStars,
  TrendUp,
  Sparkle,
  CheckCircle,
} from "@phosphor-icons/react";
import { withBasePath } from "../lib/withBasePath";

const BedtimeSparkles = memo(function BedtimeSparkles() {
  const sparkles = [
    { top: "15%", left: "60%", size: 10, delay: 0, dur: 3.2, color: "text-sky-400/40" },
    { top: "30%", left: "75%", size: 8, delay: 0.8, dur: 3.8, color: "text-pink-400/30" },
    { top: "50%", left: "55%", size: 12, delay: 1.4, dur: 4, color: "text-indigo-300/30" },
    { top: "70%", left: "80%", size: 7, delay: 0.4, dur: 3.5, color: "text-sky-300/35" },
    { top: "25%", left: "90%", size: 9, delay: 1.8, dur: 4.2, color: "text-pink-300/25" },
    { top: "60%", left: "68%", size: 6, delay: 0.6, dur: 3.6, color: "text-indigo-400/20" },
  ];

  return (
    <>
      {sparkles.map((s, i) => (
        <motion.div
          key={`bedtime-sparkle-${i}`}
          animate={{
            y: [0, -5, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
          className={`absolute pointer-events-none z-10 ${s.color}`}
          style={{ top: s.top, left: s.left }}
        >
          <Sparkle weight="fill" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </>
  );
});

const ReadingLevels = memo(function ReadingLevels() {
  const [active, setActive] = useState(0);
  const levels = [
    { label: "Picture Books", age: "Ages 3-5", color: "bg-pink-400" },
    { label: "Early Readers", age: "Ages 5-7", color: "bg-sky-400" },
    { label: "Chapter Books", age: "Ages 7-10", color: "bg-pink-300" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % levels.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [levels.length]);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-3">
      {levels.map((level, i) => (
        <motion.div
          layout
          key={level.label}
          className={`flex items-center justify-between p-4 rounded-2xl border transition-colors duration-500 ${
            i === active
              ? "bg-sky-50 border-sky-200/60"
              : "bg-white border-slate-200/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                i === active ? level.color : "bg-zinc-200"
              }`}
            />
            <span className="text-sm font-medium text-zinc-700">
              {level.label}
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">{level.age}</span>
        </motion.div>
      ))}
    </div>
  );
});

const AudioWave = memo(function AudioWave() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-16">
      {[0.6, 1, 0.4, 0.8, 0.5, 1, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4].map(
        (h, i) => (
          <motion.div
            key={i}
            animate={{ scaleY: [h, 1, h] }}
            transition={{
              duration: 0.8 + i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
            className={`w-1.5 rounded-full origin-bottom ${
              i % 2 === 0 ? "bg-sky-300" : "bg-pink-300"
            }`}
            style={{ height: `${h * 100}%` }}
          />
        )
      )}
    </div>
  );
});

const ProgressRing = memo(function ProgressRing() {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 3000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="w-28 h-28">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 52}
          initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 52 * 0.28 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
          transform="rotate(-90 60 60)"
        />
        <text
          x="60"
          y="56"
          textAnchor="middle"
          className="fill-zinc-950 text-[22px] font-bold"
          style={{ fontFamily: "var(--font-berkshire-swash)" }}
        >
          72%
        </text>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          className="fill-zinc-400 text-[10px]"
          style={{ fontFamily: "var(--font-berkshire-swash)" }}
        >
          of weekly goal
        </text>
      </svg>

      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
            className="absolute -top-2 -right-2 bg-zinc-950 text-white px-3 py-1.5 rounded-xl text-xs font-medium shadow-xl flex items-center gap-1.5"
          >
            <CheckCircle weight="fill" className="text-pink-300 w-4 h-4" />
            New badge earned
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.15), transparent 40%)`
  );
  const borderBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.4), transparent 40%)`
  );
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 ease-out ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-soft-light"
        style={{ background: glowBackground }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderBackground,
          WebkitMaskImage: "linear-gradient(white, white), linear-gradient(white, white)",
          WebkitMaskClip: "content-box, border-box",
          WebkitMaskComposite: "source-in, xor",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
}

export function BentoFeatures() {
  return (
    <section
      id="how-it-works"
      className="pt-16 pb-10 md:pt-24 md:pb-14 px-6 md:px-20 w-full max-w-7xl mx-auto flex flex-col gap-10 relative"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        <div className="max-w-2xl w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 w-7 rounded-full bg-pink-400/10 flex items-center justify-center">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <span className="text-sm font-medium text-zinc-500">How it Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tighter text-zinc-950 font-medium mb-6">
            Reading that adapts,
            <br />
            <span className="text-pink-400">not the other way around.</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-[50ch] leading-relaxed">
            Every child reads differently. Once Upon personalizes the experience
            to their pace, interests, and reading level so each session
            feels like it was made just for them.
          </p>
        </div>

        {/* Decorative Floating Storybook to fill the white space on the right */}
        <div className="w-full md:w-[40%] flex justify-center md:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring" as const, stiffness: 60, damping: 15 }}
            className="relative"
          >
            {/* Soft glow behind the book */}
            <motion.div
              className="absolute inset-0 bg-sky-200/50 rounded-full blur-[60px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={withBasePath("/storybook-transparent.png")}
              alt="Magical floating storybook"
              className="w-56 md:w-80 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative z-10 cursor-pointer"
              animate={{ y: [0, -20, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: -5, transition: { type: "spring", stiffness: 300, damping: 12 } }}
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <SpotlightCard className="min-h-[400px] h-auto md:h-[400px] w-full bg-white rounded-[2.5rem] border border-sky-100/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] p-6 sm:p-10 flex flex-col md:flex-row z-10 bg-clip-padding">
            <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 md:mb-12 border border-sky-100/60">
                <BookOpen weight="bold" className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl tracking-tight font-medium text-zinc-950 mb-3">
                  Adaptive Reading Levels
                </h3>
                <p className="text-zinc-500 leading-relaxed text-sm max-w-[30ch]">
                  Stories adjust vocabulary, sentence length, and
                  complexity in real time as your child grows.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0 md:flex justify-end items-center relative md:-right-4 min-h-[180px] md:min-h-0">
              <ReadingLevels />
            </div>
          </SpotlightCard>
        </div>

        <div className="col-span-1 flex flex-col">
          <SpotlightCard className="h-[400px] w-full bg-white rounded-[2.5rem] border border-pink-100/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] p-6 sm:p-10 flex flex-col justify-between items-center z-10 bg-clip-padding">
            <div className="w-full flex items-start z-10">
              <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center border border-pink-100/60">
                <SpeakerHigh weight="bold" className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
              <AudioWave />
            </div>
            <div className="w-full text-center z-10 mt-6">
              <h3 className="text-xl tracking-tight font-medium text-zinc-950 mb-2">
                Read-Along Narration
              </h3>
              <p className="text-zinc-500 text-sm">
                Warm, expressive voices follow along with every word.
              </p>
            </div>
          </SpotlightCard>
        </div>

        <div className="col-span-1 flex flex-col" id="for-parents">
          <SpotlightCard className="h-[360px] w-full bg-white rounded-[2.5rem] border border-sky-100/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] p-6 sm:p-10 flex flex-col justify-between items-center z-10 bg-clip-padding">
            <div className="w-full flex items-start">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center border border-sky-100/60">
                <TrendUp weight="bold" className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center w-full">
              <ProgressRing />
            </div>
            <div className="w-full text-center mt-6">
              <h3 className="text-xl tracking-tight font-medium text-zinc-950 mb-2">
                Progress for Parents
              </h3>
              <p className="text-zinc-500 text-sm">
                Weekly goals, streaks, and reading insights at a glance.
              </p>
            </div>
          </SpotlightCard>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col">
          <SpotlightCard className="min-h-[360px] h-auto md:h-[360px] w-full bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] rounded-[2.5rem] border border-indigo-900/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-10 flex flex-col md:flex-row z-10 bg-clip-padding">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/6 to-pink-500/4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Text column: restricted width and higher z-index so it stays readable over the background */}
            <div className="w-[65%] md:w-[44%] md:max-w-[320px] flex flex-col justify-between relative z-20 pr-4 md:pr-8 min-w-0 flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-950 rounded-2xl flex items-center justify-center mb-6 md:mb-12 border border-indigo-800/50">
                <MoonStars weight="bold" className="w-5 h-5 text-sky-300" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl tracking-tight font-medium text-white mb-3 drop-shadow-md">
                  Bedtime Mode
                </h3>
                <p className="text-indigo-200/90 leading-relaxed text-sm break-words drop-shadow-md">
                  A soft-toned, dimmed reading environment with gentle
                  narration designed to wind down the day.
                </p>
              </div>
            </div>

            {/* Bedtime Illustration — full card width, faded out on the left to prevent sharp lines */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden rounded-[2.5rem]">
              {/* Strong gradient on the left half to protect the text */}
              <div className="absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-transparent z-10 opacity-50" />
              <motion.img 
                src={withBasePath("/bedtime.png")} 
                alt="Bedtime illustration" 
                className="w-full h-[120%] object-cover object-right opacity-80 mix-blend-screen -mt-6"
                animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-[#0f172a] mix-blend-color z-10 opacity-30" />
            </div>

            {/* Liquid Glass Audio Player — positioned so it never covers the Bedtime Mode text */}
            <motion.div
              className="absolute right-4 bottom-4 md:right-[8%] md:bottom-[12%] w-[200px] sm:w-[220px] max-w-[calc(100%-2rem)] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] p-4 flex flex-col gap-3 z-20"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center shadow-inner">
                  <MoonStars weight="fill" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white tracking-wide">Goodnight Moon</p>
                  <p className="text-[10px] text-indigo-200/80">Gentle Narration</p>
                </div>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center gap-[3px] h-6 px-1 mt-1">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="w-1 bg-sky-300/80 rounded-full"
                    animate={{
                      height: ["20%", "80%", "30%", "100%", "40%"][i % 5],
                    }}
                    transition={{
                      duration: 1.5 + (i % 3) * 0.2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Animated floating sparkles on the dark card */}
            <BedtimeSparkles />
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
