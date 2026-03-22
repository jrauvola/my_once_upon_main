"use client";

import { Sparkle } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 py-14 px-6 md:px-20 border-t border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group">
            {/* Magic Book Logo Mark - Footer Version */}
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-500 rounded-[14px] shadow-[0_4px_12px_rgba(56,189,248,0.25)] group-hover:scale-[0.96] group-hover:shadow-[0_2px_8px_rgba(56,189,248,0.3)] transition-all duration-300">
              <div className="absolute inset-[2px] rounded-[12px] bg-gradient-to-t from-transparent to-white/20 border border-white/30" />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10 translate-y-[1px]">
                <path d="M12 4C12 4 10 2.5 6 2.5C2 2.5 2 6 2 6V18C2 18 2 15 6 15C10 15 12 17 12 17C12 17 14 15 18 15C22 15 22 18 22 18V6C22 6 22 2.5 18 2.5C14 2.5 12 4 12 4Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute top-1 right-1 w-2.5 h-2.5">
                <Sparkle weight="fill" className="text-white w-full h-full animate-pulse" />
              </div>
            </div>
            <span className="font-semibold tracking-tight text-white text-[1.1rem] ml-1 group-hover:text-sky-400 transition-colors">
              Once Upon
            </span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The reading app that grows with your child. Built by
            parents, for parents.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-white font-medium text-sm tracking-wide">
            Product
          </span>
          <a href="#how-it-works" className="text-zinc-500 hover:text-white transition-colors text-sm">
            How it Works
          </a>
          <a href="#for-parents" className="text-zinc-500 hover:text-white transition-colors text-sm">
            For Parents
          </a>
          <a href="#waitlist" className="text-zinc-500 hover:text-white transition-colors text-sm">
            Waitlist
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-white font-medium text-sm tracking-wide">
            Company
          </span>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">About</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Blog</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Contact</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-xs">
          © 2026 Once Upon Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors px-3 py-3">Privacy</a>
          <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors px-3 py-3">Terms</a>
        </div>
      </div>
    </footer>
  );
}
