"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CursorGlow } from "../components/CursorGlow";

const galleryShots = [
  {
    title: "Fashion motion still",
    category: "Fashion",
    tags: ["120fps", "Soft toppers", "Color pop"],
    palette: "from-amber-300/30 via-orange-200/10 to-white/5",
    image: "/gallery/look1.svg",
    note: "Fluid camera moves on a seamless sweep with soft toppers and haze.",
  },
  {
    title: "Product hero + depth cards",
    category: "Product",
    tags: ["Tabletop", "Macro", "Depth blocks"],
    palette: "from-indigo-200/30 via-blue-100/10 to-white/5",
    image: "/gallery/look2.svg",
    note: "Layered risers and gradients built for macro hero passes.",
  },
  {
    title: "Wellness ad gradient",
    category: "Commercial",
    tags: ["Natural", "Movement", "Lifestyle"],
    palette: "from-emerald-200/30 via-teal-100/10 to-white/5",
    image: "/gallery/look3.svg",
    note: "Organic sweeps, greenery, and airy pacing for wellness brands.",
  },
  {
    title: "Editorial duo lighting",
    category: "Fashion",
    tags: ["Dual key", "Color split", "Portrait"],
    palette: "from-rose-200/30 via-pink-100/10 to-white/5",
    image: "/gallery/look4.svg",
    note: "Two-light symmetry with color separation for layered portraits.",
  },
  {
    title: "Tech product lines",
    category: "Product",
    tags: ["Edge lights", "Specular", "Angles"],
    palette: "from-cyan-200/30 via-blue-100/10 to-white/5",
    image: "/gallery/look5.svg",
    note: "Specular lines, neon highlights, and clean reflections for devices.",
  },
  {
    title: "Music video haze",
    category: "Music",
    tags: ["Haze", "Backlight", "Motion"],
    palette: "from-fuchsia-200/30 via-purple-100/10 to-white/5",
    image: "/gallery/look6.svg",
    note: "Backlit haze and negative fill for dramatic silhouettes.",
  },
];

const categories = ["All", "Fashion", "Product", "Commercial", "Music"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filteredShots = useMemo(
    () =>
      activeCategory === "All"
        ? galleryShots
        : galleryShots.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="relative min-h-screen bg-ink text-white">
      <CursorGlow />
      <div className="accent-wash" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-14 px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="pill">Gallery</p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">Looks that feel bespoke to every brief.</h1>
            <p className="max-w-3xl text-lg text-neutral-200">
              Interactive inspirations from shoots we host—tap a tile to discover the setup. Each look is available as a preset we
              can pre-light before you walk in.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-white/80">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-pill ${activeCategory === category ? "filter-pill-active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {filteredShots.map((shot) => (
            <article key={shot.title} className="gallery-card" data-cursor="accent">
              <div className={`gallery-media bg-gradient-to-br ${shot.palette}`} style={{ backgroundImage: `url(${shot.image})` }}>
                <div className="glass-fade" />
              </div>
              <div className="gallery-meta">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{shot.category}</p>
                    <h2 className="text-xl font-semibold text-white">{shot.title}</h2>
                  </div>
                  <span className="chip">Pre-light ready</span>
                </div>
                <p className="text-sm text-neutral-200">{shot.note}</p>
                <div className="flex flex-wrap gap-2 text-xs text-white/80">
                  {shot.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-neutral-100 shadow-xl shadow-black/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">See the space in person</p>
              <p className="text-lg font-semibold text-white">Schedule a gallery walk-through.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:hello@sunday.studio" className="btn-primary" data-cursor="accent">
                Book a tour
              </a>
              <Link href="/" className="btn-ghost" data-cursor="accent">
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
