import { useEffect, useRef, useState } from "react";
import { TerminalWindow } from "./TerminalWindow";

export type DemoScriptLine = { kind: "cmd" | "out"; text: string };
export type DemoScriptBlock = { cmd: string; output: string[] };

type TypingTerminalProps = {
  title: string;
  script: DemoScriptBlock[];
  className?: string;
};

const TYPE_MS = 40;
const LINE_MS = 260;
const BLOCK_PAUSE_MS = 1500;
const END_PAUSE_MS = 10000;

/**
 * A terminal window that runs a scripted session on its own: types each
 * command, prints its output line by line, then loops from the top.
 */
export function TypingTerminal({ title, script, className }: TypingTerminalProps) {
  const [lines, setLines] = useState<DemoScriptLine[]>([]);
  const [typing, setTyping] = useState("");
  const [runId, setRunId] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const run = async () => {
      // small beat before the show starts
      await wait(600);
      for (;;) {
        if (cancelled) return;
        for (const block of script) {
          if (cancelled) return;
          setTyping("");
          setLines((prev) => [...prev, { kind: "cmd", text: "" }]);
          for (let i = 1; i <= block.cmd.length; i++) {
            if (cancelled) return;
            const soFar = block.cmd.slice(0, i);
            setTyping(soFar);
            setLines((prev) => {
              const next = [...prev];
              next[next.length - 1] = { kind: "cmd", text: soFar };
              return next;
            });
            await wait(TYPE_MS);
          }
          setTyping("");
          await wait(320);
          for (const out of block.output) {
            if (cancelled) return;
            setLines((prev) => [...prev, { kind: "out", text: out }]);
            await wait(LINE_MS);
          }
          await wait(BLOCK_PAUSE_MS);
        }
        await wait(END_PAUSE_MS);
        if (cancelled) return;
        setLines([]);
      }
    };

    void run();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [script, runId]);

  useEffect(() => {
  const scroller = scrollerRef.current;

  if (scroller) {
    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: "smooth",
    });
  }
}, [lines, typing]);

  return (
    <TerminalWindow
      title={title}
      className={className}
      right={
        <button
          type="button"
          onClick={() => {
            setLines([]);
            setRunId((n) => n + 1);
          }}
          className="mono cursor-pointer border border-highlight/60 px-2 py-0.5 text-xs lowercase text-highlight transition-colors hover:bg-highlight hover:text-on-highlight"
        >
          ↻ replay
        </button>
      }
    >
      <div ref={scrollerRef} className="max-h-[420px] min-h-[380px] overflow-y-auto pr-2">
        {lines.map((line, i) =>
          line.kind === "cmd" ? (
            <p key={i} className="whitespace-pre-wrap text-foreground">
              <span className="text-highlight-deep">$ </span>
              {line.text}
              <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-foreground" />
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-muted-foreground">
              {line.text}
            </p>
          ),
        )}
      </div>
    </TerminalWindow>
  );
}
