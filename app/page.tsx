"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";

const spaces = [
  {
    title: "Neutral Cyc",
    blurb: "Clean backdrop for portraits, products, and quick turnarounds.",
    tag: "All-day light",
  },
  {
    title: "Bold Color",
    blurb: "Layered gradients and haze for music videos and campaign looks.",
    tag: "RGBWW",
  },
  {
    title: "Client Lounge",
    blurb: "Live feed, espresso, and reviews without stepping on set.",
    tag: "Comfort",
  },
];

const packages = [
  {
    title: "Sprint",
    price: "$480",
    description: "Half-day stage, lighting presets, and an assistant to keep moves tight.",
    perks: ["Up to 6 hours", "Preset looks", "Grip cart"],
  },
  {
    title: "Full Day",
    price: "$1,400",
    description: "12-hour lockout with custom lighting, producer support, and audio.",
    perks: ["Custom cues", "Producer", "Sound capture"],
  },
  {
    title: "Campaign",
    price: "Let's plan",
    description: "Multi-day builds with set design, catering, and client lounge hosting.",
    perks: ["Fabrication", "Art direction", "Crew"],
  },
];

const steps = [
  {
    title: "Share your storyboard",
    detail: "Send references or a quick note—we respond with a floor plan and lighting options.",
  },
  {
    title: "Lock the look",
    detail: "Pick a preset or request a new cue. We pre-light the stage before you arrive.",
  },
  {
    title: "Shoot without clutter",
    detail: "Stage manager keeps resets moving, while the lounge keeps clients comfortable.",
  },
];

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return setProgress(0);
      const percent = (window.scrollY / max) * 100;
      setProgress(Number(percent.toFixed(2)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-40 h-[3px] w-full bg-white/5">
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-white via-white/70 to-white/40 transition-[width] duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`${className} transition-transform duration-300 ease-out`}
      style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const quickFacts = useMemo(
    () => [
      { label: "Power", value: "50kW backup" },
      { label: "Location", value: "Lahore · Model Town" },
      { label: "Crew", value: "Producers & gaffers" },
    ],
    [],
  );

  return (
    <main className="relative min-h-screen bg-ink text-white">
      <ScrollProgressBar />
      <div className="accent-wash" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-12">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-sm font-semibold text-black">
              SS
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Sunday Studio</p>
              <p className="text-base font-semibold text-white">Infinity Wall · Lahore</p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 text-sm font-semibold text-white md:flex">
            {[{ label: "Spaces", href: "#spaces" }, { label: "Packages", href: "#packages" }, { label: "Book", href: "#contact" }].map(
              (link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ),
            )}
            <a href="mailto:hello@sunday.studio" className="rounded-full bg-white px-4 py-2 text-black shadow-sm" data-cursor="accent">
              Book time
            </a>
          </nav>
        </header>

        <section className="section-shell mt-10">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/40 md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-6">
              <span className="pill">Minimal, calm, camera-ready</span>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                A stage that feels like a room, not a brochure.
              </h1>
              <p className="max-w-2xl text-lg text-neutral-200">
                Sunday Studio trims the noise: soft gradients, simple cues, and a team that keeps resets smooth. Walk in, pick a
                lighting look, and start rolling without fighting a busy interface.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:hello@sunday.studio"
                  className="btn-primary"
                  data-cursor="accent"
                >
                  Book a shoot
                </a>
                <a href="#packages" className="btn-ghost" data-cursor="accent">
                  See packages
                </a>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                {quickFacts.map((item) => (
                  <div key={item.label} className="fact-card">
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{item.label}</p>
                    <p className="text-base font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center justify-between text-sm text-neutral-300">
                <span>Stage preview</span>
                <span>Soft gradients</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {spaces.map((shot) => (
                  <div key={shot.title} className="mini-card">
                    <div className="mini-frame" />
                    <p className="mt-3 text-sm font-semibold text-white">{shot.title}</p>
                    <p className="text-xs text-white/70">{shot.blurb}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                <span className="chip">Haze-friendly</span>
                <span className="chip">Reflective floors</span>
                <span className="chip">Silent HVAC</span>
              </div>
            </div>
          </div>
        </section>

        <section id="spaces" className="section-shell mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="pill">Spaces</p>
              <h2 className="section-title">Three zones, one clean flow.</h2>
              <p className="text-lg text-neutral-200">Pick a look, move between sets, and keep clients nearby.</p>
            </div>
            <p className="text-sm text-neutral-400">Tap or hover to see details.</p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {spaces.map((space) => (
              <TiltCard key={space.title} className="h-full">
                <div className="space-card" data-cursor="accent">
                  <div className="space-visual" aria-hidden />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{space.tag}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{space.title}</h3>
                    </div>
                    <span className="chip">View</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-200">{space.blurb}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="packages" className="section-shell mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="pill">Packages</p>
              <h2 className="section-title">Simple options that cover the essentials.</h2>
              <p className="text-lg text-neutral-200">Transparent time blocks with crew and power included.</p>
            </div>
            <p className="text-sm text-neutral-400">Need something custom? We adjust quickly.</p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {packages.map((tier) => (
              <TiltCard key={tier.title} className="h-full">
                <div className="package-card" data-cursor="accent">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{tier.title}</h3>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white">{tier.price}</span>
                  </div>
                  <p className="mt-3 text-sm text-neutral-200">{tier.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-white">
                    {tier.perks.map((perk) => (
                      <span key={perk} className="chip">
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="section-shell mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/40">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="pill">How it works</p>
                <h2 className="section-title">A calm booking flow.</h2>
                <p className="text-lg text-neutral-200">No clutter—just the steps you need to start rolling.</p>
              </div>
              <a href="mailto:hello@sunday.studio" className="btn-ghost" data-cursor="accent">
                Talk with a producer
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps.map((step, idx) => (
                <div key={step.title} className="step-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
                    {idx + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-neutral-200">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell mt-14">
          <div className="contact-card">
            <div>
              <p className="pill">Book time</p>
              <h2 className="section-title">Tell us your date—we handle the rest.</h2>
              <p className="mt-3 max-w-2xl text-lg text-neutral-200">
                Send a storyboard, a playlist, or a single reference image. We reply within one business day with availability,
                lighting looks, and a clear quote.
              </p>
              <div className="mt-5 flex flex-col gap-2 text-base font-semibold text-white">
                <a href="mailto:hello@sunday.studio" className="flex items-center gap-2" data-cursor="accent">
                  <span className="chip">Email</span>
                  hello@sunday.studio
                </a>
                <a href="tel:+923094220202" className="flex items-center gap-2" data-cursor="accent">
                  <span className="chip">Phone</span>
                  +92 309 4220202
                </a>
                <p className="flex items-center gap-2 text-neutral-200">
                  <span className="chip">Address</span>
                  Lahore · Model Town Extension
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-inner shadow-black/40">
              <div className="flex items-center justify-between text-sm text-neutral-300">
                <span>Availability</span>
                <span>Updated daily</span>
              </div>
              <div className="mt-4 space-y-4 text-sm">
                {["Pre-light & tech check", "Crew call & blocking", "Shoot day momentum", "Client review & wrap"].map(
                  (step) => (
                    <div key={step} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                      <span className="mt-1 text-lg">✓</span>
                      <div>
                        <p className="text-base font-semibold text-white">{step}</p>
                        <p className="text-neutral-300">We keep the room calm while you shoot.</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-white/15 to-white/5 p-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">This week</p>
                  <p className="text-lg font-semibold">2 slots open</p>
                </div>
                <a href="mailto:hello@sunday.studio" className="btn-primary" data-cursor="accent">
                  Check dates
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
