import { useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

/** Returns current window scrollY, but 0 on mobile (perf + UX). */
export function useParallax() {
  const isMobile = useIsMobile();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (isMobile) {
      setY(0);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  return y;
}
