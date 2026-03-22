"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { PaperPlaneTilt, CheckCircle, CircleNotch } from "@phosphor-icons/react";

type FormState = "idle" | "loading" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (value: string) => {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "That doesn't look like a valid email.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setFormState("error");
      setErrorMessage(err);
      return;
    }
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  };

  return (
    <section
      id="waitlist"
      className="pt-12 pb-24 md:pt-20 md:pb-32 px-6 md:px-20 w-full relative"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-center justify-between relative">
        {/* Left — Bear illustration + text */}
        <div className="w-full md:w-1/2 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 18 }}
            className="relative inline-block"
          >
            <motion.div
              className="absolute inset-0 bg-sky-200/50 rounded-full blur-[50px] md:blur-[80px]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src="/bear-transparent.png"
              alt="Cozy teddy bear astronaut"
              className="w-40 md:w-56 h-auto mb-8 drop-shadow-[0_16px_40px_rgba(0,0,0,0.15)] origin-bottom cursor-pointer relative z-10"
              animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 300, damping: 10 } }}
              whileTap={{ scale: 0.9 }}
              draggable={false}
            />
          </motion.div>
          <h2 className="text-4xl md:text-5xl tracking-tighter text-zinc-950 font-medium mb-6">
            Be first to open
            <br />
            <span className="text-sky-400">the book.</span>
          </h2>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-[45ch]">
            We are building Once Upon for families who believe reading
            should feel like an adventure, not a chore. Drop your
            email and we will save you a spot.
          </p>
        </div>

        {/* Right — Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                className="bg-white rounded-[2rem] border border-pink-100/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] p-10 flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center">
                  <CheckCircle weight="fill" className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-950">
                  You are on the list
                </h3>
                <p className="text-sm text-zinc-500 max-w-[32ch] leading-relaxed">
                  We will reach out as soon as Once Upon is ready for
                  its first readers. Thank you for believing in us.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-[2rem] border border-sky-100/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] p-10 flex flex-col gap-2"
              >
                <label
                  htmlFor="waitlist-email"
                  className="text-sm font-medium text-zinc-950 mb-1"
                >
                  Email address
                </label>
                <p className="text-xs text-zinc-400 mb-3">
                  We will only use this to notify you when we launch.
                </p>
                <input
                  ref={inputRef}
                  id="waitlist-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formState === "error") setFormState("idle");
                  }}
                  className={`w-full rounded-xl border px-4 py-3.5 text-base text-zinc-950 placeholder:text-zinc-300 outline-none transition-colors focus:ring-2 focus:ring-sky-400/20 focus:border-sky-300 min-h-[44px] ${
                    formState === "error"
                      ? "border-red-300 bg-red-50/30"
                      : "border-zinc-200 bg-zinc-50"
                  }`}
                />
                <AnimatePresence>
                  {formState === "error" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="mt-4 w-full bg-sky-400 hover:bg-sky-500 disabled:opacity-70 text-white font-medium text-sm rounded-xl px-6 py-3.5 flex items-center justify-center gap-2 transition-colors shadow-[0_4px_12px_rgba(56,189,248,0.3)] active:scale-[0.98]"
                >
                  {formState === "loading" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    >
                      <CircleNotch weight="bold" className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <>
                      Save My Spot
                      <PaperPlaneTilt weight="fill" className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
