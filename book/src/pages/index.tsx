import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link

// Color palette - refined for minimalist aesthetic
const colors = {
  accent: '#B87333', // Slightly warmer copper tone
  darkBg: '#0A0A0A', // Deeper, richer black
  cardBg: '#141414', // Slightly lighter than background
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#2A2A2A',
  gradientStart: '#141414',
  gradientEnd: '#0A0A0A'
};

// Typography styles
const typography = {
  heading: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 700,
    letterSpacing: '-0.02em'
  },
  body: {
    fontFamily: '"Georgia", serif',
    fontWeight: 400,
    lineHeight: 1.7
  },
  subheading: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    letterSpacing: '-0.01em'
  }
};

// Modernized icons with better design
const IconWrapper = ({ children, label }) => (
  <div style={{
    width: '48px',
    height: '48px',
    background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}10)`,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${colors.accent}30`,
    color: colors.accent,
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: '"Montserrat", sans-serif',
    transition: 'all 0.3s ease'
  }}>
    {children || label}
  </div>
);

const Icon1 = () => <IconWrapper label="AI" />;
const Icon2 = () => <IconWrapper label="ROS" />;
const Icon3 = () => <IconWrapper label="MDL" />;
const Icon4 = () => <IconWrapper label="SIM" />;
const Icon5 = () => <IconWrapper label="ISA" />;
const Icon6 = () => <IconWrapper label="VLA" />;

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      backgroundColor: scrolled ? colors.darkBg : 'transparent',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        color: colors.text,
        ...typography.heading,
        fontSize: '24px'
      }}>
        <span style={{ color: colors.accent, marginRight: '8px' }}>◈</span>
        Physical AI
      </div>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <Link to="/docs/intro" style={{ color: colors.textSecondary, textDecoration: 'none', ...typography.subheading, fontSize: '14px' }}>Curriculum</Link>
        <Link to="/docs" style={{ color: colors.textSecondary, textDecoration: 'none', ...typography.subheading, fontSize: '14px' }}>Resources</Link>
        <a href="https://github.com/hamna-zahid1/physical-ai-humanoid-textbook" target="_blank" rel="noopener noreferrer" style={{ color: colors.textSecondary, textDecoration: 'none', ...typography.subheading, fontSize: '14px' }}>Community</a>
        <Link to="/docs/part1-foundations/chapter1" style={{
          backgroundColor: 'transparent',
          color: colors.accent,
          border: `1px solid ${colors.accent}`,
          padding: '10px 24px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '14px',
          ...typography.subheading,
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          ':hover': {
            backgroundColor: colors.accent,
            color: colors.darkBg
          }
        }}>
          Start Reading
        </Link>
      </div>
    </nav>
  );
};

