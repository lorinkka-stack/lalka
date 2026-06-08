"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sun, Shield, Clock, Award, MapPin, Phone, Mail,
  Linkedin, Facebook, ChevronDown, ArrowRight, CheckCircle,
  Zap, Building2, Users, TrendingUp, Globe, Menu, X,
} from "lucide-react";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
      <div className={`h-px w-8 ${light ? "bg-solar-400" : "bg-solar-500"}`} />
      <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${light ? "text-solar-400" : "text-solar-600"}`}>
        {children}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SOLAR PANEL SVG BACKGROUND ILLUSTRATION
───────────────────────────────────────────── */
function SolarParkIllustration() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1628" />
          <stop offset="100%" stopColor="#1E3A5F" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2E1A" />
          <stop offset="100%" stopColor="#0F1A0F" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B3A6B" />
          <stop offset="50%" stopColor="#1E4080" />
          <stop offset="100%" stopColor="#142B55" />
        </linearGradient>
        <linearGradient id="panelShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="320" fill="url(#skyGrad)" />

      {/* Horizon glow */}
      <ellipse cx="400" cy="310" rx="500" ry="60" fill="rgba(34,197,94,0.06)" />

      {/* Stars */}
      {[
        [80,40],[160,80],[250,30],[340,60],[420,25],[520,55],[620,35],[700,70],[750,45],
        [50,110],[180,130],[290,100],[450,120],[580,90],[680,140],[730,110],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="white" opacity={0.3 + (i % 4) * 0.15} />
      ))}

      {/* Moon / Sun glow */}
      <circle cx="680" cy="60" r="24" fill="#FEF3C7" opacity="0.12" />
      <circle cx="680" cy="60" r="16" fill="#FEF3C7" opacity="0.18" />
      <circle cx="680" cy="60" r="10" fill="#FDE68A" opacity="0.3" />

      {/* Ground */}
      <rect y="310" width="800" height="190" fill="url(#groundGrad)" />
      <rect y="308" width="800" height="4" fill="rgba(34,197,94,0.15)" />

      {/* Perspective grid lines on ground */}
      {[-100,-50,0,50,100,150,200,250,300].map((x, i) => (
        <line key={i}
          x1={400 + x} y1={312}
          x2={400 + x * 6} y2={500}
          stroke="rgba(34,197,94,0.06)" strokeWidth="1"
        />
      ))}
      {[0,0.2,0.4,0.6,0.8].map((t, i) => (
        <line key={i}
          x1={0} y1={312 + t * 188}
          x2={800} y2={312 + t * 188}
          stroke="rgba(34,197,94,0.04)" strokeWidth="1"
        />
      ))}

      {/* Solar panel rows — back rows */}
      {[
        { y: 315, rows: 8, w: 34, h: 14, gap: 38, startX: 30, count: 20, tilt: 0 },
        { y: 340, rows: 6, w: 40, h: 18, gap: 46, startX: 15, count: 17, tilt: 0 },
        { y: 372, rows: 4, w: 50, h: 24, gap: 56, startX: -10, count: 15, tilt: 0 },
      ].map((row, ri) =>
        Array.from({ length: row.count }).map((_, i) => {
          const x = row.startX + i * row.gap;
          const yBase = row.y;
          return (
            <g key={`${ri}-${i}`}>
              {/* Panel frame */}
              <rect
                x={x} y={yBase}
                width={row.w} height={row.h}
                rx="1"
                fill="url(#panelGrad)"
                stroke="rgba(34,197,94,0.25)"
                strokeWidth="0.5"
              />
              {/* Panel shine */}
              <rect
                x={x} y={yBase}
                width={row.w} height={row.h}
                rx="1"
                fill="url(#panelShine)"
              />
              {/* Panel cell lines */}
              <line x1={x + row.w/3} y1={yBase} x2={x + row.w/3} y2={yBase + row.h}
                stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <line x1={x + row.w*2/3} y1={yBase} x2={x + row.w*2/3} y2={yBase + row.h}
                stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <line x1={x} y1={yBase + row.h/2} x2={x + row.w} y2={yBase + row.h/2}
                stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              {/* Support post */}
              <line
                x1={x + row.w/2} y1={yBase + row.h}
                x2={x + row.w/2} y2={yBase + row.h + 8 + ri * 4}
                stroke="rgba(100,120,100,0.6)" strokeWidth="1.5"
              />
            </g>
          );
        })
      )}

      {/* Foreground larger panels */}
      {[
        { x: 20, y: 405, w: 72, h: 40 },
        { x: 110, y: 410, w: 72, h: 40 },
        { x: 200, y: 415, w: 72, h: 40 },
        { x: 300, y: 418, w: 80, h: 44 },
        { x: 400, y: 420, w: 80, h: 44 },
        { x: 500, y: 416, w: 72, h: 40 },
        { x: 595, y: 412, w: 72, h: 40 },
        { x: 690, y: 408, w: 72, h: 40 },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="2"
            fill="url(#panelGrad)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.8" />
          <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="2" fill="url(#panelShine)" />
          {[1,2,3].map(col => (
            <line key={col}
              x1={p.x + (p.w / 4) * col} y1={p.y}
              x2={p.x + (p.w / 4) * col} y2={p.y + p.h}
              stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
          ))}
          {[1].map(row => (
            <line key={row}
              x1={p.x} y1={p.y + p.h / 2}
              x2={p.x + p.w} y2={p.y + p.h / 2}
              stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
          ))}
          <line
            x1={p.x + p.w / 2} y1={p.y + p.h}
            x2={p.x + p.w / 2} y2={p.y + p.h + 22}
            stroke="rgba(100,140,100,0.7)" strokeWidth="2.5" />
          {/* Base */}
          <ellipse cx={p.x + p.w / 2} cy={p.y + p.h + 22} rx={6} ry={2}
            fill="rgba(100,140,100,0.3)" />
        </g>
      ))}

      {/* Solar energy glow effect */}
      <ellipse cx="400" cy="420" rx="350" ry="20" fill="rgba(34,197,94,0.04)" />

      {/* Overlay gradient for depth */}
      <defs>
        <linearGradient id="overlayGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(10,22,40,0.5)" />
          <stop offset="30%" stopColor="rgba(10,22,40,0)" />
          <stop offset="70%" stopColor="rgba(10,22,40,0)" />
          <stop offset="100%" stopColor="rgba(10,22,40,0.5)" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#overlayGrad)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   EUROPE MAP SVG
───────────────────────────────────────────── */
function EuropeMap() {
  const countries = [
    { name: "Nemecko", cx: 310, cy: 175, r: 8, primary: true },
    { name: "Rakúsko", cx: 340, cy: 220, r: 5, primary: false },
    { name: "Česká republika", cx: 355, cy: 190, r: 5, primary: false },
    { name: "Slovensko", cx: 385, cy: 205, r: 5, primary: false },
    { name: "Holandsko", cx: 280, cy: 155, r: 5, primary: false },
    { name: "Belgicko", cx: 265, cy: 170, r: 5, primary: false },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="180 100 300 240" className="w-full drop-shadow-2xl">
        {/* Simplified Europe outline paths */}
        <g fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8">
          {/* Iberian Peninsula */}
          <path d="M200 230 L240 220 L250 240 L235 270 L210 265 Z" />
          {/* France */}
          <path d="M240 185 L280 178 L295 195 L285 225 L255 230 L240 215 Z" />
          {/* UK */}
          <path d="M245 145 L265 138 L270 155 L255 168 L242 162 Z" />
          <path d="M232 130 L250 125 L252 140 L238 145 Z" />
          {/* Benelux */}
          <path d="M268 155 L285 150 L290 168 L272 173 Z" />
          {/* Germany */}
          <path d="M285 150 L335 148 L348 170 L340 200 L310 210 L290 195 L285 172 Z" />
          {/* Denmark */}
          <path d="M305 128 L325 122 L330 140 L310 145 Z" />
          {/* Scandinavia */}
          <path d="M295 100 L350 95 L380 120 L370 155 L340 148 L310 128 L300 115 Z" />
          {/* Poland */}
          <path d="M348 148 L400 142 L415 165 L405 188 L375 192 L348 175 Z" />
          {/* Czech/Slovakia */}
          <path d="M335 198 L400 192 L415 208 L395 220 L360 218 L335 210 Z" />
          {/* Austria/Hungary */}
          <path d="M335 208 L395 220 L415 235 L400 248 L355 245 L330 230 Z" />
          {/* Switzerland/Italy */}
          <path d="M280 222 L320 220 L335 230 L330 270 L310 290 L290 275 L275 248 Z" />
          {/* Balkans */}
          <path d="M355 245 L415 238 L430 270 L410 295 L375 290 L355 265 Z" />
          {/* Baltic */}
          <path d="M360 125 L415 115 L430 140 L415 165 L390 158 L365 148 Z" />
          {/* Greece */}
          <path d="M370 280 L410 275 L415 300 L390 315 L368 305 Z" />
        </g>

        {/* Country highlight — Germany */}
        <path
          d="M285 150 L335 148 L348 170 L340 200 L310 210 L290 195 L285 172 Z"
          fill="rgba(34,197,94,0.25)"
          stroke="rgba(34,197,94,0.6)"
          strokeWidth="1.5"
        />

        {/* Marker dots */}
        {countries.map((c, i) => (
          <g key={i}>
            {c.primary && (
              <circle cx={c.cx} cy={c.cy} r={c.r * 2.5} fill="rgba(34,197,94,0.15)"
                className="animate-ping" style={{ animationDuration: "2s" }} />
            )}
            <circle cx={c.cx} cy={c.cy} r={c.r}
              fill={c.primary ? "#22C55E" : "#4ADE80"}
              opacity={c.primary ? 1 : 0.8}
              stroke={c.primary ? "white" : "rgba(255,255,255,0.5)"}
              strokeWidth={c.primary ? "1.5" : "1"}
            />
            <text
              x={c.cx + (c.primary ? 12 : 9)}
              y={c.cy + 4}
              fontSize={c.primary ? "7" : "6"}
              fill={c.primary ? "white" : "rgba(255,255,255,0.7)"}
              fontWeight={c.primary ? "700" : "400"}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setProgress(v * 100));
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { unsub(); window.removeEventListener("scroll", onScroll); };
  }, [scrollYProgress]);

  const links = [
    { href: "#o-nas", label: "O nás" },
    { href: "#sluzby", label: "Služby" },
    { href: "#preco-my", label: "Prečo my" },
    { href: "#projekty", label: "Projekty" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <>
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
      />
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-900/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-solar-500 to-solar-700 rounded-lg flex items-center justify-center shadow-lg shadow-solar-500/30 group-hover:scale-105 transition-transform">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                MODUL<span className="text-solar-400">MONT</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-white/70 hover:text-white hover-underline transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-solar-500/30 hover:-translate-y-0.5"
              >
                Kontaktovať nás
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-navy-900/98 backdrop-blur-lg border-b border-white/10 py-6 px-6"
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-medium text-white/80 hover:text-white border-b border-white/5 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center gap-2 bg-solar-500 text-white text-sm font-semibold px-5 py-3 rounded-lg w-full justify-center"
            >
              Kontaktovať nás <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <SolarParkIllustration />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/30 to-navy-950/80" />
        <div className="absolute inset-0 solar-pattern" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-solar-500/15 border border-solar-500/30 text-solar-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            Profesionálny montážny partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-8"
          >
            Profesionálna montáž{" "}
            <span className="gradient-text">
              fotovoltických
            </span>{" "}
            konštrukcií a solárnych panelov
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl"
          >
            Skúsené montážne tímy pre veľké fotovoltické projekty v Nemecku a celej Európe. Precíznosť, spoľahlivosť a dodržiavanie najvyšších bezpečnostných štandardov.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-solar-500 hover:bg-solar-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-solar-500/40 hover:-translate-y-0.5 text-base"
            >
              Kontaktovať nás
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#projekty"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-200 text-base backdrop-blur-sm"
            >
              Naše realizácie
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[
              { value: "10+", label: "rokov skúseností" },
              { value: "100+", label: "projektov" },
              { value: "500 MW+", label: "namontovanej kapacity" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-px bg-solar-500/50" />
                <div>
                  <div className="text-2xl font-bold text-solar-400">{s.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   O NÁS
───────────────────────────────────────────── */
function OdNas() {
  const features = [
    { icon: Shield, text: "Certifikované postupy podľa nemeckých noriem" },
    { icon: Award, text: "Skúsené a kvalifikované montážne tímy" },
    { icon: Clock, text: "Dodržiavanie termínov a harmonogramov" },
    { icon: Globe, text: "Pôsobíme v Nemecku a celej Európe" },
  ];

  return (
    <Section id="o-nas" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>O spoločnosti</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-6">
              Kto sme
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-navy-600 leading-relaxed mb-6">
              MODULMONT je spoľahlivý partner pre výstavbu fotovoltických elektrární. Špecializujeme sa na montáž nosných konštrukcií a osádzanie fotovoltických modulov na pozemných aj strešných projektoch.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-navy-600 leading-relaxed mb-10">
              Vďaka dlhoročným skúsenostiam z nemeckého trhu dokážeme zabezpečiť efektívnu realizáciu projektov pri zachovaní najvyšších štandardov kvality a bezpečnosti. Naše tímy pracujú podľa prísnych európskych predpisov a sú pripravené na projekty akéhokoľvek rozsahu.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  custom={i * 0.5 + 3}
                  className="flex items-start gap-3 p-4 rounded-xl border border-navy-100 hover:border-solar-300 hover:bg-solar-50/50 transition-colors group"
                >
                  <div className="w-9 h-9 bg-solar-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-solar-500 transition-colors">
                    <f.icon className="w-4 h-4 text-solar-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-navy-700 leading-snug">{f.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual panel */}
          <motion.div variants={fadeIn} custom={2} className="relative">
            <div className="relative bg-navy-900 rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-navy-900/30">
              <div className="absolute inset-0 solar-pattern opacity-50" />
              <div className="absolute inset-0">
                <svg viewBox="0 0 600 450" className="w-full h-full">
                  <defs>
                    <linearGradient id="workerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E3A5F" />
                      <stop offset="100%" stopColor="#0A1628" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="450" fill="url(#workerGrad)" />
                  {/* Simplified solar field scene */}
                  {Array.from({ length: 5 }).map((_, row) =>
                    Array.from({ length: 8 }).map((_, col) => (
                      <g key={`${row}-${col}`}>
                        <rect
                          x={30 + col * 72} y={80 + row * 68}
                          width={60} height={38}
                          rx="2"
                          fill="rgba(30,58,96,0.8)"
                          stroke="rgba(34,197,94,0.3)"
                          strokeWidth="0.8"
                        />
                        <rect
                          x={30 + col * 72} y={80 + row * 68}
                          width={60} height={38}
                          rx="2"
                          fill="rgba(255,255,255,0.04)"
                        />
                        <line x1={50 + col*72} y1={80+row*68} x2={50+col*72} y2={118+row*68} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
                        <line x1={70 + col*72} y1={80+row*68} x2={70+col*72} y2={118+row*68} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
                        <line x1={30+col*72} y1={99+row*68} x2={90+col*72} y2={99+row*68} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
                      </g>
                    ))
                  )}
                  {/* Worker silhouettes */}
                  {[[140, 380],[300,375],[460,378]].map(([x,y],i)=>(
                    <g key={i}>
                      <circle cx={x} cy={y-28} r="10" fill="rgba(255,255,255,0.15)" />
                      <rect x={x-8} y={y-18} width="16" height="22" rx="3" fill="rgba(255,255,255,0.12)" />
                      <rect x={x-14} y={y-16} width="10" height="14" rx="2" fill="rgba(255,255,255,0.1)" />
                      <rect x={x+4} y={y-16} width="10" height="14" rx="2" fill="rgba(255,255,255,0.1)" />
                      <circle cx={x} cy={y-32} r="5" fill="#FDE68A" opacity="0.6" />
                    </g>
                  ))}
                  {/* Green energy glow */}
                  <ellipse cx="300" cy="420" rx="250" ry="15" fill="rgba(34,197,94,0.08)" />
                </svg>
              </div>

              {/* Info badge */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">Utility-scale montáž</div>
                    <div className="text-white/50 text-xs mt-0.5">Nemecko · 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-solar-400 font-bold text-lg">48 MW</div>
                    <div className="text-white/40 text-xs">kapacita</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-solar-100"
            >
              <div className="text-3xl font-bold text-solar-600">500+</div>
              <div className="text-xs text-navy-500 mt-1">MW namontovanej<br />kapacity</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   SLUŽBY
───────────────────────────────────────────── */
function Sluzby() {
  const services = [
    {
      icon: Building2,
      title: "Výstavba nosných konštrukcií",
      desc: "Profesionálna montáž oceľových a hliníkových nosných systémov pre pozemné aj strešné fotovoltické elektrárne s presnosťou podľa projektovej dokumentácie.",
      items: [
        "Montáž oceľových a hliníkových systémov",
        "Pozemné fotovoltické elektrárne",
        "Strešné fotovoltické systémy",
        "Kotviace systémy",
      ],
      color: "from-blue-600 to-navy-700",
      badge: "Konštrukcie",
    },
    {
      icon: Sun,
      title: "Osádzanie solárnych panelov",
      desc: "Kvalifikovaná montáž fotovoltických modulov vrátane zarovnania, upevnenia a kontroly kvality každého panela podľa špecifikácií výrobcu.",
      items: [
        "Profesionálna montáž FV modulov",
        "Zarovnanie a upevnenie panelov",
        "Kontrola kvality montáže",
        "Práca podľa projektovej dokumentácie",
      ],
      color: "from-solar-600 to-solar-800",
      badge: "Panely",
    },
    {
      icon: Users,
      title: "Montážne tímy pre veľké projekty",
      desc: "Flexibilné kapacity pre utility-scale projekty. Koordinujeme veľké pracovné tímy s dôrazom na bezpečnosť, efektivitu a dodržiavanie harmonogramov.",
      items: [
        "Flexibilné kapacity tímov",
        "Skúsenosti s utility-scale projektmi",
        "Práca v Nemecku a EÚ",
        "Dodržiavanie harmonogramov",
      ],
      color: "from-navy-700 to-navy-900",
      badge: "Tímy",
    },
  ];

  return (
    <Section id="sluzby" className="py-28 bg-navy-950 solar-pattern">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel light>Služby</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Naše služby
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Komplexné montážne riešenia od nosných konštrukcií až po finálnu inštaláciu solárnych panelov.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.5}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative bg-navy-900/60 border border-white/8 rounded-2xl p-8 overflow-hidden card-shine group"
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />

              <div className={`inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} mb-6 shadow-lg`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>

              <div className="inline-block bg-solar-500/15 text-solar-400 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
                {s.badge}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{s.desc}</p>

              <ul className="space-y-2.5">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-solar-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   PREČO MODULMONT
───────────────────────────────────────────── */
function PrecoMy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { value: 10, suffix: "+", label: "rokov skúseností", icon: Award },
    { value: 100, suffix: "+", label: "úspešných projektov", icon: TrendingUp },
    { value: 500, suffix: " MW+", label: "namontovanej kapacity", icon: Zap },
  ];

  const advantages = [
    "Skúsenosti z nemeckého trhu",
    "Kvalifikované a certifikované montážne tímy",
    "Dôraz na bezpečnosť práce (BOZP)",
    "Dodržiavanie termínov a harmonogramov",
    "Vysoká kvalita realizácie",
    "Flexibilita pri veľkých projektoch",
  ];

  function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (!inView) return;
      const duration = 1800;
      const start = performance.now();
      const update = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(eased * target));
        if (p < 1) requestAnimationFrame(update);
        else setVal(target);
      };
      requestAnimationFrame(update);
    }, [inView, target]);
    return <span>{val}{suffix}</span>;
  }

  return (
    <Section id="preco-my" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <SectionLabel>Prečo my</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-navy-900">
            Prečo si vybrať MODULMONT
          </motion.h2>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i * 0.3}
              className="text-center p-8 bg-navy-950 rounded-2xl shadow-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 solar-pattern opacity-30" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-solar-500 to-solar-400" />
              <div className="relative">
                <div className="w-12 h-12 bg-solar-500/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-solar-400" />
                </div>
                <div className="text-5xl font-black text-solar-400 mb-2 tabular-nums">
                  <AnimatedNumber target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white/50 text-sm font-medium">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Germany focus badge */}
        <motion.div variants={fadeUp} custom={2} className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-6 mb-8 flex items-center gap-6 border border-white/5">
          <div className="w-16 h-16 bg-solar-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-8 h-8 text-solar-400" />
          </div>
          <div>
            <div className="text-white font-bold text-xl">Nemecko — hlavný trh pôsobenia</div>
            <div className="text-white/50 text-sm mt-1">Viac ako dekáda skúseností na náročnom nemeckom trhu. Plná znalosť miestnych noriem, predpisov a štandardov.</div>
          </div>
        </motion.div>

        {/* Advantages grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.2 + 2}
              className="flex items-center gap-3 p-4 bg-solar-50 rounded-xl border border-solar-100 hover:bg-solar-100/70 transition-colors group"
            >
              <CheckCircle className="w-5 h-5 text-solar-600 flex-shrink-0" />
              <span className="text-sm font-medium text-navy-800">{adv}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   PROJEKTY / REALIZÁCIE
───────────────────────────────────────────── */
function Projekty() {
  const projects = [
    {
      title: "Pozemná elektráreň Nemecko",
      location: "Severné Nemecko",
      capacity: "48 MW",
      type: "Utility-Scale",
      year: "2024",
      color: "from-navy-800 to-navy-950",
      accent: "#22C55E",
    },
    {
      title: "Solárny park Bavorsko",
      location: "Bayern, Nemecko",
      capacity: "32 MW",
      type: "Ground Mount",
      year: "2023",
      color: "from-navy-700 to-navy-900",
      accent: "#4ADE80",
    },
    {
      title: "Strešná inštalácia priemyselnej haly",
      location: "Düsseldorf, DE",
      capacity: "8 MW",
      type: "Rooftop",
      year: "2024",
      color: "from-navy-900 to-navy-950",
      accent: "#86EFAC",
    },
    {
      title: "Utility-Scale projekt",
      location: "Sasko, Nemecko",
      capacity: "72 MW",
      type: "Utility-Scale",
      year: "2023",
      color: "from-navy-800 to-navy-700",
      accent: "#22C55E",
    },
    {
      title: "Komerčný FV systém",
      location: "Praha, ČR",
      capacity: "4.5 MW",
      type: "Commercial",
      year: "2024",
      color: "from-navy-950 to-navy-800",
      accent: "#4ADE80",
    },
    {
      title: "Fotovoltický park Európa",
      location: "Holandsko",
      capacity: "56 MW",
      type: "Ground Mount",
      year: "2023",
      color: "from-navy-700 to-navy-950",
      accent: "#86EFAC",
    },
  ];

  return (
    <Section id="projekty" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <SectionLabel>Portfólio</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-navy-900">
            Naše projekty
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mt-4 text-navy-500 max-w-xl">
            Výber z realizovaných projektov v Nemecku a Európe. Každý projekt dokazuje naše schopnosti a štandardy.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.15}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-navy-950 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-navy-900/40 transition-shadow cursor-pointer"
            >
              {/* Visual */}
              <div className={`relative h-52 bg-gradient-to-br ${p.color} overflow-hidden`}>
                <div className="absolute inset-0 solar-pattern" />
                {/* Stylized solar panel grid */}
                <div className="absolute inset-0 flex flex-wrap gap-1 p-4 content-center justify-center">
                  {Array.from({ length: 24 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-[42px] h-[28px] rounded-sm border opacity-40 group-hover:opacity-70 transition-opacity"
                      style={{ borderColor: p.accent + "50", backgroundColor: p.accent + "10" }}
                    />
                  ))}
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                {/* Type badge */}
                <div
                  className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: p.accent + "25", color: p.accent, border: `1px solid ${p.accent}40` }}
                >
                  {p.type}
                </div>
                {/* Capacity */}
                <div className="absolute bottom-4 left-4">
                  <div className="text-3xl font-black" style={{ color: p.accent }}>
                    {p.capacity}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">inštalovanej kapacity</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-white text-base mb-2 group-hover:text-solar-400 transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-white/40">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {p.location}
                  </div>
                  <span>{p.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   PRACOVNÝ POSTUP
───────────────────────────────────────────── */
function Postup() {
  const steps = [
    {
      num: "01",
      title: "Príprava projektu",
      desc: "Dôkladná analýza projektovej dokumentácie, plánovanie zdrojov, koordinácia s generálnym dodávateľom a príprava pracovných tímov.",
      icon: "📋",
    },
    {
      num: "02",
      title: "Montáž konštrukcií",
      desc: "Presná a bezpečná inštalácia nosných oceľových a hliníkových konštrukcií podľa technických výkresov a predpisov.",
      icon: "🔧",
    },
    {
      num: "03",
      title: "Osádzanie panelov",
      desc: "Profesionálne upevnenie a zarovnanie fotovoltických modulov s dôrazom na presnosť, bezpečnosť a dlhodobú stabilitu.",
      icon: "☀️",
    },
    {
      num: "04",
      title: "Kontrola kvality",
      desc: "Systematická kontrola každej časti inštalácie, overenie upevnenia, geometrie a súladu s projektovou dokumentáciou.",
      icon: "✅",
    },
    {
      num: "05",
      title: "Odovzdanie projektu",
      desc: "Finálna prehliadka, dokumentácia dokončených prác a odovzdanie hotového diela investorovi alebo generálnemu dodávateľovi.",
      icon: "🏆",
    },
  ];

  return (
    <Section className="py-28 bg-navy-950 solar-pattern">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel light>Metodológia</SectionLabel>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white">
            Ako pracujeme
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="mt-4 text-white/50 max-w-xl mx-auto">
            Overený päťkrokový proces zabezpečujúci kvalitu, bezpečnosť a dodržiavanie termínov na každom projekte.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-solar-800 via-solar-500 to-solar-800" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.2}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-5 bg-navy-800 border-2 border-solar-500/40 rounded-full flex items-center justify-center shadow-lg shadow-solar-500/10">
                  <span className="text-2xl">{s.icon}</span>
                </div>

                <div className="text-solar-500 text-xs font-black tracking-widest mb-2">{s.num}</div>
                <h3 className="text-white font-bold text-base mb-3">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   REGIÓNY
───────────────────────────────────────────── */
function Regiony() {
  const regions = [
    { name: "Nemecko", note: "Hlavný trh", primary: true },
    { name: "Rakúsko", note: "Aktívni", primary: false },
    { name: "Česká republika", note: "Aktívni", primary: false },
    { name: "Slovensko", note: "Sídlo spoločnosti", primary: false },
    { name: "Holandsko", note: "Aktívni", primary: false },
    { name: "Belgicko", note: "Aktívni", primary: false },
  ];

  return (
    <Section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Pôsobenie</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Kde pôsobíme
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-navy-600 leading-relaxed mb-8">
              Naše montážne tímy sú pripravené realizovať projekty po celej Európe s hlavným zameraním na Nemecko. Máme skúsenosti s miestnou legislatívou, technickými normami a pracovnými podmienkami vo všetkých regiónoch.
            </motion.p>

            <div className="space-y-3">
              {regions.map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.15 + 1.5}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all ${
                    r.primary
                      ? "bg-solar-50 border-solar-300 shadow-sm"
                      : "bg-gray-50 border-gray-100 hover:border-solar-200 hover:bg-solar-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${r.primary ? "bg-solar-500 shadow-md shadow-solar-500/50" : "bg-gray-300"}`} />
                    <span className={`font-semibold ${r.primary ? "text-solar-800" : "text-navy-700"}`}>
                      {r.name}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    r.primary
                      ? "bg-solar-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {r.note}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map */}
          <motion.div variants={fadeIn} custom={2} className="relative">
            <div className="bg-navy-950 rounded-3xl p-6 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 solar-pattern opacity-20" />
              <EuropeMap />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   CTA SEKCIA
