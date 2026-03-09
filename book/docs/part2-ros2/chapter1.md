---
sidebar_position: 1
---

# Chapter 4: Introduction to Physical AI & Humanoid Robotics

## Overview

Robot Operating System 2 (ROS 2) represents a major evolution from ROS 1, addressing scalability, real-time performance, and industrial deployment requirements. This chapter covers the fundamental architectural concepts and components that make ROS 2 suitable for complex physical AI systems.

## ROS 2 vs ROS 1: Key Differences

ROS 2 was designed to overcome the limitations of ROS 1:

### Middleware Abstraction

ROS 2 introduces the Data Distribution Service (DDS) middleware abstraction layer, allowing users to choose from various DDS implementations (Fast DDS, Cyclone DDS, RTI Connext DDS). This provides better real-time performance and determinism compared to ROS 1's TCPROS/UDPROS transport protocols.

### Quality of Service (QoS) Settings

QoS profiles allow fine-tuning communication characteristics:

- **Reliability**: Reliable (acknowledged delivery) or Best Effort (no acknowledgment)
- **Durability**: Transient Local (store messages for late joiners) or Volatile (only deliver new messages)
- **History**: Keep All (store all messages) or Keep Last (store only recent messages)
- **Deadline**: Maximum interval between consecutive messages
- **Liveliness**: How to determine if a publisher is alive

### Improved Security

ROS 2 includes native support for authentication, encryption, and access control, making it suitable for deployment in sensitive environments.

## Core Concepts

### Nodes

Nodes are processes that perform computation. In ROS 2, nodes are implemented as instances of the rclcpp::Node or rclpy.Node class. Each node encapsulates functionality and communicates with other nodes through topics, services, and actions.

### Topics and Publishers/Subscribers

Topics enable asynchronous, many-to-many communication using a publish-subscribe pattern:

```cpp
// Publisher example
auto publisher = this->create_publisher<std_msgs::msg::String>("topic", 10);

// Subscriber example
auto subscription = this->create_subscription<std_msgs::msg::String>(
    "topic", 10,
    std::bind(&MinimalSubscriber::topic_callback, this, _1));
```

### Services and Clients

Services provide synchronous, request-response communication:

```cpp
// Service server
auto service = this->create_service<example_interfaces::srv::AddTwoInts>(
    "add_two_ints",
    std::bind(&MinimalService::add, this, std::placeholders::_1, std::placeholders::_2));

// Service client
auto client = this->create_client<example_interfaces::srv::AddTwoInts>("add_two_ints");
```

### Actions

Actions support long-running tasks with feedback and goal management:

```cpp
// Action server
auto action_server = rclcpp_action::create_server<example_interfaces::action::Fibonacci>(
    this->get_node_base_interface(),
    this->get_node_clock_interface(),
    this->get_node_logging_interface(),
    this->get_node_waitables_interface(),
    "fibonacci",
    std::bind(&FibonacciActionServer::handle_goal, this, _1, _2),
    std::bind(&FibonacciActionServer::handle_cancel, this, _1),
    std::bind(&FibonacciActionServer::handle_accepted, this, _1));
```

## Package Management

ROS 2 uses the colcon build system instead of catkin_make:

### Creating Packages

```bash
# C++ package
ros2 pkg create --build-type ament_cmake <package_name>

# Python package
ros2 pkg create --build-type ament_python <package_name>
```

### Package.xml

The package.xml file defines metadata, dependencies, and maintainers:

```xml
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>tutorial_pkg</name>
  <version>0.0.0</version>
  <description>Tutorials package</description>
  <maintainer email="user@example.com">User Name</maintainer>
  <license>Apache License 2.0</license>

  <depend>rclcpp</depend>
  <depend>std_msgs</depend>

  <test_depend>ament_lint_auto</test_depend>
  <test_depend>ament_lint_common</test_depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```

## Launch Files

ROS 2 uses Python-based launch files instead of XML:

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='demo_nodes_cpp',
            executable='talker',
            name='minimal_publisher',
        ),
        Node(
            package='demo_nodes_cpp',
            executable='listener',
            name='minimal_subscriber',
        )
    ])
```

## Lifecycle Nodes

ROS 2 introduces lifecycle nodes for managing complex robot systems with well-defined state transitions:

- Unconfigured → Inactive → Active → Finalized
- Enables coordinated startup, shutdown, and error recovery

## Time Management

ROS 2 provides unified time handling:

- **ROS Time**: Monotonic time that can be simulated
- **System Time**: Wall-clock time from the system
- **Sleep and Rate**: Time-based synchronization primitives

## Parameter System

Parameters in ROS 2 are dynamically typed and can be modified at runtime:

```cpp
this->declare_parameter("param_name", default_value);
rclcpp::Parameter param = this->get_parameter("param_name");
```

## TF2 (Transform Library)

TF2 manages coordinate transformations between different frames of reference, essential for robotics applications involving multiple sensors and moving parts.

## Best Practices

### Design Patterns

- Use composition over inheritance for node design
- Separate concerns between hardware abstraction and application logic
- Implement proper error handling and logging

### Performance Considerations

- Choose appropriate QoS settings for real-time requirements
- Use intra-process communication when possible
- Minimize message copying and serialization overhead

ROS 2 provides the foundation for building scalable, reliable robot applications that can handle the complexity of modern physical AI systems.
