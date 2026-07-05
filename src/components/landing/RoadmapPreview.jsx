const levels = [
  { n: 1, title: "Open a savings account",       state: "done"    },
  { n: 2, title: "Build ₹10,000 emergency fund", state: "done"    },
  { n: 3, title: "Learn tax basics",             state: "active"  },
  { n: 4, title: "Understand health insurance",  state: "locked"  },
  { n: 5, title: "Start investing",              state: "locked"  },
];

export default function RoadmapPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <div className="bg-forest rounded-3xl p-10">
        <p className="text-xs text-sage uppercase tracking-widest font-medium mb-3">Your roadmap</p>
        <h2 className="text-3xl font-medium text-cream tracking-tight mb-1">
          AI builds your personal life quest
        </h2>
        <p className="text-cream/50 text-sm mb-8">Every level unlocked is a real life skill mastered.</p>

        <div className="flex flex-col gap-3">
          {levels.map((lv) => (
            <div
              key={lv.n}
              className={`
                flex items-center gap-4 rounded-xl px-5 py-4
                ${lv.state === "active"
                  ? "bg-lavender/15 border border-lavender/30"
                  : "bg-cream/5 border border-cream/10"}
              `}
            >
              <span className={`
                text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap
                ${lv.state === "done"   ? "bg-sage text-forest"            : ""}
                ${lv.state === "active" ? "bg-lavender text-forest"         : ""}
                ${lv.state === "locked" ? "bg-gold/80 text-ink"             : ""}
              `}>
                Level {lv.n} {lv.state === "done" ? "✓" : ""}
              </span>

              <span className={`flex-1 text-sm ${lv.state === "locked" ? "text-cream/40" : "text-cream"}`}>
                {lv.title}
              </span>

              {lv.state === "active" && (
                <button className="text-lavender text-xs border border-lavender/40 bg-lavender/10 px-3 py-1.5 rounded-full">
                  ✨ Explain this
                </button>
              )}
              {lv.state === "locked" && (
                <span className="text-cream/30 text-xs">Locked</span>
              )}
              {lv.state === "done" && (
                <span className="text-cream/40 text-xs">Completed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}