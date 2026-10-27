"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/content/site";
import { ALL, filterByCategory } from "@/lib/filter";
import { BeforeAfter } from "./BeforeAfter";
import { FilterTabs } from "./FilterTabs";
import { EmptyState } from "./EmptyState";

export function WorkGrid() {
  const [cat, setCat] = useState(ALL);
  const items = filterByCategory(site.work, cat);
  return (
    <div>
      <FilterTabs label="Filter our work" controls="work-grid" options={site.workCategories} value={cat} onChange={setCat} />
      <div id="work-grid" role="tabpanel" aria-live="polite">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((w) => (
                <motion.li
                  key={w.title + w.subtitle}
                  layout
                  data-testid="work-item"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-lg border border-border bg-surface"
                >
                  <BeforeAfter before={w.before} after={w.after} alt={`${w.title} ${w.subtitle}`} className="aspect-[4/3] rounded-none" />
                  <div className="p-4">
                    <h2 className="font-heading text-lg not-italic tracking-wide">{w.title}</h2>
                    <p className="text-sm text-accent">{w.subtitle}</p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