───────────────────────────────────────────── */
function CtaBanner() {
  return (
    <Section className="py-20 bg-gradient-to-br from-solar-700 via-solar-600 to-solar-800 relative overflow-hidden">
      <div className="absolute inset-0 solar-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Hľadáte spoľahlivého<br />montážneho partnera?
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-xl text-white/80 mb-10">
          Kontaktujte nás a prediskutujme váš fotovoltický projekt.
        </motion.p>
        <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4 justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-white text-solar-700 font-bold px-8 py-4 rounded-xl text-base hover:bg-solar-50 transition-all hover:shadow-2xl hover:-translate-y-0.5"
          >
            Vyžiadať ponuku
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="tel:+421900000000"
            className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-8 py-4 rounded-xl text-base border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
          >
            <Phone className="w-5 h-5" />
            Zavolajte nám
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   KONTAKT
───────────────────────────────────────────── */
function Kontakt() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <Section id="kontakt" className="py-28 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <SectionLabel light>Kontakt</SectionLabel>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Kontaktujte nás
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-white/50 leading-relaxed mb-10">
              Sme pripravení prediskutovať váš projekt. Ozvite sa nám a do 24 hodín sa vám ozveme späť.
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="space-y-6 mb-10">
              {[
                { icon: Phone, label: "Telefón", value: "+421 XXX XXX XXX", href: "tel:+421900000000" },
                { icon: Mail, label: "Email", value: "info@modulmont.eu", href: "mailto:info@modulmont.eu" },
                { icon: MapPin, label: "Lokalita", value: "Slovensko / Nemecko", href: "#" },
              ].map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 bg-navy-800 rounded-xl flex items-center justify-center group-hover:bg-solar-500 transition-colors flex-shrink-0">
                    <c.icon className="w-5 h-5 text-solar-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="text-white font-medium group-hover:text-solar-400 transition-colors">{c.value}</div>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={3}>
              <div className="text-xs text-white/30 uppercase tracking-wider mb-4">Sociálne siete</div>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Facebook, label: "Facebook" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2.5 bg-navy-800 hover:bg-solar-500 text-white/60 hover:text-white px-4 py-2.5 rounded-xl transition-all text-sm font-medium border border-white/5 hover:border-solar-500"
                  >
                    <s.icon className="w-4 h-4" />
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div variants={fadeUp} custom={1}>
            <div className="bg-navy-900/60 border border-white/8 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Vyžiadať ponuku</h3>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 bg-solar-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-solar-400" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Správa odoslaná!</h4>
                    <p className="text-white/50 text-sm">Ozveme sa vám do 24 hodín.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {["Meno a priezvisko", "Spoločnosť"].map(pl => (
                        <div key={pl}>
                          <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{pl}</label>
                          <input
                            type="text"
                            placeholder={pl}
                            required
                            className="w-full bg-navy-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-solar-500 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="vas@email.com"
                        required
                        className="w-full bg-navy-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-solar-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Typ projektu</label>
                      <select
                        className="w-full bg-navy-800/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-solar-500 transition-colors appearance-none"
                      >
                        <option value="" className="bg-navy-900">Vyberte typ projektu</option>
                        <option value="ground" className="bg-navy-900">Pozemná elektráreň</option>
                        <option value="roof" className="bg-navy-900">Strešná inštalácia</option>
                        <option value="utility" className="bg-navy-900">Utility-scale projekt</option>
                        <option value="commercial" className="bg-navy-900">Komerčný projekt</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Kapacita projektu (MW)</label>
                      <input
                        type="text"
                        placeholder="napr. 10 MW"
                        className="w-full bg-navy-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-solar-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">Správa</label>
                      <textarea
                        rows={4}
                        placeholder="Opíšte váš projekt a požiadavky..."
                        className="w-full bg-navy-800/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-solar-500 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-solar-500 hover:bg-solar-400 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-solar-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Odoslať požiadavku
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-solar-500 to-solar-700 rounded-lg flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                MODUL<span className="text-solar-400">MONT</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Profesionálny partner pre montáž fotovoltických konštrukcií a solárnych panelov v Nemecku a celej Európe.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-navy-800 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-solar-500 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-navy-800 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-solar-500 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Spoločnosť</h4>
            <ul className="space-y-2.5">
              {["O nás", "Služby", "Projekty", "Kariéra"].map(l => (
                <li key={l}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors hover-underline">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kontakt</h4>
            <ul className="space-y-2.5">
              <li className="text-white/40 text-sm">+421 XXX XXX XXX</li>
              <li className="text-white/40 text-sm">info@modulmont.eu</li>
              <li className="text-white/40 text-sm">Slovensko / Nemecko</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <span>© {new Date().getFullYear()} MODULMONT. Všetky práva vyhradené.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Ochrana osobných údajov</a>
            <a href="#" className="hover:text-white transition-colors">Podmienky použitia</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <OdNas />
        <Sluzby />
        <PrecoMy />
        <Projekty />
        <Postup />
        <Regiony />
        <CtaBanner />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
