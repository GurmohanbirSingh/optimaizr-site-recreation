import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TerminalWindow } from "./TerminalWindow";

export type StoryFeature = {
  id: string;
  kicker: string;
  title: ReactNode;
  body: ReactNode;
  terminalTitle: string;
  terminal: ReactNode;
};

type ScrollyFeaturesProps = {
  features: StoryFeature[];
};

/**
 * Apple-style scroll story: a sticky full-height stage where feature slides
 * crossfade while the page scrolls. Each feature owns one viewport of scroll.
 */
export function ScrollyFeatures({ features }: ScrollyFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const idx = Math.min(features.length - 1, Math.floor(progress * features.length + 1e-6));
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [features.length]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${features.length * 92}vh` }}
      aria-label="feature tour"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* progress rail */}
        <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
          {features.map((f, i) => (
            <span
              key={f.id}
              className={cn(
                "w-1.5 rounded-full transition-all duration-300",
                i === active ? "h-8 bg-foreground" : "h-2 bg-foreground/20",
              )}
            />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4">
          {features.map((f, i) => (
            <div
              key={f.id}
              aria-hidden={i !== active}
              className={cn(
                "stage-slide absolute inset-x-4 top-1/2 -translate-y-1/2",
                i === active ? "stage-shown" : "stage-hidden",
              )}
            >
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
                <div>
                  <p className="mono text-sm text-highlight-deep">
                    <span className="text-muted-foreground">// </span>
                    {f.kicker}
                    <span className="text-muted-foreground"> · {String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <h3 className="display mt-4 text-3xl sm:text-4xl lg:text-[2.6rem]">{f.title}</h3>
                  <div className="mt-5 max-w-md text-base text-muted-foreground">{f.body}</div>
                </div>
                <TerminalWindow title={f.terminalTitle}>{f.terminal}</TerminalWindow>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
