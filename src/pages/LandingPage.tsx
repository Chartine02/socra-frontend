import { Link } from 'react-router-dom'

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAxcfO_K4-7szRdEIf1JKEAGJwLNg_HkBitZdNnvHW7GAnyfCmtZIdh_ZZhS8Ru33ZrachE3VyRVFMRUKULYfZUECcavExDROntcuKcz4SEpnRoAcElovAagexhkU5S3liPIZ1fdyu2-GSBzKVwY9ck9QlrzRjUo0-sPJsWnzBm28676JHpwYbktz1zSgNOaQ5UrFslbSUxdNUMV88_AKcFaOW3OZxPIH9tHOOLDrxOYICyxdt8UmRJudjyrHB3RbTH0TQxe7JjbxSE'

export default function LandingPage() {
  return (
    <div className="bg-background font-body-md text-body-md text-on-background">
      {/* Top Navigation */}
      <header className="relative z-50 flex w-full items-center justify-between bg-surface px-container-margin py-stack-md md:px-section-gap">
        <Link className="font-headline-lg text-headline-lg font-bold text-primary" to="/">
          SOCRA
        </Link>
        <nav className="hidden items-center gap-stack-lg md:flex">
          <a className="font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary" href="#features">
            Features
          </a>
          <a className="font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary" href="#institutions">
            Institutions
          </a>
          <Link
            className="primary-action-btn rounded-lg bg-primary-container px-stack-md py-2 font-label-lg text-label-lg text-on-primary-container"
            to="/signin"
          >
            Login
          </Link>
        </nav>
        <button className="text-primary md:hidden" type="button">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-bg relative overflow-hidden px-container-margin pb-section-gap pt-stack-lg">
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-section-gap md:flex-row">
            <div className="text-center md:w-1/2 md:text-left">
              <h1 className="mb-stack-md font-body-lg text-display leading-tight text-on-surface">
                Stop re-reading.
                <br />
                <span className="italic text-primary">Start remembering.</span>
              </h1>
              <p className="mx-auto mb-stack-lg max-w-lg font-headline-md text-headline-md text-on-surface-variant md:mx-0">
                SOCRA converts your course materials into personalised Socratic dialogues and smart assessments.
              </p>
              <div className="flex flex-col justify-center gap-stack-md sm:flex-row md:justify-start">
                <Link
                  className="primary-action-btn flex items-center justify-center gap-2 rounded-xl bg-primary-container px-stack-lg py-4 font-label-lg text-label-lg text-on-primary-container transition-transform hover:scale-105"
                  to="/signup"
                >
                  Get Started — It's Free
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <a
                  className="rounded-xl border-2 border-outline px-stack-lg py-4 font-label-lg text-label-lg text-primary transition-all hover:bg-surface-container hover:scale-105"
                  href="#features"
                >
                  See How It Works
                </a>
              </div>

              {/* Social Proof */}
              <div className="mt-section-gap flex flex-col gap-stack-sm opacity-80">
                <p className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Used by students at</p>
                <div className="flex flex-wrap justify-center gap-stack-md grayscale transition-all hover:grayscale-0 md:justify-start">
                  <span className="font-headline-md font-bold text-on-surface-variant">ALU</span>
                  <span className="font-headline-md font-bold text-on-surface-variant">UR</span>
                  <span className="font-headline-md font-bold text-on-surface-variant">CMU Africa</span>
                </div>
                <p className="font-label-sm text-label-sm italic text-on-surface-variant">and top institutions across Kigali.</p>
              </div>
            </div>

            <div className="mt-stack-lg w-full md:mt-0 md:w-1/2">
              <div className="relative rotate-1 rounded-2xl bg-surface-container-high p-2 shadow-2xl md:rotate-3">
                <img
                  alt="SOCRA dashboard mockup on a laptop in a dim-lit study environment"
                  className="h-auto w-full rounded-xl"
                  src={heroImage}
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary opacity-10 blur-3xl" />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="mx-auto max-w-7xl bg-surface px-container-margin py-section-gap" id="features">
          <div className="mb-stack-lg text-center">
            <h2 className="mb-stack-sm font-headline-lg text-headline-lg text-primary">
              Master your courses through inquiry
            </h2>
            <p className="reading-lane text-on-surface-variant">
              Our AI tutor doesn't just give you the answers. It asks the right questions to build deep neural
              connections.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            <div className="feature-card flex flex-col gap-stack-md rounded-2xl border-b-4 border-primary-container p-stack-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-highest text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  psychology
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Socratic Dialogue</h3>
              <p className="font-body-md text-on-surface-variant">
                Engage in active, back-and-forth conversations that challenge your assumptions and solidify your mental
                models.
              </p>
            </div>
            <div className="feature-card flex flex-col gap-stack-md rounded-2xl border-b-4 border-tertiary-container p-stack-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-highest text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  quiz
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Smart Quizzes</h3>
              <p className="font-body-md text-on-surface-variant">
                Automatically generated assessments that adapt in real-time based on your specific knowledge gaps and
                progress.
              </p>
            </div>
            <div className="feature-card flex flex-col gap-stack-md rounded-2xl border-b-4 border-primary p-stack-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-highest text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  repeat
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Spaced Repetition</h3>
              <p className="font-body-md text-on-surface-variant">
                SOCRA schedules reviews at the perfect moment to ensure long-term retention and academic excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Contextual Content Section */}
        <section className="bg-surface-container-low px-container-margin py-section-gap" id="institutions">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-section-gap md:flex-row">
            <div className="order-2 md:order-1 md:w-1/2">
              <div className="grid grid-cols-2 gap-stack-md items-start">
                <div className="rounded-xl border border-outline-variant bg-white p-stack-md shadow-sm">
                  <span className="text-headline-lg font-bold text-primary">94%</span>
                  <p className="text-label-sm uppercase text-outline">Score Improvement</p>
                </div>
                <div className="rounded-xl border border-outline-variant bg-white p-stack-md shadow-sm">
                  <span className="text-headline-lg font-bold text-tertiary">2.4hr</span>
                  <p className="text-label-sm uppercase text-outline">Saved Daily</p>
                </div>
                <div className="col-span-2 rounded-xl border border-outline-variant bg-white p-stack-md shadow-sm">
                  <p className="text-body-md italic text-on-surface">
                    "SOCRA transformed how I study for my Engineering finals. I'm actually understanding the concepts,
                    not just memorizing slides."
                  </p>
                  <div className="mt-stack-sm flex items-center gap-stack-sm">
                    <div className="h-8 w-8 rounded-full bg-primary-container" />
                    <span className="font-label-lg text-on-surface-variant">Keziah M., ALU Rwanda</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 md:w-1/2">
              <h2 className="mb-stack-md font-display text-display text-on-surface">Designed for the modern student.</h2>
              <p className="mb-stack-lg font-body-lg text-body-lg text-on-surface-variant">
                We know university life is hectic. SOCRA fits into your workflow, working with PDFs, lecture notes, and
                research papers to build a custom knowledge map for your brain.
              </p>
              <a className="flex items-center gap-2 font-label-lg text-label-lg text-primary hover:underline" href="#features">
                Explore our methodology
                <span className="material-symbols-outlined">trending_flat</span>
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-surface px-container-margin py-section-gap text-center" id="pricing">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-primary-container p-section-gap">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
            />
            <h2 className="relative z-10 mb-stack-md font-display text-display text-on-primary-container">Ready to excel?</h2>
            <p className="relative z-10 mb-stack-lg font-body-lg text-on-primary-container opacity-90">
              Join 5,000+ students across Rwanda mastering their degrees with SOCRA.
            </p>
            <div className="relative z-10 flex flex-col justify-center gap-stack-md sm:flex-row">
              <Link
                className="rounded-xl bg-surface px-stack-lg py-4 font-label-lg text-label-lg text-primary shadow-xl transition-transform hover:scale-105"
                to="/signup"
              >
                Start Your First Dialogue
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container-low px-container-margin py-stack-lg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-stack-lg md:flex-row">
          <Link className="text-headline-md font-bold text-primary" to="/">
            SOCRA
          </Link>
          <div className="flex gap-stack-lg font-label-sm text-label-sm text-on-surface-variant">
            <a className="hover:text-primary" href="#privacy">
              Privacy Policy
            </a>
            <a className="hover:text-primary" href="#terms">
              Terms of Service
            </a>
            <a className="hover:text-primary" href="#twitter">
              Twitter
            </a>
            <a className="hover:text-primary" href="#linkedin">
              LinkedIn
            </a>
          </div>
          <p className="font-label-sm text-label-sm text-outline">© 2024 SOCRA AI. Kigali, Rwanda.</p>
        </div>
      </footer>
    </div>
  )
}
