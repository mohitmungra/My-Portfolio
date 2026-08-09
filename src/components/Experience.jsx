import './Experience.css';

const timeline = [
  {
    date: 'Dec 2024 — Present',
    type: 'work',
    role: 'Digital Engineer',
    org: 'MosChip Technologies Limited',
    color: '#00f0ff',
    points: [
      'BSP validation including DDR RAM memory testing (21 structured test cases) and embedded protocol validation on Raspberry Pi',
      'Built AI evaluation framework using DeepEval for automated LLM response assessment — relevancy, faithfulness, contextual precision',
      'Developing automation frameworks for Bluetooth, Wi-Fi, and web application testing',
      'Working with embedded systems (ESP32, Raspberry Pi CM4) and industrial IoT platforms',
      'Protocol-based testing including OCPP, MQTT, Modbus TCP/IP, OPC UA, and Azure IoT',
    ],
  },
  {
    date: 'May 2023 — Jun 2023',
    type: 'intern',
    role: 'Frontend Developer (Intern)',
    org: 'Miracle Technolabs',
    color: '#7b2fff',
    points: [
      'Built responsive company website using React.js and JavaScript',
      'Strengthened frontend skills through real-world project implementation',
      'Followed industry-standard development practices and version control with Git',
    ],
  },
  {
    date: '2021 — 2025',
    type: 'edu',
    role: 'Bachelor of Technology — Information Technology',
    org: 'CHARUSAT University',
    color: '#00ff88',
    points: [
      'CGPA: 8.1 / 10.0',
      'SSIP 2nd Runner\'s Up — Student Startup & Innovation Hackathon',
      'Training & Placement Representative',
      'Central Council Member & AWS Cloud Club Founder Member',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience section-content">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span>
          Professional Journey
        </h2>

        <div className="timeline">
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item">
              {/* Node */}
              <div className="timeline-node" style={{ '--node-color': item.color }}>
                <div className="node-dot" />
                <div className="node-ring" />
              </div>

              {/* Content */}
              <div className="timeline-card glass-card" style={{ '--card-accent': item.color }}>
                <div className="timeline-meta">
                  <span className="timeline-date" style={{ color: item.color, borderColor: item.color + '40' }}>
                    {item.date}
                  </span>
                  <span className={`timeline-type type-${item.type}`}>
                    {item.type === 'work' ? 'Full-Time' : item.type === 'intern' ? 'Internship' : 'Education'}
                  </span>
                </div>

                <h3 className="timeline-role">{item.role}</h3>
                <h4 className="timeline-org" style={{ color: item.color }}>{item.org}</h4>

                <ul className="timeline-points">
                  {item.points.map((pt, j) => (
                    <li key={j}>
                      <span className="point-bullet" style={{ background: item.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
