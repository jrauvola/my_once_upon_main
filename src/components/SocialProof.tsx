"use client";

import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Mother of two, ages 4 & 7",
    quote:
      "My daughter asks for 'one more chapter' every single night. That never happened before Once Upon.",
    rating: 5,
  },
  {
    name: "Tomás Reyes",
    role: "Father, age 6",
    quote:
      "The bedtime mode is a game changer. Calm voice, warm screen, and my son is asleep by page three.",
    rating: 5,
  },
  {
    name: "Amara Osei",
    role: "Mother, age 5",
    quote:
      "She went from sounding out letters to reading full sentences in three months. The adaptive levels actually work.",
    rating: 5,
  },
];

export function SocialProof() {
  return (
    <section className="pt-6 pb-10 md:pt-8 md:pb-14 px-6 md:px-20 w-full relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-zinc-400 mb-3">
            Trusted by early-access families
          </p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                weight="fill"
                className={`w-5 h-5 ${i % 2 === 0 ? "text-sky-300" : "text-pink-300"}`}
              />
            ))}
            <span className="ml-2 text-sm font-mono text-zinc-500">
              4.9 / 5
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                delay: i * 0.1,
              }}
              className={`bg-white rounded-[2rem] border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] p-8 ${
                i % 2 === 0 ? "border-sky-100/60" : "border-pink-100/60"
              } ${i === 2 ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""}`}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    weight="fill"
                    className={`w-3.5 h-3.5 ${i % 2 === 0 ? "text-sky-300" : "text-pink-300"}`}
                  />
                ))}
              </div>
              <p className="text-zinc-700 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                    i % 2 === 0
                      ? "bg-sky-100 text-sky-600"
                      : "bg-pink-100 text-pink-600"
                  }`}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-950">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
