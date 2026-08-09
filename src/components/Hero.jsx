import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import './Hero.css';

/* ── 3D Rotating Torus ── */
function SpinningTorus() {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.4;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });
  return (
    <Torus ref={mesh} args={[1.2, 0.35, 16, 60]}>
      <meshStandardMaterial
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={0.6}
        wireframe={false}
        metalness={0.8}
        roughness={0.1}
      />
    </Torus>
  );
}

/* ── Typing effect hook ── */
function useTyping(words, speed = 90, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ── Counter component ── */
function Counter({ target, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 25);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const roles = ['Digital Engineer', 'IoT Specialist', 'AI Evaluator', 'Embedded Systems', 'QA Automation'];

export default function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="home" className="hero section-content">
      <div className="hero-inner container">
        {/* LEFT — Text */}
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot" />
            Currently @ MosChip Technologies
          </div>

          <h1 className="hero-name" data-text="MOHIT MUNGRA">
            MOHIT<br />MUNGRA
          </h1>

          <div className="hero-role">
            <span className="role-prefix">// </span>
            <span className="role-typed">{typed}</span>
            <span className="cursor-blink">_</span>
          </div>

          <p className="hero-desc">
            Specializing in embedded systems, IoT platforms, AI evaluation frameworks, and protocol-based testing. Building the bridge between hardware and software intelligence.
          </p>

          <div className="hero-stats">
            {[
              { val: 1,  label: 'Years Exp.' },
              { val: 10, label: 'Projects' },
              { val: 15, label: 'Technologies' },
            ].map(({ val, label }) => (
              <div key={label} className="stat">
                <div className="stat-num"><Counter target={val} /></div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Get In Touch
            </a>
            <a href="#projects" className="btn btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View Work
            </a>
          </div>
        </div>

        {/* RIGHT — 3D Canvas + Terminal */}
        <div className="hero-visual">
          <div className="canvas-wrap">
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.2} />
              <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={2} />
              <pointLight position={[-5, -5, 5]} color="#7b2fff" intensity={1.5} />
              <SpinningTorus />
            </Canvas>
            {/* Orbital rings (CSS) */}
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
          </div>

          {/* Terminal */}
          <div className="terminal glass-card">
            <div className="terminal-header">
              <span className="term-dot red" /><span className="term-dot yellow" /><span className="term-dot green" />
              <span className="terminal-title">mohit_profile.json</span>
            </div>
            <div className="terminal-body">
              <p><span className="prompt">$</span> cat profile.json</p>
              <p className="json">{'{'}</p>
              <p className="json">  <span className="key">"name"</span>: <span className="str">"Mohit Mungra"</span>,</p>
              <p className="json">  <span className="key">"role"</span>: <span className="str">"Digital Engineer"</span>,</p>
              <p className="json">  <span className="key">"location"</span>: <span className="str">"Ahmedabad, Gujarat"</span>,</p>
              <p className="json">  <span className="key">"company"</span>: <span className="str">"MosChip Technologies"</span>,</p>
              <p className="json">  <span className="key">"expertise"</span>: [<span className="str">"IoT"</span>, <span className="str">"BSP"</span>, <span className="str">"AI Eval"</span>],</p>
              <p className="json">  <span className="key">"status"</span>: <span className="active-status">"Employed ✓"</span></p>
              <p className="json">{'}'}</p>
              <p><span className="prompt">$</span> <span className="cursor-blink">█</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
