"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform } from "framer-motion";

import { CursorGlow } from "./components/CursorGlow";

const spaces = [
  {
    title: "Infinity Studio",
    blurb: "Our freshly painted infinity wall is Lahore’s calmest blank canvas for films, ads, and fashion.",
    tag: "Seamless 105 ft",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Changing & Makeup",
    blurb: "Dedicated makeup room, changing room, and ironing corner keep talent relaxed between takes.",
    tag: "Ready rooms",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Sitting Lounge",
    blurb: "Clients stay close to the action with a lounge for approvals, snacks, and quiet conversations.",
    tag: "Client-first",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  },
];

const packages = [
  {
    title: "Package 01",
    price: "Rs. 50,000",
    duration: "06 hours",
    overview: "Fast brand content days with a spotless white cyc ready when you arrive.",
    perks: [
      "Freshly painted Infinity Wall",
      "Makeup Room & Changing Room",
      "Iron & Iron Stand",
      "Sitting Lounge",
    ],
    suitedFor: "Product launches, short-form content, tabletop",
  },
  {
    title: "Package 02",
    price: "Rs. 70,000",
    duration: "08 hours",
    overview: "More time for commercials and fashion stories with room to reset talent.",
    perks: [
      "Freshly Painted Infinity Wall",
      "Makeup Room & Changing Room",
      "Iron & Iron Stand",
      "Sitting Lounge",
      "Ice Boxes & Hangers",
    ],
    suitedFor: "Commercials, fashion look-books, multi-look shoots",
  },
  {
    title: "Package 03",
    price: "Rs. 90,000",
    duration: "12 hours",
    overview: "Full-day coverage with refreshments and an assistant to keep momentum steady.",
    perks: [
      "Freshly Painted Infinity Wall",
      "Makeup Room & Changing Room",
      "Iron & Iron Stand",
      "Sitting Lounge",
      "Hangers",
      "Dedicated Studio Assistant",
      "Complimentary Tea",
    ],
    suitedFor: "Long-format ads, music videos, editorial days",
  },
];

const steps = [
  {
    title: "Share your storyboard",
    detail:
      "Send references or a quick note—we respond with a floor plan, lighting options, and availability in one go.",
  },
  {
    title: "Lock the look",
    detail:
      "Choose a preset or request a custom cue. We pre-light and prep the infinity wall before your crew walks in.",
  },
  {
    title: "Shoot without clutter",
    detail: "Our studio assistant manages resets while the lounge keeps clients comfortable and nearby.",
  },
];

