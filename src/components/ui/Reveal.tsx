"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-in reveal. Always renders the same tree on server and client
 * (no branching on reduced motion, which would break hydration); reduced
 * motion is handled in CSS via [data-reveal].
 */
export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
