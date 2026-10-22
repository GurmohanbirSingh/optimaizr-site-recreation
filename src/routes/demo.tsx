import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/munin/Nav";
import { Footer } from "@/components/munin/Footer";
import { Reveal } from "@/components/munin/Reveal";
import { TypingTerminal, type DemoScriptBlock } from "@/components/munin/TypingTerminal";
import { CopyChip } from "@/components/munin/CopyChip";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "munin — the 60-second run" },
      {
        name: "description",
        content:
          "Watch munin work a sample workspace: report, sessions, why, and live — in one scripted terminal run.",
      },
      { property: "og:title", content: "munin — the 60-second run" },
      {
        property: "og:description",
        content:
          "A scripted terminal run of munin against sample workspace data: report, sessions, why, and live.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Demo,
});

// sample workspace data — clearly labelled, never presented as a real user's machine
const script: DemoScriptBlock[] = [
  {
    cmd: "npx munin report",
    output: [
      "plan detected · 412 calls · 38 days · 96.4M tokens",
      "",
      "observed cost ......... $26.40",
      "clear waste ........... $3.36 / month",
      "biggest lever ......... compact earlier → up to $18.00 / month",
      "",
      "✓ read locally · 0 bytes uploaded",
    ],
  },
  {
    cmd: "munin sessions --heavy",
    output: [
      "morning-refactor ....... 18 calls · 61% re-read",
      "flaky-test-hunt ........ 9 calls · cache expired 4x",
      "onboarding-email-draft .. 6 calls · 463k context",
    ],
  },
  {
    cmd: "munin why flaky-test-hunt",
    output: [
      "the cache expired between runs, so each return re-wrote",
      "the full conversation. 4 returns × $0.32 ............ $1.28",
      "rule: hold the message once, restart from a note",
      "evidence: 62 similar hits across the workspace",
    ],
  },
  {
    cmd: "munin live",
    output: [
      "● watching 3 open sessions",
      "⏸ cache expired — hold? sending costs $1.30   [y/n]",
      "✓ held — next turn starts from a short note",
    ],
  },
];

function Demo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pt-24">
        <Reveal>
          <p className="mono inline-block border border-foreground/20 px-3 py-1.5 text-xs lowercase">
            demo
          </p>
          <h1 className="display mt-6 max-w-3xl text-5xl sm:text-7xl">
            munin in <span className="word-box">60 seconds</span>.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground">
            One scripted run against sample workspace data: report, sessions, why, and live. The
            window below plays itself — press replay any time, or run it for real on your own
            history.
          </p>
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <TypingTerminal title="zsh — ~/workspace" script={script} className="mx-auto max-w-3xl" />
        </Reveal>

        <Reveal delay={200}>
          <p className="mono mt-6 text-center text-xs lowercase text-muted-foreground">
            // sample workspace · every number here is fixture data, not a real machine
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-14 flex flex-col items-center gap-4">
            <CopyChip command="npx munin report" />
            <p className="mono text-sm">
              <Link to="/" className="text-highlight-deep hover:underline">
                ← back to the full tour
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