const slides = [
  {
    title: "The Largest Infinity Wall in Lahore",
    detail: "105 ft seamless run with 50 ft by 35 ft stage area, 20 ft height, and 50 ft clearance.",
    badge: "New paint before every booking",
    tint: "from-white/20 via-white/10 to-white/0",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Film-Ready Amenities",
    detail: "Makeup room, changing room, lounge, iron and stand, ice boxes, hangers, and studio assistant options.",
    badge: "Quiet HVAC & haze-friendly",
    tint: "from-amber-200/30 via-orange-100/10 to-white/5",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Power & Backup",
    detail: "Generous electricity (ex-WAPDA) with generators from 25 kVA to 75 kVA available with operator.",
    badge: "Fuel excluded; call for rates",
    tint: "from-cyan-200/30 via-blue-100/10 to-white/5",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1600&q=80",
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

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, (y) => `rotateX(${y}deg)`);
  const rotateY = useTransform(tiltX, (x) => `rotateY(${x}deg)`);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    tiltX.set(x);
    tiltY.set(y);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ transform: "translateZ(0)", rotateX, rotateY }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const quickFacts = useMemo(
    () => [
      {
        label: "Canvas",
        value: "105 ft seamless",
        detail: "Fresh coat before every booking—no scuffs in your frame.",
        icon: "🎬",
      },
      {
        label: "Stage",
        value: "50 × 35 × 20 ft",
        detail: "Room to fly cranes and float haze while talent stays comfortable.",
        icon: "📐",
      },
      {
        label: "Access",
        value: "Model Town, Lahore",
        detail: "Central, generator-ready, and easy load-in for grip trucks.",
        icon: "📍",
      },
    ],
    [],
  );

  const slideDuration = 7;
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    details: "",
  });
  const whatsappLink = "https://wa.me/923000846656?text=Hi%20Sunday%20Studio,%20I%20need%20a%20quote";
  const slideTimer = useRef<NodeJS.Timeout | null>(null);
  const progressControls = useAnimation();

  useEffect(() => {
    if (slideTimer.current) clearTimeout(slideTimer.current);
    progressControls.stop();

    if (isPaused) return;

    void progressControls.set({ scaleX: 0 });
    void progressControls.start({ scaleX: 1, transition: { duration: slideDuration, ease: "linear" } });

    slideTimer.current = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, slideDuration * 1000);

    return () => {
      if (slideTimer.current) clearTimeout(slideTimer.current);
    };
  }, [isPaused, progressControls, slideDuration, slideIndex]);

  const handleSubmitQuote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteStatus("loading");
    setQuoteError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setQuoteStatus("sent");
      setFormValues({ name: "", email: "", phone: "", date: "", details: "" });
    } catch (error) {
      setQuoteStatus("error");
      setQuoteError(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  const updateField = (key: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (quoteStatus !== "idle") {
      setQuoteStatus("idle");
      setQuoteError(null);
    }
  };

  return (
    <main className="relative min-h-screen bg-ink text-white">
      <ScrollProgressBar />
      <CursorGlow />
      <div className="accent-wash" />
      <a
        href={whatsappLink}
        className="whatsapp-fab"
        target="_blank"
        rel="noreferrer"
        data-cursor="accent"
        aria-label="Chat on WhatsApp to get a quote"
      >
        Get a quote on WhatsApp
      </a>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-20 px-5 pb-20 pt-10 sm:px-8 lg:px-10 lg:pt-14">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-sm font-semibold text-black">
              SS
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Sunday Studio</p>
              <p className="text-base font-semibold text-white">The largest infinity wall in Lahore</p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 text-sm font-semibold text-white md:flex">
            {[
              { label: "Spaces", href: "#spaces" },
              { label: "Packages", href: "#packages" },
              { label: "Gallery", href: "/gallery" },
              { label: "Book", href: "#contact" },
            ].map((link) => (
              link.href.startsWith("#") ? (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              )
            ))}
            <a href="mailto:hello@sunday.studio" className="rounded-full bg-white px-4 py-2 text-black shadow-sm" data-cursor="accent">
              Book time
            </a>
          </nav>
        </header>

        <section className="section-shell">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/40 md:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col gap-6">
              <span className="pill">Minimal, calm, camera-ready</span>
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                Infinity wall, curated amenities, and a crew that loves smooth shoots.
              </h1>
              <p className="max-w-2xl text-lg text-neutral-200">
                Sunday Studio trims the noise: a freshly painted 105 ft infinity wall, ready rooms for talent, and a lounge for
                clients. Walk in, pick a lighting look, and start rolling without fighting distractions.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:hello@sunday.studio" className="btn-primary" data-cursor="accent">
                  Book a shoot
                </a>
                <a href="#packages" className="btn-ghost" data-cursor="accent">
                  See packages
                </a>
                <a href={whatsappLink} className="btn-whatsapp" data-cursor="accent" target="_blank" rel="noreferrer">
                  WhatsApp a quote
                </a>
              </div>
              <div className="grid gap-4 text-sm sm:grid-cols-3">
                {quickFacts.map((item) => (
                  <div key={item.label} className="fact-card fact-card-premium">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{item.label}</p>
                      <span aria-hidden className="text-base">{item.icon}</span>
                    </div>
                    <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-xs text-neutral-200">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center justify-between text-sm text-neutral-300">
                <span>Studio carousel</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">Tap or hover to pause</span>
              </div>

              <div className="mt-5">
                <div
                  className="carousel-pane"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  role="region"
                  aria-live="polite"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                      setSlideIndex((prev) => (prev + 1) % slides.length);
                    }
                    if (event.key === "ArrowLeft") {
                      setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                    }
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideIndex}
                      className="carousel-slide"
                      initial={{ opacity: 0, scale: 0.98, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -12 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      drag="x"
                      dragElastic={0.18}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(event, info) => {
                        if (Math.abs(info.offset.x) < 60) return;
                        if (info.offset.x < 0) {
                          setSlideIndex((prev) => (prev + 1) % slides.length);
                        } else {
                          setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
                        }
                      }}
                    >
                      <div
                        className="relative h-full overflow-hidden rounded-2xl border border-white/10"
                        onMouseMove={(event) => {
                          const rect = event.currentTarget.getBoundingClientRect();
                          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
                          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
                          event.currentTarget.style.setProperty("--parallax-x", `${x}px`);
                          event.currentTarget.style.setProperty("--parallax-y", `${y}px`);
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.setProperty("--parallax-x", "0px");
                          event.currentTarget.style.setProperty("--parallax-y", "0px");
                        }}
                      >
                        <motion.div
                          className="carousel-image"
                          style={{ backgroundImage: `url(${slides[slideIndex].image})` }}
                          initial={{ scale: 1.08, opacity: 0.7 }}
                          animate={{ scale: 1.02, opacity: 1 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <motion.div
                          className="glass-fade"
                          animate={{ backgroundPosition: ["0% 0%", "20% 10%", "0% 0%"] }}
                          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="glass-fade parallax-layer" />
                        </div>

                        <div className="relative z-10 flex h-full flex-col justify-between p-6">
                          <div className="flex items-center gap-2">
                            <span className="chip chip-ghost text-xs">{slides[slideIndex].badge}</span>
                            <span className="chip chip-ghost text-xs">{slideIndex + 1}/{slides.length}</span>
                          </div>
                          <div className="space-y-3 max-w-xl">
                            <h3 className="text-2xl font-semibold text-white sm:text-3xl">{slides[slideIndex].title}</h3>
                            <p className="text-base text-neutral-100 sm:text-lg">{slides[slideIndex].detail}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {slides.map((slide, idx) => (
                      <button
                        key={slide.title}
                        onClick={() => setSlideIndex(idx)}
                        onFocus={() => setIsPaused(true)}
                        onBlur={() => setIsPaused(false)}
                        className={`dot ${slideIndex === idx ? "dot-active" : ""}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className="absolute left-0 top-0 h-full origin-left rounded-full bg-white/80 shadow-lg"
                      animate={progressControls}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="spaces" className="section-shell">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="pill">Spaces</p>
              <h2 className="section-title">Infinity wall plus supporting rooms.</h2>
              <p className="text-lg text-neutral-200">Largest seamless wall in Lahore with ready rooms wrapped around it.</p>
            </div>
            <p className="text-sm text-neutral-400">Tap or hover to see details.</p>
          </div>

          <div className="mt-6 grid gap-7 sm:grid-cols-3">
            {spaces.map((space) => (
              <TiltCard key={space.title} className="h-full">
                <motion.div
                  className="space-card"
                  data-cursor="accent"
                  whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                >
                  <div className="space-visual" aria-hidden>
                    <motion.div
                      className="space-visual-media"
                      style={{ backgroundImage: `url(${space.image})` }}
                      initial={{ scale: 1.06 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <div className="space-visual-mask" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{space.tag}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{space.title}</h3>
                    </div>
                    <span className="chip">View</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-200">{space.blurb}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
          </section>

          <section className="section-shell">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/40">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="pill">Infinity Studio</p>
                <h2 className="section-title">Exact specs before you roll cameras.</h2>
                <p className="text-lg text-neutral-200">Everything you saw in the deck, now structured for a smoother recce.</p>
              </div>
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">Fresh paint before every booking</div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  label: "Total Seamless Length",
                  value: "105 ft (≈ 32 m)",
                  detail: "Wide enough for car commercials and crane moves.",
                  icon: "↔️",
                },
                {
                  label: "Stage Area",
                  value: "50 ft × 35 ft × 20 ft",
                  detail: "Space to fly rigs, haze, and dance without crowding.",
                  icon: "🪜",
                },
                {
                  label: "Roof Height / Clearance",
                  value: "50 ft (≈ 15.2 m)",
                  detail: "Comfortable clearance for grids, diffusion, and overheads.",
                  icon: "🎛️",
                },
                {
                  label: "Lighting Support",
                  value: "Pre-lit options",
                  detail: "Pick from preset looks or dial your own with our team.",
                  icon: "💡",
                },
                {
                  label: "Best For",
                  value: "Film · Ads · Fashion",
                  detail: "From tabletop to editorials, the wall stays camera ready.",
                  icon: "⭐",
                },
                {
                  label: "Comfort",
                  value: "Makeup, changing, lounge",
                  detail: "Quiet HVAC, fresh linens, and refreshments on request.",
                  icon: "☕",
                },
              ].map((fact) => (
                <div key={fact.label} className="fact-card fact-card-strong fact-card-premium">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{fact.label}</p>
                    <span aria-hidden className="text-base">{fact.icon}</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">{fact.value}</p>
                  <p className="mt-2 text-xs text-neutral-200">{fact.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="section-shell">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="pill">Packages</p>
              <h2 className="section-title">Pick the time block that fits your shoot.</h2>
              <p className="text-lg text-neutral-200">All packages include the infinity wall, ready rooms, and lounge.</p>
            </div>
            <p className="text-sm text-neutral-400">Need something custom? We adjust quickly.</p>
          </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-3">
          {packages.map((tier) => (
            <motion.article
              key={tier.title}
              className="package-card package-card-motion"
              data-cursor="accent"
              tabIndex={0}
              onHoverStart={() => setOpenPackage(tier.title)}
              onHoverEnd={() => setOpenPackage(null)}
              onFocus={() => setOpenPackage(tier.title)}
              onBlur={() => setOpenPackage(null)}
              onClick={() => setOpenPackage((prev) => (prev === tier.title ? null : tier.title))}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpenPackage((prev) => (prev === tier.title ? null : tier.title));
                }
              }}
              layout
              whileHover={{ y: -6, boxShadow: "0 26px 52px rgba(0,0,0,0.48)" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">{tier.duration}</p>
                  <h3 className="text-xl font-semibold text-white">{tier.title}</h3>
                  <p className="text-sm text-neutral-200">{tier.overview}</p>
                </div>
                <div className="rounded-2xl bg-white/15 px-3 py-2 text-right text-white">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/80">Starts at</p>
                  <p className="text-lg font-semibold leading-tight">{tier.price}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-neutral-300">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-semibold text-white/80">
                  Tap, hover, or press Enter
                </span>
                <span className="text-white/70">Best for {tier.suitedFor}</span>
              </div>

              <AnimatePresence mode="wait">
                {openPackage === tier.title ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 space-y-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/80">What’s included</p>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-100">
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2">
                            <span className="text-base text-white/70">•</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3 text-sm text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-white/70">Best for</p>
                      <p className="mt-1 font-semibold text-white">{tier.suitedFor}</p>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Pricing is exclusive of electricity (generator/WAPDA). Overtime: Rs. 5,000 per 30 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-5 rounded-2xl border border-white/8 bg-gradient-to-r from-white/10 to-white/5 p-4 text-sm text-white/90"
                  >
                    <p className="font-semibold">{tier.title} is great for:</p>
                    <p className="mt-2 text-neutral-200">{tier.suitedFor}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

          <p className="mt-5 max-w-3xl text-sm text-neutral-300">
            Rates exclude electricity (generator/WAPDA). Overtime is billed at Rs. 5,000 per 30 minutes beyond the scheduled slot.
            If the infinity wall needs an extra coat after a shoot that is not shot on a white background only, the additional coat
            will be billed to the client.
          </p>
        </section>

        <section className="section-shell">
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

            <div className="mt-6 grid gap-6 md:grid-cols-3">
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

        <section id="contact" className="section-shell">
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
                <a href="tel:+923000846656" className="flex items-center gap-2" data-cursor="accent">
                  <span className="chip">Phone</span>
                  +92 300 084 6656
                </a>
                <p className="flex items-center gap-2 text-neutral-200">
                  <span className="chip">Address</span>
                  Building No 13-14, Block H-3, Main Canal Road, Near Mughal Eye, Lahore
                </p>
              </div>
            </div>

            <div className="card-stack">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-inner shadow-black/40">
                <div className="flex items-center justify-between text-sm text-neutral-300">
                  <span>Availability</span>
                  <span>Updated daily</span>
                </div>
                <div className="mt-4 space-y-4 text-sm">
                  {["Pre-light & tech check", "Crew call & blocking", "Shoot day momentum", "Client review & wrap"].map((step) => (
                    <div key={step} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                      <span className="mt-1 text-lg">✓</span>
                      <div>
                        <p className="text-base font-semibold text-white">{step}</p>
                        <p className="text-neutral-300">We keep the room calm while you shoot.</p>
                      </div>
                    </div>
                  ))}
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

              <form className="quote-form" onSubmit={handleSubmitQuote}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="pill">Get a quote</p>
                    <p className="mt-2 text-base text-neutral-200">Tell us the essentials and we’ll reply with a scoped estimate.</p>
                  </div>
                  <a href={whatsappLink} className="btn-whatsapp" data-cursor="accent" target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </div>

                <div className="quote-grid">
                  <label className="form-field">
                    <span>Name</span>
                    <input
                      required
                      value={formValues.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Ayesha Khan"
                      autoComplete="name"
                    />
                  </label>
                  <label className="form-field">
                    <span>Email</span>
                    <input
                      required
                      type="email"
                      value={formValues.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="team@agency.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className="form-field">
                    <span>Phone / WhatsApp</span>
                    <input
                      required
                      value={formValues.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="0300 0000000"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="form-field">
                    <span>Preferred date</span>
                    <input
                      type="date"
                      value={formValues.date}
                      onChange={(event) => updateField("date", event.target.value)}
                    />
                  </label>
                </div>

                <label className="form-field">
                  <span>Project details</span>
                  <textarea
                    required
                    value={formValues.details}
                    onChange={(event) => updateField("details", event.target.value)}
                    placeholder="Share the shot list, number of looks, preferred lighting, and timing."
                    rows={4}
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-200">
                  <button type="submit" className="btn-primary" disabled={quoteStatus === "loading"}>
                    {quoteStatus === "loading" ? "Sending..." : "Email my quote"}
                  </button>
                  <a href="mailto:hello@sunday.studio" className="btn-ghost" data-cursor="accent">
                    Email manually
                  </a>
                  {quoteStatus === "sent" && <span className="chip">Thanks! We’ll reply within one business day.</span>}
                  {quoteStatus === "error" && <span className="chip chip-error">{quoteError}</span>}
                </div>
              </form>
            </div>
          </div>
          </section>

        <section className="section-shell">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/40">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="pill">Other Services</p>
                  <h2 className="section-title">Lighting, grip, and generators on call.</h2>
                  <p className="text-lg text-neutral-200">Book everything with one message—no scavenger hunts.</p>
                </div>
                <a href="tel:+923000846656" className="btn-primary" data-cursor="accent">
                  Call for rates
                </a>
              </div>

              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-inner shadow-black/40">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/70">Lighting, Grip & Accessories</p>
                  <ul className="mt-4 space-y-2 text-base text-white/90">
                    {["Storm LS 1200d Pro", "Storm LS 1200x pro.", "LS 600d Pro.", "LS 600x.", "Aputure 2600x.", "Spot lens for 600.", "Spot lens for 1200.", "Godox flash.", "Complete Accessories & Grip."].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-lg text-white/70">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-inner shadow-black/40">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/70">Generators (operator included, fuel excluded)</p>
                  <ul className="mt-4 space-y-2 text-base text-white/90">
                    {["25 kVA", "50 kVA", "60 kVA", "75 kVA"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-lg text-white/70">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-white/90">Operator included; fuel will be billed based on usage.</div>
                </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <footer className="footer">
            <div className="footer-top">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-base font-semibold text-black">
                  SS
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Sunday Studio</p>
                  <p className="text-lg font-semibold text-white">Infinity wall, Lahore</p>
                </div>
              </div>
              <a href="mailto:hello@sunday.studio" className="btn-primary" data-cursor="accent">
                Book a shoot
              </a>
            </div>

            <div className="footer-grid">
              <div className="footer-card">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Address</p>
                <p className="mt-2 text-sm text-neutral-100">Building No 13-14, Block H-3, Main Canal Road, Near Mughal Eye, Lahore</p>
                <p className="mt-3 text-xs text-neutral-300">Central load-in and client parking available.</p>
              </div>
              <div className="footer-card">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Contact</p>
                <div className="mt-2 space-y-2 text-sm font-semibold text-white">
                  <a href="tel:+923000846656" className="flex items-center gap-2" data-cursor="accent">
                    <span className="chip">Phone</span>
                    +92 300 084 6656
                  </a>
                  <a href={whatsappLink} className="flex items-center gap-2" data-cursor="accent">
                    <span className="chip">WhatsApp</span>
                    Quick quote
                  </a>
                  <a href="mailto:hello@sunday.studio" className="flex items-center gap-2" data-cursor="accent">
                    <span className="chip">Email</span>
                    hello@sunday.studio
                  </a>
                </div>
              </div>
              <div className="footer-card">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Quick links</p>
                <div className="mt-2 grid gap-2 text-sm text-neutral-100">
                  <a href="#spaces" className="nav-link" data-cursor="accent">Spaces</a>
                  <a href="#packages" className="nav-link" data-cursor="accent">Packages</a>
                  <Link href="/gallery" className="nav-link" data-cursor="accent">
                    Gallery
                  </Link>
                  <a href="#contact" className="nav-link" data-cursor="accent">Book time</a>
                </div>
              </div>
              <div className="footer-card">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Hours</p>
                <p className="mt-2 text-sm text-neutral-100">Weekdays: 9 AM – 9 PM</p>
                <p className="text-sm text-neutral-100">Weekends: By appointment</p>
                <p className="mt-3 text-xs text-neutral-300">Ask about overnight resets and pre-light options.</p>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
