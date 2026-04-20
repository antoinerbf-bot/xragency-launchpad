import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Search,
  MapPin,
  Palette,
  Users,
  Bot,
  Cpu,
  Server,
  CheckCircle2,
  Zap,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { services } from "@/data/services";
import { DiagnosticQuiz } from "@/components/common/DiagnosticQuiz";
import heroImg from "@/assets/hero-cinematic.jpg";
import workspaceImg from "@/assets/showcase-workspace.jpg";
import orbImg from "@/assets/orb-energy.jpg";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Search, MapPin, Palette, Users, Bot, Cpu, Server,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XRAGENCY — Agence d'Innovation Digitale Premium" },
      {
        name: "description",
        content: "Web, SEO, Google Maps, IA. Agence internationale premium. Paris · NY · London · Tokyo. Audit gratuit en 24h.",
      },
      { property: "og:title", content: "XRAGENCY — Agence d'Innovation Digitale Premium" },
      { property: "og:description", content: "Web, SEO, IA. Premium · Performance · Innovation." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

/* ───────── Mouse-tracking 3D card ───────── */
function Tilt3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────── Spotlight that follows the cursor ───────── */
function Spotlight() {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, oklch(0.65 0.22 265 / 0.15), transparent 40%)`;
  return (
    <motion.div
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      style={{ background: bg }}
      className="pointer-events-auto absolute inset-0"
    />
  );
}

/* ───────── Animated counter ───────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const dur = 1800;
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function HomePage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // Parallax layers
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Global mouse for hero parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const heroX = useSpring(useTransform(mx, [-0.5, 0.5], [-25, 25]), { stiffness: 80, damping: 20 });
  const heroY = useSpring(useTransform(my, [-0.5, 0.5], [-15, 15]), { stiffness: 80, damping: 20 });

  return (
    <>
      {/* ═══════════ HERO — Parallax 3D ═══════════ */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          mx.set(e.clientX / window.innerWidth - 0.5);
          my.set(e.clientY / window.innerHeight - 0.5);
        }}
        className="relative min-h-[100vh] overflow-hidden"
      >
        {/* Layer 1 — background image */}
        <motion.div
          style={{ y: yBg, scale, opacity, x: heroX }}
          className="absolute inset-0 -z-10"
        >
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover opacity-60"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </motion.div>

        {/* Layer 2 — orbs */}
        <motion.div style={{ y: yMid, x: heroY }} className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/30 blur-[140px]" />
          <div className="absolute top-40 -right-20 h-[500px] w-[500px] rounded-full bg-accent-purple/30 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent-blue/20 blur-[100px]" />
        </motion.div>

        {/* Layer 3 — floating particles */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/60"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Foreground content */}
        <motion.div
          style={{ y: yFront }}
          className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-center px-4 py-32 md:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 glass px-5 py-2 text-xs font-medium text-foreground/90 shadow-glow"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              {t("hero.eyebrow")}
            </motion.span>

            <h1 className="mt-10 text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl lg:text-[8rem]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="block text-gradient"
              >
                {t("hero.title")}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full gradient-primary px-10 py-5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:shadow-[0_0_60px_-10px_oklch(0.65_0.22_265_/_0.8)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative">{t("hero.cta")}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 glass px-10 py-5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-card"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                {t("hero.ctaSecondary")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats with tilt */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-24 grid w-full max-w-4xl gap-6 sm:grid-cols-3"
          >
            {[
              { val: 12, suffix: "+", label: t("hero.stat1"), Icon: Globe },
              { val: 24, suffix: "h", label: t("hero.stat2"), Icon: Zap },
              { val: 340, suffix: "%", label: t("hero.stat3"), Icon: TrendingUp },
            ].map((s, i) => (
              <Tilt3D key={i} className="rounded-2xl border border-border/60 glass p-6 text-center shadow-card">
                <s.Icon className="mx-auto h-6 w-6 text-primary" />
                <div className="mt-3 text-4xl font-extrabold text-gradient-primary">
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </Tilt3D>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/30 p-1.5">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-1 rounded-full bg-foreground/70"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ MARQUEE — Logos cities ═══════════ */}
      <section className="relative overflow-hidden border-y border-border/40 bg-card/20 py-10">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-16 px-8">
              {["PARIS", "NEW YORK", "LONDON", "TOKYO", "DUBAI", "SINGAPORE", "BERLIN", "SYDNEY"].map((city) => (
                <div key={city + dup} className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-extrabold tracking-[0.3em] text-foreground/40">
                    {city}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* ═══════════ DIAGNOSTIC QUIZ ═══════════ */}
      <DiagnosticQuiz />

      {/* ═══════════ SHOWCASE — Workspace parallax ═══════════ */}
      <ShowcaseSection />

      {/* ═══════════ SERVICES GRID with spotlight ═══════════ */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Spotlight />
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              SOLUTIONS
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">{t("services.title")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? Globe;
            return (
              <motion.div
                key={s.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Tilt3D>
                  <Link
                    to={s.href}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-border/60 gradient-card p-6 transition-all hover:border-primary/60 hover:shadow-elegant"
                  >
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                      {t(s.titleKey)}
                    </h3>
                    <p className="relative mt-2 text-sm text-muted-foreground">{t(s.descKey)}</p>
                    <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
                      {t("services.learnMore")} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </Tilt3D>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════════ ENERGY ORB — Why us ═══════════ */}
      <section className="relative overflow-hidden py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 md:grid-cols-2 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 glass px-4 py-1.5 text-xs font-medium text-primary">
              <Shield className="h-3 w-3" /> EXCELLENCE
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">L'énergie</span>
              <br />
              <span className="text-gradient-primary">d'une agence.</span>
              <br />
              <span className="text-gradient">La précision d'un</span>
              <br />
              <span className="text-gradient-primary">laboratoire.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Chaque projet est traité comme une œuvre. Stratégie, design, développement, performance — tout est calibré au millimètre par une équipe d'experts internationaux.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Expertise multi-secteurs",
                "Délais respectés à 99%",
                "Transparence totale",
                "Support 24h/24",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground/90">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
              <img
                src={orbImg}
                alt="Energy orb"
                loading="lazy"
                className="relative h-full w-full object-cover rounded-3xl shadow-elegant"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA Final ═══════════ */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 gradient-card p-12 text-center md:p-20"
        >
          <div className="absolute inset-0 gradient-hero opacity-60" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]"
          />
          <div className="relative">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-gradient">{t("cta.title")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("cta.subtitle")}</p>
            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full gradient-primary px-10 py-5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105"
            >
              {t("cta.button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

/* ───────── Showcase with parallax workspace image ───────── */
function ShowcaseSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <img
          src={workspaceImg}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background" />
      </motion.div>

      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold tracking-tight md:text-7xl"
        >
          <span className="text-gradient">Un site n'est pas un site.</span>
          <br />
          <span className="text-gradient-primary">C'est une expérience.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground"
        >
          Chaque pixel respire. Chaque transition murmure. Vos clients ne visitent pas une page — ils entrent dans votre univers.
        </motion.p>
      </div>
    </section>
  );
}
