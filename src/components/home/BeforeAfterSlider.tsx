"use client";

import { useRef, useState, useCallback, useId } from "react";
import Image from "next/image";
import { images } from "@/config/images";

interface SliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

function SingleSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }: SliderProps) {
  const [pct, setPct] = useState(50);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const sliderId = useId();

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const applyFromClientX = useCallback((clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPct(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    applyFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    applyFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") { e.preventDefault(); setPct((p) => clamp(p - step)); }
    if (e.key === "ArrowRight") { e.preventDefault(); setPct((p) => clamp(p + step)); }
    if (e.key === "Home") { e.preventDefault(); setPct(0); }
    if (e.key === "End") { e.preventDefault(); setPct(100); }
  };

  return (
    <div
      ref={rootRef}
      style={{ position: "relative", aspectRatio: "3/4", width: "100%", overflow: "hidden", borderRadius: "12px", userSelect: "none", cursor: "ew-resize", touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* AFTER image — full layer, base */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 90vw, 40vw"
        style={{ objectFit: "cover", objectPosition: "top" }}
        draggable={false}
      />

      {/* BEFORE image — clipped to left pct% via clipPath on full-size layer */}
      <div style={{
        position: "absolute",
        inset: 0,
        clipPath: `inset(0 ${100 - pct}% 0 0)`,
        zIndex: 10,
      }}>
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 90vw, 40vw"
          style={{ objectFit: "cover", objectPosition: "top" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `${pct}%`,
        transform: "translateX(-50%)",
        width: "2px",
        background: "white",
        zIndex: 20,
        pointerEvents: "none",
      }} />

      {/* Drag handle */}
      <div
        role="slider"
        aria-label="Before/after comparison slider"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        id={sliderId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{
          position: "absolute",
          top: "50%",
          left: `${pct}%`,
          transform: "translate(-50%, -50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.45)",
          zIndex: 30,
          outline: "none",
          cursor: "ew-resize",
        }}
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
          <path d="M1 6h16M1 6L5 2M1 6l4 4M17 6l-4-4M17 6l-4 4" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* BEFORE label — pointer-events:none so drag works over it */}
      <div style={{
        position: "absolute",
        top: "14px",
        left: "14px",
        zIndex: 25,
        pointerEvents: "none",
        background: "rgba(0,0,0,0.55)",
        color: "white",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        padding: "4px 10px",
        borderRadius: "4px",
        backdropFilter: "blur(4px)",
      }}>
        BEFORE
      </div>

      {/* AFTER label */}
      <div style={{
        position: "absolute",
        top: "14px",
        right: "14px",
        zIndex: 25,
        pointerEvents: "none",
        background: "rgba(0,0,0,0.55)",
        color: "white",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        padding: "4px 10px",
        borderRadius: "4px",
        backdropFilter: "blur(4px)",
      }}>
        AFTER
      </div>
    </div>
  );
}

interface BeforeAfterSliderProps {
  audience?: "mixed" | "ladies";
}

export default function BeforeAfterSlider({ audience = "mixed" }: BeforeAfterSliderProps) {
  const items = audience === "ladies" ? images.ladies.transformations : images.transformations;

  return (
    <section
      aria-labelledby="transformations-heading"
      style={{
        background: "var(--bg-surface)",
        padding: "80px 0",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "var(--accent)",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            BEFORE &amp; AFTER
          </p>
          <h2
            id="transformations-heading"
            style={{
              fontFamily: "var(--font-bebas-neue), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            MEMBER{" "}
            <span style={{ color: "var(--accent)" }}>TRANSFORMATIONS.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "760px",
          margin: "0 auto",
        }}>
          {items.map((item, idx) => (
            <SingleSlider
              key={idx}
              beforeSrc={item.before}
              afterSrc={item.after}
              beforeAlt={`Member transformation ${idx + 1} before`}
              afterAlt={`Member transformation ${idx + 1} after`}
            />
          ))}
        </div>

        <p style={{
          textAlign: "center",
          marginTop: "28px",
          fontSize: "13px",
          color: "var(--text-muted)",
          lineHeight: 1.6,
        }}>
          Sample photos. Your members&apos; real transformations will appear here.
        </p>
      </div>
    </section>
  );
}
