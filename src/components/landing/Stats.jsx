const skills = [
  {
    icon: "💰",
    bg: "bg-sage/20",
    title: "Money",
    desc: "Budgeting, saving & emergency funds",
  },
  {
    icon: "📄",
    bg: "bg-lavender/20",
    title: "Taxes",
    desc: "Learn tax basics without jargon",
  },
  {
    icon: "🏠",
    bg: "bg-gold/20",
    title: "Housing",
    desc: "Renting, deposits & utilities",
  },
  {
    icon: "🩺",
    bg: "bg-rose-100",
    title: "Insurance",
    desc: "Health, vehicle & life insurance",
  },
  {
    icon: "📈",
    bg: "bg-emerald-100",
    title: "Investing",
    desc: "SIPs, mutual funds & stocks",
  },
  {
    icon: "💼",
    bg: "bg-sky-100",
    title: "Career",
    desc: "Salary, offers & workplace basics",
  },
];

export default function SkillsSection() {
  return (
    <section className="py-20 border-y border-forest/10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-sage font-medium mb-3">
            WHAT YOU'LL MASTER
          </p>

          <h2 className="text-4xl font-medium text-forest tracking-tight mb-4">
            Adult life, one skill at a time
          </h2>

          <p className="max-w-2xl mx-auto text-ink/60 leading-relaxed">
            Learn practical life skills—from managing your first salary to
            understanding taxes, insurance, renting, and investing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group bg-white border border-forest/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${skill.bg} flex items-center justify-center text-3xl mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                {skill.icon}
              </div>

              <h3 className="text-lg font-medium text-forest mb-2">
                {skill.title}
              </h3>

              <p className="text-sm text-ink/60 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}