import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/munin/Nav";
import { Footer } from "@/components/munin/Footer";
import { TerminalWindow } from "@/components/munin/TerminalWindow";
import { Reveal } from "@/components/munin/Reveal";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: "munin — docs, in plain words" },
      {
        name: "description",
        content:
          "The munin command reference: top-level npm commands, workspace commands, the CLI binary, the reader/analyze/scan harnesses, environment variables, tests and planned commands.",
      },
      { property: "og:title", content: "munin — docs, in plain words" },
      {
        property: "og:description",
        content:
          "Every munin command, flag and exit code in plain boxes: harnesses, environment variables, tests and planned-but-not-wired commands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Releases,
});

type Doc = {
  num: string;
  title: string;
  status: "shipped" | "next" | "spec'd";
  meta: string;
  blurb: string;
  commands: string[];
};

const docs: Doc[] = [
  {
    num: "1",
    title: "top-level npm commands",
    status: "shipped",
    meta: "repo root",
    blurb: "Run from the repository root.",
    commands: [
      "npm ci — clean install from package-lock.json",
      "npm install — install/update dependencies",
      "npm run build — build all workspaces: core, local, cli",
      "npm run typecheck — build first, then typecheck every workspace",
      "npm test — build first, then run the full test suite with node --test",
      "npm run reader -- <flags> — build, then run the reader/debug harness",
      "npm run analyze -- <flags> — build, then run the analysis/report harness",
      "npm run scan -- <flags> — build, then run the scan/ledger/watch harness",
      "npm run format — run prettier and rewrite files",
      "npm run format:check — check formatting without writing",
      "lifecycle scripts run automatically: npm run pretypecheck · npm run pretest",
    ],
  },
  {
    num: "2",
    title: "workspace commands",
    status: "shipped",
    meta: "workspaces",
    blurb: "Useful when working on one package only.",
    commands: [
      "npm run build -w packages/core · packages/local · apps/cli",
      "npm run typecheck -w packages/core · packages/local · apps/cli",
      "npm run dev -w packages/core · packages/local · apps/cli — tsc --watch",
      "npm run build --workspaces --if-present",
      "npm run typecheck --workspaces --if-present",
    ],
  },
  {
    num: "3",
    title: "cli binary",
    status: "shipped",
    meta: "dist/cli.js",
    blurb: "The CLI is built to apps/cli/dist/cli.js.",
    commands: [
      "node apps/cli/dist/cli.js --version",
      "node apps/cli/dist/cli.js -v",
      "munin --version · munin -v — when the workspace binary is linked or installed",
      "node apps/cli/dist/cli.js — prints the version plus “commands are not wired yet”, exits 1",
      "node apps/cli/dist/cli.js --help — same output as no version flag",
    ],
  },
  {
    num: "4",
    title: "reader harness",
    status: "shipped",
    meta: "harness",
    blurb: "Command form: npm run reader -- [mode] [--db <path>] [--json]",
    commands: [
      "--schema — detect schema, tables and session counts. This is the default mode",
      "--rows — raw v2 row counts: messages, tools, text chars, instructions",
      "--summary — aggregate sessions/messages/model calls and token totals",
      "--reconcile — compare session-level aggregates with message-level sums",
      "--check-privacy — check the normalized dataset for banned keys",
      "--session <id> — session-scoped summary, cannot combine with another mode",
      "--db <path> — override the opencode database path",
      "--json — structured JSON output, honored by summary, session, reconcile and privacy",
      "examples: npm run reader -- --summary --json · --reconcile · --db /path/to/opencode.db --schema",
      "exit codes: 0 success · 1 runtime/source failure · 64 usage error / conflicting modes",
    ],
  },
  {
    num: "5",
    title: "analyze harness",
    status: "shipped",
    meta: "harness",
    blurb: "Command form: npm run analyze -- [mode] [options]",
    commands: [
      "--totals — totals, window, token breakdown, cost, savings",
      "--models — spend/token table by provider/model",
      "--sessions — session table with calls, tokens, cache hit rate, cost",
      "--cache — cache traffic, hit rate and instruction-prefix grouping",
      "--findings — findings, recommendations and rule coverage",
      "--report — full text report including data health",
      "--events — per-call event table",
      "--session <id> — one session plus its calls and failed attempts",
      "--db <path> · --tz <zone> · --json · --check-privacy",
      "--decide <viewed|applied|done|dismissed> <rule> — record a decision, writes to the decision store",
      "--verify-state — print verification state for every rule",
      "--accept-risk <rule> — accept manual risk for a manual-verification rule",
      "behavior: --decide with no data mode defaults to --findings; no mode and no state action exits 64",
      "exit codes: 0 success · 1 runtime/source/rule failure · 64 usage error",
    ],
  },
  {
    num: "6",
    title: "scan harness",
    status: "shipped",
    meta: "harness",
    blurb: "Command form: npm run scan -- [options]",
    commands: [
      "--db <path> — override the opencode database path",
      "--state-dir <path> — override munin's state directory",
      "--full — read all sessions and reconcile the ledger",
      "--repair — rewrite ledger slices when --full finds drift. Requires --full",
      "--check-privacy — validate slice/snapshot journals and the candidate cursor",
      "--watch — poll the database for changes",
      "--interval <ms> — watch interval, default 2000, minimum 500",
      "--snapshots — list saved snapshots and show the latest trend",
      "--results — compare applied changes with before/after usage",
      "--tz <zone> — day-bucket timezone · --help, -h — show scan usage",
      "rules: --snapshots and --results are mutually exclusive and cannot pair with --full, --repair, --watch or --check-privacy",
      "exit codes: 0 success · 1 runtime/source failure · 64 usage error",
    ],
  },
  {
    num: "7",
    title: "environment variables",
    status: "shipped",
    meta: "env vars",
    blurb: "These affect the harnesses and path resolution.",
    commands: [
      "MUNIN_DB — source database path. Wins over settings",
      "MUNIN_DIR — munin state root. Defaults to <home>/.munin",
      "XDG_DATA_HOME — replaces the data root when absolute",
      "MUNIN_DEBUG — print stack traces for expected failures",
      "precedence: --db > MUNIN_DB > the db key in $MUNIN_DIR/config.json > opencode default",
      "opencode default: <home>/.local/share/opencode/opencode.db",
      "example: MUNIN_DIR=/tmp/munin-state npm run analyze -- --totals",
    ],
  },
  {
    num: "8",
    title: "targeted test commands",
    status: "shipped",
    meta: "node --test",
    blurb: "The official test command is npm test. For a single test file, build first.",
    commands: [
      "npm test",
      "npm run build && node --test tests/unit/scan-runtime.test.mjs",
      "npm run build && node --test tests/unit/analyze-report.test.mjs",
      "replace the filename with any file under tests/unit/",
    ],
  },
  {
    num: "9",
    title: "planned cli commands, not wired yet",
    status: "spec'd",
    meta: "not wired",
    blurb:
      "Listed in docs/parity-matrix.md as planned surface, but apps/cli does not dispatch them yet.",
    commands: [
      "munin · munin waste · munin show <rule> · munin why",
      "munin sessions · munin tokens · munin report",
      "munin apply · munin undo · munin simulate --to <model>",
      "munin card · munin verify --replay · munin providers · munin privacy",
      "phase 5 functionality is reachable only through the harnesses",
      "npm run scan · npm run scan -- --watch · npm run scan -- --results",
      "do not document these as working commands",
    ],
  },
  {
    num: "10",
    title: "quick reference",
    status: "shipped",
    meta: "cheat sheet",
    blurb: "The same commands, grouped for copy-paste.",
    commands: [
      "setup: npm ci · npm run build · npm run typecheck · npm test",
      "reader: npm run reader -- --schema · --summary · --reconcile",
      "analysis: npm run analyze -- --totals · --findings · --report · --events",
      "scan: npm run scan · --full · --watch · --snapshots · --results",
      "formatting: npm run format · npm run format:check",
      "cli version: node apps/cli/dist/cli.js --version",
      "accuracy note: --rules is not implemented — use --findings or --verify-state",
    ],
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
          <p className="kicker text-muted-foreground">// docs</p>
          <h1 className="display mt-5 max-w-3xl text-5xl sm:text-7xl">
            every command, <span className="word-box">in plain words</span>.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground">
            The command reference behind munin: ten boxes, one per section, each with the exact
            commands as they run today. Section 9 is the one exception — planned commands that are
            not wired yet.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="space-y-6">
          {docs.map((doc, i) => (
            <Reveal key={doc.num} delay={Math.min(i * 60, 240)}>
              <TerminalWindow
                title={`doc ${doc.num} · ${doc.title}`}
                date={doc.meta}
                right={
                  <span
                    className={
                      "mono px-2 py-0.5 text-xs lowercase " +
                      (doc.status === "shipped"
                        ? "bg-good text-on-highlight"
                        : doc.status === "next"
                          ? "bg-highlight text-on-highlight"
                          : "border border-highlight/60 text-highlight")
                    }
                  >
                    {doc.status}
                  </span>
                }
              >
                <p className="max-w-2xl text-muted-foreground">{doc.blurb}</p>
                <p className="mt-4 text-xs lowercase text-muted-foreground">commands</p>
                <ul className="mt-1 space-y-1">
                  {doc.commands.map((d) => (
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
