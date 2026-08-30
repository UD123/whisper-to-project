import { useEffect, useRef, useState } from "react";

type AutoVideoProps = {
  src: string;
  className?: string;
  /** Start loading when the slot is this far from the viewport */
  rootMargin?: string;
};

/**
 * Muted looping video that only loads when it approaches the viewport,
 * plays whenever it is visible and reliably resumes after tab switches
 * or interrupted autoplay attempts.
 */
export function AutoVideo({ src, className = "", rootMargin = "400px" }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > -400 && r.top < window.innerHeight + 400;
    };

    const tryPlay = () => {
      if (!el.isConnected) return;
      setActive(true);
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) tryPlay();
        else el.pause();
      },
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(el);

    // Fallback: observers never fire for tabs/iframes rendered offscreen,
    // so start anyway shortly after mount.
    const boot = window.setTimeout(tryPlay, 400);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && onScreen()) tryPlay();
    };
    const onPause = () => {
      if (!document.hidden && onScreen()) tryPlay();
    };

    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("stalled", tryPlay);
    el.addEventListener("ended", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);

    return () => {
      observer.disconnect();
      window.clearTimeout(boot);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("stalled", tryPlay);
      el.removeEventListener("ended", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
    };
  }, [rootMargin]);

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
      className={className}
    />
  );
}