const HeroSection = () => (
  <section style={{
    background: `radial-gradient(circle at 50% 50%, ${colors.gradientStart}, ${colors.gradientEnd})`,
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 20px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Subtle animated background elements */}
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '300px',
      height: '300px',
      background: `radial-gradient(circle, ${colors.accent}10, transparent 70%)`,
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'pulse 8s ease-in-out infinite'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '20%',
      right: '10%',
      width: '400px',
      height: '400px',
      background: `radial-gradient(circle, ${colors.accent}15, transparent 70%)`,
      borderRadius: '50%',
      filter: 'blur(80px)',
      animation: 'pulse 12s ease-in-out infinite reverse'
    }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
      <div style={{
        backgroundColor: colors.accent + '10',
        color: colors.accent,
        padding: '8px 20px',
        borderRadius: '30px',
        fontSize: '14px',
        marginBottom: '30px',
        display: 'inline-block',
        ...typography.subheading,
        border: `1px solid ${colors.accent}20`
      }}>
        Interactive Textbook • Free & Open Source
      </div>
      <h1 style={{
        ...typography.heading,
        fontSize: 'clamp(48px, 8vw, 72px)',
        color: colors.text,
        marginBottom: '30px',
        lineHeight: '1.1'
      }}>
        Master Physical AI and<br />Humanoid Robotics
      </h1>
      <p style={{
        ...typography.body,
        fontSize: '20px',
        color: colors.textSecondary,
        marginBottom: '50px',
        maxWidth: '700px',
        margin: '0 auto 50px'
      }}>
        Dive deep into the core concepts of AI, robotics, and advanced control systems.
        From foundational principles to cutting-edge humanoid development.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/docs/intro" style={{
          backgroundColor: colors.accent,
          color: colors.darkBg,
          border: 'none',
          padding: '16px 36px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '16px',
          ...typography.subheading,
          fontWeight: 600,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 20px 30px ${colors.accent}30`
          }
        }}>
          Start Reading
        </Link>
        <Link to="/docs" style={{
          backgroundColor: 'transparent',
          color: colors.text,
          border: `1px solid ${colors.border}`,
          padding: '16px 36px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '16px',
          ...typography.subheading,
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': {
            borderColor: colors.accent,
            color: colors.accent
          }
        }}>
          View Contents
        </Link>
      </div>
    </div>
  </section>
);

const StatsRow = () => (
  <section style={{
    backgroundColor: colors.cardBg,
    padding: '80px 20px',
    borderTop: `1px solid ${colors.border}`,
    borderBottom: `1px solid ${colors.border}`
  }}>
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '40px'
    }}>
      {[
        { number: '8', label: 'Comprehensive Parts' },
        { number: '40+', label: 'Detailed Chapters' },
        { number: '100%', label: 'Free & Open' }
      ].map((stat, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <h2 style={{
            ...typography.heading,
            fontSize: '56px',
            color: colors.accent,
            marginBottom: '10px',
            lineHeight: 1
          }}>{stat.number}</h2>
          <p style={{
            ...typography.body,
            fontSize: '18px',
            color: colors.textSecondary
          }}>{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        flex: '1 1 30%',
        minWidth: '280px',
        padding: '20px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        backgroundColor: colors.cardBg,
        padding: '40px 30px',
        borderRadius: '20px',
        border: `1px solid ${isHovered ? colors.accent + '40' : colors.border}`,
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'none',
        boxShadow: isHovered ? `0 30px 40px -20px ${colors.accent}40` : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: '25px',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          {icon}
        </div>
        <h3 style={{
          ...typography.subheading,
          fontSize: '22px',
          fontWeight: 600,
          marginBottom: '15px',
          color: isHovered ? colors.accent : colors.text
        }}>{title}</h3>
        <p style={{
          ...typography.body,
          fontSize: '16px',
          color: colors.textSecondary,
          lineHeight: '1.7'
        }}>{description}</p>
      </div>
    </div>
  );
};

const WhatYoullMasterSection = () => {
  const features = [
    { icon: <Icon1 />, title: 'Core AI Concepts', description: 'Machine learning fundamentals, neural networks, and deep learning architectures explained.' },
    { icon: <Icon2 />, title: 'ROS 2 Mastery', description: 'Build complex robotic applications using the latest Robot Operating System.' },
    { icon: <Icon3 />, title: 'Robot Modeling', description: 'Kinematics, dynamics, and control theories for robot design.' },
    { icon: <Icon4 />, title: 'Simulation', description: 'Create digital twins for testing before physical deployment.' },
    { icon: <Icon5 />, title: 'NVIDIA Isaac', description: 'Advanced simulation for synthetic data and AI training.' },
    { icon: <Icon6 />, title: 'VLA Systems', description: 'Vision-Language-Action models for human-robot interaction.' },
  ];

  return (
    <section style={{ backgroundColor: colors.darkBg, padding: '100px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          ...typography.heading,
          fontSize: '48px',
          color: colors.text,
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          What You'll Master
        </h2>
        <p style={{
          ...typography.body,
          fontSize: '18px',
          color: colors.textSecondary,
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          A comprehensive curriculum designed for deep understanding
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '-20px'
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CurriculumCard = ({ title, description, link, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        flex: '1 1 23%',
        minWidth: '240px',
        padding: '15px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        backgroundColor: colors.cardBg,
        padding: '30px',
        borderRadius: '16px',
        border: `1px solid ${isHovered ? colors.accent + '30' : colors.border}`,
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: colors.accent + '10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          color: colors.accent,
          ...typography.subheading,
          fontSize: '18px'
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 style={{
          ...typography.subheading,
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '12px',
          color: colors.text
        }}>{title}</h3>
        <p style={{
          ...typography.body,
          fontSize: '15px',
          color: colors.textSecondary,
          lineHeight: '1.6',
          marginBottom: '20px',
          flex: 1
        }}>{description}</p>
        <Link
          to={link}
          style={{
            color: isHovered ? colors.accent : colors.textSecondary,
            textDecoration: 'none',
            ...typography.subheading,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.3s ease'
          }}
        >
          Explore Part
          <span style={{ fontSize: '18px', transition: 'transform 0.3s ease', transform: isHovered ? 'translateX(4px)' : 'none' }}>→</span>
        </Link>
      </div>
    </div>
  );
};

const CompleteCurriculumSection = () => {
  const curriculumParts = [
    { title: 'Foundations', description: 'Core AI and robotics principles.', link: '/docs/part1-foundations/chapter1' },
    { title: 'ROS 2', description: 'Building robotic systems with ROS 2.', link: '/docs/part2-ros2/chapter1' },
    { title: 'Robot Modeling', description: 'Kinematics, dynamics, and control.', link: '/docs/part3-robot-modeling/chapter1' },
    { title: 'Digital Twin', description: 'Virtual environments for testing.', link: '/docs/part4-digital-twin-simulation/chapter1' },
    { title: 'NVIDIA Isaac', description: 'Advanced simulation for AI.', link: '/docs/part5-nvidia-isaac/chapter1' },
    { title: 'VLA Systems', description: 'Vision-Language-Action integration.', link: '/docs/part6-vla-systems/chapter1' },
    { title: 'Conversational AI', description: 'Natural human-robot dialogue.', link: '/docs/part7-conversational-robotics/chapter1' },
    { title: 'Humanoid Dev', description: 'Building humanoid robots.', link: '/docs/part8-humanoid-robot-development/chapter1' },
  ];

  return (
    <section style={{ backgroundColor: colors.cardBg, padding: '100px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          ...typography.heading,
          fontSize: '48px',
          color: colors.text,
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Complete Curriculum
        </h2>
        <p style={{
          ...typography.body,
          fontSize: '18px',
          color: colors.textSecondary,
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          Eight comprehensive parts taking you from fundamentals to mastery
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '-15px'
        }}>
          {curriculumParts.map((part, index) => (
            <CurriculumCard key={index} index={index} {...part} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, author, role }) => (
  <div style={{
    flex: '1 1 30%',
    minWidth: '280px',
    padding: '20px'
  }}>
    <div style={{
      backgroundColor: colors.cardBg,
      padding: '35px',
      borderRadius: '20px',
      border: `1px solid ${colors.border}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '25px' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: colors.accent, fontSize: '16px', marginRight: '4px' }}>★</span>
        ))}
      </div>
      <p style={{
        ...typography.body,
        fontSize: '16px',
        color: colors.text,
        lineHeight: '1.8',
        marginBottom: '25px',
        flex: 1,
        fontStyle: 'italic'
      }}>
        "{quote}"
      </p>
      <div>
        <p style={{
          ...typography.subheading,
          fontSize: '16px',
          fontWeight: 600,
          color: colors.text,
          marginBottom: '4px'
        }}>{author}</p>
        <p style={{
          ...typography.body,
          fontSize: '14px',
          color: colors.accent
        }}>{role}</p>
      </div>
    </div>
  </div>
);

