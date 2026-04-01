import { useEffect, useMemo, useState, useCallback } from 'react';
import './index.css';
import IntroScreen from './components/IntroScreen';
import TargetCursor from './components/TargetCursor';
import ScrollVelocity from './components/ScrollVelocity';
import ElectricBorder from './components/ElectricBorder';
import LogoLoop from './components/LogoLoop';
import ShinyText from './components/ShinyText';
import PixelSnow from './components/PixelSnow';

// ── Data ────────────────────────────────────────────────
const techLogos = [
  { content: <span>⚛️ React</span> },
  { content: <span>🔷 TypeScript</span> },
  { content: <span>🟨 JavaScript</span> },
  { content: <span>🟢 Node.js</span> },
  { content: <span>🚂 Express</span> },
  { content: <span>🍃 MongoDB</span> },
  { content: <span>🔥 Supabase</span> },
  { content: <span>🐘 PostgreSQL</span> },
  { content: <span>☕ Java</span> },
  { content: <span>🐍 Python</span> },
  { content: <span>🌐 Next.js</span> },
  { content: <span>🐙 Git</span> },
  { content: <span>🧪 Postman</span> },
  { content: <span>▲ Vercel</span> },
  { content: <span>☁️ Cloudflare</span> },
  { content: <span>🛡️ Clerk Auth</span> },
];

const projects = [
  {
    title: 'Anurag Connect',
    desc: 'Built a full-stack college social platform using Next.js 14, React, and Supabase (PostgreSQL) with real-time messaging and notifications. Implemented Clerk Auth + bcrypt, RBAC for admin/faculty/student roles, and scalable REST APIs with rate limiting + input validation.',
    tag: 'Full Stack',
    link: 'https://github.com/Manikanta-Goud/anurag-connect',
    tech: ['Next.js 14', 'React', 'Supabase', 'PostgreSQL', 'Clerk Auth', 'RBAC', 'Rate Limiting'],
  },
  {
    title: 'Hostel Harmony',
    desc: 'Hostel management system with hierarchical building/floor/room structure and real-time occupancy. Connected React + TypeScript UI to Supabase (PostgreSQL) and used TanStack Query to keep server-state in sync while reducing unnecessary re-fetches.',
    tag: 'Full Stack',
    link: 'https://github.com/Manikanta-Goud/hostel-harmony',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'TanStack Query', 'Tailwind CSS', 'Shadcn UI'],
  },
  {
    title: 'Spotify Clone',
    desc: 'Built a backend REST API for a music streaming app using Node.js and Express, including registration/login and session flows with bcrypt password hashing. Implemented RBAC for user vs artist roles and CRUD endpoints for songs/albums, with CORS configured for local dev.',
    tag: 'Backend',
    link: 'https://github.com/Manikanta-Goud',
    tech: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'RBAC', 'bcrypt', 'CORS'],
  },
  {
    title: 'Sri Durga Sarees',
    desc: 'Production-ready e-commerce platform with product catalog, cart flows, and role-based access for admin vs customer accounts using Clerk Auth. Built a modern animated UI and integrated Supabase + PostgreSQL tables for products and orders.',
    tag: 'E-Commerce',
    link: 'https://github.com/Manikanta-Goud/sri-durga-sarees',
    tech: ['React 18', 'TypeScript', 'Supabase', 'PostgreSQL', 'Clerk Auth', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Business Portfolio Website',
    desc: 'Designed and developed a professional multi-section portfolio website for a financial services professional. Delivered a clean, responsive React + Tailwind UI with service showcase + contact details to share as a single credibility link.',
    tag: 'Freelance',
    link: 'https://github.com/Manikanta-Goud',
    tech: ['React', 'Tailwind CSS', 'Responsive UI'],
  },
];

