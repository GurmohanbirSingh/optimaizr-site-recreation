import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/munin/Nav";
import { Footer } from "@/components/munin/Footer";
import { TerminalWindow } from "@/components/munin/TerminalWindow";
import { CopyChip } from "@/components/munin/CopyChip";
import { Reveal } from "@/components/munin/Reveal";
import { ScrollyFeatures, type StoryFeature } from "@/components/munin/ScrollyFeatures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "munin — know where every token went" },
      {
        name: "description",
        content:
          "munin reads your coding-agent history, prices every call in exact dollars, and shows the waste — locally, read-only, nothing uploaded. Free CLI plus a localhost dashboard.",
      },
      { property: "og:title", content: "munin — know where every token went" },
      {
        property: "og:description",
        content:
          "A local-first reckoning for your coding-agent spend. OpenCode 1.x and 2.x, priced to the cent, with rules you can apply and undo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tickerItems = [
  "read-only ingestion",
  "opencode 1.x",
  "opencode 2.x",
  "cache-aware pricing",
  "repeated-work findings",
  "apply / undo",
  "live ledger",
  "localhost dashboard",
  "0 bytes uploaded",
  "fixture-tested totals",
];

const storyFeatures: StoryFeature[] = [
  {
    id: "shared-engine",
    kicker: "one engine, every view",
    title: (
      <>
        the CLI and the dashboard <span className="word-box">share a brain</span>.
      </>
    ),
    body: (
      <p>
        Reports, charts, recommendations — every view calls the same core functions. There is no
        second implementation quietly drifting out of sync, so the dashboard can never disagree
        with the command line.
      </p>
    ),
    terminalTitle: "munin doctor",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin doctor
        </p>
        <p className="text-muted-foreground">engine ................ shared core</p>
        <p className="text-muted-foreground">pricing registry .... loaded</p>
        <p className="text-muted-foreground">rule engine ......... 14 rules</p>
        <p className="text-muted-foreground">cli ↔ dashboard ..... same totals</p>
        <p className="text-good">✓ no duplicated business logic</p>
      </div>
    ),
  },
  {
    id: "readers",
    kicker: "reads both generations",
    title: (
      <>
        OpenCode 1.x and 2.x, <span className="word-box">one story</span>.
      </>
    ),
    body: (
      <p>
        munin detects the schema from your database itself, then folds old and new sessions into a
        single normalized history. Mixed-schema machines don't produce gaps, and migrated sessions
        are never counted twice.
      </p>
    ),
    terminalTitle: "munin sources",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin sources
        </p>
        <p className="text-muted-foreground">opencode 1.x ......... 61 sessions</p>
        <p className="text-muted-foreground">opencode 2.x ........ 148 sessions</p>
        <p className="text-muted-foreground">mixed-schema months .. folded once</p>
        <p className="text-muted-foreground">unknown events ....... carried, not dropped</p>
        <p className="text-good">✓ source database untouched</p>
      </div>
    ),
  },
  {
    id: "pricing",
    kicker: "priced to the cent",
    title: (
      <>
        every call priced, <span className="word-box">nothing invented</span>.
      </>
    ),
    body: (
      <p>
        Provider-reported usage when it exists, per-model input, output, cache-read and
        cache-write prices when it doesn't. Observed cost, estimated cost and potential savings
        stay three separate numbers.
      </p>
    ),
    terminalTitle: "munin prices",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin prices
        </p>
        <p className="text-muted-foreground">input ....... per model, versioned</p>
        <p className="text-muted-foreground">output ...... per model, versioned</p>
        <p className="text-muted-foreground">cache read .. 0.025x–0.05x, not a flat rate</p>
        <p className="text-muted-foreground">cache write . 1.25x and 2x tiers</p>
        <p className="text-good">✓ deterministic: same fixtures, same totals</p>
      </div>
    ),
  },
  {
    id: "waste",
    kicker: "finds repeated work",
    title: (
      <>
        waste, with <span className="word-box">evidence attached</span>.
      </>
    ),
    body: (
      <p>
        Messages sent to an expired cache, oversized tool results, the same file read twice, heavy
        reasoning on trivial answers. Every finding names the rows it came from — checkable, not
        vibes.
      </p>
    ),
    terminalTitle: "munin findings",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin findings
        </p>
        <p className="text-muted-foreground">cache expired mid-task .... 62 hits</p>
        <p className="text-muted-foreground">tool results over 10k ..... 11 rows</p>
        <p className="text-muted-foreground">same file re-read ......... 10 calls</p>
        <p className="text-muted-foreground">small task, huge context .. 1 finding</p>
        <p className="text-highlight-deep">→ each row lists the exact evidence</p>
      </div>
    ),
  },
  {
    id: "rules",
    kicker: "apply, then undo",
    title: (
      <>
        changes you can <span className="word-box">take back</span>.
      </>
    ),
    body: (
      <p>
        Finding an opportunity and applying a change are separate steps. State is captured before
        anything moves, undo restores it, and anything that can't be done safely fails loudly
        instead of guessing.
      </p>
    ),
    terminalTitle: "munin apply",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin apply compact-earlier
        </p>
        <p className="text-muted-foreground">capture prior state ...... ok</p>
        <p className="text-muted-foreground">validate integrations .... ok</p>
        <p className="text-muted-foreground">apply .................... ok</p>
        <p className="text-muted-foreground">record to ledger ......... ok</p>
        <p className="text-highlight-deep">$ munin undo last → prior state restored</p>
      </div>
    ),
  },
  {
    id: "live",
    kicker: "live, not batch",
    title: (
      <>
        a new session appears <span className="word-box">without a restart</span>.
      </>
    ),
    body: (
      <p>
        Incremental scans pick up fresh activity as you work, and the ledger stores derived
        snapshots — never a copy of your history. Repeated scans are idempotent, so nothing is
        ever counted twice.
      </p>
    ),
    terminalTitle: "munin live",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin live
        </p>
        <p className="text-muted-foreground">● watching 3 open sessions</p>
        <p className="text-muted-foreground">+ new session detected .... 0 restarts</p>
        <p className="text-muted-foreground">+ scan re-run ............ no double count</p>
        <p className="text-muted-foreground">+ snapshot saved ......... compare week over week</p>
        <p className="text-good">✓ ledger holds derived state only</p>
      </div>
    ),
  },
  {
    id: "dashboard",
    kicker: "localhost dashboard",
    title: (
      <>
        charts on localhost, <span className="word-box">same numbers</span>.
      </>
    ),
    body: (
      <p>
        An overview of spend and trends, a session explorer, breakdowns by model and token
        category, recommendations with evidence. Bound to your machine, serving the same core as
        the CLI.
      </p>
    ),
    terminalTitle: "munin dashboard",
    terminal: (
      <div className="space-y-1.5">
        <p>
          <span className="text-highlight-deep">$</span> munin dashboard
        </p>
        <p className="text-muted-foreground">serving .................. localhost only</p>
        <p className="text-muted-foreground">overview / sessions ...... ready</p>
        <p className="text-muted-foreground">model + token breakdown .. ready</p>
        <p className="text-muted-foreground">recommendations .......... evidence-backed</p>
        <p className="text-good">✓ totals match the CLI, by construction</p>
      </div>
    ),
  },
];

