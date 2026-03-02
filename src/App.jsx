import { useState, useCallback } from 'react';
import './index.css';
import IntroScreen from './components/IntroScreen';
import TargetCursor from './components/TargetCursor';
import ScrollVelocity from './components/ScrollVelocity';
import ElectricBorder from './components/ElectricBorder';
import LogoLoop from './components/LogoLoop';
import ShinyText from './components/ShinyText';
import PixelSnow from './components/PixelSnow';
import LaserFlow from './components/LaserFlow';

// ── Data ────────────────────────────────────────────────
const techLogos = [
  { content: <span>⚛️ React</span> },
  { content: <span>🟨 JavaScript</span> },
  { content: <span>🐍 Python</span> },
  { content: <span>☕ Java</span> },
  { content: <span>🎨 CSS</span> },
  { content: <span>🗄️ SQL</span> },
  { content: <span>🔷 TypeScript</span> },
  { content: <span>🟢 Node.js</span> },
];

const projects = [
  {
    title: 'Gym App',
    desc: 'Full-stack fitness platform with real-time map integration, workout tracking and user authentication.',
    tag: 'Full Stack',
    tech: ['React', 'Node.js', 'Leaflet'],
  },
  {
    title: 'Portfolio Site',
    desc: 'This very portfolio — built with Vite, React & ReactBits animated components.',
    tag: 'Frontend',
    tech: ['React', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Security Logger',
    desc: 'Supabase-powered security logging & admin dashboard with real-time attack monitoring.',
    tag: 'Backend',
    tech: ['Supabase', 'Express', 'Cloudflare'],
  },
];

// ── App ─────────────────────────────────────────────────
export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <div className="app">
      {!introDone && <IntroScreen onDone={handleIntroDone} />}

      <div className={`main-content ${introDone ? 'main-visible' : 'main-hidden'}`}>

        {/* ── PIXEL SNOW BACKGROUND (full page) ── */}
        <div className="snow-bg">
          <PixelSnow
            variant="snowflake"
            pixelResolution={500}
            speed={0.8}
            density={0.6}
            flakeSize={0.05}
            brightness={2.1}
            depthFade={15}
            farPlane={33}
            direction={255}
            color="#ffffff"
          />
        </div>

        <TargetCursor targetSelector=".cursor-target" spinDuration={5} hoverDuration={1} />

        {/* ── NAV ─────────────────────────────── */}
        <nav className="nav">
          <span className="nav-logo cursor-target">
            <ShinyText text="MG" speed={3} color="#39ff14" shineColor="#ccffdd" />
          </span>
          <ul className="nav-links">
            {['About', 'Projects', 'Skills', 'Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="cursor-target">{item}</a>
              </li>
            ))}
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
                <ShinyText text="MANIKANTA" speed={2} color="#39ff14" shineColor="#afffaa" spread={80} />
                <br />
                <ShinyText text="GOUD" speed={2} color="#39ff14" shineColor="#afffaa" spread={80} />
              </h1>
              <p className="hero-role">Software Developer &nbsp;/&nbsp; UI Enthusiast</p>
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
          <div className="about-grid">

            {/* About text in electric box */}
            <ElectricBorder color="#ffffff" borderRadius={16} speed={0.4} chaos={0.10}>
              <div className="about-text about-text-box cursor-target">
                <p>
                  Hi! I am <strong>Manikanta Goud</strong>, a passionate software developer
                  who loves building beautiful, high-performance web experiences. I specialize
                  in modern frontend technologies and backend systems, always striving for
                  clean code and stunning UIs.
                </p>
                <p>
                  When I am not coding, I explore new technologies, design systems and build
                  side projects that push what is possible on the web.
                </p>
              </div>
            </ElectricBorder>

            {/* Stat cards — electric bordered like project cards */}
            <div className="about-stats-col">
              {[
                ['2+', 'Years Experience'],
                ['10+', 'Projects Built'],
                ['5+', 'Technologies'],
              ].map(([num, label]) => (
                <ElectricBorder key={label} color="#ffffff" borderRadius={12} speed={0.35} chaos={0.08}>
                  <div className="stat-card cursor-target">
                    <span className="stat-num">
                      <ShinyText text={num} speed={2} color="#39ff14" shineColor="#ccffbb" />
                    </span>
                    <span className="stat-label">{label}</span>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS LOGO LOOP ──────────────── */}
        <section className="section skills-section" id="skills">
          <h2 className="section-title cursor-target">
            <ShinyText text="Skills & Technologies" speed={3} color="#39ff14" shineColor="#afffaa" />
          </h2>
          <LogoLoop items={techLogos} speed={50} fadeEdges={true} fadeColor="#0a0a0a" logoHeight={22} gap={48} scaleOnHover />
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
                  <button className="project-btn cursor-target">View →</button>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </section>

        {/* ── CONTACT + LASER — END OF WEBSITE ──────────── */}
        <section className="laser-section" id="contact">

          {/* ── ZONE 1: Heading in oval/pill (per sketch) ── */}
          <div className="laser-top">
            <div className="contact-heading-oval">
              <h2 className="section-title cursor-target">
                <ShinyText text="Get In Touch" speed={3} color="#39ff14" shineColor="#afffaa" />
              </h2>
              <a href="mailto:bodigemanikanta@gmail.com" className="contact-btn cursor-target">Say Hello 👋</a>
            </div>
          </div>

          {/* ── ZONE 2: Full-width laser with left/right link overlays ── */}
          <div className="laser-body">

            {/* Laser fills entire zone */}
            <LaserFlow
              color="#a855f7"
              horizontalSizing={2}
              verticalSizing={10}
              wispDensity={5}
              wispSpeed={50}
              wispIntensity={30}
              flowSpeed={1.09}
              flowStrength={0}
              fogIntensity={0.55}
              fogScale={0.3}
              fogFallSpeed={1.64}
              decay={2.94}
              falloffStart={1.38}
              horizontalBeamOffset={0.1}
              verticalBeamOffset={-0.45}
            />

            {/* LEFT links float over the laser */}
            <div className="laser-links-left-float">
              <a href="https://github.com/bodigemanikanta" target="_blank" rel="noreferrer" className="social-pill cursor-target">
                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
                <span>GitHub</span>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="social-pill cursor-target">
                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
                <span>Instagram</span>
              </a>
            </div>

            {/* RIGHT links float over the laser */}
            <div className="laser-links-right-float">
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="social-pill cursor-target">
                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://leetcode.com/" target="_blank" rel="noreferrer" className="social-pill cursor-target">
                <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                <span>LeetCode</span>
              </a>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
