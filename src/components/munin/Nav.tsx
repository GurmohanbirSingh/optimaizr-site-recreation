import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("mono flex items-center gap-2 text-lg font-bold", className)}>
      <span className="flex size-6 items-center justify-center border-2 border-foreground text-xs">
        &gt;_
      </span>
      <span>
        mu<span className="word-box">nin</span>
      </span>
    </Link>
  );
}

const navLinks = [
  { label: "features", to: "/", hash: "features" },
  { label: "phases", to: "/releases" },
  { label: "demo", to: "/demo" },
  { label: "faq", to: "/", hash: "faq" },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Logo />
        <nav className="mono hidden items-center gap-1 rounded-full border border-foreground/15 bg-background px-2 py-1.5 text-sm lowercase sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={"hash" in link ? link.hash : undefined}
              className="rounded-full px-3 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="mono hidden items-center gap-1.5 border border-foreground/20 px-3 py-2 text-sm transition-colors hover:bg-muted md:inline-flex"
          >
            ★ Star on GitHub
          </a>
          <Link
            to="/"
            hash="try"
            className="mono bg-highlight px-3 py-2 text-sm font-medium text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
          >
            Install the CLI
          </Link>
        </div>
      </div>
    </header>
  );
}
