import { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = [
  { href: '#home',       label: 'HOME' },
  { href: '#about',      label: 'ABOUT' },
  { href: '#skills',     label: 'SKILLS' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#projects',   label: 'PROJECTS' },
  { href: '#contact',    label: 'CONTACT' },
];

export default function Navbar() {
  const [scrolled, setScrolled]  = useState(false);
  const [open, setOpen]          = useState(false);
  const [active, setActive]      = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = LINKS.map(l => l.href.slice(1));
      let cur = 'home';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 180) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container container">
        <div className="nav-glass-bar">
          {/* Top Neon Accent Line */}
          <div className="nav-top-accent" />

          {/* Logo */}
          <a href="#home" className="nav-logo" onClick={e => nav(e, '#home')}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">MM</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          {/* Nav Links */}
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {LINKS.map(({ href, label }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`nav-a ${isActive ? 'active' : ''}`}
                    onClick={e => nav(e, href)}
                  >
                    {isActive && <span className="nav-active-dot" />}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Status Badge */}
          <div className="nav-status-badge">
            <span className="nav-status-dot" />
            <span className="nav-status-text">ONLINE</span>
          </div>

          {/* Burger Button */}
          <button className={`nav-burger ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Toggle Navigation">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
