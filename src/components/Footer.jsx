import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">MM</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <p className="footer-tagline">
          ⬢ SYSTEM ONLINE — Built with passion, precision & caffeine
        </p>

        <div className="footer-links">
          <a href="mailto:mohitmungra2003@gmail.com" className="footer-link">Email</a>
          <span className="footer-sep">·</span>
          <a href="https://www.linkedin.com/in/mohit-mungra-840a2a222" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <span className="footer-sep">·</span>
          <a href="https://github.com/mohitmungra" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
        </div>

        <p className="footer-copy">
          Designed & Built by <span className="footer-name">Mohit Mungra</span> · © 2025
        </p>
      </div>
    </footer>
  );
}
