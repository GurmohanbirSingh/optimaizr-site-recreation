import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/munin/Nav";
import { Footer } from "@/components/munin/Footer";
import { TerminalWindow } from "@/components/munin/TerminalWindow";
import { Reveal } from "@/components/munin/Reveal";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "munin — phases, in plain words" },
      {
        name: "description",
        content:
          "The munin build plan, phase by phase: what each phase ships, how hard it is, and the acceptance checklist every claim has to pass.",
      },
      { property: "og:title", content: "munin — phases, in plain words" },
      {
        property: "og:description",
        content:
          "What each phase of the munin rebuild delivers, with difficulty ratings and an acceptance checklist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Releases,
});

type Phase = {
  num: string;
  title: string;
  status: "shipped" | "next" | "spec'd";
  difficulty: string;
  blurb: string;
  delivers: string[];
};

const phases: Phase[] = [
  {
    num: "0",
    title: "reconnaissance and scope",
    status: "shipped",
    difficulty: "1–2/5",
    blurb: "Understand the original behavior before writing a line of the replacement.",
    delivers: ["feature inventory", "data-flow map", "claude exclusion list"],
  },
  {
    num: "1",
    title: "workspace, build system, shared data model",
    status: "shipped",
    difficulty: "2–3/5",
    blurb: "A clean monorepo that builds before any product features exist.",
    delivers: ["shared types: session, message, usage", "core · local · cli · dashboard packages", "repeatable install/build/test"],
  },
  {
    num: "2",
    title: "local data ingestion + opencode compatibility",
    status: "next",
    difficulty: "4/5",
    blurb: "Read real coding-agent history and normalize both schema generations.",
    delivers: ["opencode 1.x reader", "opencode 2.x reader", "mixed-schema handling, no duplicates"],
  },
  {
    num: "3",
    title: "analysis engine, pricing, reporting",
    status: "spec'd",
    difficulty: "4/5",
    blurb: "Turn raw sessions into accurate usage and cost analysis.",
    delivers: ["versioned pricing registry", "cache read/write analysis", "repeated-work detection"],
  },
  {
    num: "4",
    title: "optimization rules + recommendations",
    status: "spec'd",
    difficulty: "4–5/5",
    blurb: "Recreate reusable optimization logic without claude-specific hooks.",
    delivers: ["rule evaluation + evidence", "apply with state capture", "undo + replay verification"],
  },
  {
    num: "5",
    title: "local runtime, ledger, live monitoring",
    status: "spec'd",
    difficulty: "4/5",
    blurb: "Make munin useful while you code, not only after the fact.",
    delivers: ["local ledger of derived snapshots", "incremental, idempotent scans", "before/after comparisons"],
  },
  {
    num: "6",
    title: "cli and commands",
    status: "spec'd",
    difficulty: "3–5/5",
    blurb: "The command-line experience on top of the shared engine.",
    delivers: ["report, status, sessions, why", "live + results", "apply, undo, verify"],
  },
  {
    num: "7",
    title: "interactive local dashboard",
    status: "spec'd",
    difficulty: "4/5",
    blurb: "A second interface to the same engine, bound to localhost.",
    delivers: ["overview + session explorer", "cost breakdowns + recommendations", "local-only security posture"],
  },
  {
    num: "8",
    title: "integration, regression tests, release readiness",
    status: "spec'd",
    difficulty: "4/5",
    blurb: "Make the rebuilt tool reliable to demonstrate and keep building.",
    delivers: ["v1/v2 regression fixtures", "cli end-to-end tests", "clean-checkout demo"],
  },
];

const checklist = [
  "clean checkout builds successfully",
  "opencode 1.x history is supported",
  "opencode 2.x history is supported",
  "token counts and costs pass fixture tests",
  "repeated-work findings are explainable",
  "supported rules can be applied and undone safely",
  "ingestion never modifies local source history",
  "cli and dashboard agree on session totals",
  "live refresh avoids duplicate records",
  "claude-specific mods are excluded",
  "remaining unsupported features are documented",
];

function Releases() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:pt-24">
        <Reveal>
          <p className="kicker text-muted-foreground">// phases</p>
          <h1 className="display mt-5 max-w-3xl text-5xl sm:text-7xl">
            what's shipped, <span className="word-box">in plain words</span>.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground">
            The build plan behind munin: nine phases, each with a deliverable you can check. A
            feature counts as shipped when it is implemented and tested — not when a command
            exists.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="space-y-6">
          {phases.map((phase, i) => (
            <Reveal key={phase.num} delay={Math.min(i * 60, 240)}>
              <TerminalWindow
                title={`phase ${phase.num} · ${phase.title}`}
                date={phase.difficulty + " difficulty"}
                right={
                  <span
                    className={
                      "mono px-2 py-0.5 text-xs lowercase " +
                      (phase.status === "shipped"
                        ? "bg-good text-white"
                        : phase.status === "next"
                          ? "bg-highlight text-ink"
                          : "border border-highlight/60 text-highlight")
                    }
                  >
                    {phase.status}
                  </span>
                }
              >
                <p className="max-w-2xl text-muted-foreground">{phase.blurb}</p>
                <p className="mt-4 text-xs lowercase text-muted-foreground">delivers</p>
                <ul className="mt-1 space-y-1">
                  {phase.delivers.map((d) => (
                    <li key={d} className="lowercase">
                      <span className="text-highlight-deep">→ </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </TerminalWindow>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="checklist" className="scroll-mt-24 border-t border-foreground/10 bg-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-24">
          <Reveal>
            <p className="kicker text-muted-foreground">// acceptance</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">
              the checklist every claim <span className="word-box">must pass</span>.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <TerminalWindow title="acceptance checklist" date="definition of done">
              <ul className="space-y-2">
                {checklist.map((item) => (
                  <li key={item} className="lowercase text-muted-foreground">
                    <span className="text-highlight-deep">[ ]</span> {item}
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
