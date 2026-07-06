import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ── Fonts ─────────────────────────────────────────────── */
const MONT: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };
const INTER: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

/* ── Material Symbols helper ────────────────────────────── */
function MIcon({ name, size = 24, color = "currentColor", fill = 0, weight = 400 }: {
  name: string; size?: number; color?: string; fill?: number; weight?: number;
}) {
  return (
    <span
      className="material-symbols-rounded"
      style={{
        fontSize: size,
        color,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      {name}
    </span>
  );
}

/* ── Brand SVG icons (Github / Linkedin) ────────────────── */
function Github({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedinIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── Dark Mode Context ──────────────────────────────── */
interface ThemeCtx { isDark: boolean; toggle: () => void; }
const DarkModeContext = createContext<ThemeCtx>({ isDark: false, toggle: () => {} });
function useTheme() { return useContext(DarkModeContext); }

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
        color: "var(--text-label)",
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
  const { isDark, toggle } = useTheme();

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
    { label: "Equipo", href: "#equipo" },
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
          className="w-full flex items-center justify-between transition-all duration-300"
          style={{
            maxWidth: "1300px",
            borderRadius: "28px",
            background: scrolled ? "var(--bg-nav-scrolled)" : "var(--bg-nav)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--border-nav)",
            padding: "0 32px",
            height: scrolled ? "60px" : "72px",
            boxShadow: scrolled
              ? `0 8px 40px var(--shadow-nav)`
              : `0 4px 24px var(--shadow-card)`,
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center no-underline">
            <img
              src="/src/assets/interActLogo.png"
              alt="InterAct Logo"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative group no-underline"
                style={{ ...MONT, fontWeight: 600, fontSize: "12.5px", color: "var(--text-nav-link)", letterSpacing: "0.04em", textTransform: "uppercase" }}
              >
                {l.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-200"
                  style={{ background: "#2A7CC7" }}
                />
              </a>
            ))}
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              style={{
                background: "none", border: "1px solid var(--border-nav)",
                borderRadius: "8px", cursor: "pointer",
                padding: "6px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
                color: "var(--icon-nav)",
              }}
            >
              <MIcon name={isDark ? "light_mode" : "dark_mode"} size={18} color="var(--icon-nav)" />
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileOpen(true)}
          >
            <MIcon name="menu" size={24} color="var(--icon-nav)" />
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
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileOpen(false)}
          >
            <MIcon name="close" size={22} color="#fff" />
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
            className="mt-6 flex items-center justify-center gap-2"
            onClick={toggle}
            style={{
              ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em",
              background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "6px",
              padding: "13px 22px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            <MIcon name={isDark ? "light_mode" : "dark_mode"} size={16} color="#fff" />
            {isDark ? "Modo Claro" : "Modo Oscuro"}
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
    btn1Href: "#equipo",
    btn2: "Ver Puerto Seguro ↓",
    btn2Href: "#plataforma",
    imgId: "pescadores.png",
  },
  {
    badge: "Detección Temprana de Burnout",
    h1: "Puerto Seguro: biometría + psicología + IA al servicio del trabajador",
    sub: "Monitoreo en tiempo real. Score de riesgo personalizado. Privacidad como arquitectura.",
    btn1: "Ver la plataforma",
    btn1Href: "#plataforma",
    btn2: "Contactar al equipo",
    btn2Href: "#contacto",
    imgId: "puertoSeguroBanner.png",
  },
  {
    badge: "Tecnología con Impacto Real",
    h1: "Prevenir el burnout antes de que ocurra",
    sub: "Combinamos wearables, encuestas clínicas validadas e inteligencia artificial para detectar el agotamiento antes de que se convierta en crisis.",
    btn1: "Ver metodología",
    btn1Href: "#stack",
    btn2: "Contactar al equipo",
    btn2Href: "#contacto",
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
            src={`/src/assets/${sl.imgId}`}
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
            <a
              href={s.btn1Href}
              style={{
                ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                background: "#2A7CC7", color: "#fff", borderRadius: "6px",
                padding: "14px 30px", border: "none", cursor: "pointer",
                boxShadow: "0 8px 24px rgba(42,124,199,0.38)",
                transition: "all 0.2s",
                textDecoration: "none", display: "inline-block",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A4A7A"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#2A7CC7"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {s.btn1}
            </a>
            <a
              href={s.btn2Href}
              style={{
                ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
                background: "transparent", color: "#fff", borderRadius: "6px",
                padding: "14px 30px", border: "2px solid rgba(255,255,255,0.65)", cursor: "pointer",
                transition: "all 0.2s",
                textDecoration: "none", display: "inline-block",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; (e.currentTarget as HTMLElement).style.color = "#0C2340"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            >
              {s.btn2}
            </a>
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
          {dir === "left" ? <MIcon name="chevron_left" size={18} /> : <MIcon name="chevron_right" size={18} />}
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
    <section id="quienes" style={{ background: "var(--bg-primary)", padding: "96px clamp(24px,7vw,120px)" }}>
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
            style={{ ...MONT, fontWeight: 700, fontSize: "clamp(28px,3vw,40px)", color: "var(--text-heading)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            El equipo que convierte desafíos sociales en soluciones tecnológicas
          </h2>
          <p style={{ ...INTER, fontSize: "16px", lineHeight: 1.7, color: "var(--text-body)", marginBottom: "28px" }}>
            Inter-act nació de la convicción de que la tecnología debe estar al servicio de las personas, no al revés. Somos un grupo multidisciplinario de desarrolladores, diseñadores y especialistas en bienestar organizacional que trabaja con metodologías ágiles y un compromiso irrenunciable: la privacidad del usuario es arquitectura, no un agregado.
          </p>
          <p style={{ ...INTER, fontSize: "16px", lineHeight: 1.7, color: "var(--text-body)", marginBottom: "36px" }}>
            Puerto Seguro es nuestra primera plataforma en producción: un sistema que detecta burnout en trabajadores portuarios antes de que se convierta en una crisis de salud.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { icon: "lock", label: "Privacidad por diseño" },
              { icon: "neurology", label: "Rigor clínico" },
              { icon: "bolt", label: "Desarrollo ágil" },
            ].map((p) => (
              <span
                key={p.label}
                className="flex items-center gap-1.5"
                style={{
                  ...INTER, fontSize: "13px", fontWeight: 500,
                  padding: "7px 14px", borderRadius: "100px",
                  background: "var(--pill-bg)", color: "var(--pill-text)",
                  border: "1px solid var(--pill-border)",
                }}
              >
                <MIcon name={p.icon} size={15} color="#1A4A7A" fill={1} />
                {p.label}
              </span>
            ))}
          </div>

          <a
            href="#equipo"
            style={{
              ...MONT, fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase",
              background: "#0C2340", color: "#fff", borderRadius: "6px",
              padding: "13px 28px", border: "none", cursor: "pointer",
              transition: "all 0.2s",
              textDecoration: "none", display: "inline-block",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A4A7A"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(12,35,64,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0C2340"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            Conocer al equipo →
          </a>
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
          <div style={{ borderRadius: "16px", overflow: "hidden", background: "var(--bg-secondary)" }}>
            <img
              src="src\assets\equipo.png"
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
              background: "var(--floating-badge-bg)",
              borderRadius: "10px",
              padding: "12px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <MIcon name="check_circle" size={18} color="#16A34A" fill={1} />
            <span style={{ ...INTER, fontSize: "13px", fontWeight: 600, color: "var(--text-heading)" }}>
              Validado con especialistas
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
    icon: "smartphone",
    color: "#2A7CC7",
    title: "App móvil para el trabajador",
    text: "El trabajador registra su estado al inicio de cada turno desde su celular. Check-in biométrico + encuesta psicológica MBI/SOFI. Con sus datos visibles para el mismo",
    badge: "React Native · Expo",
  },
  {
    icon: "bar_chart",
    color: "#2A7CC7",
    title: "Dashboard de RRHH",
    text: "RRHH visualiza únicamente datos agregados por zona y turno. Nunca ve IDs individuales. Heatmap de riesgo, KPIs de bienestar colectivo y tendencias en el tiempo.",
    badge: "React · Recharts",
  },
  {
    icon: "stethoscope",
    color: "#2A7CC7",
    title: "Panel médico con análisis IA",
    text: "El especialista accede a evaluaciones individuales solo con consentimiento. La IA genera una narrativa clínica estructurada que el especialista valida. Auditoría permanente e inmutable.",
    badge: "Claude AI · FastAPI",
  },
  {
    icon: "sensors",
    color: "#00A8B5",
    title: "Simulador de pulsera wearable",
    text: "Un simulador por software genera lecturas biométricas realistas (FC, VFC, SpO2, temperatura) usando escenarios parametrizables: fatiga acumulada, estrés agudo, burnout severo.",
    badge: "Python · NumPy · SSE",
  },
  {
    icon: "monitor_heart",
    color: "#00A8B5",
    title: "Motor de análisis personalizado",
    text: "El score de riesgo se calcula contra el baseline histórico de cada trabajador, no contra estándares genéricos. Z-scores por métrica, pesos validados clínicamente, clasificación en 4 niveles.",
    badge: "Algoritmo validado · Médicos",
  },
  {
    icon: "lock",
    color: "#00A8B5",
    title: "Privacidad como arquitectura",
    text: "El nombre del trabajador existe solo para el y el especialista. Los demás roles ven un código anónimo con acceso estrictamente segregado. Las evaluaciones de IA nunca se eliminan.",
    badge: "JWT · RBAC · SQLite",
  },
];

function FeatureCard({ card, delay }: { card: typeof PLATFORM_CARDS[0]; delay: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "32px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.background = "var(--bg-surface-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = "var(--bg-surface)";
      }}
    >
      <div
        className="flex items-center justify-center mb-5"
        style={{ width: "52px", height: "52px", borderRadius: "12px", background: card.color === "#2A7CC7" ? "var(--bg-icon-blue)" : "var(--bg-icon-teal)" }}
      >
        <MIcon name={card.icon} size={26} color={card.color === "#2A7CC7" ? "var(--icon-blue)" : "var(--icon-teal)"} fill={1} />
      </div>
      <h3 style={{ ...MONT, fontWeight: 600, fontSize: "17px", color: "var(--text-heading)", marginBottom: "10px", lineHeight: 1.3 }}>
        {card.title}
      </h3>
      <p style={{ ...INTER, fontSize: "14.5px", lineHeight: 1.65, color: "var(--text-body)", marginBottom: "18px" }}>
        {card.text}
      </p>
      <span
        style={{
          ...INTER, fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em",
          padding: "4px 12px", borderRadius: "100px",
          background: "var(--badge-bg)", color: "var(--badge-text)", border: "1px solid var(--border-color)",
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
    <section id="plataforma" style={{ background: "var(--bg-secondary)", padding: "96px clamp(24px,7vw,120px)" }}>
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
            style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", color: "var(--text-heading)", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}
          >
            Puerto Seguro — Sistema integral de detección de burnout
          </h2>
          <p style={{ ...INTER, fontSize: "16px", lineHeight: 1.7, color: "var(--text-body)", maxWidth: "640px", margin: "0 auto" }}>
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
    icon: "smartphone",
    title: "Check-in al inicio del turno",
    text: "El trabajador abre la app, registra su estado y completa la encuesta psicológica (MBI + SOFI). La pulsera wearable envía lecturas biométricas en paralelo.",
  },
  {
    num: "02",
    icon: "monitor_heart",
    title: "Análisis personalizado en tiempo real",
    text: "El backend calcula el score de riesgo comparando las métricas del turno contra el baseline histórico individual de cada trabajador.",
  },
  {
    num: "03",
    icon: "neurology",
    title: "Claude genera la narrativa clínica",
    text: "Si el score supera el umbral, Claude analiza todos los factores contextuales y genera una evaluación estructurada en JSON con nivel de riesgo, justificación y acción recomendada.",
  },
  {
    num: "04",
    icon: "check_circle",
    title: "El especialista valida y actúa",
    text: "El panel del especialista muestra la narrativa de IA para revisión humana. El especialista acepta, rechaza o ajusta. Cada decisión queda en el registro de auditoría permanente.",
  },
];

function Metodologia() {
  const { ref, inView } = useInView();
  return (
    <section style={{ background: "var(--bg-primary)", padding: "96px clamp(24px,7vw,120px)" }}>
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
          <h2 style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", color: "var(--text-heading)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Un flujo diseñado para la seguridad y la privacidad
          </h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex items-start gap-0 relative">
          {/* Connector line */}
          <div
            className="absolute top-[26px] left-[26px] right-[26px] h-px"
            style={{ background: "var(--connector-line)", zIndex: 0 }}
          />
          {STEPS.map((step, i) => {
            const { ref, inView } = useInView();
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
                    background: "var(--step-circle-bg)", border: "2px solid var(--step-circle-border)",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ ...MONT, fontWeight: 800, fontSize: "15px", color: "var(--text-heading)" }}>{step.num}</span>
                </div>
                <div
                  className="flex items-center justify-center mb-4"
                  style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--bg-secondary)" }}
                >
                  <MIcon name={step.icon} size={20} color="var(--icon-blue)" fill={1} />
                </div>
                <h3 style={{ ...MONT, fontWeight: 700, fontSize: "15px", color: "var(--text-heading)", marginBottom: "8px", lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ ...INTER, fontSize: "13.5px", lineHeight: 1.65, color: "var(--text-body)" }}>
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="flex md:hidden flex-col gap-8 relative">
          <div className="absolute top-6 bottom-6 left-6 w-px" style={{ background: "var(--connector-line)" }} />
          {STEPS.map((step, _i) => (
              <div key={step.num} className="flex gap-6 pl-0">
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: "var(--step-circle-bg)", border: "2px solid var(--step-circle-border)",
                    }}
                  >
                    <span style={{ ...MONT, fontWeight: 800, fontSize: "14px", color: "var(--text-heading)" }}>{step.num}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 style={{ ...MONT, fontWeight: 700, fontSize: "16px", color: "var(--text-heading)", marginBottom: "6px" }}>
                    {step.title}
                  </h3>
                  <p style={{ ...INTER, fontSize: "14px", lineHeight: 1.65, color: "var(--text-body)" }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
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
  icon,
  accent,
  delay,
  parentInView,
}: {
  numDisplay?: string;
  numTarget?: number;
  suffix: string;
  description: string;
  icon: string;
  accent: string;
  delay: number;
  parentInView: boolean;
}) {
  const count = useCountUp(numTarget ?? 0, 1500, parentInView);
  const displayVal = numDisplay ?? String(count);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "32px",
        opacity: parentInView ? 1 : 0,
        transform: parentInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.background = "var(--bg-surface-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = "var(--bg-surface)";
      }}
    >
      <div
        className="flex items-center justify-center mb-5"
        style={{ width: "48px", height: "48px", borderRadius: "10px", background: accent === "#2A7CC7" ? "var(--bg-icon-blue)" : "var(--bg-icon-teal)" }}
      >
        <MIcon name={icon} size={24} color={accent === "#2A7CC7" ? "var(--icon-blue)" : "var(--icon-teal)"} fill={1} />
      </div>
      <div style={{ ...MONT, fontWeight: 800, fontSize: "48px", color: "var(--text-heading)", lineHeight: 1, marginBottom: "6px" }}>
        {displayVal}
      </div>
      <div style={{ ...MONT, fontWeight: 600, fontSize: "13px", color: accent === "#2A7CC7" ? "var(--icon-blue)" : "var(--icon-teal)", letterSpacing: "0.04em", marginBottom: "10px" }}>
        {suffix}
      </div>
      <p style={{ ...INTER, fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-body)" }}>{description}</p>
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
      icon: "verified_user",
      accent: "#2A7CC7",
    },
    {
      numDisplay: "60/40",
      suffix: "biométrico / psicológico",
      description: "Ponderación del score total: 60% métricas físicas, 40% encuesta psicológica",
      icon: "balance",
      accent: "#00A8B5",
    },
    {
      numTarget: 5,
      suffix: "métricas biométricas",
      description: "FC · VFC · SpO2 · Temperatura · Conductancia galvánica",
      icon: "monitor_heart",
      accent: "#2A7CC7",
    },
    {
      numTarget: 3,
      suffix: "roles diferenciados",
      description: "Trabajador · RRHH · Especialista — cada uno ve solo lo que le corresponde",
      icon: "lock",
      accent: "#00A8B5",
    },
  ];

  return (
    <section id="impacto" style={{ background: "var(--bg-secondary)", padding: "96px clamp(24px,7vw,120px)" }}>
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
          <h2 style={{ ...MONT, fontWeight: 700, fontSize: "clamp(26px,3vw,38px)", color: "var(--text-heading)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
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

        <div className="flex flex-col gap-10 items-center">
          {TECH_ROWS.map((row, ri) => (
            <div key={row.label} className="w-full text-center">
              <p
                style={{
                  ...INTER, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                  marginBottom: "14px",
                }}
              >
                {row.label}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
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
   EQUIPO DE DESARROLLO
══════════════════════════════════════════════════════════ */
const teamMembers = [
  {
    name: "Contanza Macri",
    role: "Estudiante de Ingenieria en Sistemas de Informacion",
    photo: "src/assets/contuPerfil.png",
  },
  {
    name: "Fiona Borelli",
    role: "Estudiante de Contador Publico",
    photo: "src/assets/fionaPerfil.png",
  },
  {
    name: "Lara Jesser Lazarte",
    role: "Estudiante de Arquitectura",
    photo: "src/assets/laraPerfil.png",
  },
  {
    name: "Dylan Marquez",
    role: "Estudiante de Licenciatura en Ciencias de la Computacion",
    photo: "src/assets/dylanPerfil.png",
  },
];

function EquipoDesarrollo() {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id="equipo"
      ref={ref}
      style={{
        background: "var(--bg-equipo-grad)",
        padding: "96px clamp(24px,7vw,80px)",
      }}
    >
      {/* Header */}
      <div
        className="max-w-[1200px] mx-auto text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          marginBottom: "64px",
        }}
      >
        <span
          style={{
            ...MONT, display: "inline-block", fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#2A7CC7", marginBottom: "14px",
          }}
        >
          Nuestro equipo
        </span>
        <h2
          style={{
          ...MONT, fontSize: "clamp(28px,4vw,42px)", fontWeight: 800,
          color: "var(--text-heading)", lineHeight: 1.15, margin: "0 0 16px",
        }}
        >
          Las personas detrás de InterAct
        </h2>
        <p
          style={{
            ...INTER, fontSize: "17px", color: "var(--text-body)",
            lineHeight: 1.7, maxWidth: "540px", margin: "0 auto",
          }}
        >
          Un equipo multidisciplinario comprometido con la tecnología de impacto humano.
        </p>
      </div>

      {/* Cards grid */}
      <div
        className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {teamMembers.map((member, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg-surface)",
              borderRadius: "20px",
              boxShadow: "0 4px 24px var(--shadow-card)",
              overflow: "hidden",
              border: "1px solid var(--team-card-border)",
              transition: "transform 0.28s ease, box-shadow 0.28s ease",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transitionDelay: `${i * 0.12}s`,
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(12,35,64,0.22)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px var(--shadow-card)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)";
            }}
          >
            {/* Photo 1:1 */}
            <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
              <img
                src={member.photo}
                alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: "20px 22px 24px" }}>
              <p
                style={{
                  ...MONT, fontSize: "15px", fontWeight: 700,
                  color: "var(--text-heading)", margin: "0 0 6px",
                }}
              >
                {member.name}
              </p>
              <span
                style={{
                  ...INTER, display: "inline-block", fontSize: "12px", fontWeight: 500,
                  color: "#2A7CC7",
                  background: "rgba(42,124,199,0.10)",
                  borderRadius: "100px",
                  padding: "3px 10px",
                }}
              >
                {member.role}
              </span>
            </div>
          </div>
        ))}
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
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src="/src/assets/interActLogo.png"
              alt="InterAct Logo"
              style={{ height: "30vh", width: "30vw", objectFit: "contain", marginBottom: "12px" }}
            />
            <p style={{ ...INTER, fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              Tecnología con propósito humano
            </p>
          </div>
          <div className="flex gap-3">
            {[Github, LinkedinIcon].map((Icon, i) => (
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
  const [isDark, setIsDark] = useState(false);
  const toggle = () => setIsDark(d => !d);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      <div data-dark={isDark ? "true" : "false"} style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-heading)" }}>
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
        <EquipoDesarrollo />
        <CTA />
      </main>

      <Footer />
    </div>
    </DarkModeContext.Provider>
  );
}
