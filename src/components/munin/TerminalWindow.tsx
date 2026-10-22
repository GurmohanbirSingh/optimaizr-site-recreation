import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  title: string;
  date?: string;
  right?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

/** A terminal-sheet window: highlight border, ink chrome bar, drop-shadow offset. */
export function TerminalWindow({
  title,
  date,
  right,
  className,
  bodyClassName,
  children,
}: TerminalWindowProps) {
  return (
    <div className={cn("terminal-sheet flex flex-col", className)}>
      <div className="mono flex items-center gap-2 border-b border-highlight bg-ink px-3 py-1.5 text-xs text-highlight">
        <span className="size-2 rounded-full bg-highlight" />
        <span className="size-2 rounded-full border border-highlight/60" />
        <span className="size-2 rounded-full border border-highlight/60" />
        <span className="ml-1 truncate lowercase">{title}</span>
        {date ? <span className="ml-auto shrink-0 lowercase opacity-70">{date}</span> : null}
        {right ? <span className="ml-auto shrink-0">{right}</span> : null}
      </div>
      <div className={cn("mono p-5 text-[13px] leading-relaxed", bodyClassName)}>{children}</div>
    </div>
  );
}