// ── App ─────────────────────────────────────────────────
export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const isLiteDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const isSmallScreen = window.innerWidth <= 768;
    const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;
    return Boolean(isSmallScreen || saveData);
  }, []);

  const shouldLiteMode = prefersReducedMotion || isLiteDevice;

  const [useCustomCursor, setUseCustomCursor] = useState(() => {
    try {
      const raw = localStorage.getItem('useCustomCursor');
      if (raw === null) return true;
      return raw === 'true';
    } catch {
      return true;
    }
  });

  // If a PDF hyperlink is missing protocol (e.g. "github.com/user"),
  // the browser may treat it as a relative link and route into this SPA.
  // Detect domain-like paths, open https://<path> in a new tab, then go back.
  useEffect(() => {
    const { pathname, search, hash } = window.location;
    if (!pathname || pathname === '/' || pathname.startsWith('/#')) return;

    const firstSeg = pathname.split('/').filter(Boolean)[0] ?? '';
    const looksLikeDomain = firstSeg.includes('.') && !firstSeg.includes('..');
    const looksLikeAsset = /\.(pdf|png|jpg|jpeg|webp|gif|svg|ico|txt|json|xml|css|js|map)$/i.test(pathname);

    if (looksLikeDomain && !looksLikeAsset) {
      const rest = `${pathname.slice(1)}${search ?? ''}${hash ?? ''}`;
      // Attempt to open in a new tab (works well when triggered by a user click from the PDF).
      const opened = window.open(`https://${rest}`, '_blank', 'noopener,noreferrer');

      // If the browser blocks the popup, fall back to same-tab navigation
      // so the user still reaches the intended external page.
      if (!opened) {
        window.location.replace(`https://${rest}`);
        return;
      }

      // Return user back to the PDF tab instead of staying on the SPA route.
      window.setTimeout(() => {
        if (window.history.length > 1) {
          window.history.back();
          return;
        }
        window.location.replace('/');
      }, 0);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('custom-cursor', useCustomCursor && !shouldLiteMode);
    try {
      localStorage.setItem('useCustomCursor', String(useCustomCursor));
    } catch {
      // ignore
    }
  }, [useCustomCursor, shouldLiteMode]);

  return (
    <div className="app">
      {!introDone && <IntroScreen onDone={handleIntroDone} />}

      <div className={`main-content ${introDone ? 'main-visible' : 'main-hidden'}`}>

        {/* Mount heavy effects ONLY after intro completes (prevents intro stutter). */}
        {introDone && (
          <>
            {/* ── PIXEL SNOW BACKGROUND (full page) ── */}
            <div className="snow-bg">
              <PixelSnow
                variant="snowflake"
                pixelResolution={shouldLiteMode ? 300 : 500}
                speed={shouldLiteMode ? 0.35 : 0.8}
                density={shouldLiteMode ? 0.25 : 0.6}
                flakeSize={0.05}
                brightness={shouldLiteMode ? 1.2 : 2.1}
                depthFade={shouldLiteMode ? 10 : 15}
                farPlane={shouldLiteMode ? 24 : 33}
                direction={255}
                color="#ffffff"
              />
            </div>

            <TargetCursor
              targetSelector=".cursor-target"
              spinDuration={shouldLiteMode ? 4 : 2}
              hideDefaultCursor={useCustomCursor && !shouldLiteMode}
              parallaxOn={!shouldLiteMode}
              hoverDuration={shouldLiteMode ? 0.35 : 0.2}
            />
          </>
        )}

        {/* ── NAV ─────────────────────────────── */}
        <nav className="nav">
          <span className="nav-logo cursor-target">
            <ShinyText text="MG" speed={3} color="#39ff14" shineColor="#ccffdd" />
          </span>
          <ul className="nav-links">
            {['About', 'Projects', 'Skills', 'Resume', 'Contact'].map(item => (
              <li key={item}>
                {item === 'Resume' ? (
                  <a href="/Manikanta_Goud_Resume.pdf" target="_blank" rel="noreferrer" className="cursor-target">
                    {item}
                  </a>
                ) : (
                  <a href={`#${item.toLowerCase()}`} className="cursor-target">{item}</a>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                className="cursor-target nav-cursor-toggle"
                onClick={() => setUseCustomCursor(v => !v)}
                aria-pressed={useCustomCursor && !shouldLiteMode}
                title={shouldLiteMode ? 'Lite mode enabled (reduced motion / mobile)' : (useCustomCursor ? 'Switch to default cursor' : 'Switch to custom cursor')}
              >
                {shouldLiteMode ? 'Lite Mode' : (useCustomCursor ? 'Cursor: On' : 'Cursor: Off')}
              </button>
            </li>
          </ul>
        </nav>

        {/* ── HERO ─────────────────────────────── */}
        <section className="hero" id="home">
          <div className="hero-bg-text">PORTFOLIO</div>

          <div className="hero-grid">
            {/* LEFT — text content */}
            <div className="hero-left">
              <p className="hero-welcome">
                <ShinyText text="👋 Hi there! Welcome to my portfolio" speed={4} color="rgba(57,255,20,0.85)" shineColor="#fff" />
              </p>
              <h1 className="hero-name cursor-target">
                <ShinyText text="MANIKANTA" disabled color="#39ff14" shineColor="#afffaa" spread={80} />
                <br />
                <ShinyText text="GOUD" disabled color="#39ff14" shineColor="#afffaa" spread={80} />
              </h1>
              <p className="hero-role">Backend / Full-Stack Developer &nbsp;/&nbsp; CS Undergrad @ Anurag University</p>
              <div className="hero-cta">
                <a href="#projects" className="btn-primary cursor-target">View Projects</a>
                <a href="#contact" className="btn-outline cursor-target">Contact Me</a>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div className="hero-right">
              <div className="hero-photo-frame cursor-target">
                <div className="hero-photo-inner">
                  {/* Manikanta Goud — hero photo */}
                  <img
                    src="/manikanta.png"
                    alt="Manikanta Goud"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      borderRadius: '18px',
                      display: 'block',
                    }}
                  />
                </div>
                {/* Neon corner accents */}
                <span className="frame-corner tl" />
                <span className="frame-corner tr" />
                <span className="frame-corner bl" />
                <span className="frame-corner br" />
              </div>
            </div>
          </div>

          <div className="hero-scroll">↓ SCROLL TO EXPLORE</div>
        </section>

        {/* ── VELOCITY BAND ─────────────────── */}
        <div className="velocity-band">
          <ScrollVelocity texts={['MANIKANTA GOUD', 'SOFTWARE DEVELOPER']} velocity={80} />
        </div>

        {/* ── ABOUT ─────────────────────────── */}
        <section className="section about-section" id="about">
          <h2 className="section-title cursor-target">
            <ShinyText text="About Me" speed={3} color="#39ff14" shineColor="#afffaa" />
          </h2>

          {/* ── ROW 1: Bio + Quick stats ── */}
          <div className="about-grid">
            <ElectricBorder color="#ffffff" borderRadius={16} speed={0.4} chaos={0.10}>
              <div className="about-text about-text-box cursor-target">
                <p>
                  Hi! I am <strong>Bodige Manikanta Goud</strong>, a motivated 3rd-year Computer Science student
                  from <strong>Hyderabad, Telangana</strong>. I’m pursuing B.Tech in Computer Science &amp; Engineering at{' '}
                  <strong>Anurag University</strong> (CGPA: 7.69, 2023–2027).
                </p>
                <p>
                  I enjoy building full-stack applications and I’m especially interested in <strong>backend systems</strong>:
                  API design, database architecture, and server-side logic that powers real products. I’m seeking an internship
                  opportunity in <strong>Backend Development</strong> where I can contribute meaningfully, grow fast, and work on impactful problems.
                </p>

                {/* Quick info rows */}
                <div className="about-info-rows">
                  <div className="about-info-row">
                    <span className="about-info-icon">📍</span>
                    <span>Hyderabad, Telangana, India</span>
                  </div>
                  <div className="about-info-row">
                    <span className="about-info-icon">✉️</span>
                    <span>goudbmanikanta@gmail.com</span>
                  </div>
                  <div className="about-info-row">
                    <span className="about-info-icon">📞</span>
                    <span>+91 9959864661</span>
                  </div>
                  <div className="about-info-row">
                    <span className="about-info-icon">🎓</span>
                    <span>B.Tech CSE @ Anurag University</span>
                  </div>
                </div>

                {/* Social quick-links */}
                <div className="about-socials">
                  <a href="https://github.com/Manikanta-Goud" target="_blank" rel="noreferrer" className="about-social-btn cursor-target about-social-github">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/manikanta-goud-72169b314/" target="_blank" rel="noreferrer" className="about-social-btn cursor-target about-social-linkedin">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"/></svg>
                    LinkedIn
                  </a>
                  <a href="mailto:goudbmanikanta@gmail.com" className="about-social-btn cursor-target about-social-github">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    Email
                  </a>
                </div>
              </div>
            </ElectricBorder>

            {/* Stat cards */}
            <div className="about-stats-col">
              {[
                ['7.69', 'CGPA', '🎓'],
                ['5+', 'Projects Built', '🚀'],
                ['15+', 'Technologies', '⚡'],
                ['956', 'Intermediate Score / 1000', '📚'],
              ].map(([num, label, icon]) => (
                <ElectricBorder key={label} color="#ffffff" borderRadius={12} speed={0.35} chaos={0.08}>
                  <div className="stat-card cursor-target">
                    <span className="stat-icon">{icon}</span>
                    <span className="stat-num">
                      <ShinyText text={num} speed={2} color="#39ff14" shineColor="#ccffbb" />
                    </span>
                    <span className="stat-label">{label}</span>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>

          {/* ── ROW 2: Education Timeline ── */}
          <div className="about-subsection">
            <h3 className="about-sub-heading">
              <span className="about-sub-icon">🎓</span> Education Timeline
            </h3>
            <div className="edu-timeline">

              <div className="edu-timeline-line" />

              <div className="edu-item">
                <div className="edu-dot edu-dot--active" />
                <ElectricBorder color="#39ff14" borderRadius={14} speed={0.38} chaos={0.09}>
                  <div className="edu-card cursor-target">
                    <div className="edu-card-top">
                      <div>
                        <p className="edu-degree">B.Tech — Computer Science &amp; Engineering</p>
                        <p className="edu-school">Anurag University, Hyderabad</p>
                      </div>
                      <div className="edu-card-right">
                        <span className="edu-year edu-year--active">2023 – 2027</span>
                        <span className="edu-cgpa">CGPA: 7.69</span>
                      </div>
                    </div>
                    <div className="edu-highlights">
                      <span className="edu-badge edu-badge--green">🧑‍💻 Full-Stack Focus</span>
                      <span className="edu-badge edu-badge--green">🛡️ Cyber Security Club</span>
                      <span className="edu-badge edu-badge--green">🤝 NSS Club</span>
                      <span className="edu-badge edu-badge--green">📡 REST APIs</span>
                    </div>
                  </div>
                </ElectricBorder>
              </div>

              <div className="edu-item">
                <div className="edu-dot" />
                <ElectricBorder color="#ffffff" borderRadius={14} speed={0.3} chaos={0.08}>
                  <div className="edu-card cursor-target">
                    <div className="edu-card-top">
                      <div>
                        <p className="edu-degree">Intermediate — State Board (MPC)</p>
                        <p className="edu-school">Narayana Junior College, Telangana</p>
                      </div>
                      <div className="edu-card-right">
                        <span className="edu-year">2021 – 2023</span>
                        <span className="edu-cgpa">Score: 956 / 1000</span>
                      </div>
                    </div>
                    <div className="edu-highlights">
                      <span className="edu-badge edu-badge--white">📐 Mathematics</span>
                      <span className="edu-badge edu-badge--white">⚛️ Physics</span>
                      <span className="edu-badge edu-badge--white">🧪 Chemistry</span>
                    </div>
                  </div>
                </ElectricBorder>
              </div>

            </div>
          </div>

          {/* ── ROW 3: Clubs / Activities + Interests side-by-side ── */}
          <div className="about-bottom-grid">

            {/* Clubs & Activities */}
            <div className="about-subsection">
              <h3 className="about-sub-heading">
                <span className="about-sub-icon">🏛️</span> Clubs &amp; Activities
              </h3>
              <div className="clubs-list">

                <ElectricBorder color="#22d3ee" borderRadius={14} speed={0.38} chaos={0.09}>
                  <div className="club-card cursor-target">
                    <div className="club-card-head">
                      <span className="club-icon">🛡️</span>
                      <div>
                        <p className="club-name">Cyber Security Club</p>
                        <p className="club-org">Anurag University · 2024 – Present</p>
                      </div>
                      <span className="club-role-pill club-role-pill--cyan">Member</span>
                    </div>
                    <ul className="club-events">
                      <li>🧩 Exploring offensive &amp; defensive security practices</li>
                      <li>🔍 Learning vulnerability assessment fundamentals</li>
                      <li>🏁 Participating in <strong>CTF</strong> challenges</li>
                    </ul>
                  </div>
                </ElectricBorder>

                <ElectricBorder color="#fb923c" borderRadius={14} speed={0.35} chaos={0.09}>
                  <div className="club-card cursor-target">
                    <div className="club-card-head">
                      <span className="club-icon">🤝</span>
                      <div>
                        <p className="club-name">NSS Club (National Service Scheme)</p>
                        <p className="club-org">Anurag University · 2024 – Present</p>
                      </div>
                      <span className="club-role-pill club-role-pill--orange">Volunteer</span>
                    </div>
                    <ul className="club-events">
                      <li>🤝 Volunteering in community service initiatives</li>
                      <li>📣 Participating in social outreach programs</li>
                    </ul>
                  </div>
                </ElectricBorder>

              </div>
            </div>

            {/* Interests + Resume */}
            <div className="about-subsection">
              <h3 className="about-sub-heading">
                <span className="about-sub-icon">💡</span> Interests &amp; Passions
              </h3>

              <div className="interests-grid">
                {[
                  { icon: '⚛️', title: 'Frontend Magic', desc: 'Crafting pixel-perfect, animated UIs that wow users.' },
                  { icon: '⚙️', title: 'Backend Systems', desc: 'Designing scalable REST APIs, auth flows & database schemas.' },
                  { icon: '🚀', title: 'Deployment & DevOps', desc: 'Hosting on Cloudflare, Vercel, understanding CI/CD pipelines.' },
                  { icon: '🔍', title: 'Deep Dive Learning', desc: 'Going beyond tutorials — understanding how the web really works.' },
                  { icon: '🌐', title: 'How Web Works', desc: 'Fascinated by DNS, HTTP, browsers, servers end-to-end.' },
                  { icon: '🛡️', title: 'Cyber Security', desc: 'Ethical hacking, CTFs, understanding vulnerabilities.' },
                ].map(({ icon, title, desc }) => (
                  <ElectricBorder key={title} color="#a78bfa" borderRadius={12} speed={0.3} chaos={0.07}>
                    <div className="interest-card cursor-target">
                      <span className="interest-icon">{icon}</span>
                      <div>
                        <p className="interest-title">{title}</p>
                        <p className="interest-desc">{desc}</p>
                      </div>
                    </div>
                  </ElectricBorder>
                ))}
              </div>

              {/* Resume download */}
              <div className="resume-cta">
                <ElectricBorder color="#39ff14" borderRadius={14} speed={0.5} chaos={0.12}>
                  <a
                    href="/Manikanta_Goud_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="resume-btn cursor-target"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="22" height="22">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>View Resume</span>
                    <span className="resume-btn-sub">PDF · Updated 2026</span>
                  </a>
                </ElectricBorder>
              </div>
            </div>

          </div>
        </section>

        {/* ── SKILLS ────────────────────────── */}
        <section className="section skills-section" id="skills">
          <h2 className="section-title cursor-target">
            <ShinyText text="Skills & Technologies" speed={3} color="#39ff14" shineColor="#afffaa" />
          </h2>
          <p className="skills-sub">Tools & languages I build with every day</p>

          {/* Category cards grid */}
          <div className="skills-grid">

            {/* Frontend */}
            <ElectricBorder color="#22d3ee" borderRadius={20} speed={0.35} chaos={0.10}>
              <div className="skill-card skill-card--cyan cursor-target">
                <div className="skill-card-shimmer" />
                <div className="skill-card-top">
                  <span className="skill-card-icon">🖥️</span>
                  <span className="skill-card-pill skill-card-pill--cyan">Frontend</span>
                </div>
                <div className="skill-badges">
                  {['⚛️ React', '🌐 Next.js', '🟨 JavaScript', '🔷 TypeScript', '🎨 CSS / SCSS', '🌐 HTML5', '🎭 Tailwind CSS'].map(s => (
                    <span key={s} className="skill-badge skill-badge--cyan">{s}</span>
                  ))}
                </div>
              </div>
            </ElectricBorder>

            {/* Backend */}
            <ElectricBorder color="#fb923c" borderRadius={20} speed={0.35} chaos={0.10}>
              <div className="skill-card skill-card--orange cursor-target">
                <div className="skill-card-shimmer" />
                <div className="skill-card-top">
                  <span className="skill-card-icon">⚙️</span>
                  <span className="skill-card-pill skill-card-pill--orange">Backend</span>
                </div>
                <div className="skill-badges">
                  {['🟢 Node.js', '🚂 Express', '🍃 MongoDB', '🐍 Python', '☕ Java', '🔌 REST APIs', '🔐 bcrypt', '🧩 RBAC'].map(s => (
                    <span key={s} className="skill-badge skill-badge--orange">{s}</span>
                  ))}
                </div>
              </div>
            </ElectricBorder>

            {/* Database */}
            <ElectricBorder color="#a78bfa" borderRadius={20} speed={0.35} chaos={0.10}>
              <div className="skill-card skill-card--purple cursor-target">
                <div className="skill-card-shimmer" />
                <div className="skill-card-top">
                  <span className="skill-card-icon">🗄️</span>
                  <span className="skill-card-pill skill-card-pill--purple">Database</span>
                </div>
                <div className="skill-badges">
                  {['🗄️ SQL', '🐘 PostgreSQL', '🔥 Supabase', '🍃 MongoDB', '📦 Database Design', '🔄 TanStack Query'].map(s => (
                    <span key={s} className="skill-badge skill-badge--purple">{s}</span>
                  ))}
                </div>
              </div>
            </ElectricBorder>

            {/* Tools */}
            <ElectricBorder color="#39ff14" borderRadius={20} speed={0.35} chaos={0.10}>
              <div className="skill-card skill-card--green cursor-target">
                <div className="skill-card-shimmer" />
                <div className="skill-card-top">
                  <span className="skill-card-icon">🛠️</span>
                  <span className="skill-card-pill skill-card-pill--green">Tools</span>
                </div>
                <div className="skill-badges">
                  {['🐙 Git / GitHub', '🧪 Postman', '⚡ Vite', '▲ Vercel', '☁️ Cloudflare', '🧩 Appwrite', '💻 VS Code'].map(s => (
                    <span key={s} className="skill-badge skill-badge--green">{s}</span>
                  ))}
                </div>
              </div>
            </ElectricBorder>

          </div>

          {/* Ticker strip */}
          <div className="skills-ticker">
            <LogoLoop items={techLogos} speed={50} fadeEdges={true} fadeColor="#0a0a0a" logoHeight={22} gap={48} scaleOnHover />
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────── */}
        <section className="section projects-section" id="projects">
          <h2 className="section-title cursor-target">
            <ShinyText text="Projects" speed={3} color="#39ff14" shineColor="#afffaa" />
          </h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <ElectricBorder key={p.title} color="#ffffff" borderRadius={16} speed={0.3} chaos={0.12}>
                <div className="project-card cursor-target">
                  <span className="project-tag">
                    <ShinyText text={p.tag} speed={4} color="#39ff14" shineColor="#ccffdd" />
                  </span>
                  <h3 className="project-title">
                    <ShinyText text={p.title} speed={3} color="#f0f0f0" shineColor="#ffffff" />
                  </h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tech">
                    {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="project-btn cursor-target">GitHub →</a>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </section>

        {/* ── CONTACT — END OF WEBSITE ──────────── */}
        <section className="contact-section" id="contact">

          {/* Section heading */}
          <div className="contact-section-header">
            <h2 className="section-title cursor-target">
              <ShinyText text="Get In Touch" speed={3} color="#39ff14" shineColor="#afffaa" />
            </h2>
            <p className="contact-section-sub">Have a project or just want to say hi? Reach out through any channel below.</p>
          </div>

          {/* Two-column layout */}
          <div className="contact-two-col">

            {/* ── LEFT: Social Links stacked on plain background ── */}
            <div className="contact-socials-col">
              <p className="contact-socials-label">Find me on</p>
              <div className="contact-socials-list">

                <ElectricBorder color="#ffffff" borderRadius={16} speed={0.4} chaos={0.12}>
                  <a href="https://github.com/Manikanta-Goud" target="_blank" rel="noreferrer" className="social-pill cursor-target">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
                    <span>GitHub</span>
                  </a>
                </ElectricBorder>

                <ElectricBorder color="#ffffff" borderRadius={16} speed={0.38} chaos={0.12}>
                  <a href="https://linkedin.com/in/manikanta-goud-72169b314" target="_blank" rel="noreferrer" className="social-pill cursor-target">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                    <span>LinkedIn</span>
                  </a>
                </ElectricBorder>

                <ElectricBorder color="#ffffff" borderRadius={16} speed={0.42} chaos={0.12}>
                  <a href="mailto:goudbmanikanta@gmail.com" className="social-pill cursor-target">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <span>Email</span>
                  </a>
                </ElectricBorder>

                <ElectricBorder color="#ffffff" borderRadius={16} speed={0.36} chaos={0.12}>
                  <a href="tel:+919959864661" className="social-pill cursor-target">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg>
                    <span>Call</span>
                  </a>
                </ElectricBorder>

              </div>
            </div>

            {/* ── RIGHT: Contact Form in electric white shock box ── */}
            <div className="contact-form-col">
              <ElectricBorder color="#ffffff" borderRadius={20} speed={0.45} chaos={0.14}>
                <div className="contact-form-box cursor-target">
                  <div className="contact-form-header">
                    <ShinyText text="Send Me a Message" speed={3} color="#39ff14" shineColor="#afffaa" />
                    <p className="contact-form-desc">
                      Drop your details below and I'll get back to you as soon as possible. 🚀
                    </p>
                  </div>

                  <form className="contact-form" onSubmit={e => e.preventDefault()}>
                    <div className="contact-field">
                      <label className="contact-label" htmlFor="contact-name">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="contact-input cursor-target"
                        placeholder="e.g. John Doe"
                        autoComplete="off"
                      />
                    </div>

                    <div className="contact-field">
                      <label className="contact-label" htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        className="contact-input cursor-target"
                        placeholder="e.g. john@example.com"
                        autoComplete="off"
                      />
                    </div>

                    <div className="contact-field">
                      <label className="contact-label" htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        className="contact-input cursor-target"
                        placeholder="What is this about?"
                        autoComplete="off"
                      />
                    </div>

                    <div className="contact-field">
                      <label className="contact-label" htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        className="contact-textarea cursor-target"
                        rows={5}
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>

                    <button type="submit" className="contact-submit cursor-target">
                      <span>Send Message</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                        <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </ElectricBorder>
            </div>

          </div>

          {/* Footer */}
          <div className="contact-footer-bar">
            <p>© 2026 Bodige Manikanta Goud · goudbmanikanta@gmail.com · +91 9959864661</p>
          </div>

        </section>

      </div>
    </div>
  );
}

