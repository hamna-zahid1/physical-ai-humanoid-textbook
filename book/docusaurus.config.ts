import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Master Embodied Intelligence',
  favicon: 'img/icon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://physical-ai-humanoid-textbook.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hamna-zahid1', // Usually your GitHub org/user name.
  projectName: 'physical-ai-humanoid-textbook', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    
    // Add colorMode configuration here
    colorMode: {
      // Disable the theme switch button
      disableSwitch: true,
      // Set default mode to dark (matching your design)
      defaultMode: 'dark',
      // Don't respect user's system preference
      respectPrefersColorScheme: false,
    },
    
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI & Humanoid Robotics Logo',
        src: 'img/icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'textbookSidebar',
          position: 'left',
          label: 'Textbook',
        },
        {
          href: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // Brand/About section - This will be the first column
        {
          title: 'Physical AI',
          items: [
            {
              html: 'Open-source education for the next generation of robotics engineers.',
            },
          ],
        },
        // Curriculum section
        {
          title: 'Curriculum',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Foundations', to: '/docs/part1-foundations/chapter1' },
            { label: 'ROS 2', to: '/docs/part2-ros2/chapter1' },
            { label: 'Modeling', to: '/docs/part3-robot-modeling/chapter1' },
          ],
        },
        // Resources section
        {
          title: 'Resources',
          items: [
            { label: 'Documentation', to: '/docs' },
            { 
              label: 'GitHub', 
              href: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook' 
            },
            { 
              label: 'Community', 
              href: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook/discussions' 
            },
            { 
              label: 'Updates', 
              href: 'https://github.com/hamna-zahid1/physical-ai-humanoid-textbook/releases' 
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Open source and free forever.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;