import './Skills.css';

const skills = [
  { icon: '🧪', title: 'QA & Automation', color: '#9333ea', tags: ['Pytest','Selenium','Appium','BSP Validation','CI/CD','Manual Testing'] },
  { icon: '🌐', title: 'IoT & Protocols',  color: '#f97316', tags: ['OCPP','MQTT','Modbus TCP/IP','OPC UA','SNMP','DNP3.0','Matter'] },
  { icon: '⚙️', title: 'Embedded Systems', color: '#22d3ee', tags: ['ESP32','Raspberry Pi','CM4','DDR RAM','I2C','SPI','UART','CAN'] },
  { icon: '🤖', title: 'AI Evaluation',    color: '#10b981', tags: ['DeepEval','LLM Testing','Faithfulness','Relevancy','Precision'] },
  { icon: '💻', title: 'Programming',      color: '#a855f7', tags: ['Python','C','C++','JavaScript','React.js','Node.js','Bash'] },
  { icon: '🛠️', title: 'Tools & Cloud',    color: '#fb923c', tags: ['Git','GitLab CI/CD','Jenkins','Docker','AWS','Azure IoT','FastAPI'] },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-label">02. SKILLS</div>
        <h2 className="section-title-main">Technical <span>Arsenal</span></h2>

        <div className="skills-hex-grid">
          {skills.map((s, i) => (
            <div key={s.title} className="hex-card" style={{ '--c': s.color, '--delay': `${i * 0.08}s` }}>
              {/* Animated border */}
              <div className="hex-border" />
              <div className="hex-inner">
                <div className="hex-icon" style={{ color: s.color }}>{s.icon}</div>
                <div className="hex-title" style={{ color: s.color }}>{s.title}</div>
                <div className="hex-tags">
                  {s.tags.map(t => (
                    <span key={t} className="hex-tag" style={{ borderColor: s.color + '40', color: s.color, background: s.color + '10' }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* Corner accent */}
              <div className="hex-corner-tl" style={{ borderColor: s.color + '50' }} />
              <div className="hex-corner-br" style={{ borderColor: s.color + '50' }} />
            </div>
          ))}
        </div>

        {/* All skills as scrolling marquee */}
        <div className="skills-marquee">
          <div className="marquee-track">
            {[...skills.flatMap(s => s.tags), ...skills.flatMap(s => s.tags)].map((t, i) => (
              <span key={i} className="marquee-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
