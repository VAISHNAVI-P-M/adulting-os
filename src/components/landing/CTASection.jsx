export default function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <div className="bg-forest rounded-3xl p-16 text-center">
        <h2 className="text-4xl font-medium text-cream tracking-tight mb-4">
          Start your adulting journey today.
        </h2>
        <p className="text-cream/55 mb-10 max-w-sm mx-auto leading-relaxed">
          Your journey starts with a single step.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-cream text-forest px-7 py-3.5 rounded-full text-sm font-medium hover:bg-cream/90 transition-colors">
            Start for free
          </button>
          <button className="bg-lavender text-forest px-7 py-3.5 rounded-full text-sm font-medium hover:bg-lavender/80 transition-colors">
            ✨ Try Life Coach AI
          </button>
        </div>
      </div>
    </section>
  );
}