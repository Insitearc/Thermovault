"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable browser automatic scroll restoration so we can control it.
    let previous: ScrollRestoration | undefined;
    try {
      previous = history?.scrollRestoration;
      history.scrollRestoration = "manual";
    } catch (e) {
      // ignore if not available
    }

    return () => {
      try {
        if (previous !== undefined) history.scrollRestoration = previous;
      } catch (e) {
        // ignore
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const doScroll = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } catch (e) {
        try {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        } catch (e) {
          /* ignore */
        }
      }
    };

    // Immediate attempt
    doScroll();

    // Try again after browser has done layout (one or two RAFs)
    const raf1 = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => doScroll());
    });

    // Fallback retries to handle images/fonts/layout shifts
    const t1 = window.setTimeout(doScroll, 120);
    const t2 = window.setTimeout(doScroll, 300);

    return () => {
      try {
        window.cancelAnimationFrame(raf1);
      } catch (e) {}
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