const faqItems = [
  {
    q: "does anything leave my machine?",
    a: "No. munin reads token counts from files and databases your agents already write. There is no account, no server and no telemetry. Optional network calls (like replay verification against your own provider) use your key and stay opt-in.",
  },
  {
    q: "what can it read?",
    a: "OpenCode 1.x and 2.x session history — detected by schema, merged into one normalized stream — plus the other source readers confirmed against the original project's inventory. Ingestion is strictly read-only.",
  },
  {
    q: "how do i know the numbers are right?",
    a: "Fixture tests pin known totals, every cost and savings estimate ships with its calculation, and the acceptance checklist requires the CLI and the dashboard to agree. Measured results and estimates are labelled separately.",
  },
  {
    q: "does it just tell me to use smaller models?",
    a: "No. Model choice is one rule among fourteen, and rarely the biggest one — every call re-reads the conversation, so compounding cache waste usually dominates. Findings name the lever and the evidence.",
  },
  {
    q: "what does it cost?",
    a: "The CLI and the localhost dashboard are free. No backend, no database server, no account — the architecture is deliberately local-first.",
  },
];

const architectureLayers = [
  {
    label: "local data sources",
    detail: "opencode 1.x · opencode 2.x · other confirmed readers",
  },
  {
    label: "shared core",
    detail: "normalization · pricing · token/cost math · cache analysis · rules · reports",
  },
  {
    label: "local runtime",
    detail: "ledger · incremental scans · live refresh · replay + verification",
  },
  {
    label: "interfaces",
    detail: "cli commands · localhost dashboard — both thin, both on the core",
  },
];

