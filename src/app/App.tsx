import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, ChevronLeft, ChevronRight, Github, Linkedin,
  Smartphone, BarChart2, Stethoscope, Activity, Scale, Lock,
  Shield, Zap, Brain, ArrowRight, CheckCircle, Radio
} from "lucide-react";

/* ── Fonts ─────────────────────────────────────────────── */
const MONT: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };
const INTER: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

/* ── useInView ──────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ── useCountUp ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ── Chip ───────────────────────────────────────────────── */
function Chip({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      style={{
        ...INTER,
        display: "inline-block",
        padding: "4px 14px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: dark ? "rgba(255,255,255,0.12)" : "#EBF4FF",
        color: dark ? "#fff" : "#1A4A7A",
        border: dark ? "1px solid rgba(255,255,255,0.2)" : "none",
      }}
    >
      {children}
    </span>
  );
}

/* ── SectionLabel ───────────────────────────────────────── */
function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      style={{
        ...INTER,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.5)" : "#2A7CC7",
        marginBottom: "12px",
      }}
    >
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════
   GRADIENT BAR
══════════════════════════════════════════════════════════ */
function GradientBar() {
  return (
    <div
      className="fixed left-0 right-0 z-[9999]"
      style={{
        top: 0,
        height: "6px",
        background:
          "linear-gradient(90deg, #0C2340 0%, #6B21A8 25%, #DC2626 50%, #EA580C 75%, #CA8A04 100%)",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Quiénes Somos", href: "#quienes" },
    { label: "Puerto Seguro", href: "#plataforma" },
    { label: "Tecnología", href: "#stack" },
    { label: "Impacto", href: "#impacto" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      {/* Bar */}
      <div
        className="fixed left-0 right-0 z-[9998] flex justify-center px-5 lg:px-10"
        style={{ top: "14px" }}
      >
        <nav
          className="w-full flex items-center justify-between bg-white transition-all duration-300"
          style={{
            maxWidth: "1300px",
            borderRadius: "28px",
            padding: scrolled ? "0 32px" : "0 32px",
            height: scrolled ? "60px" : "72px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.14)"
              : "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="7" r="4.5" fill="#2A7CC7" />
              <circle cx="5" cy="25" r="4.5" fill="#2A7CC7" />
              <circle cx="27" cy="25" r="4.5" fill="#2A7CC7" />
              <line x1="16" y1="11.5" x2="5" y2="20.5" stroke="#2A7CC7" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="16" y1="11.5" x2="27" y2="20.5" stroke="#2A7CC7" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="5" y1="25" x2="27" y2="25" stroke="#2A7CC7" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ ...MONT, fontWeight: 800, fontSize: "19px", color: "#0C2340", letterSpacing: "-0.02em" }}>
              Inter-act
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative group no-underline"
                style={{ ...MONT, fontWeight: 600, fontSize: "12.5px", color: "#4A5568", letterSpacing: "0.04em", textTransform: "uppercase" }}
              >
                {l.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-200"
                  style={{ background: "#2A7CC7" }}
                />
              </a>
            ))}
            <button
              className="ml-2 transition-all duration-200 hover:-translate-y-px"
              style={{
                ...MONT, fontWeight: 700, fontSize: "12.5px", letterSpacing: "0.06em", textTransform: "uppercase",
                background: "#0C2340", color: "#fff", borderRadius: "6px",
                padding: "10px 22px", border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(12,35,64,0.22)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1A4A7A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0C2340")}
            >
              Ver Demo
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center"
            style={{ background: "none", border: "none", color: "#0C2340", cursor: "pointer" }}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[99997] lg:hidden transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[99998] lg:hidden flex flex-col"
        style={{
          width: "280px",
          background: "#0C2340",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span style={{ ...MONT, fontWeight: 800, fontSize: "18px", color: "#fff" }}>Inter-act</span>
          <button
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="no-underline px-2 py-3"
              style={{ ...MONT, fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              {l.label}
            </a>
          ))}
          <button
            className="mt-6"
            style={{
              ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em",
              background: "#2A7CC7", color: "#fff", borderRadius: "6px",
              padding: "13px 22px", border: "none", cursor: "pointer", textTransform: "uppercase",
            }}
          >
            Ver Demo
          </button>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO SLIDER
══════════════════════════════════════════════════════════ */
const SLIDES = [
  {
    badge: "Grupo de Desarrollo Tecnológico",
    h1: "Construimos tecnología que cuida a las personas",
    sub: "Inter-act es el equipo detrás de Puerto Seguro: soluciones digitales con propósito humano, privacidad como arquitectura y rigor clínico como estándar.",
    btn1: "Conocer al equipo",
    btn2: "Ver Puerto Seguro ↓",
    imgId: "photo-1504307651254-35680f356dfd",
  },
  {
    badge: "Detección Temprana de Burnout",
    h1: "Puerto Seguro: biometría + psicología + IA al servicio del trabajador",
    sub: "Monitoreo en tiempo real. Score de riesgo personalizado. Privacidad como arquitectura.",
    btn1: "Ver la plataforma",
    btn2: "Descargar brief",
    imgId: "photo-1578662996442-48f60103fc96",
  },
  {
    badge: "Tecnología con Impacto Real",
    h1: "Prevenir el burnout antes de que ocurra",
    sub: "Combinamos wearables, encuestas clínicas validadas e inteligencia artificial para detectar el agotamiento antes de que se convierta en crisis.",
    btn1: "Ver metodología",
    btn2: "Contactar al equipo",
    imgId: "photo-1573496359142-b8d87734a5a2",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(idx);
        setFading(false);
      }, 350);
    },
    [fading]
  );

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const s = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "640px", background: "#0C2340" }}>
      {/* Backgrounds */}
      {SLIDES.map((sl, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={`https://images.unsplash.com/${sl.imgId}?w=1440&h=640&fit=crop&auto=format`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(12,35,64,0.7)" }} />
        </div>
      ))}

      {/* Content */}
      <div
        className="relative z-10 flex items-center h-full"
        style={{
          minHeight: "640px",
          paddingTop: "110px",
          paddingBottom: "80px",
          paddingLeft: "clamp(24px, 7vw, 120px)",
          paddingRight: "clamp(24px, 7vw, 120px)",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
          <Chip dark>{s.badge}</Chip>

          <h1
            className="mt-5 mb-5 text-white"
            style={{
              ...MONT,
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 62px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {s.h1}
          </h1>

          <p style={{ ...INTER, fontSize: "17px", lineHeight: 1.65, color: "rgba(255,255,255,0.8)", maxWidth: "560px", marginBottom: "36px" }}>
            {s.sub}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              style={{
                ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                background: "#2A7CC7", color: "#fff", borderRadius: "6px",
                padding: "14px 30px", border: "none", cursor: "pointer",
                boxShadow: "0 8px 24px rgba(42,124,199,0.38)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1A4A7A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#2A7CC7"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {s.btn1}
            </button>
            <button
              style={{
                ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                background: "transparent", color: "#fff", borderRadius: "6px",
                padding: "14px 30px", border: "2px solid rgba(255,255,255,0.65)", cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0C2340"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
            >
              {s.btn2}
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {(["left", "right"] as const).map((dir) => (
        <button
          key={dir}
          onClick={() =>
            goTo(dir === "left" ? (current - 1 + SLIDES.length) % SLIDES.length : (current + 1) % SLIDES.length)
          }
          className="absolute top-1/2 z-20 flex items-center justify-center transition-all duration-200"
          style={{
            [dir]: "20px",
            transform: "translateY(-50%)",
            width: "42px", height: "42px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
        >
          {dir === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex gap-2.5" style={{ transform: "translateX(-50%)" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "26px" : "8px",
              height: "8px",
              borderRadius: "100px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.38)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECCIÓN: QUIÉNES SOMOS
══════════════════════════════════════════════════════════ */
function QuienesSomos() {
  const { ref, inView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  return (
    <section id="quienes" style={{ background: "#fff", padding: "96px clamp(24px,7vw,120px)" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text */}
        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <SectionLabel>Quiénes Somos</SectionLabel>
          <h2
            className="mb-5"
            style={{ ...MONT, fontWeight: 700, fontSize: "clamp(28px,3vw,40px)", color: "#0C2340", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            El equipo que convierte desafíos sociales en soluciones tecnológicas
          </h2>
          <p style={{ ...INTER, fontSize: "16px", lineHeight: 1.7, color: "#4A5568", marginBottom: "28px" }}>
            Inter-act nació de la convicción de que la tecnología debe estar al servicio de las personas, no al revés. Somos un grupo multidisciplinario de desarrolladores, diseñadores y especialistas en bienestar organizacional que trabaja con metodologías ágiles y un compromiso irrenunciable: la privacidad del usuario es arquitectura, no un agregado.
          </p>
          <p style={{ ...INTER, fontSize: "16px", lineHeight: 1.7, color: "#4A5568", marginBottom: "36px" }}>
            Puerto Seguro es nuestra primera plataforma en producción: un sistema que detecta burnout en trabajadores portuarios antes de que se convierta en una crisis de salud.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: "🔒", label: "Privacidad por diseño" },
              { icon: "🧠", label: "Rigor clínico" },
              { icon: "⚡", label: "Desarrollo ágil" },
            ].map((p) => (
              <span
                key={p.label}
                style={{
                  ...INTER, fontSize: "13px", fontWeight: 500,
                  padding: "8px 16px", borderRadius: "100px",
                  background: "#EBF4FF", color: "#1A4A7A",
                  border: "1px solid #BFDBFE",
                }}
              >
                {p.icon} {p.label}
              </span>
            ))}
          </div>

          <button
            style={{
              ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
              background: "#0C2340", color: "#fff", borderRadius: "6px",
              padding: "13px 28px", border: "none", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1A4A7A"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(12,35,64,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#0C2340"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Conocer al equipo →
          </button>
        </div>

        {/* Visual */}
        <div
          ref={imgRef}
          className="relative"
          style={{
            opacity: imgInView ? 1 : 0,
            transform: imgInView ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s",
          }}
        >
          <div style={{ borderRadius: "16px", overflow: "hidden", background: "#F4F7FA" }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&auto=format"
              alt="Equipo Inter-act trabajando"
              className="w-full object-cover"
              style={{ height: "420px" }}
            />
          </div>
          {/* Floating badge */}
          <div
            className="absolute flex items-center gap-2"
            style={{
              bottom: "20px", left: "20px",
              background: "#fff",
              borderRadius: "10px",
              padding: "12px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <CheckCircle size={18} color="#16A34A" />
            <span style={{ ...INTER, fontSize: "13px", fontWeight: 600, color: "#1A1A2E" }}>
              Validado con médicos y RRHH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECCIÓN: PLATAFORMA PUERTO SEGURO
══════════════════════════════════════════════════════════ */
const PLATFORM_CARDS = [
  {
    icon: Smartphone,
    color: "#2A7CC7",
    title: "App móvil para el trabajador",
    text: "El trabajador registra su estado al inicio de cada turno desde su celular. Check-in biométrico + encuesta psicológica MBI/SOFI. Sin nombre, sin exposición: solo un código anónimo.",
    badge: "React Native · Expo",
  },
  {
    icon: BarChart2,
    color: "#2A7CC7",
    title: "Dashboard de RRHH",
    text: "RRHH visualiza únicamente datos agregados por zona y turno. Nunca ve IDs individuales. Heatmap de riesgo, KPIs de bienestar colectivo y tendencias en el tiempo.",
    badge: "React · Recharts",
  },
  {
    icon: Stethoscope,
    color: "#2A7CC7",
    title: "Panel médico con análisis IA",
    text: "El médico accede a evaluaciones individuales solo con consentimiento. La IA (Claude) genera una narrativa clínica estructurada que el médico valida. Auditoría permanente e inmutable.",
    badge: "Claude AI · FastAPI",
  },
  {
    icon: Radio,
    color: "#00A8B5",
    title: "Simulador de pulsera wearable",
    text: "Un simulador por software genera lecturas biométricas realistas (FC, VFC, SpO2, temperatura) usando escenarios parametrizables: fatiga acumulada, estrés agudo, burnout severo.",
    badge: "Python · NumPy · SSE",
  },
  {
    icon: Activity,
    color: "#00A8B5",
    title: "Motor de análisis personalizado",
    text: "El score de riesgo se calcula contra el baseline histórico de cada trabajador, no contra estándares genéricos. Z-scores por métrica, pesos validados clínicamente, clasificación en 4 niveles.",
    badge: "Algoritmo validado · Médicos",
  },
  {
    icon: Lock,
    color: "#00A8B5",
    title: "Privacidad como arquitectura",
    text: "El nombre del trabajador no existe en la base de datos. Solo existe un código anónimo. Los roles tienen acceso estrictamente segregado. Las evaluaciones de IA nunca se eliminan.",
    badge: "JWT · RBAC · SQLite",
  },
];

function FeatureCard({ card, delay }: { card: typeof PLATFORM_CARDS[0]; delay: number }) {
  const { ref, inView } = useInView();
  const Icon = card.icon;
  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        padding: "32px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        className="flex items-center justify-center mb-5"
        style={{ width: "52px", height: "52px", borderRadius: "12px", background: card.color === "#2A7CC7" ? "#EBF4FF" : "#E0F7FA" }}
      >
        <Icon size={26} color={card.color} />
      </div>
      <h3 style={{ ...MONT, fontWeight: 600, fontSize: "17px", color: "#0C2340", marginBottom: "10px", lineHeight: 1.3 }}>
        {card.title}
      </h3>
      <p style={{ ...INTER, fontSize: "14.5px", lineHeight: 1.65, color: "#4A5568", marginBottom: "18px" }}>
        {card.text}
      </p>
      <span
        style={{
          ...INTER, fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em",
          padding: "4px 12px", borderRadius: "100px",
          background: "#F4F7FA", color: "#1A4A7A", border: "1px solid #E2E8F0",
        }}
      >
        {card.badge}
      </span>
    </div>
  );
}

function PuertoSeguro() {
  const { ref, inView } = useInView();
  return (
    <section id="plataforma" style={{ background: "#F4F7FA", padding: "96px clamp(24px,7vw,120px)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <SectionLabel>Nuestra Plataforma Estrella</SectionLabel>
          <h2
            style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", color: "#0C2340", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}
          >
            Puerto Seguro — Sistema integral de detección de burnout
          </h2>
          <p style={{ ...INTER, fontSize: "16px", lineHeight: 1.7, color: "#4A5568", maxWidth: "640px", margin: "0 auto" }}>
            Diseñada para puertos y entornos industriales. Combina monitoreo biométrico continuo, evaluación psicológica validada y análisis de inteligencia artificial para generar un score de riesgo personalizado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PLATFORM_CARDS.map((card, i) => (
            <FeatureCard key={card.title} card={card} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECCIÓN: METODOLOGÍA
══════════════════════════════════════════════════════════ */
const STEPS = [
  {
    num: "01",
    icon: Smartphone,
    title: "Check-in al inicio del turno",
    text: "El trabajador abre la app, registra su estado y completa la encuesta psicológica (MBI + SOFI). La pulsera wearable envía lecturas biométricas en paralelo.",
  },
  {
    num: "02",
    icon: Activity,
    title: "Análisis personalizado en tiempo real",
    text: "El backend calcula el score de riesgo comparando las métricas del turno contra el baseline histórico individual de cada trabajador.",
  },
  {
    num: "03",
    icon: Brain,
    title: "Claude genera la narrativa clínica",
    text: "Si el score supera el umbral, Claude analiza todos los factores contextuales y genera una evaluación estructurada en JSON con nivel de riesgo, justificación y acción recomendada.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "El médico valida y actúa",
    text: "El panel médico muestra la narrativa de IA para revisión humana. El médico acepta, rechaza o ajusta. Cada decisión queda en el registro de auditoría permanente.",
  },
];

function Metodologia() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: "#fff", padding: "96px clamp(24px,7vw,120px)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s",
          }}
        >
          <SectionLabel>Cómo Funciona</SectionLabel>
          <h2 style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", color: "#0C2340", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Un flujo diseñado para la seguridad y la privacidad
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex items-start gap-0 relative">
          {/* Connector line */}
          <div
            className="absolute top-[26px] left-[26px] right-[26px] h-px"
            style={{ background: "#E2E8F0", zIndex: 0 }}
          />
          {STEPS.map((step, i) => {
            const { ref, inView } = useInView();
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                ref={ref}
                className="flex-1 flex flex-col items-start px-4 relative"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                }}
              >
                {/* Number circle */}
                <div
                  className="relative z-10 flex items-center justify-center mb-5"
                  style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: "#EBF4FF", border: "2px solid #2A7CC7",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ ...MONT, fontWeight: 800, fontSize: "15px", color: "#0C2340" }}>{step.num}</span>
                </div>
                <div
                  className="flex items-center justify-center mb-4"
                  style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#F4F7FA" }}
                >
                  <Icon size={20} color="#2A7CC7" />
                </div>
                <h3 style={{ ...MONT, fontWeight: 700, fontSize: "15px", color: "#0C2340", marginBottom: "8px", lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ ...INTER, fontSize: "13.5px", lineHeight: 1.65, color: "#4A5568" }}>
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="flex md:hidden flex-col gap-8 relative">
          <div className="absolute top-6 bottom-6 left-6 w-px" style={{ background: "#E2E8F0" }} />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex gap-6 pl-0">
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: "#EBF4FF", border: "2px solid #2A7CC7",
                    }}
                  >
                    <span style={{ ...MONT, fontWeight: 800, fontSize: "14px", color: "#0C2340" }}>{step.num}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 style={{ ...MONT, fontWeight: 700, fontSize: "16px", color: "#0C2340", marginBottom: "6px" }}>
                    {step.title}
                  </h3>
                  <p style={{ ...INTER, fontSize: "14px", lineHeight: 1.65, color: "#4A5568" }}>
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECCIÓN: MÉTRICAS
══════════════════════════════════════════════════════════ */
function StatCard({
  numDisplay,
  numTarget,
  suffix,
  description,
  Icon,
  accent,
  delay,
  parentInView,
}: {
  numDisplay?: string;
  numTarget?: number;
  suffix: string;
  description: string;
  Icon: React.ElementType;
  accent: string;
  delay: number;
  parentInView: boolean;
}) {
  const count = useCountUp(numTarget ?? 0, 1500, parentInView);
  const displayVal = numDisplay ?? String(count);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        padding: "32px",
        opacity: parentInView ? 1 : 0,
        transform: parentInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        className="flex items-center justify-center mb-5"
        style={{ width: "48px", height: "48px", borderRadius: "10px", background: accent === "#2A7CC7" ? "#EBF4FF" : "#E0F7FA" }}
      >
        <Icon size={24} color={accent} />
      </div>
      <div style={{ ...MONT, fontWeight: 800, fontSize: "48px", color: "#0C2340", lineHeight: 1, marginBottom: "6px" }}>
        {displayVal}
      </div>
      <div style={{ ...MONT, fontWeight: 600, fontSize: "13px", color: accent, letterSpacing: "0.04em", marginBottom: "10px" }}>
        {suffix}
      </div>
      <p style={{ ...INTER, fontSize: "13.5px", lineHeight: 1.6, color: "#4A5568" }}>{description}</p>
    </div>
  );
}

function Metricas() {
  const { ref, inView } = useInView();

  const stats = [
    {
      numTarget: 4,
      suffix: "niveles de riesgo",
      description: "Normal · Leve · Moderado · Crítico — clasificación clínica validada",
      Icon: Shield,
      accent: "#2A7CC7",
    },
    {
      numDisplay: "60/40",
      suffix: "biométrico / psicológico",
      description: "Ponderación del score total: 60% métricas físicas, 40% encuesta psicológica",
      Icon: Scale,
      accent: "#00A8B5",
    },
    {
      numTarget: 5,
      suffix: "métricas biométricas",
      description: "FC · VFC · SpO2 · Temperatura · Conductancia galvánica",
      Icon: Activity,
      accent: "#2A7CC7",
    },
    {
      numTarget: 3,
      suffix: "roles diferenciados",
      description: "Trabajador · RRHH · Médico — cada uno ve solo lo que le corresponde",
      Icon: Lock,
      accent: "#00A8B5",
    },
  ];

  return (
    <section id="impacto" style={{ background: "#F4F7FA", padding: "96px clamp(24px,7vw,120px)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s",
          }}
        >
          <SectionLabel>Impacto del Sistema</SectionLabel>
          <h2 style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", color: "#0C2340", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Números que respaldan el enfoque
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={s.suffix} {...s} delay={i * 100} parentInView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECCIÓN: STACK TECNOLÓGICO
══════════════════════════════════════════════════════════ */
const TECH_ROWS = [
  {
    label: "Backend",
    pills: ["FastAPI", "Python", "SQLAlchemy", "SQLite", "JWT"],
  },
  {
    label: "Frontend",
    pills: ["React", "Vite", "Recharts", "Zustand", "Tailwind CSS"],
  },
  {
    label: "Mobile & AI",
    pills: ["React Native", "Expo", "Claude AI", "NumPy", "Pydantic"],
  },
];

function TechPill({ name, delay, inView }: { name: string; delay: number; inView: boolean }) {
  return (
    <div
      style={{
        padding: "11px 20px",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.13)",
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.95)",
        transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        e.currentTarget.style.transform = "scale(1.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span style={{ ...INTER, fontSize: "13.5px", fontWeight: 500, color: "#fff" }}>{name}</span>
    </div>
  );
}

function StackTecnologico() {
  const { ref, inView } = useInView();
  return (
    <section id="stack" style={{ background: "#0C2340", padding: "96px clamp(24px,7vw,120px)" }}>
      <div className="max-w-[1000px] mx-auto">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s",
          }}
        >
          <Chip dark>Stack Tecnológico</Chip>
          <h2
            className="mt-4"
            style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Construido con las mejores herramientas del ecosistema
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {TECH_ROWS.map((row, ri) => (
            <div key={row.label}>
              <p
                style={{
                  ...INTER, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                  marginBottom: "14px",
                }}
              >
                {row.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {row.pills.map((pill, pi) => (
                  <TechPill key={pill} name={pill} delay={ri * 80 + pi * 60} inView={inView} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECCIÓN: CTA
══════════════════════════════════════════════════════════ */
function CTA() {
  const { ref, inView } = useInView();
  return (
    <section
      id="contacto"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "96px clamp(24px,7vw,120px)",
        background: "linear-gradient(135deg, #0C2340 0%, #1A4A7A 100%)",
      }}
    >
      {/* Decorative circles */}
      {[
        { size: 400, top: "-120px", right: "-80px" },
        { size: 280, bottom: "-80px", left: "10%" },
        { size: 180, top: "30%", left: "40%" },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: c.size, height: c.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            top: c.top, right: c.right, bottom: c.bottom, left: c.left,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        ref={ref}
        className="relative z-10 max-w-[720px] mx-auto text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <h2
          style={{
            ...MONT, fontWeight: 800, fontSize: "clamp(26px,3.5vw,42px)",
            color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "18px",
          }}
        >
          ¿Querés llevar Puerto Seguro a tu organización?
        </h2>
        <p style={{ ...INTER, fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "40px" }}>
          Somos un equipo pequeño, ágil y apasionado por la tecnología con impacto. Contactanos para explorar cómo Inter-act puede ayudar a tu organización.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            style={{
              ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
              background: "#fff", color: "#0C2340", borderRadius: "6px",
              padding: "15px 32px", border: "none", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Contactar a Inter-act
          </button>
          <button
            style={{
              ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
              background: "transparent", color: "#fff", borderRadius: "6px",
              padding: "15px 32px", border: "2px solid rgba(255,255,255,0.45)", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Ver documentación técnica
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
function Footer() {
  const navLinks = ["Quiénes somos", "Puerto Seguro", "Tecnología", "Impacto", "Contacto"];
  const productLinks = ["App móvil", "Dashboard RRHH", "Panel Médico", "Documentación"];

  return (
    <footer style={{ background: "#0C2340", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
        style={{ padding: "64px clamp(24px,7vw,80px)" }}
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="7" r="4.5" fill="rgba(255,255,255,0.9)" />
              <circle cx="5" cy="25" r="4.5" fill="rgba(255,255,255,0.9)" />
              <circle cx="27" cy="25" r="4.5" fill="rgba(255,255,255,0.9)" />
              <line x1="16" y1="11.5" x2="5" y2="20.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="16" y1="11.5" x2="27" y2="20.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="5" y1="25" x2="27" y2="25" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ ...MONT, fontWeight: 800, fontSize: "18px", color: "#fff" }}>Inter-act</span>
          </div>
          <p style={{ ...INTER, fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)", marginBottom: "20px" }}>
            Tecnología con propósito humano
          </p>
          <div className="flex gap-3">
            {[Github, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.65)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.8)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div>
          <p style={{ ...INTER, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Navegación
          </p>
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="no-underline transition-colors duration-150"
                style={{ ...INTER, fontSize: "14px", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div>
          <p style={{ ...INTER, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Puerto Seguro
          </p>
          <div className="flex flex-col gap-3">
            {productLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="no-underline transition-colors duration-150"
                style={{ ...INTER, fontSize: "14px", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className="max-w-[1200px] mx-auto text-center"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "20px clamp(24px,7vw,80px)",
        }}
      >
        <p style={{ ...INTER, fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          © 2025 Inter-act. Todos los derechos reservados. Puerto Seguro es una plataforma de detección de burnout en trabajadores portuarios.
        </p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A2E" }}>
      <GradientBar />
      <Navbar />

      <main>
        {/* Hero sits flush at top; its content is padded internally */}
        <div style={{ paddingTop: "6px" }}>
          <HeroSlider />
        </div>

        <QuienesSomos />
        <PuertoSeguro />
        <Metodologia />
        <Metricas />
        <StackTecnologico />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
