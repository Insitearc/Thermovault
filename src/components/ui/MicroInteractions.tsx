"use client";

import { useEffect } from "react";

export default function MicroInteractions() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll"),
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            // keep revealed once visible - comment this line to allow hide on scroll out
            // entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