function SampleReportRows() {
  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground">plan detected · 412 calls · 38 days · 96.4M tokens</p>
      <p>&nbsp;</p>
      <div className="grid grid-cols-[1fr_auto] gap-x-6">
        <span className="text-muted-foreground">re-reading the conversation</span>
        <span>54%</span>
        <span className="text-muted-foreground">loading context into cache</span>
        <span>27%</span>
        <span className="text-muted-foreground">answers, code and thinking</span>
        <span>19%</span>
      </div>
      <p>&nbsp;</p>
      <p className="text-highlight-deep">clear waste — sample workspace, not your machine</p>
      <div className="grid grid-cols-[1fr_auto] gap-x-6">
        <span className="text-muted-foreground">messages sent to an expired cache</span>
        <span>$2.17</span>
        <span className="text-muted-foreground">tool results over 10k tokens</span>
        <span>$0.88</span>
        <span className="text-muted-foreground">same file read twice</span>
        <span>$0.31</span>
      </div>
      <p>&nbsp;</p>
      <p>
        clear waste / month <span className="text-good">$3.36</span>
      </p>
      <p className="text-muted-foreground">never added together: compact earlier · smaller default model</p>
      <p className="text-good">✓ read locally · 0 bytes uploaded</p>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* ---------- hero ---------- */}
      <section className="ruled border-b border-foreground/10">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
          <Reveal>
            <p className="mono inline-flex items-center gap-2 border border-foreground/20 bg-background px-3 py-1.5 text-sm lowercase">
              <span className="bg-ink px-1.5 text-on-ink">new</span> one engine, both views · phase
              1 shipped
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-8 text-5xl sm:text-7xl lg:text-[5.2rem]">
              know where <span className="word-box">every token</span>
              <br />
              went.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground">
              munin reads the history your coding agents already write, prices every call in exact
              dollars, and shows the waste — on your machine, with nothing uploaded.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <CopyChip command="npm i -g munin" />
              <p className="mono text-sm text-muted-foreground">
                then run <span className="text-foreground">munin report</span>, one of 9 commands
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mono mt-4 text-sm">
              <Link to="/demo" className="text-highlight-deep hover:underline">
                watch the 60-second run →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- hero terminal cluster ---------- */}
      <section className="grid-paper border-b border-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <TerminalWindow title="munin report" date="sample workspace" className="lg:-rotate-[0.4deg]">
                <SampleReportRows />
              </TerminalWindow>
            </Reveal>
            <div className="space-y-8">
              <Reveal delay={120}>
                <TerminalWindow title="munin live · watching">
                  <div className="space-y-1.5">
                    <p className="text-muted-foreground">⏸ cache expired — hold the message</p>
                    <p className="text-muted-foreground">
                      sending it now re-writes the whole context:{" "}
                      <span className="text-foreground">$1.30</span>
                    </p>
                    <p className="text-good">✓ held — restart from a short note instead</p>
                    <p>&nbsp;</p>
                    <p className="text-muted-foreground">● 3 open sessions · ledger current</p>
                  </div>
                </TerminalWindow>
              </Reveal>
              <Reveal delay={220}>
                <TerminalWindow title="munin doctor" bodyClassName="p-5">
                  <p className="text-muted-foreground">7 feature areas · 1 shared engine</p>
                  <p className="text-muted-foreground">phase 0–1 shipped · 2–8 spec'd</p>
                </TerminalWindow>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ticker ---------- */}
      <div className="overflow-hidden border-b border-foreground/10 bg-ink py-3">
        <div className="ticker-track mono flex w-max gap-8 text-sm lowercase text-on-ink">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              {item} <span className="text-on-ink/40">▮</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- what it is ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <p className="kicker text-muted-foreground">// what it is</p>
          <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">
            a reckoning for your agent spend.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <Reveal>
            <h3 className="display text-2xl">one shared engine</h3>
            <p className="mt-4 text-muted-foreground">
              Normalization, pricing, rules and reports live in one core. The CLI and the dashboard
              are thin skins over it — neither can invent its own numbers.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="display text-2xl">your machine only</h3>
            <p className="mt-4 text-muted-foreground">
              Read-only ingestion, a local ledger of derived snapshots, no backend and no database
              server. The architecture is local-first by design, not by promise.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="display text-2xl">two interfaces</h3>
            <p className="mt-4 text-muted-foreground">
              Nine commands for the terminal, an interactive dashboard for the bigger picture.
              Same data, same recommendations, same safety rails.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- feature scroll story ---------- */}
      <section id="features" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8">
          <Reveal>
            <p className="kicker text-muted-foreground">// the tour</p>
            <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">
              seven things it does, <span className="word-box">one screen</span> at a time.
            </h2>
            <p className="mono mt-4 text-sm text-muted-foreground">
              keep scrolling — the windows change as you go.
            </p>
          </Reveal>
        </div>
        <ScrollyFeatures features={storyFeatures} />
      </section>

      {/* ---------- sample receipt ---------- */}
      <section className="border-t border-foreground/10 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Reveal>
            <p className="kicker text-muted-foreground">// the receipt</p>
            <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">
              the report your AI bill never came with.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <TerminalWindow
              title="receipt for a sample workspace"
              date="fixture data"
              className="mx-auto max-w-2xl"
            >
              <SampleReportRows />
            </TerminalWindow>
          </Reveal>
          <Reveal delay={200}>
            <p className="mono mt-6 text-center text-xs lowercase text-muted-foreground">
              // sample output · numbers from a fixture workspace, never your machine until you
              run it
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- architecture ---------- */}
      <section id="architecture" className="scroll-mt-16 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Reveal>
            <p className="kicker text-muted-foreground">// architecture</p>
            <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">
              four layers, <span className="word-box">one core</span>.
            </h2>
          </Reveal>
          <div className="mt-14">
            {architectureLayers.map((layer, i) => (
              <Reveal key={layer.label} delay={i * 80}>
                <div className="mono grid gap-2 border-t border-foreground/15 py-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <span className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:grid sm:grid-cols-[220px_1fr] sm:gap-8">
                    <span className="font-semibold lowercase">{layer.label}</span>
                    <span className="text-sm lowercase text-muted-foreground">{layer.detail}</span>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-foreground/15" />
          </div>
        </div>
      </section>

      {/* ---------- phases teaser ---------- */}
      <section className="border-t border-foreground/10 bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Reveal>
            <p className="kicker text-muted-foreground">// phases</p>
            <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl">
              built in the open, <span className="word-box">phase by phase</span>.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                phase: "phase 1",
                title: "workspace + shared contracts",
                status: "shipped",
              },
              {
                phase: "phase 2",
                title: "ingestion: opencode 1.x + 2.x",
                status: "next",
              },
              {
                phase: "phase 3",
                title: "analysis, pricing, reporting",
                status: "spec'd",
              },
            ].map((p, i) => (
              <Reveal key={p.phase} delay={i * 100}>
                <div className="mono terminal-sheet p-6">
                  <p className="text-xs lowercase text-muted-foreground">{p.phase}</p>
                  <p className="mt-3 text-lg font-semibold lowercase">{p.title}</p>
                  <p className="mt-4 inline-block bg-ink px-2 py-1 text-xs lowercase text-on-ink">
                    {p.status}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mono mt-10 text-sm">
              <Link to="/releases" className="text-highlight-deep hover:underline">
                every phase, in plain words →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section id="faq" className="scroll-mt-16 border-t border-foreground/10">
        <div className="mx-auto max-w-3xl px-4 py-24">
          <Reveal>
            <p className="kicker text-muted-foreground">// faq</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">questions i get asked.</h2>
          </Reveal>
          <div className="mt-12">
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="group border-t border-foreground/15 py-5 [&:last-child]:border-b">
                  <summary className="mono flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                    <span>
                      <span className="text-highlight-deep">› </span>
                      {item.q}
                    </span>
                    <span className="text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- cta ---------- */}
      <section id="try" className="scroll-mt-16 border-t border-foreground/10 bg-ink text-background">
        <div className="mx-auto max-w-6xl px-4 py-28 text-center">
          <Reveal>
            <p className="kicker text-on-ink/70">// try it</p>
            <h2 className="display mt-5 text-4xl sm:text-6xl">
              try it on your <span className="word-box">own history</span>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex justify-center">
              <CopyChip command="npx munin report" />
            </div>
            <p className="mono mt-5 text-sm lowercase text-background/60">
              free · local · read-only · runs once without installing
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
