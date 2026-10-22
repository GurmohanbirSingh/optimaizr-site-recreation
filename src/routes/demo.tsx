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
    cmd: "munin analyze --findings",
    output: String.raw`[source.aggregate-mismatch] Session aggregates disagree with message totals (max delta 700 tokens) (x1)

Findings
------------------------------------------------------------------------
  db           /home/parth/.local/share/opencode/opencode.db
  recoverable  fix $0.020132 (3 calls) | try $0.564440 (100) | test $0.000000 | all $0.577424

------------------------------------------------------------------------

[try] 1 sessions start with unusually heavy first calls  heavy-start
  severity low  confidence medium  verification replay  advisory no
  detail       Initial calls are much larger than immediate follow-ups, indicating cold-start context overloading.
  why          Heavy starts pay full input rates before cache/read patterns stabilize.
  affected     1 calls, models gpt-5.3-codex, share 1.17%
  savings      window $0.013915 | monthly $0.417450 | annual $5.078975 | current $0.028867 | tokens 11,132
  evidence     inferred: First-call input compared to early-session baseline
  calculation  Per session: max(0, first-call input - avg(input of calls 2-3)) x input-rate / 1,000,000.
  assumption   Early follow-up calls approximate the session's steady-state input size.
  fix          Move rarely-needed setup context out of the first call or split warm-up from active work.
  observations 1 (first 5 shown)
               ses_e9bad5928ffemMHwvAI7jIqGpO: first input=12225

------------------------------------------------------------------------

[test] github-copilot/gpt-5.3-codex handles 98.0% of calls  model-default
  severity low  confidence low  verification manual  advisory yes
  detail       One default model dominates usage, reducing specialization opportunities.
  why          Single-model defaults can overpay for easy traffic and underfit complex traffic.
  affected     100 calls, models gpt-5.3-codex, share 100.00%
  savings      window $0.000000 | monthly $0.000000 | annual $0.000000 | current $2.476384 | tokens 7,722,644
  evidence     measured: Call distribution measured by model
  calculation  Advisory sizing at 5% of dominant-model spend.
  assumption   A mixed default policy could improve fit for part of this traffic.
  fix          Review default model routing so easy and hard tasks are separated.
  observations 1 (first 5 shown)
               github-copilot/gpt-5.3-codex: 100/102 calls

------------------------------------------------------------------------

[try] github-copilot/gpt-5.3-codex appears over-provisioned for part of traffic  model-fit
  severity medium  confidence low  verification replay  advisory no
  detail       High average cost per call on github-copilot/gpt-5.3-codex with low average output suggests some calls could run on a cheaper lane.
  why          Misfit model selection raises cost without proportional output gains.
  affected     100 calls, models gpt-5.3-codex, share 100.00%
  savings      window $0.495277 | monthly $14.858304 | annual $180.776036 | current $2.476384 | tokens 8,554
  evidence     inferred: Per-model cost/call and output/call compared within the same window
  calculation  (avg cost/call expensive lane - avg cost/call cheaper lane) x 20% of expensive-lane calls.
  assumption   Roughly 20% of expensive-lane calls are simple enough for a cheaper model.
  fix          Route routine traffic to a cheaper model lane and keep the expensive lane for complex calls.
  observations 2 (first 5 shown)
               github-copilot/gpt-5.3-codex: avg $0.024764/call, avg out 428 tok
               opencode/flint-40b-free: avg $0.000000/call

------------------------------------------------------------------------

[try] 5 calls carried oversized input payloads  oversized-input
  severity medium  confidence medium  verification replay  advisory no
  detail       Calls above 12,000 input tokens likely include avoidable context carry-over.
  why          Large repeated input raises cost on every call and usually slows iteration.
  affected     5 calls, models gpt-5.3-codex, share 14.47%
  savings      window $0.138047 | monthly $4.141425 | annual $50.387337 | current $0.358402 | tokens 110,438
  evidence     measured: Input tokens counted directly per call
  calculation  Sum(max(0, input - 12000) x input-rate / 1,000,000) on each call's dated card (2026-10-22 catalogue).
  assumption   Input above 12,000 tokens is partly removable via tighter context selection.
  fix          Trim carried context and prefer targeted reads/chunks over full-history replay.
  observations 5 (first 5 shown)
               msg_16452a7d0001neFNcQZ6wAujdD: in=12,225
               msg_16452fdc4001W93nTzsF4pJy7V: in=15,859
               msg_1645492ca001r5g7mB2gcJlBY4: in=13,990
               msg_16459bb9b001NH6Ss4OSk7uw6w: in=48,339
               msg_164640150001MuiuME8CCRAiA2: in=80,025

------------------------------------------------------------------------

[fix] 3 calls ingested oversized tool output  oversized-tool-output
  severity low  confidence high  verification not-required  advisory no
  detail       Large tool payloads were inserted into context in full where summaries or slices would likely suffice.
  why          Oversized tool output inflates next-call input and repeated-context costs.
  affected     3 calls, models gpt-5.3-codex, share 1.44%
  savings      window $0.020132 | monthly $0.603975 | annual $7.348362 | current $0.035745 | tokens 16,106
  evidence     measured: Tool result sizes counted from captured result characters
  calculation  Sum(max(0, tool-result-tokens - 4000) x input-rate / 1,000,000) on each call's dated card (2026-10-22 catalogue).
  assumption   Only the excess above a large payload threshold is treated as removable waste.
  fix          Replace full tool dumps with targeted ranges, summaries, or filtered output.
  observations 3 (first 5 shown)
               msg_16452ecc0001XidE32fnU5jfdP: oversized tool output observed
               msg_16453236e001z06yp4ybB0NdO6: oversized tool output observed
               msg_1646908c2001JVy2DqrPplSO1w: oversized tool output observed

------------------------------------------------------------------------

[test] One session holds 96.8% of spend  spend-concentration
  severity low  confidence medium  verification manual  advisory yes
  detail       Session ses_e9bad5928ffemMHwvAI7jIqGpO dominates window spend, which raises optimization leverage and risk concentration.
  why          When spend concentrates in one lane, a small fix there has outsized impact.
  affected     90 calls, models gpt-5.3-codex, share 96.82%
  savings      window $0.000000 | monthly $0.000000 | annual $0.000000 | current $2.397704 | tokens 7,646,464
  evidence     measured: Spend share computed from per-call headline costs
  calculation  Top-session spend share = session-headline / window-headline; advisory sized as (share - 50%) of top session spend.
  assumption   Concentration indicates optimization leverage, not guaranteed removability.
  fix          Inspect the dominant session first (model choice, context size, retries, and tool-output volume).
  observations 1 (first 5 shown)
               ses_e9bad5928ffemMHwvAI7jIqGpO: 90 calls, share 96.8%`.trimEnd().split("\n"),
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
