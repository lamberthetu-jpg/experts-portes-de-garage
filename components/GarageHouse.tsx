"use client";

import { useEffect, useRef, useState } from "react";

export default function GarageHouse() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openPercent, setOpenPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Door closed at top of page, fully open after scrolling 400px
      const scrollY = window.scrollY;
      const maxScroll = 400;

      if (scrollY <= 0) {
        setOpenPercent(0);
      } else if (scrollY >= maxScroll) {
        setOpenPercent(100);
      } else {
        setOpenPercent((scrollY / maxScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Door panel height: the visible part shrinks as door opens (rolls up)
  const doorScale = 1 - openPercent / 100;
  // Reveal the inside as the door opens
  const insideOpacity = openPercent / 100;

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto select-none">
      {/* ── HOUSE ── */}
      <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
        {/* Sky background */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8f0fe" />
            <stop offset="100%" stopColor="#f8f9fa" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f0eb" />
            <stop offset="100%" stopColor="#e8e0d8" />
          </linearGradient>
          <linearGradient id="insideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2d2d2d" />
          </linearGradient>
          <clipPath id="doorClip">
            <rect x="100" y="175" width="200" height="170" />
          </clipPath>
        </defs>

        {/* Ground */}
        <rect x="0" y="345" width="400" height="35" fill="#6b8f5e" rx="0" />
        <rect x="0" y="355" width="400" height="25" fill="#5a7d4e" rx="0" />

        {/* Driveway */}
        <path d="M140 380 L260 380 L240 345 L160 345 Z" fill="#999" />

        {/* House walls */}
        <rect x="50" y="140" width="300" height="205" fill="url(#wallGrad)" rx="2" />

        {/* Wall lines (siding) */}
        {[160, 180, 200, 220, 240, 260, 280, 300, 320].map((y) => (
          <line key={y} x1="50" y1={y} x2="350" y2={y} stroke="#ddd5cc" strokeWidth="0.5" />
        ))}

        {/* Roof */}
        <polygon points="30,140 200,50 370,140" fill="url(#roofGrad)" />
        <polygon points="30,140 200,50 370,140" fill="none" stroke="#2a2a2a" strokeWidth="2" />

        {/* Chimney */}
        <rect x="270" y="70" width="30" height="60" fill="#8B4513" />
        <rect x="266" y="65" width="38" height="10" fill="#6d3710" rx="1" />

        {/* Window left */}
        <rect x="75" y="190" width="55" height="55" fill="#87CEEB" stroke="#666" strokeWidth="2" rx="1" />
        <line x1="102.5" y1="190" x2="102.5" y2="245" stroke="#666" strokeWidth="1.5" />
        <line x1="75" y1="217.5" x2="130" y2="217.5" stroke="#666" strokeWidth="1.5" />

        {/* Window right */}
        <rect x="270" y="190" width="55" height="55" fill="#87CEEB" stroke="#666" strokeWidth="2" rx="1" />
        <line x1="297.5" y1="190" x2="297.5" y2="245" stroke="#666" strokeWidth="1.5" />
        <line x1="270" y1="217.5" x2="325" y2="217.5" stroke="#666" strokeWidth="1.5" />

        {/* Small upper window */}
        <circle cx="200" cy="110" r="18" fill="#87CEEB" stroke="#666" strokeWidth="2" />
        <line x1="200" y1="92" x2="200" y2="128" stroke="#666" strokeWidth="1.5" />
        <line x1="182" y1="110" x2="218" y2="110" stroke="#666" strokeWidth="1.5" />

        {/* ── GARAGE DOOR AREA ── */}
        {/* Door frame */}
        <rect x="96" y="171" width="208" height="178" fill="#555" rx="3" />

        {/* Inside of garage (visible when door opens) */}
        <g clipPath="url(#doorClip)">
          <rect x="100" y="175" width="200" height="170" fill="url(#insideGrad)" />
          {/* Inside details */}
          <g style={{ opacity: insideOpacity, transition: "opacity 0.1s" }}>
            {/* Back wall */}
            <rect x="110" y="180" width="180" height="160" fill="#252525" />
            {/* Shelves */}
            <rect x="120" y="210" width="60" height="3" fill="#555" />
            <rect x="120" y="240" width="60" height="3" fill="#555" />
            {/* Tool silhouettes */}
            <rect x="130" y="195" width="4" height="15" fill="#444" rx="1" />
            <rect x="145" y="198" width="4" height="12" fill="#444" rx="1" />
            <rect x="160" y="193" width="4" height="17" fill="#444" rx="1" />
            {/* Light on ceiling */}
            <rect x="185" y="183" width="30" height="5" fill="#666" rx="2" />
            {openPercent > 60 && (
              <circle cx="200" cy="195" r="15" fill="#fff3" />
            )}
            {/* Floor */}
            <rect x="100" y="330" width="200" height="15" fill="#333" />
          </g>
        </g>

        {/* ── GARAGE DOOR (animated) ── */}
        <g clipPath="url(#doorClip)">
          <g style={{
            transform: `scaleY(${doorScale})`,
            transformOrigin: "center 175px",
            transition: "transform 0.05s linear",
          }}>
            {/* Door body */}
            <rect x="100" y="175" width="200" height="170" fill="#c4c4c4" />
            {/* Door panels */}
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect
                  x="104"
                  y={179 + i * 42}
                  width="192"
                  height="38"
                  fill="#d4d4d4"
                  stroke="#b0b0b0"
                  strokeWidth="1"
                  rx="1"
                />
                {/* Panel detail lines */}
                <rect
                  x="110"
                  y={185 + i * 42}
                  width="84"
                  height="26"
                  fill="none"
                  stroke="#bbb"
                  strokeWidth="0.5"
                  rx="1"
                />
                <rect
                  x="206"
                  y={185 + i * 42}
                  width="84"
                  height="26"
                  fill="none"
                  stroke="#bbb"
                  strokeWidth="0.5"
                  rx="1"
                />
              </g>
            ))}
            {/* Door handle */}
            <rect x="190" y="310" width="20" height="6" fill="#888" rx="3" />
          </g>
        </g>

        {/* Door frame overlay (sides and top) */}
        <rect x="93" y="168" width="214" height="7" fill="#444" rx="1" />
        <rect x="93" y="168" width="7" height="182" fill="#444" rx="1" />
        <rect x="300" y="168" width="7" height="182" fill="#444" rx="1" />

        {/* Bushes */}
        <ellipse cx="65" cy="345" rx="25" ry="15" fill="#4a7a3a" />
        <ellipse cx="85" cy="345" rx="20" ry="12" fill="#3d6d2e" />
        <ellipse cx="335" cy="345" rx="25" ry="15" fill="#4a7a3a" />
        <ellipse cx="315" cy="345" rx="20" ry="12" fill="#3d6d2e" />
      </svg>

      {/* Scroll hint */}
      {openPercent < 10 && (
        <p className="text-center text-sm text-gray-400 mt-3 animate-bounce">
          Scrollez vers le bas
        </p>
      )}
    </div>
  );
}
