"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/content/site";
import { ALL, filterByCategory } from "@/lib/filter";
import { FilterTabs } from "./FilterTabs";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "./EmptyState";

export function ProjectGrid() {
  const [cat, setCat] = useState(ALL);
  const items = filterByCategory(site.projects, cat);
  return (
    <div>
      <FilterTabs label="Filter projects" controls="project-grid" options={site.projectCategories} value={cat} onChange={setCat} />
      <div id="project-grid" role="tabpanel" aria-live="polite">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((p) => (
                <motion.li
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard p={p} href="/contact" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
