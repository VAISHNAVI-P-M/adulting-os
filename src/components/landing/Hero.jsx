export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}

        <div>

          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-sage/20 border border-sage/40 text-forest text-xs px-4 py-1.5 rounded-full mb-8">
            🌱 Your personal adulting companion
          </div>

          {/* Heading */}

          <h1 className="text-5xl lg:text-6xl font-medium text-forest leading-tight tracking-tight mb-6">
            Adulting is{" "}
            <span className="text-sage">confusing.</span>
            <br />
            We'll guide you step by step.
          </h1>

          {/* Subheading */}

          <p className="text-lg text-ink/60 leading-relaxed max-w-xl mb-10">
            Master money, housing, taxes, health, insurance,
            and life skills without the confusion.
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mb-8">

            <button className="bg-forest text-cream px-7 py-3.5 rounded-full text-sm font-medium hover:bg-forest/90 transition">
              Start My Journey
            </button>

            <button className="bg-lavender text-forest px-7 py-3.5 rounded-full text-sm font-medium hover:bg-lavender/80 transition">
              ✨ Ask Life Coach AI
            </button>

          </div>

          {/* AI Chips */}

          <div className="flex flex-wrap gap-3">

            <button className="border border-sage/40 rounded-full px-4 py-2 text-sm bg-white hover:bg-sage/10 transition">
              💬 Can I afford a bike?
            </button>

            <button className="border border-sage/40 rounded-full px-4 py-2 text-sm bg-white hover:bg-sage/10 transition">
              💬 How much should I save?
            </button>

            <button className="border border-sage/40 rounded-full px-4 py-2 text-sm bg-white hover:bg-sage/10 transition">
              💬 Should I move out?
            </button>

          </div>

        </div>



        {/* RIGHT IMAGE */}

        {/* RIGHT IMAGE */}

<div className="relative flex justify-center items-center">

  <img
    src="/images/hero-journey.png"
    alt="Adulting Journey"
    className="w-full max-w-8xl object-contain hero-image"
  />

</div>

      </div>

    </section>
  );
}