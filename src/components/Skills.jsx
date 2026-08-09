import { useState, useRef } from 'react';
import './Skills.css';

const skillCategories = [
  {
    id: 'qa',
    icon: '🧪',
    title: 'QA & Automation Testing',
    color: '#00f0ff',
    skills: ['Pytest', 'Selenium', 'Appium', 'Protocol Testing', 'BSP Validation', 'CI/CD', 'Manual Testing', 'Test Planning'],
  },
  {
    id: 'iot',
    icon: '🌐',
    title: 'IoT & Protocols',
    color: '#7b2fff',
    skills: ['OCPP', 'MQTT', 'Modbus TCP/IP', 'OPC UA', 'SNMP', 'DNP3.0', 'Wi-Fi', 'BLE', 'Matter'],
  },
  {
    id: 'embedded',
    icon: '⚙️',
    title: 'Embedded Systems',
    color: '#ff006e',
    skills: ['ESP32', 'Raspberry Pi', 'CM4', 'DDR RAM Testing', 'I2C', 'SPI', 'EEPROM', 'UART', 'CAN'],
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI Evaluation',
    color: '#00ff88',
    skills: ['DeepEval', 'LLM Testing', 'Answer Relevancy', 'Faithfulness', 'Contextual Precision', 'Excel-driven Pipelines'],
  },
  {
    id: 'programming',
    icon: '💻',
    title: 'Programming',
    color: '#ffa500',
    skills: ['Python', 'C', 'C++', 'JavaScript', 'React.js', 'Node.js', 'Shell/Bash'],
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: 'Tools & Platforms',
    color: '#00c8ff',
    skills: ['Git', 'GitLab CI/CD', 'Jenkins', 'Docker', 'AWS', 'Azure IoT', 'FastAPI', 'PostgreSQL'],
  },
];

function SkillCard({ category, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  const handleMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => { setHovered(false); setTilt({ x: 0, y: 0 }); };

  return (
    <div
      ref={cardRef}
      className={`skill-card glass-card ${hovered ? 'hovered' : ''}`}
      style={{
        '--card-color': category.color,
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)',
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="skill-card-header">
        <div className="skill-icon" style={{ borderColor: category.color + '40', background: category.color + '12' }}>
          {category.icon}
        </div>
        <h3 className="skill-title" style={{ color: category.color }}>{category.title}</h3>
      </div>

      <div className="skill-tags">
        {category.skills.map(skill => (
          <span
            key={skill}
            className="skill-tag"
            style={{
              borderColor: category.color + '40',
              color: category.color,
              background: category.color + '10',
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Glow border on hover */}
      <div className="card-glow" style={{ '--glow-color': category.color }} />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills section-content">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span>
          Technical Arsenal
        </h2>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
