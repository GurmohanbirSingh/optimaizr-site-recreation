import { useState } from "react";

type CopyChipProps = {
  command: string;
  className?: string;
};

/** Ink install chip with a highlight copy badge. */
export function CopyChip({ command, className }: CopyChipProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — leave the chip as a readable command
    }
  };

  return (
    <div
      className={
        "mono inline-flex items-center gap-3 bg-ink px-4 py-3 text-sm text-background " +
        (className ?? "")
      }
    >
      <span className="text-on-ink">$</span>
      <span className="whitespace-nowrap">{command}</span>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer bg-highlight px-2 py-1 text-xs font-medium lowercase text-on-highlight transition-transform hover:scale-105"
      >
        {copied ? "copied ✓" : "copy"}
      </button>
    </div>
  );
}
