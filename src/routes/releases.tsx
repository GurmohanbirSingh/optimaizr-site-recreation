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
          "The munin help screen: start here, look closer, about, the flags most commands take, help and environment — every command as it runs today.",
      },
      { property: "og:title", content: "munin — docs, in plain words" },
      {
        property: "og:description",
        content:
          "Every munin command and flag in plain boxes, grouped the way the help screen prints them.",
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
    title: "start here",
    status: "shipped",
    meta: "munin",
    blurb: "Your usage, waste and the biggest win.",
    commands: [
      "munin              your usage, waste and the biggest win",
      "munin scan         spend, findings and data health",
      "munin sessions     costliest sessions and where the cost climbs",
      "munin live         watch calls as they happen (also munin watch)",
      "munin desktop      open the Munin desktop app",
    ],
  },
  {
    num: "2",
    title: "look closer",
    status: "shipped",
    meta: "munin",
    blurb: "Where the money goes, and only the opportunities.",
    commands: [
      "munin why          where the money goes: model, project and kind of work",
      "munin tokens       token analytics and the priciest calls (also munin analytics)",
      "munin waste        only the opportunities, each with its fix",
      "munin show <rule>  the calls a recommendation touches",
    ],
  },
  {
    num: "3",
    title: "about",
    status: "shipped",
    meta: "munin",
    blurb: "What can be read, and what is collected.",
    commands: [
      "munin providers    what can be read, and from where",
      "munin privacy      what is collected, stored and sent (also munin security)",
    ],
  },
  {
    num: "4",
    title: "most commands take",
    status: "shipped",
    meta: "flags",
    blurb: "Shared flags, honored across the command set.",
    commands: [
      "--days N           only the last N days",
      "--project STR      filter by project path",
      "--tz ZONE          day-bucket zone: utc, local or an IANA name",
      "--db PATH          OpenCode database path",
      "--state-dir PATH   Munin state directory",
      "--why              show every calculation and assumption",
      "--json             machine-readable output",
    ],
  },
  {
    num: "5",
    title: "help",
    status: "shipped",
    meta: "munin",
    blurb: "Every command has its own help.",
    commands: ["munin help <command>    that command's own flags"],
  },
  {
    num: "6",
    title: "environment",
    status: "shipped",
    meta: "munin",
    blurb: "Paths and runtime as munin sees them right now.",
    commands: [
      "database /home/parth/.local/share/opencode/opencode.db (default, ready)",
      "state    /home/parth/.munin",
      "settings /home/parth/.munin/config.json",
      "runtime  node v24.21.0 linux x64",
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
            The help screen behind munin: six boxes, one per group, each with the exact commands as
            they run today.
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
                    <li key={d} className="whitespace-pre">
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
