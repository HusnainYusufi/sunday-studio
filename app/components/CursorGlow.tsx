"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<"default" | "accent">("default");

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });

      const target = event.target as HTMLElement | null;
      const nearest = target?.closest<HTMLElement>("[data-cursor]");
      const intent = nearest?.dataset.cursor === "accent" ? "accent" : "default";
      setVariant(intent);
    };

    document.addEventListener("pointermove", handleMove, { passive: true });
    return () => document.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      className={`cursor-glow ${variant === "accent" ? "cursor-glow-accent" : ""}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      aria-hidden
    />
  );
}
