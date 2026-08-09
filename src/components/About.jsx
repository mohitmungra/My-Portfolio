import { useRef } from 'react';
import './About.css';

const highlights = [
  { icon: '⚡', text: 'End-to-end testing expertise across embedded, mobile & backend systems' },
  { icon: '🔧', text: 'BSP & embedded protocol validation — I2C, SPI, UART, CAN, EEPROM' },
  { icon: '🤖', text: 'AI response evaluation with DeepEval — faithfulness, relevancy, precision' },
  { icon: '📊', text: 'Log analysis, automated reporting & CI/CD pipeline integration' },
];

export default function About() {
  const imgRef = useRef();

  return (
    <section id="about" className="about section-content">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">01.</span>
          About Me
        </h2>

        <div className="about-grid">
          {/* Image Side */}
          <div className="about-image-wrap">
            <div className="hex-frame" ref={imgRef}>
              <div className="hex-ring hex-ring-1" />
              <div className="hex-ring hex-ring-2" />
              <div className="hex-ring hex-ring-3" />
              <div className="profile-img-wrap">
                <img src="/MM.jpeg" alt="Mohit Mungra" className="profile-img" />
                <div className="img-overlay" />
              </div>
            </div>
            {/* Floating tags */}
            <div className="float-tag tag-1">IoT Engineer</div>
            <div className="float-tag tag-2">AI Evaluator</div>
            <div className="float-tag tag-3">BSP Validation</div>
          </div>

          {/* Text Side */}
          <div className="about-text">
            <p className="about-intro">
              Digital Engineer with <span className="highlight-word">1+ years</span> of hands-on experience in automation testing, BSP validation, AI evaluation frameworks, and system-level validation across embedded, mobile, and backend systems.
            </p>
            <p>
              I specialize in protocol-based systems, EV charging solutions, IoT and Android applications, BSP and DDR RAM validation, AI response evaluation, and web automation frameworks. My approach combines meticulous attention to detail with systematic problem-solving to ensure robust system validation.
            </p>
            <p>
              Known for breaking down complex systems, identifying edge cases, and improving test coverage through structured test cases and automation. Quick learner with strong fundamentals in testing concepts, protocols, scripting, and AI-based evaluation frameworks.
            </p>

            <div className="about-highlights">
              {highlights.map(({ icon, text }) => (
                <div key={text} className="highlight-item glass-card">
                  <div className="highlight-icon">{icon}</div>
                  <div className="highlight-text">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
