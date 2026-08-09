import { useState, useRef } from 'react';
import './Contact.css';

const info = [
  { icon: '✉', label: 'Email', val: 'mohitmungra2003@gmail.com', href: 'mailto:mohitmungra2003@gmail.com', color: '#9333ea' },
  { icon: '💼', label: 'LinkedIn', val: 'mohit-mungra', href: 'https://www.linkedin.com/in/mohit-mungra-840a2a222', color: '#f97316' },
  { icon: '⌥',  label: 'GitHub', val: 'mohitmungra', href: 'https://github.com/mohitmungra', color: '#22d3ee' },
  { icon: '◎',  label: 'Location', val: 'Ahmedabad, Gujarat', href: null, color: '#10b981' },
];

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const formRef = useRef();

  const submit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xbdaroev', { method: 'POST', body: new FormData(formRef.current), headers: { Accept: 'application/json' } });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) { formRef.current.reset(); setTimeout(() => setStatus('idle'), 5000); }
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-label">05. CONTACT</div>
        <h2 className="section-title-main">Let's <span>Connect</span></h2>

        <div className="contact-layout">
          {/* LEFT: Big tagline */}
          <div className="contact-left">
            <p className="contact-tagline">
              Got a project?<br />
              Let's build something<br />
              <span>remarkable.</span>
            </p>

            <div className="contact-info-list">
              {info.map(({ icon, label, val, href, color }) => {
                const Tag = href ? 'a' : 'div';
                return (
                  <Tag key={label} {...(href ? { href, target: label !== 'Email' ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})} className="cinfo-row">
                    <span className="cinfo-icon" style={{ color }}>{icon}</span>
                    <div className="cinfo-text">
                      <span className="cinfo-label">{label}</span>
                      <span className="cinfo-val" style={{ color }}>{val}</span>
                    </div>
                    {href && <span className="cinfo-arrow" style={{ color }}>→</span>}
                  </Tag>
                );
              })}
            </div>

            <div className="avail-pill">
              <span className="avail-dot" />
              Employed · MosChip Technologies
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="contact-right glass">
            <form ref={formRef} onSubmit={submit} className="cform">
              <div className="cform-row">
                <div className="cfield">
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" name="name" type="text" required placeholder="Your Name" />
                </div>
                <div className="cfield">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" required placeholder="your@email.com" />
                </div>
              </div>
              <div className="cfield">
                <label htmlFor="c-subject">Subject</label>
                <input id="c-subject" name="subject" type="text" required placeholder="What's this about?" />
              </div>
              <div className="cfield">
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" rows={5} required placeholder="Your message..." />
              </div>
              <button type="submit" className={`btn btn-fill csend-btn ${status}`} disabled={status === 'sending'}>
                {status === 'idle'    && 'Send Message →'}
                {status === 'sending' && '⟳ Transmitting...'}
                {status === 'success' && '✓ Delivered!'}
                {status === 'error'   && '✕ Error — Retry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
