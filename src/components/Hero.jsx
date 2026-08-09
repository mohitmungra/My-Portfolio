import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Ring } from '@react-three/drei';
import './Hero.css';

/* ── Custom Cursor ── */
function CustomCursor() {
  const dot  = useRef();
  const ring = useRef();
  const pos  = useRef({ x: 0, y: 0 });
  const ring_pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);

    let raf;
    const tick = () => {
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.14;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.14;
      if (dot.current) {
        dot.current.style.left = pos.current.x + 'px';
        dot.current.style.top  = pos.current.y + 'px';
      }
      if (ring.current) {
        ring.current.style.left = ring_pos.current.x + 'px';
        ring.current.style.top  = ring_pos.current.y + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const hover = () => ring.current?.classList.add('hovering');
    const unhover = () => ring.current?.classList.remove('hovering');
    document.querySelectorAll('a,button,.btn,.flip-outer').forEach(el => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* ── 3D Distorted Sphere ── */
function DistortSphere() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.4;
    }
  });

  return (
    <Icosahedron
      ref={meshRef}
      args={[1.6, 4]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? '#f97316' : '#9333ea'}
        emissive={hovered ? '#f97316' : '#7c3aed'}
        emissiveIntensity={0.4}
        distort={0.35}
        speed={3}
        roughness={0.1}
        metalness={0.2}
        wireframe={false}
      />
    </Icosahedron>
  );
}

/* ── Orbit Ring ── */
function OrbitRing({ radius, color, speed, tiltX = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <group rotation={[tiltX, 0, 0]}>
      <Ring ref={ref} args={[radius - 0.01, radius + 0.01, 80]}>
        <meshBasicMaterial color={color} opacity={0.5} transparent />
      </Ring>
    </group>
  );
}

/* ── Orbiting Dot ── */
function OrbitDot({ radius, speed, color, offset = 0, tiltX = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * (radius * Math.sin(tiltX));
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

/* ── Typing hook ── */
function useTyping(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const state = useRef({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    let t;
    const tick = () => {
      const { wi, ci, del } = state.current;
      const word = words[wi];
      if (!del && ci < word.length) {
        setText(word.slice(0, ci + 1));
        state.current.ci++;
        t = setTimeout(tick, speed);
      } else if (!del && ci === word.length) {
        t = setTimeout(() => { state.current.del = true; tick(); }, pause);
      } else if (del && ci > 0) {
        setText(word.slice(0, ci - 1));
        state.current.ci--;
        t = setTimeout(tick, speed / 2);
      } else {
        state.current.del = false;
        state.current.wi  = (wi + 1) % words.length;
        t = setTimeout(tick, 200);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [words, speed, pause]);

  return text;
}

const ROLES = ['Digital Engineer', 'IoT Architect', 'AI Evaluator', 'BSP Validator', 'QA Automation'];

/* ── Counter ── */
function Counter({ end, suffix = '+', duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        setVal(Math.floor(p * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Hero() {
  const typed = useTyping(ROLES);

  return (
    <>
      <CustomCursor />
      <section id="home" className="hero">
        {/* 3D Canvas — full background */}
        <div className="hero-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]}   color="#9333ea" intensity={4} />
            <pointLight position={[-5, -3, 3]}  color="#f97316" intensity={3} />
            <pointLight position={[0, -5, -5]}  color="#22d3ee" intensity={2} />
            <DistortSphere />
            <OrbitRing radius={2.4} color="#9333ea" speed={0.6} tiltX={0.5} />
            <OrbitRing radius={3.1} color="#f97316" speed={-0.4} tiltX={1.0} />
            <OrbitRing radius={3.8} color="#22d3ee" speed={0.25} tiltX={0.2} />
            <OrbitDot radius={2.4} speed={0.6}  color="#a855f7" offset={0}   tiltX={0.5} />
            <OrbitDot radius={3.1} speed={-0.4} color="#fb923c" offset={2}   tiltX={1.0} />
            <OrbitDot radius={3.8} speed={0.25} color="#22d3ee" offset={4}   tiltX={0.2} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="hero-content container">
          <div className="hero-left">
            {/* Badge */}
            <div className="hero-badge">
              <span className="badge-pulse" />
              MosChip Technologies · Digital Engineer
            </div>

            {/* Name */}
            <div className="hero-name-wrap">
              <h1 className="hero-name" data-text="MOHIT MUNGRA">MOHIT MUNGRA</h1>
            </div>

            {/* Role */}
            <div className="hero-role">
              <span className="role-slash">// </span>
              <span className="role-text">{typed}</span>
              <span className="cursor-caret">|</span>
            </div>

            <p className="hero-desc">
              Specializing in embedded systems, IoT platforms, AI evaluation frameworks, and protocol-based testing across embedded, mobile, and backend systems.
            </p>

            {/* Stats */}
            <div className="hero-stats">
              {[{ n: 1, l: 'Year Exp' }, { n: 10, l: 'Projects' }, { n: 15, l: 'Technologies' }].map(s => (
                <div key={s.l} className="stat-box">
                  <span className="stat-n"><Counter end={s.n} /></span>
                  <span className="stat-l">{s.l}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas">
              <a href="#projects" className="btn btn-fill"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                View Projects <span>↗</span>
              </a>
              <a href="#contact" className="btn btn-outline"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-wheel" /><span>SCROLL</span>
        </div>
      </section>
    </>
  );
}
