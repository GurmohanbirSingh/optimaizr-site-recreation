import { Link } from "@tanstack/react-router";
import { Logo } from "./Nav";

const columns = [
  {
    heading: "product",
    links: [
      { label: "features", to: "/", hash: "features" },
      { label: "demo", to: "/demo" },
      { label: "phases", to: "/releases" },
      { label: "faq", to: "/", hash: "faq" },
    ] as const,
  },
  {
    heading: "build",
    links: [
      { label: "roadmap doc", to: "/releases", hash: undefined },
      { label: "acceptance checklist", to: "/releases", hash: "checklist" },
      { label: "architecture", to: "/", hash: "architecture" },
    ] as const,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Logo />
            <p className="mono mt-4 max-w-xs text-sm lowercase text-muted-foreground">
              a local-first reckoning for your coding-agent spend. reads history, prices it,
              never uploads it.
            </p>
          </div>
          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="kicker text-muted-foreground">// {col.heading}</p>
                <ul className="mono mt-3 space-y-2 text-sm lowercase">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        hash={"hash" in link ? (link.hash as string | undefined) : undefined}
                        className="text-foreground/80 hover:text-foreground hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mono mt-14 flex flex-col gap-2 border-t border-foreground/10 pt-6 text-xs lowercase text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© 2026 munin · cli and dashboard, one engine</span>
          <span>
            read locally · <span className="text-good">0 bytes uploaded</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
