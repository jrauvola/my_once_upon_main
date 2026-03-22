"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, List, X } from "@phosphor-icons/react";
import { MagneticButton } from "./MagneticButton";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "For Parents", href: "#for-parents" },
  { label: "Waitlist", href: "#waitlist" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" as const, stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 md:px-12 flex items-center justify-between pointer-events-none"
    >
      <Link
        href="/"
        className="pointer-events-auto flex items-center gap-2 group"
        onClick={() => setMobileOpen(false)}
      >
        {/* Magic Book Logo Mark */}
        <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-500 rounded-[14px] shadow-[0_4px_12px_rgba(56,189,248,0.35)] group-hover:scale-[0.96] group-hover:shadow-[0_2px_8px_rgba(56,189,248,0.3)] transition-all duration-300">
          <div className="absolute inset-[2px] rounded-[12px] bg-gradient-to-t from-transparent to-white/20 border border-white/30" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10 translate-y-[1px]">
            <path d="M12 4C12 4 10 2.5 6 2.5C2 2.5 2 6 2 6V18C2 18 2 15 6 15C10 15 12 17 12 17C12 17 14 15 18 15C22 15 22 18 22 18V6C22 6 22 2.5 18 2.5C14 2.5 12 4 12 4Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="absolute top-1 right-1 w-2.5 h-2.5">
            <Sparkle weight="fill" className="text-white w-full h-full animate-pulse" />
          </div>
        </div>
        <span className="font-semibold tracking-tight text-zinc-950 text-[1.1rem] ml-1 group-hover:text-sky-500 transition-colors">
          Once Upon
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 pointer-events-auto bg-white/80 backdrop-blur-xl border border-sky-100/60 px-8 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="pointer-events-auto flex items-center gap-4">
        <MagneticButton className="hidden md:flex bg-sky-400 text-white rounded-full px-6 py-2.5 text-sm font-medium shadow-[0_4px_12px_rgba(56,189,248,0.3)] hover:bg-sky-500 transition-colors">
          Join Waitlist
        </MagneticButton>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] bg-white rounded-full flex items-center justify-center border border-sky-100 shadow-sm touch-manipulation"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X weight="bold" className="w-5 h-5 text-zinc-950" /> : <List weight="bold" className="w-5 h-5 text-zinc-950" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-40 md:hidden pointer-events-auto"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-white/95 backdrop-blur-xl border-b border-sky-100/60 shadow-xl py-4 px-4 mx-4 rounded-2xl"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-sky-50/50 rounded-xl transition-colors touch-manipulation"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 mt-2 border-t border-sky-100/60">
                  <Link href="#waitlist" onClick={() => setMobileOpen(false)} className="block touch-manipulation">
                    <span className="flex w-full justify-center bg-sky-400 text-white rounded-xl py-3.5 text-sm font-medium shadow-[0_4px_12px_rgba(56,189,248,0.3)] min-h-[44px] items-center">
                      Join Waitlist
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
