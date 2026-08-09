import { useState, useRef } from 'react';
import './Contact.css';

const contactLinks = [
  {
    icon: '✉',
    label: 'Email',
    value: 'mohitmungra2003@gmail.com',
    href: 'mailto:mohitmungra2003@gmail.com',
    color: '#00f0ff',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'mohit-mungra',
    href: 'https://www.linkedin.com/in/mohit-mungra-840a2a222',
    color: '#7b2fff',
  },
  {
    icon: '⌥',
    label: 'GitHub',
    value: 'mohitmungra',
    href: 'https://github.com/mohitmungra',
    color: '#ff006e',
  },
  {
    icon: '◎',
    label: 'Location',
    value: 'Ahmedabad, Gujarat',
    href: null,
    color: '#00ff88',
  },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(formRef.current);
    try {
      const res = await fetch('https://formspree.io/f/xbdaroev', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact section-content">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">05.</span>
          Get In Touch
        </h2>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap glass-card">
            <h3 className="form-heading">Send a Transmission</h3>
            <p className="form-subtext">
              Have a question or want to work together? Fill out the form and I'll get back to you ASAP.
            </p>

            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="name" type="text" required placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" required placeholder="your@email.com" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cf-subject">Subject</label>
                <input id="cf-subject" name="subject" type="text" required placeholder="What's this about?" />
              </div>

              <div className="form-group">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" name="message" rows={5} required placeholder="Your message here..." />
              </div>

              <button type="submit" className={`btn btn-primary submit-btn ${status}`} disabled={status === 'sending'}>
                {status === 'idle'    && <><span>Send Message</span><span className="btn-arrow">→</span></>}
                {status === 'sending' && <><span className="sending-dot" /><span>Transmitting...</span></>}
                {status === 'success' && <span>✓ Transmission Complete!</span>}
                {status === 'error'   && <span>✕ Failed — Try Again</span>}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="contact-info">
            <div className="info-top">
              <h3 className="info-heading">Contact Channels</h3>
              <p className="info-subtext">Reach out through any of these channels</p>
            </div>

            <div className="contact-cards">
              {contactLinks.map(({ icon, label, value, href, color }) => {
                const Tag = href ? 'a' : 'div';
                return (
                  <Tag
                    key={label}
                    {...(href ? { href, target: label !== 'Email' ? '_blank' : undefined, rel: 'noopener noreferrer' } : {})}
                    className="contact-card glass-card"
                    style={{ '--link-color': color }}
                  >
                    <div className="contact-card-icon" style={{ color, borderColor: color + '40', background: color + '12' }}>
                      {icon}
                    </div>
                    <div className="contact-card-text">
                      <div className="contact-card-label">{label}</div>
                      <div className="contact-card-value" style={{ color }}>{value}</div>
                    </div>
                    {href && <span className="card-arrow" style={{ color }}>→</span>}
                  </Tag>
                );
              })}
            </div>

            <div className="availability">
              <span className="avail-dot" />
              <span>Currently employed at <strong>MosChip Technologies</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
