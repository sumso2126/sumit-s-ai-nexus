import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, BrainCircuit, Code2, Cpu, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { CustomCursor } from "../components/CustomCursor";
import { NeuralCore } from "../components/NeuralCore";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sumit — AI/ML Developer Portfolio" },
      { name: "description", content: "Portfolio of Sumit, a B.Tech AI & Machine Learning developer building intelligent products and modern web experiences." },
      { property: "og:title", content: "Sumit — AI/ML Developer Portfolio" },
      { property: "og:description", content: "Explore Sumit’s work across machine learning, artificial intelligence, and web development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const skills = [
  { name: "Python", level: "Advanced", value: 88 },
  { name: "Machine Learning", level: "Advanced", value: 84 },
  { name: "TensorFlow", level: "Proficient", value: 76 },
  { name: "React / TypeScript", level: "Proficient", value: 80 },
  { name: "Data Analysis", level: "Advanced", value: 86 },
  { name: "Computer Vision", level: "Exploring", value: 68 },
];

const projects = [
  { index: "01", title: "Vision Intelligence", category: "Computer Vision", text: "An image-classification workflow designed around clean data pipelines, measurable evaluation and deployable inference.", tags: ["Python", "TensorFlow", "OpenCV"], tone: "project-cyan" },
  { index: "02", title: "Predictive Analytics", category: "Machine Learning", text: "A practical forecasting system that transforms raw datasets into interpretable predictions and decision-ready insights.", tags: ["Scikit-learn", "Pandas", "FastAPI"], tone: "project-lime" },
  { index: "03", title: "Intelligent Web", category: "AI + Product", text: "A responsive web experience connecting intuitive interfaces with intelligent features and thoughtful interaction design.", tags: ["React", "TypeScript", "AI APIs"], tone: "project-warm" },
];

const reveal = { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.65 } };

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
  return (
    <main className="portfolio-shell">
      <CustomCursor />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Sumit, back to top"><span>S</span> SUMIT</a>
        <nav aria-label="Primary navigation">
          <a href="#about">Profile</a><a href="#work">Work</a><a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="header-status"><span /> Available for opportunities</a>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>AI / ML DEVELOPER · INDIA</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            SUMIT<span className="signal-dot">.</span>
          </motion.h1>
          <motion.p className="hero-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65 }}>
            Building intelligent systems at the intersection of <strong>machine learning</strong>, <strong>artificial intelligence</strong>, and the modern web.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}>
            <a className="primary-action" href="#work">Explore my work <ArrowDownRight size={17} /></a>
            <a className="text-action" href="#contact">Start a conversation <ArrowUpRight size={16} /></a>
          </motion.div>
        </div>
        <div className="hero-visual"><NeuralCore /><div className="core-label label-one"><span>01</span> NEURAL SYSTEMS</div><div className="core-label label-two"><span>02</span> MODEL TRAINING</div></div>
        <div className="hero-meta">
          <span>B.TECH · AI & MACHINE LEARNING</span>
          <span>JECRC UNIVERSITY / JECRC NCR, ALWAR</span>
        </div>
      </section>

      <section id="about" className="content-section about-section">
        <motion.div className="section-number" {...reveal}>01 / PROFILE</motion.div>
        <div className="about-grid">
          <motion.div {...reveal}>
            <p className="section-kicker">Curious by nature. Technical by choice.</p>
            <h2>I turn complex ideas into <em>clear, useful systems.</em></h2>
          </motion.div>
          <motion.div className="about-copy" {...reveal}>
            <p>I’m a B.Tech student specializing in Artificial Intelligence and Machine Learning, focused on creating technology that solves real problems—not just impressive demos.</p>
            <p>My work moves between data, models, and interfaces. I enjoy understanding the full system: how intelligence is trained, how it is delivered, and how people experience it.</p>
            <div className="location"><MapPin size={17} /> Alwar, Rajasthan, India</div>
          </motion.div>
        </div>
        <motion.div className="discipline-row" {...reveal}>
          <div><BrainCircuit /><span>01</span><strong>Artificial Intelligence</strong><p>Intelligent systems, NLP, and practical automation.</p></div>
          <div><Cpu /><span>02</span><strong>Machine Learning</strong><p>Predictive models, evaluation, and data workflows.</p></div>
          <div><Code2 /><span>03</span><strong>Web Development</strong><p>Fast, considered interfaces for AI-powered products.</p></div>
        </motion.div>
      </section>

      <section className="content-section toolkit-section">
        <motion.div className="section-number" {...reveal}>02 / TOOLKIT</motion.div>
        <div className="section-heading"><motion.h2 {...reveal}>Capabilities, measured.</motion.h2><motion.p {...reveal}>A growing technical stack built through coursework, experimentation, and applied projects.</motion.p></div>
        <div className="skill-list">
          {skills.map((skill, index) => <motion.div className="skill-row" key={skill.name} {...reveal}><span className="skill-index">0{index + 1}</span><strong>{skill.name}</strong><span className="skill-level">{skill.level}</span><div className="skill-track"><motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: skill.value / 100 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.06 }} /></div><span className="skill-value">{skill.value}%</span></motion.div>)}
        </div>
      </section>

      <section id="work" className="content-section work-section">
        <motion.div className="section-number" {...reveal}>03 / SELECTED WORK</motion.div>
        <div className="section-heading"><motion.h2 {...reveal}>Projects in progress.</motion.h2><motion.p {...reveal}>Representative work areas. Project details and live links can be added as the portfolio evolves.</motion.p></div>
        <div className="project-list">
          {projects.map((project) => <motion.article key={project.index} className={`project-card ${project.tone}`} {...reveal} whileHover={{ y: -5 }}><div className="project-top"><span>{project.index}</span><span>{project.category}</span><ArrowUpRight /></div><div className="project-mark"><Sparkles /></div><h3>{project.title}</h3><p>{project.text}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}
        </div>
      </section>

      <section className="education-band">
        <motion.div className="education-inner" {...reveal}>
          <span className="education-year">2024—28</span><div><p>EDUCATION</p><h2>B.Tech in Artificial Intelligence & Machine Learning</h2><span>JECRC University / JECRC NCR, Alwar</span></div><BrainCircuit />
        </motion.div>
      </section>

      <section id="contact" className="contact-section">
        <motion.div {...reveal}>
          <p className="eyebrow">OPEN TO INTERNSHIPS · COLLABORATIONS · IDEAS</p>
          <h2>Let’s build something<br /><em>intelligent.</em></h2>
          <a className="contact-link" href="mailto:sumit@example.com">sumit@example.com <ArrowUpRight /></a>
          <p className="contact-note">Replace this placeholder email with Sumit’s preferred address.</p>
        </motion.div>
        <div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github /> GitHub</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a><a href="mailto:sumit@example.com"><Mail /> Email</a></div>
      </section>

      <footer><span>© 2026 SUMIT</span><span>DESIGNED WITH INTENT · BUILT WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
