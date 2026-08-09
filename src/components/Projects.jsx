import { useRef, useState } from 'react';
import './Projects.css';

const projects = [
  { icon: '🔬', title: 'BSP Validation', subtitle: 'DDR RAM & Protocol Testing', color: '#9333ea', desc: 'Board Support Package validation on Raspberry Pi — 21 DDR RAM test cases covering pattern, address, bandwidth, stress testing & rowhammer vulnerability. Protocol validation: I2C, SPI, EEPROM.', tech: ['Python', 'Pytest', 'Raspberry Pi', 'I2C/SPI', 'EEPROM'], features: ['21 DDR RAM test cases', 'Rowhammer vulnerability testing', 'Peripheral protocol validation'] },
  { icon: '🧠', title: 'PTAF Core', subtitle: 'AI Response Evaluation', color: '#f97316', desc: 'Automated AI evaluation framework — reads Q&A from Excel, sends to LLM, evaluates responses via DeepEval metrics in PDF-context and general modes.', tech: ['Python', 'DeepEval', 'Pytest', 'Excel', 'LLM'], features: ['Excel-driven ingestion pipeline', 'PDF-context & general modes', 'Relevancy, faithfulness, precision'] },
  { icon: '🌐', title: 'KBFC Automation', subtitle: 'Website Testing Suite', color: '#22d3ee', desc: 'End-to-end web automation covering functional validation of user flows, form interactions, and dynamic content with auto screenshot capture on failures.', tech: ['Python', 'Selenium', 'Pytest', 'WebDriver'], features: ['Navigation & form testing', 'Auto screenshot on failure', 'Structured test reports'] },
  { icon: '⚡', title: 'EV Charging', subtitle: 'OCPP Ecosystem Testing', color: '#10b981', desc: 'End-to-end OCPP-based EV charging solution testing with web testbench UI for automated compliance validation of transaction flows.', tech: ['Python', 'OCPP', 'FastAPI', 'WebSocket', 'Pytest'], features: ['OCPP protocol validation', 'Test execution dashboard', 'Transaction flow testing'] },
  { icon: '📡', title: 'BLE & Wi-Fi', subtitle: 'Automation Framework', color: '#a855f7', desc: 'Comprehensive Bluetooth and Wi-Fi automation on ESP32 using Raspberry Pi as host controller — device discovery, pairing, AT command validation.', tech: ['Python', 'ESP32', 'BLE', 'UART', 'Appium'], features: ['Device discovery & pairing', 'AT command validation', 'Mobile automation via Appium'] },
  { icon: '🏭', title: 'Industrial GenAIoT', subtitle: 'Machine-to-Cloud Validation', color: '#fb923c', desc: 'Industrial IoT validation ensuring reliable machine-to-cloud data flow with OPC UA integration, Azure IoT Hub, and FOTA update testing.', tech: ['Python', 'OPC UA', 'Azure IoT', 'C2D'], features: ['Data pipeline validation', 'FOTA update testing', 'Automated reporting'] },
  { icon: '🏠', title: 'Smart Home IoT', subtitle: 'Matter Protocol Testing', color: '#ef4444', desc: 'Manual & automated testing of smart home applications with Matter protocol and firmware OTA validation across multiple platforms.', tech: ['Android', 'Matter', 'Python', 'OTA'], features: ['Matter connectivity testing', 'Firmware flash validation', 'Multi-platform testing'] },
  { icon: '🤖', title: 'GitLab Duo', subtitle: 'AI-Assisted QA Workflows', color: '#8b5cf6', desc: 'AI-assisted QA workflows with GitLab Duo for CI/CD failure debugging, SAST security scanning, and AI-driven test case improvement.', tech: ['GitLab CI/CD', 'AI Tools', 'SAST', 'MR Review'], features: ['Pipeline failure analysis', 'AI security scanning', 'Test case improvement'] },
  { icon: '🚗', title: 'Android Automotive', subtitle: 'UI Automation Suite', color: '#06b6d4', desc: 'Drive mode & automotive interface automation with UI behavior validation and pixel-level image comparison for Android Auto.', tech: ['Appium', 'Python', 'Android Studio'], features: ['Drive mode automation', 'Image comparison testing', 'Real device testing'] },
  { icon: '🛒', title: 'Smart Grocery', subtitle: 'Edge AI Validation', color: '#f59e0b', desc: 'AI-powered e-commerce validation with face recognition and emotion detection on Qualcomm edge hardware.', tech: ['Android', 'AI/ML', 'Edge Computing', 'Qualcomm'], features: ['Face recognition validation', 'Edge case testing', 'Hardware integration'] },
];

function FlipCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef();

  const onMouseMove = e => {
    if (flipped) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientY - r.top)  / r.height - 0.5) * 18;
    const y = ((e.clientX - r.left) / r.width  - 0.5) * -18;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      className={`flip-outer ${flipped ? 'flipped' : ''}`}
      style={{ '--pc': project.color }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="flip-inner"
        style={{
          transform: flipped
            ? 'rotateY(180deg)'
            : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* FRONT */}
        <div className="flip-face flip-front">
          <div className="flip-top-bar" style={{ background: project.color }} />
          <div className="flip-icon">{project.icon}</div>
          <div className="flip-title">{project.title}</div>
          <div className="flip-subtitle" style={{ color: project.color }}>{project.subtitle}</div>
          <div className="flip-tech">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="flip-badge" style={{ color: project.color, borderColor: project.color + '40', background: project.color + '10' }}>{t}</span>
            ))}
          </div>
          <div className="flip-hint">Click to reveal ↻</div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back">
          <div className="flip-back-title" style={{ color: project.color }}>{project.title}</div>
          <p className="flip-desc">{project.desc}</p>
          <ul className="flip-features">
            {project.features.map(f => (
              <li key={f}><span style={{ color: project.color }}>✓</span> {f}</li>
            ))}
          </ul>
          <div className="flip-back-tech">
            {project.tech.map(t => (
              <span key={t} className="flip-badge" style={{ color: project.color, borderColor: project.color + '40', background: project.color + '10' }}>{t}</span>
            ))}
          </div>
          <div className="flip-hint">Click to flip back ↺</div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-label">04. PROJECTS</div>
        <h2 className="section-title-main">Featured <span>Work</span></h2>
        <p className="projects-sub">Click any card to reveal details</p>
        <div className="projects-grid">
          {projects.map(p => <FlipCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  );
}
