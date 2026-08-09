import './Experience.css';

const items = [
  {
    period: 'Dec 2024 — Present',
    role: 'Digital Engineer',
    org: 'MosChip Technologies Limited',
    type: 'Full-Time',
    color: '#9333ea',
    points: [
      'BSP validation — DDR RAM memory testing (21 test cases: pattern, address, bandwidth, stress, rowhammer)',
      'Built AI evaluation framework using DeepEval for automated LLM response assessment',
      'Automation frameworks for BLE, Wi-Fi, Selenium web, and Appium mobile testing',
      'Protocol testing — OCPP, MQTT, Modbus TCP/IP, OPC UA, Azure IoT, DNP3.0',
      'Embedded systems work on ESP32, Raspberry Pi CM4 — I2C, SPI, UART, CAN',
    ],
  },
  {
    period: 'May 2023 — Jun 2023',
    role: 'Frontend Developer',
    org: 'Miracle Technolabs',
    type: 'Internship',
    color: '#f97316',
    points: [
      'Built responsive company website using React.js and JavaScript',
      'Followed industry-standard development practices and Git workflow',
      'Strengthened frontend skills through real-world project delivery',
    ],
  },
  {
    period: '2021 — 2025',
    role: 'B.Tech — Information Technology',
    org: 'CHARUSAT University',
    type: 'Education',
    color: '#22d3ee',
    points: [
      'CGPA: 8.1 / 10.0',
      'SSIP 2nd Runner\'s Up — Student Startup & Innovation Hackathon',
      'Training & Placement Representative for the department',
      'Central Council Member & AWS Cloud Club founding member',
    ],
  },
];

const typeColors = { 'Full-Time': '#9333ea', 'Internship': '#f97316', 'Education': '#22d3ee' };

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-label">03. EXPERIENCE</div>
        <h2 className="section-title-main">Professional <span>Journey</span></h2>

        <div className="exp-cards">
          {items.map((item, i) => (
            <div key={i} className="exp-card" style={{ '--ec': item.color }}>
              {/* Number */}
              <div className="exp-num">0{i + 1}</div>

              {/* Header */}
              <div className="exp-head">
                <div className="exp-left-meta">
                  <span className="exp-period">{item.period}</span>
                  <span className="exp-type-badge" style={{ background: typeColors[item.type] + '18', color: typeColors[item.type], borderColor: typeColors[item.type] + '40' }}>{item.type}</span>
                </div>
                <div className="exp-right-meta">
                  <div className="exp-role">{item.role}</div>
                  <div className="exp-org" style={{ color: item.color }}>{item.org}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="exp-divider" style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />

              {/* Points */}
              <ul className="exp-points">
                {item.points.map((p, j) => (
                  <li key={j}>
                    <span className="exp-bullet" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                    {p}
                  </li>
                ))}
              </ul>

              {/* Glow bg */}
              <div className="exp-glow" style={{ background: `radial-gradient(ellipse at 0% 50%, ${item.color}08 0%, transparent 60%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
