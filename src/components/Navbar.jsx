import { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = [
  { href: '#home',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]  = useState(false);
  const [open, setOpen]          = useState(false);
  const [active, setActive]      = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
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
      <div className="nav-inner container">
        <a href="#home" className="nav-logo" onClick={e => nav(e, '#home')}>
          <span className="logo-m">M</span>
          <span className="logo-dot">·</span>
          <span className="logo-m2">M</span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-a ${active === href.slice(1) ? 'active' : ''}`}
                onClick={e => nav(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button className={`nav-burger ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
