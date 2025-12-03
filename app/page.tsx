"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";

const specs = [
  {
    title: "Infinity Wall",
    detail: "26 ft wide x 14 ft high seamless cyc with floor cove for clean horizons.",
    badge: "Largest in Lahore",
  },
  {
    title: "Lighting Grid",
    detail: "8x 350W RGBWW LED panels + softboxes tuned for cinema & glossy product shoots.",
    badge: "Color-true",
  },
  {
    title: "Audio Ready",
    detail: "Acoustic treatment, wireless lav mics, and silent ventilation for interviews & podcasts.",
    badge: "Low noise",
  },
  {
    title: "Support Crew",
    detail: "Producers, gaffers, and concierge to reset scenes, manage call sheets, and keep momentum.",
    badge: "Concierge",
  },
];

const budgetTiers = [
  {
    label: "Launch Kit",
    range: "$400 - $800",
    description: "Half-day stage hire, lighting presets, and an assistant for swift content drops.",
    perks: ["Up to 6 hours on stage", "Pre-built lighting looks", "Grip cart & sandbags", "Coffee + craft"],
  },
  {
    label: "Cinematic Day",
    range: "$1,000 - $2,500",
    description: "Full-day control with custom lighting, audio capture, and producer support.",
    perks: ["12-hour block", "Dedicated producer", "Sound capture suite", "Shot-by-shot resets"],
  },
  {
    label: "Campaign Lab",
    range: "$3,000+",
    description: "Multi-day builds for launches with art direction, set fabrication, and live client lounge.",
    perks: ["Custom set builds", "Art direction desk", "Client review lounge", "Crew & catering"],
  },
];

const services = [
  "Music videos & performance sessions",
  "Luxury product films with reflective staging",
  "Talk shows, podcasts, and livestreams",
  "Fashion editorials with wind + haze",
  "Cinematic portraits and reels",
  "Brand launches & experiential shoots",
];

