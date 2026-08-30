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
export function AutoVideo({ src, className = "", rootMargin = "300px" }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          tryPlay();
        } else {
          el.pause();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    observer.observe(el);

    const onVisibility = () => {
      if (document.visibilityState === "visible" && el.getBoundingClientRect().top < innerHeight) {
        tryPlay();
      }
    };

    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("pause", () => {
      // browsers sometimes pause background media; resume if still on screen
      const r = el.getBoundingClientRect();
      if (!document.hidden && r.bottom > 0 && r.top < innerHeight) tryPlay();
    });
    el.addEventListener("stalled", tryPlay);
    el.addEventListener("suspend", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("stalled", tryPlay);
      el.removeEventListener("suspend", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
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