const ExpertsSaySection = () => {
  const testimonials = [
    { quote: 'The most comprehensive resource on Physical AI. Accelerated my learning significantly.', author: 'Dr. Evelyn Reed', role: 'AI Research Lead' },
    { quote: 'Complex topics made accessible through clear explanations. Essential for robotics engineers.', author: 'Prof. Kenji Tanaka', role: 'Robotics Professor' },
    { quote: 'Finally, a free resource covering the entire spectrum of humanoid robotics development.', author: 'Maria Garcia', role: 'Lead Developer' },
  ];

  return (
    <section style={{ backgroundColor: colors.darkBg, padding: '100px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          ...typography.heading,
          fontSize: '48px',
          color: colors.text,
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          Trusted by Experts
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '-20px'
        }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => (
  <section style={{
    background: `linear-gradient(135deg, ${colors.cardBg}, ${colors.darkBg})`,
    padding: '120px 20px',
    textAlign: 'center',
    borderTop: `1px solid ${colors.border}`
  }}>
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{
        ...typography.heading,
        fontSize: '56px',
        color: colors.text,
        marginBottom: '30px',
        lineHeight: 1.2
      }}>
        Ready to Master<br />Physical AI?
      </h2>
      <p style={{
        ...typography.body,
        fontSize: '20px',
        color: colors.textSecondary,
        marginBottom: '50px'
      }}>
        Join thousands of developers building the future of robotics.
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/docs/intro" style={{
          backgroundColor: colors.accent,
          color: colors.darkBg,
          border: 'none',
          padding: '18px 42px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '16px',
          ...typography.subheading,
          fontWeight: 600,
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 20px 30px ${colors.accent}30`
          }
        }}>
          Start Learning Now
        </Link>
        <Link to="/docs" style={{
          backgroundColor: 'transparent',
          color: colors.text,
          border: `1px solid ${colors.border}`,
          padding: '18px 42px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '16px',
          ...typography.subheading,
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': {
            borderColor: colors.accent,
            color: colors.accent
          }
        }}>
          View Curriculum
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{
    backgroundColor: colors.darkBg,
    padding: '60px 40px 30px',
    borderTop: `1px solid ${colors.border}`
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      marginBottom: '40px'
    }}>
      <div>
        <h4 style={{ ...typography.subheading, color: colors.text, marginBottom: '20px', fontSize: '18px' }}>Physical AI</h4>
        <p style={{ ...typography.body, color: colors.textSecondary, fontSize: '14px', lineHeight: '1.7' }}>
          Open-source education for the next generation of robotics engineers.
        </p>
      </div>
      <div>
        <h4 style={{ ...typography.subheading, color: colors.text, marginBottom: '20px', fontSize: '16px' }}>Curriculum</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[
            { label: 'Introduction', link: '/docs/intro' },
            { label: 'Foundations', link: '/docs/part1-foundations/chapter1' },
            { label: 'ROS 2', link: '/docs/part2-ros2/chapter1' },
            { label: 'Modeling', link: '/docs/part3-robot-modeling/chapter1' }
          ].map(item => (
            <li key={item.label} style={{ marginBottom: '10px' }}>
              <Link to={item.link} style={{ ...typography.body, color: colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 style={{ ...typography.subheading, color: colors.text, marginBottom: '20px', fontSize: '16px' }}>Resources</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[
            { label: 'Documentation', link: '/docs' },
            { label: 'GitHub', link: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook' },
            { label: 'Community', link: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook/discussions' },
            { label: 'Updates', link: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook/releases' }
          ].map(item => (
            <li key={item.label} style={{ marginBottom: '10px' }}>
              <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ ...typography.body, color: colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: '30px',
      borderTop: `1px solid ${colors.border}`,
      textAlign: 'center',
      ...typography.body,
      fontSize: '14px',
      color: colors.textSecondary
    }}>
      © {new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Open source and free forever.
    </div>
  </footer>
);

// --- Main Page Component ---

export default function Home() {
  return (
    <div style={{
      backgroundColor: colors.darkBg,
      color: colors.text,
      scrollBehavior: 'smooth',
      minHeight: '100vh'
    }}>
      <Navbar />
      <HeroSection />
      <StatsRow />
      <WhatYoullMasterSection />
      <CompleteCurriculumSection />
      <ExpertsSaySection />
      <CtaSection />
      <Footer />
      
      {/* Add keyframe animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: 'Georgia', serif;
        }
        
        button {
          cursor: pointer;
        }
        
        button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}