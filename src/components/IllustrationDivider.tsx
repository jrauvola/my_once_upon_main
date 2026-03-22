"use client";

import { motion } from "framer-motion";
import { withBasePath } from "../lib/withBasePath";

interface IllustrationDividerProps {
  src: string;
  alt: string;
  flip?: boolean;
}

interface StickerRowProps {
  leftSrc: string;
  leftAlt: string;
  rightSrc: string;
  rightAlt: string;
}

function Sticker({ src, alt, flip = false }: { src: string; alt: string; flip?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring" as const, stiffness: 60, damping: 15 }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 bg-sky-200/40 rounded-full blur-[40px] md:blur-[60px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={withBasePath(src)}
        alt={alt}
        className="w-40 md:w-56 lg:w-72 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] pointer-events-auto cursor-pointer relative z-10"
        animate={{ y: [0, -20, 0], rotate: flip ? [4, -4, 4] : [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
        whileHover={{ scale: 1.15, rotate: flip ? -8 : 8, transition: { type: "spring", stiffness: 300, damping: 10 } }}
      />
    </motion.div>
  );
}

export function StickerRow({ leftSrc, leftAlt, rightSrc, rightAlt }: StickerRowProps) {
  return (
    <div className="w-full flex flex-wrap items-end justify-between gap-6 px-[5%] md:px-[8%] -mb-8 md:-mb-16 mt-8 md:mt-12 relative z-30 pointer-events-none">
      <div className="flex justify-start flex-1 min-w-[140px]">
        <Sticker src={leftSrc} alt={leftAlt} flip={false} />
      </div>
      <div className="flex justify-end flex-1 min-w-[140px]">
        <Sticker src={rightSrc} alt={rightAlt} flip />
      </div>
    </div>
  );
}

export function IllustrationDivider({ src, alt, flip = false }: IllustrationDividerProps) {
  return (
    <div className={`w-full flex ${flip ? "justify-end pr-[5%] md:pr-[12%]" : "justify-start pl-[5%] md:pl-[12%]"} -mb-8 md:-mb-16 mt-8 md:mt-12 relative z-30 pointer-events-none`}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" as const, stiffness: 60, damping: 15 }}
        className="relative"
      >
        {/* Glow behind the illustration */}
        <motion.div
          className="absolute inset-0 bg-sky-200/40 rounded-full blur-[40px] md:blur-[60px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={withBasePath(src)}
          alt={alt}
          className="w-48 md:w-64 lg:w-80 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] pointer-events-auto cursor-pointer relative z-10"
          animate={{ 
            y: [0, -20, 0], 
            rotate: flip ? [4, -4, 4] : [-4, 4, -4] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
          whileHover={{ scale: 1.15, rotate: flip ? -8 : 8, transition: { type: "spring", stiffness: 300, damping: 10 } }}
        />
      </motion.div>
    </div>
  );
}
