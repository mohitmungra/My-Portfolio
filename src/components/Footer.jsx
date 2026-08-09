import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-content">
        <div className="footer-logo">
          <span className="logo-m">M</span>
          <span className="logo-dot">·</span>
          <span className="logo-m2">M</span>
        </div>

        <p className="footer-quote">
          "Simplicity is prerequisite for reliability."
        </p>

        <div className="footer-socials">
          <a href="mailto:mohitmungra2003@gmail.com" className="fsocial">Email</a>
          <span>·</span>
          <a href="https://www.linkedin.com/in/mohit-mungra-840a2a222" target="_blank" rel="noopener noreferrer" className="fsocial">LinkedIn</a>
          <span>·</span>
          <a href="https://github.com/mohitmungra" target="_blank" rel="noopener noreferrer" className="fsocial">GitHub</a>
        </div>

        <p className="footer-copy">
          Designed & Engineered by <span className="highlight-name">Mohit Mungra</span> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
