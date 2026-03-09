import React from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';

// Color palette matching your design
const colors = {
  accent: '#B87333',
  darkBg: '#0A0A0A',
  cardBg: '#141414',
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

export default function Footer() {
  const { footer } = useThemeConfig();
  const currentYear = new Date().getFullYear();

  // You can use the config data or hardcode your links
  const curriculumLinks = [
    { label: 'Introduction', link: '/docs/intro' },
    { label: 'Foundations', link: '/docs/part1-foundations/chapter1' },
    { label: 'ROS 2', link: '/docs/part2-ros2/chapter1' },
    { label: 'Modeling', link: '/docs/part3-robot-modeling/chapter1' }
  ];

  const resourceLinks = [
    { label: 'Documentation', link: '/docs' },
    { label: 'GitHub', link: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook' },
    { label: 'Community', link: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook/discussions' },
    { label: 'Updates', link: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook/releases' }
  ];

  return (
    <footer style={{
      backgroundColor: colors.darkBg,
      padding: '60px 40px 30px',
      borderTop: `1px solid ${colors.border}`,
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Brand Section */}
        <div>
          <h4 style={{ 
            ...typography.subheading, 
            color: colors.text, 
            marginBottom: '20px', 
            fontSize: '18px' 
          }}>
            Physical AI
          </h4>
          <p style={{ 
            ...typography.body, 
            color: colors.textSecondary, 
            fontSize: '14px', 
            lineHeight: '1.7' 
          }}>
            Open-source education for the next generation of robotics engineers.
          </p>
        </div>

        {/* Curriculum Section */}
        <div>
          <h4 style={{ 
            ...typography.subheading, 
            color: colors.text, 
            marginBottom: '20px', 
            fontSize: '16px' 
          }}>
            Curriculum
          </h4>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0 
          }}>
            {curriculumLinks.map(item => (
              <li key={item.label} style={{ marginBottom: '10px' }}>
                <Link 
                  to={item.link} 
                  style={{ 
                    ...typography.body, 
                    color: colors.textSecondary, 
                    textDecoration: 'none', 
                    fontSize: '14px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.textSecondary;
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4 style={{ 
            ...typography.subheading, 
            color: colors.text, 
            marginBottom: '20px', 
            fontSize: '16px' 
          }}>
            Resources
          </h4>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0 
          }}>
            {resourceLinks.map(item => (
              <li key={item.label} style={{ marginBottom: '10px' }}>
                {item.link.startsWith('http') ? (
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      ...typography.body, 
                      color: colors.textSecondary, 
                      textDecoration: 'none', 
                      fontSize: '14px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.textSecondary;
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    to={item.link}
                    style={{ 
                      ...typography.body, 
                      color: colors.textSecondary, 
                      textDecoration: 'none', 
                      fontSize: '14px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.textSecondary;
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
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
        © {currentYear} Physical AI & Humanoid Robotics Textbook. Open source and free forever.
      </div>
    </footer>
  );
}