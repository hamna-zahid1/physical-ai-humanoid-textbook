import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar for the Physical AI & Humanoid Robotics textbook
  textbookSidebar: [
    'intro',
    'index',
    {
      type: 'category',
      label: 'Part 1: Foundations',
      items: [
        'part1-foundations/chapter1',
        'part1-foundations/chapter2',
        'part1-foundations/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 2: ROS 2',
      items: [
        'part2-ros2/chapter1',
        'part2-ros2/chapter2',
        'part2-ros2/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 3: Robot Modeling',
      items: [
        'part3-robot-modeling/chapter1',
        'part3-robot-modeling/chapter2',
        'part3-robot-modeling/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 4: Digital Twin Simulation',
      items: [
        'part4-digital-twin-simulation/chapter1',
        'part4-digital-twin-simulation/chapter2',
        'part4-digital-twin-simulation/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 5: NVIDIA Isaac',
      items: [
        'part5-nvidia-isaac/chapter1',
        'part5-nvidia-isaac/chapter2',
        'part5-nvidia-isaac/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 6: VLA Systems',
      items: [
        'part6-vla-systems/chapter1',
        'part6-vla-systems/chapter2',
        'part6-vla-systems/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 7: Conversational Robotics',
      items: [
        'part7-conversational-robotics/chapter1',
        'part7-conversational-robotics/chapter2',
        'part7-conversational-robotics/chapter3'
      ],
    },
    {
      type: 'category',
      label: 'Part 8: Humanoid Robot Development',
      items: [
        'part8-humanoid-robot-development/chapter1',
        'part8-humanoid-robot-development/chapter2',
        'part8-humanoid-robot-development/chapter3'
      ],
    },
  ],
};

export default sidebars;
