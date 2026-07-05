import {
  BookOpen,
  Map,
  Sparkles,
  Trophy,
} from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    bg: "bg-forest/10",
    title: "Learn real life skills",
    desc: "5-minute lessons on taxes, budgeting, insurance — designed for complete beginners.",
  },
  {
    icon: Map,
    bg: "bg-lavender/20",
    title: "Personalized roadmaps",
    desc: "AI generates your unique life roadmap based on your age, salary, and goals.",
  },
  {
    icon: Sparkles,
    bg: "bg-gold/15",
    title: "AI Life Coach",
    desc: 'Ask anything — from "Can I afford a bike?" to "How much should I save?" — and get honest answers.',
  },
  {
    icon: Trophy,
    bg: "bg-sage/25",
    title: "Track and level up",
    desc: "Gamified progress, achievement badges, and your Life Readiness Score to keep you going.",
  },
];

export default function WhySection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-xs text-sage uppercase tracking-widest font-medium mb-3">Why Adulting OS</p>
      <h2 className="text-4xl font-medium text-forest tracking-tight mb-3">
        Everything you weren't taught in school
      </h2>
      <p className="text-ink/55 max-w-md mb-12 leading-relaxed">
        One platform for every skill you need to navigate adult life — guided by AI, built for your generation.
      </p>

      <div className="grid grid-cols-2 gap-5">
        {cards.map((c) => (
          <div key={c.title} className="bg-white border border-forest/10 rounded-2xl p-7">
            <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center text-xl mb-4`}>
              <c.icon size={22} className="text-forest" />
            </div>
            <h3 className="text-base font-medium text-forest mb-1.5">{c.title}</h3>
            <p className="text-sm text-ink/60 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}