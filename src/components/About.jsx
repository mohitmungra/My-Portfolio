import './About.css';

const highlights = [
  { icon: '⚡', title: 'Test Automation',  desc: 'End-to-end automation across embedded, mobile & web systems' },
  { icon: '🔌', title: 'BSP & Protocols',  desc: 'DDR RAM, I2C, SPI, UART, CAN, OCPP, MQTT validation' },
  { icon: '🧠', title: 'AI Evaluation',    desc: 'LLM testing with DeepEval — faithfulness, relevancy, precision' },
  { icon: '☁',  title: 'Cloud & IoT',      desc: 'Azure IoT Hub, AWS, OPC UA, industrial data pipelines' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-label">01. ABOUT</div>
        <div className="about-grid">
          {/* Left — Image */}
          <div className="about-img-col">
            <div className="img-scene">
              {/* Rotating hex rings */}
              <div className="hex-orbit o1"><div className="orbit-dot od-p" /></div>
              <div className="hex-orbit o2"><div className="orbit-dot od-o" /></div>
              <div className="hex-orbit o3"><div className="orbit-dot od-c" /></div>
              {/* Profile */}
              <div className="profile-circle">
                <img src="/MM.jpeg" alt="Mohit Mungra" />
                <div className="profile-overlay" />
              </div>
              {/* Corner labels */}
              <div className="corner-tag tag-tl">ESP32</div>
              <div className="corner-tag tag-br">DeepEval</div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="about-text-col">
            <h2 className="section-title-main">
              Crafting <span>precision</span> at the edge of hardware & software
            </h2>

            <p>
              Digital Engineer with <strong>1+ years</strong> of hands-on experience at MosChip Technologies, specializing in automation testing, BSP validation, AI evaluation frameworks, and system-level validation across embedded, mobile, and backend systems.
            </p>
            <p>
              I bridge the gap between silicon and software — from validating DDR RAM across 21 test cases on Raspberry Pi, to evaluating AI language model responses with DeepEval, to building OCPP-based EV charging test benches.
            </p>

            {/* Highlight grid */}
            <div className="about-highlights">
              {highlights.map(h => (
                <div key={h.title} className="highlight glass">
                  <div className="highlight-icon">{h.icon}</div>
                  <div>
                    <div className="highlight-title">{h.title}</div>
                    <div className="highlight-desc">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cta">
              <a href="#contact" className="btn btn-fill"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Let's Connect ↗
              </a>
              <a href="#experience" className="btn btn-outline"
                onClick={e => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }}>
                My Journey
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