function CustomCursor() {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const handleHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest?.("a, button, [data-cursor='accent']");
      setHover(Boolean(interactive));
    };

    const down = () => setPress(true);
    const up = () => setPress(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div className="custom-cursor">
      <div
        className={`cursor-dot ${hover ? "is-hover" : ""} ${press ? "is-press" : ""}`}
      />
      <div
        className={`cursor-ring ${hover ? "is-hover" : ""} ${press ? "is-press" : ""}`}
      />
    </div>
  );
}

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
    <div className="fixed left-0 top-0 z-40 h-[3px] w-full bg-black/5">
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-amber-500 via-amber-300 to-white transition-[width] duration-200"
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
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`${className} transition-transform duration-300 ease-out`}
      style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-4px)` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const heroShots = useMemo(
    () => [
      { title: "Neutral Cyc", subtitle: "Pristine white wrap" },
      { title: "Cinematic Glow", subtitle: "Amber edges & haze" },
      { title: "Bold Color", subtitle: "RGBWW gradients" },
    ],
    [],
  );

  return (
    <main className="relative min-h-screen overflow-hidden text-[#0f0c08]">
      <ScrollProgressBar />
      <CustomCursor />
      <div className="gradient-veil" />
      <div className="grid-overlay" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pt-12">
        <header className="mb-10 flex items-center justify-between rounded-full border border-black/5 bg-white/70 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-200 shadow-lg shadow-amber-200/70" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6f5a46]">Sunday Studio</p>
              <p className="text-base font-semibold text-[#0f0c08]">Infinity Wall | Lahore</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-sm font-semibold text-[#0f0c08] md:flex">
            <a href="tel:+923094220202" className="rounded-full border border-black/10 px-4 py-2 hover:border-black/30" data-cursor="accent">
              Call studio
            </a>
            <a
              href="mailto:hello@sunday.studio"
              className="rounded-full bg-[#0f0c08] px-4 py-2 text-white shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-lg"
              data-cursor="accent"
            >
              Book the stage
            </a>
          </div>
        </header>

        <section className="section-shell">
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 px-6 py-10 shadow-2xl shadow-amber-200/40 backdrop-blur md:px-12 md:py-14">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-300/60 blur-3xl" />
            <div className="absolute -right-16 top-10 h-52 w-52 rounded-full bg-[#0f0c08]/10 blur-3xl" />
            <div className="absolute bottom-[-80px] right-12 h-72 w-72 rotate-12 rounded-full bg-amber-200/60 blur-[72px]" />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <div className="lg:w-[60%]">
                <span className="tag reveal" style={{ animationDelay: "0.1s" }}>
                  Lahore&apos;s largest infinity wall · Acoustic ready · Power backup
                </span>
                <h1
                  className="reveal mt-6 text-4xl font-bold leading-tight text-[#0f0c08] sm:text-5xl lg:text-6xl"
                  style={{ animationDelay: "0.18s" }}
                >
                  Award-winning production home built for daring visuals.
                </h1>
                <p
                  className="reveal mt-4 max-w-2xl text-lg leading-8 text-[#4a3b31] sm:text-xl"
                  style={{ animationDelay: "0.28s" }}
                >
                  Sunday Studio blends a 26 ft infinity wall, cinema-grade RGBWW lighting, acoustic treatment, and
                  concierge crew so you can focus on performance, not setup. From music videos to luxury products, we
                  keep every shot art-directed and on schedule.
                </p>
                <div className="reveal mt-6 flex flex-wrap gap-4" style={{ animationDelay: "0.36s" }}>
                  <button
                    className="flex items-center gap-2 rounded-full bg-[#0f0c08] px-5 py-3 text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-amber-200/70"
                    data-cursor="accent"
                  >
                    Book a shoot
                    <span aria-hidden>→</span>
                  </button>
                  <a
                    href="#specs"
                    className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-3 text-[#0f0c08] backdrop-blur transition hover:-translate-y-0.5 hover:border-black/25"
                    data-cursor="accent"
                  >
                    View stage specs
                  </a>
                </div>
                <div className="reveal mt-8 grid gap-4 text-sm sm:grid-cols-3" style={{ animationDelay: "0.45s" }}>
                  {[
                    { label: "Power", detail: "50kW backup" },
                    { label: "Control", detail: "DMX + haze ready" },
                    { label: "Location", detail: "Lahore central" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#6f5a46]">{item.label}</p>
                      <p className="text-base font-semibold text-[#0f0c08]">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal relative mt-8 flex-1 lg:mt-0" style={{ animationDelay: "0.5s" }}>
                <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-b from-[#0f0c08] via-[#1b150f] to-[#0f0c08] p-4 shadow-2xl">
                  <div className="absolute inset-0 opacity-30" aria-hidden>
                    <div className="blob absolute -left-6 top-4 h-32 w-32 rounded-full bg-amber-400/60" />
                    <div className="blob absolute bottom-6 right-2 h-28 w-28 rounded-full bg-white/40" />
                  </div>
                  <div className="relative rounded-xl border border-white/10 bg-black/20 p-6 text-white shadow-inner">
                    <div className="flex items-center justify-between text-sm text-amber-200/80">
                      <span>Lighting look library</span>
                      <span>RGBWW</span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {heroShots.map((shot) => (
                        <div
                          key={shot.title}
                          className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg shadow-black/20 backdrop-blur"
                        >
                          <div className="h-20 rounded-lg bg-gradient-to-br from-amber-200/70 via-white/15 to-black/40" />
                          <p className="mt-3 text-sm font-semibold text-white">{shot.title}</p>
                          <p className="text-xs text-white/70">{shot.subtitle}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/70">
                      <span className="rounded-full border border-white/10 px-3 py-1">Softboxes</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">DMX Scenes</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">Haze-ready</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">Reflective floors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="specs" className="section-shell mt-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="tag">Technical confidence</p>
              <h2 className="section-title mt-3">Infinity Studio specs that stay camera-ready.</h2>
              <p className="mt-2 max-w-2xl text-lg text-[#4a3b31]">
                From power to acoustics, every part of Sunday Studio is tuned for long shoot days and demanding crews.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0f0c08]">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
              Live availability updates
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {specs.map((spec, index) => (
              <div
                key={spec.title}
                className="glass-panel relative overflow-hidden rounded-3xl p-6 shadow-lg shadow-amber-100/70"
                style={{ animationDelay: `${0.06 * index}s` }}
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-200/50 blur-3xl" />
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow">
                    <span className="text-lg">✨</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6f5a46]">{spec.badge}</p>
                    <h3 className="text-xl font-semibold text-[#0f0c08]">{spec.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-base leading-relaxed text-[#4a3b31]">{spec.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="tag">Budget clarity</p>
              <h2 className="section-title mt-2">Pick your momentum. We scale with your launch.</h2>
            </div>
            <p className="text-sm text-[#4a3b31]">
              Transparent tiers with crew, power, and lighting included.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {budgetTiers.map((tier, index) => (
              <TiltCard key={tier.label} className="h-full">
                <div className="surface-card flex h-full flex-col gap-4 p-6" data-cursor="accent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-200 shadow-md" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[#6f5a46]">Tier {index + 1}</p>
                        <h3 className="text-xl font-semibold text-[#0f0c08]">{tier.label}</h3>
                      </div>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-[#7a5410]">
                      {tier.range}
                    </span>
                  </div>
                  <p className="text-base text-[#4a3b31]">{tier.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#0f0c08]">
                    {tier.perks.map((perk) => (
                      <span key={perk} className="rounded-full bg-white px-3 py-1 shadow-sm">
                        {perk}
                      </span>
                    ))}
                  </div>
                  <button className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#0f0c08]" data-cursor="accent">
                    Reserve this tier <span aria-hidden>↗</span>
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/80 p-8 shadow-xl shadow-amber-100/80">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="tag">Capabilities</p>
                <h2 className="section-title mt-3">Creative services designed around the stage.</h2>
                <p className="mt-3 text-lg text-[#4a3b31]">
                  Bring us a storyboard or start from a spark. Sunday Studio pairs the infinity wall with lighting looks,
                  motion, and on-set direction that keeps your artists and clients comfortable.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <div key={service} className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/70 p-4">
                      <span className="mt-1 text-lg">●</span>
                      <p className="text-base font-semibold text-[#0f0c08]">{service}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-b from-[#0f0c08] via-[#1d160f] to-[#0f0c08] p-1 shadow-2xl">
                <div className="absolute -left-6 -top-10 h-40 w-40 rounded-full bg-amber-300/40 blur-3xl" />
                <div className="absolute right-4 top-10 h-16 w-16 rounded-full bg-white/20 blur-2xl" />
                <div className="relative m-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-inner">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Live cursor</span>
                    <span>Interactive stage</span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="h-28 w-full rounded-xl bg-gradient-to-br from-amber-200/60 via-white/10 to-black/50" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="rounded-full border border-white/15 px-3 py-1">Magnetic props</span>
                      <span className="rounded-full border border-white/15 px-3 py-1">Camera ops</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-left shadow">
                      <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Client lounge</p>
                      <p className="mt-2 text-base font-semibold">Private viewing room with live feed & espresso.</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-200">Sunday Studio — Lahore</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="glass-panel relative overflow-hidden rounded-3xl p-8">
            <div className="absolute -left-8 top-0 h-48 w-48 rounded-full bg-amber-300/40 blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-[#0f0c08]/10 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="tag">Book time</p>
                <h2 className="section-title mt-3">Ready to roll cameras?</h2>
                <p className="mt-3 text-lg text-[#4a3b31]">
                  Tell us your storyboard, reference clips, and preferred dates. We respond within one business day with
                  a tailored floor plan, lighting looks, and an all-in quote.
                </p>
                <div className="mt-5 flex flex-col gap-3 text-base font-semibold text-[#0f0c08]">
                  <a href="mailto:hello@sunday.studio" className="flex items-center gap-2" data-cursor="accent">
                    <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-semibold text-[#7a5410]">Email</span>
                    hello@sunday.studio
                  </a>
                  <a href="tel:+923094220202" className="flex items-center gap-2" data-cursor="accent">
                    <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-semibold text-[#7a5410]">Phone</span>
                    +92 309 4220202
                  </a>
                  <p className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-semibold text-[#7a5410]">Address</span>
                    Lahore · Model Town Extension
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-6 shadow-xl">
                <div className="flex items-center justify-between text-sm text-[#4a3b31]">
                  <span>Stage timeline</span>
                  <span>Concierge</span>
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  {["Pre-light & tech check", "Crew call & blocking", "Shoot day momentum", "Client review & wrap"].map(
                    (step, idx) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-[#7a5410] font-semibold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-[#0f0c08]">{step}</p>
                          <p className="text-[#4a3b31]">We orchestrate the details so creatives stay in flow.</p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#0f0c08] to-[#2c2218] p-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Availability</p>
                    <p className="text-lg font-semibold">This week: 2 slots left</p>
                  </div>
                  <button
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f0c08] shadow-md shadow-amber-200/60"
                    data-cursor="accent"
                  >
                    Check dates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
