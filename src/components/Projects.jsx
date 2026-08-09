import { useState, useRef } from 'react';
import './Projects.css';

const projects = [
  {
    icon: '🔬',
    title: 'BSP Validation – DDR RAM & Protocol Testing',
    desc: 'Board Support Package validation on Raspberry Pi covering DDR RAM memory testing across 21 structured test cases and embedded protocol validation using I2C, SPI, and EEPROM.',
    tech: ['Python', 'Pytest', 'Raspberry Pi', 'I2C / SPI', 'EEPROM'],
    features: ['21 DDR RAM test cases (pattern, address, bandwidth, stress)', 'Rowhammer vulnerability testing', 'Protocol-level peripheral validation'],
    color: '#00f0ff',
  },
  {
    icon: '🧠',
    title: 'PTAF Core – AI Response Evaluation',
    desc: 'Automated AI evaluation framework that reads questions from Excel, sends them to an LLM, captures responses, and evaluates them using DeepEval metrics in both PDF-context and general modes.',
    tech: ['Python', 'DeepEval', 'Pytest', 'Excel Automation', 'LLM Testing'],
    features: ['Excel-driven Q&A ingestion pipeline', 'PDF-context & general evaluation modes', 'Metric scoring: relevancy, faithfulness, precision'],
    color: '#7b2fff',
  },
  {
    icon: '🌐',
    title: 'KBFC – Website Automation',
    desc: 'End-to-end web automation for the KBFC project covering functional validation of user flows, form interactions, and dynamic content with automated screenshot capture on failures.',
    tech: ['Python', 'Selenium', 'Pytest', 'Web Automation'],
    features: ['Navigation, forms & dynamic content testing', 'Auto screenshot capture on failure', 'Structured test reporting'],
    color: '#ff006e',
  },
  {
    icon: '⚡',
    title: 'EV Charging Ecosystem',
    desc: 'End-to-end testing of OCPP-based EV charging solution with web testbench UI for automated compliance validation.',
    tech: ['Python', 'Pytest', 'OCPP', 'FastAPI', 'WebSocket'],
    features: ['OCPP protocol validation', 'Automated test execution dashboard', 'Transaction flow testing'],
    color: '#ffa500',
  },
  {
    icon: '📡',
    title: 'BLE & Wi-Fi Automation Framework',
    desc: 'Comprehensive automation framework for validating Bluetooth and Wi-Fi on ESP32 using Raspberry Pi as host controller.',
    tech: ['Python', 'ESP32', 'Raspberry Pi', 'BLE', 'UART'],
    features: ['Automated device discovery & pairing', 'AT command validation', 'Mobile automation with Appium'],
    color: '#00ff88',
  },
  {
    icon: '🏭',
    title: 'Industrial GenAIoT',
    desc: 'Industrial IoT validation ensuring reliable machine-to-cloud data flow with OPC UA integration and Azure services.',
    tech: ['Python', 'OPC UA', 'Azure IoT', 'C2D'],
    features: ['End-to-end data pipeline validation', 'FOTA update testing', 'Automated reporting & analysis'],
    color: '#00c8ff',
  },
  {
    icon: '🏠',
    title: 'Smart Home IoT Testing',
    desc: 'Manual and automation testing of smart home applications with Matter protocol and firmware validation.',
    tech: ['Android', 'Matter', 'Python', 'OTA'],
    features: ['Wi-Fi & Matter connectivity testing', 'Firmware flashing validation', 'Multi-platform app testing'],
    color: '#ff6b9d',
  },
  {
    icon: '🤖',
    title: 'GitLab Duo Ultimate',
    desc: 'AI-assisted QA workflows using GitLab Duo for CI/CD debugging, security validation, and test improvement.',
    tech: ['GitLab CI/CD', 'AI Tools', 'SAST', 'MR Review'],
    features: ['CI/CD pipeline failure analysis', 'AI-assisted security scanning', 'Test case improvement'],
    color: '#ff7043',
  },
  {
    icon: '🚗',
    title: 'Android Automotive Automation',
    desc: 'Automation of Android Auto and automotive interfaces with UI behavior validation and image comparison.',
    tech: ['Appium', 'Python', 'Android Studio'],
    features: ['Drive mode automation', 'UI validation with image comparison', 'Real device testing'],
    color: '#ab47bc',
  },
  {
    icon: '🛒',
    title: 'Smart Grocery Store',
    desc: 'AI-powered e-commerce validation with face recognition and emotion detection on Qualcomm edge hardware.',
    tech: ['Android', 'AI/ML', 'Edge Computing'],
    features: ['Face recognition validation', 'Edge case testing', 'Hardware integration testing'],
    color: '#26a69a',
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  const handleMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * 16;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`project-card glass-card ${hovered ? 'hovered' : ''}`}
      style={{
        '--proj-color': project.color,
        transform: hovered
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px) scale(1.02)`
          : 'perspective(1200px) rotateX(0) rotateY(0) translateY(0) scale(1)',
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.4s ease',
        animationDelay: `${(index % 3) * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      <div className="project-glow-bar" style={{ background: project.color }} />

      <div className="project-header">
        <div className="project-icon-wrap" style={{ borderColor: project.color + '40', background: project.color + '12' }}>
          <span className="project-icon">{project.icon}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
      </div>

      <p className="project-desc">{project.desc}</p>

      <div className="project-tech">
        {project.tech.map(t => (
          <span key={t} className="tech-badge" style={{ color: project.color, borderColor: project.color + '40', background: project.color + '10' }}>
            {t}
          </span>
        ))}
      </div>

      <ul className="project-features">
        {project.features.map(f => (
          <li key={f}>
            <span className="feat-check" style={{ color: project.color }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects section-content">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">04.</span>
          Featured Projects
        </h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
