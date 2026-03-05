---
sidebar_position: 2
---

# ROS 2 Communication Patterns and Message Types

## Overview

Effective communication between different components is crucial for robot systems. This chapter explores the various communication patterns available in ROS 2 and how to design efficient message types for different applications.

## Communication Patterns

### Publish-Subscribe (Topics)

The publish-subscribe pattern enables asynchronous, decoupled communication between nodes. Publishers send messages to topics without knowing who subscribes, and subscribers receive messages without knowing who publishes.

**Use Cases:**
- Sensor data distribution
- State broadcasting
- Event notifications

**Implementation Example:**
```cpp
// Publisher
auto publisher = this->create_publisher<sensor_msgs::msg::LaserScan>("scan", 10);

// Publishing data
sensor_msgs::msg::LaserScan scan_msg;
// ... populate scan_msg ...
publisher->publish(scan_msg);
```

**Best Practices:**
- Use appropriate QoS settings for your application (reliable vs best effort, transient vs volatile)
- Consider bandwidth limitations for high-frequency topics
- Use latching for static data that late joiners need

### Request-Response (Services)

Services provide synchronous, bidirectional communication for immediate responses to requests.

**Use Cases:**
- Configuration changes
- One-time computations
- Simple queries

**Implementation Example:**
```cpp
// Service call
auto client = this->create_client<example_interfaces::srv::SetBool>("toggle_led");
auto request = std::make_shared<example_interfaces::srv::SetBool::Request>();
request->data = true;

auto future = client->async_send_request(request);
```

**Best Practices:**
- Use services for operations that should complete quickly
- Avoid long-running operations in service callbacks
- Consider using actions for long-running tasks

### Goal-Oriented (Actions)

Actions manage long-running tasks with feedback and cancellation capabilities.

**Use Cases:**
- Navigation goals
- Manipulation tasks
- Calibration procedures

**Implementation Example:**
```cpp
// Action client
auto action_client = rclcpp_action::create_client<Fibonacci>("fibonacci");

// Sending goal
auto goal_msg = Fibonacci::Goal();
goal_msg.order = 10;

auto goal_handle_future = action_client->async_send_goal(goal_msg);
```

## Standard Message Types

ROS 2 provides a rich set of standard message types for common robotics applications:

### Sensor Messages

- **sensor_msgs**: Laser scans, camera images, IMU data, joint states
- **geometry_msgs**: Points, vectors, poses, twists
- **nav_msgs**: Occupancy grids, path planning results

### Robot-Specific Messages

- **control_msgs**: Joint trajectory commands, gripper control
- **trajectory_msgs**: Joint trajectories with timing information
- **moveit_msgs**: Motion planning and manipulation messages

### Custom Message Definition

Custom messages are defined in `.msg` files in the `msg/` directory of a package:

```
# JointCommand.msg
float64[] positions
float64[] velocities
float64[] efforts
uint8[] joint_names
```

After defining, rebuild the package to generate the message headers.

## Quality of Service (QoS) Configuration

QoS settings determine how messages are delivered:

### Reliability Policy
- **RMW_QOS_POLICY_RELIABILITY_RELIABLE**: Messages are guaranteed to be delivered
- **RMW_QOS_POLICY_RELIABILITY_BEST_EFFORT**: Messages may be dropped (useful for sensor data)

### Durability Policy
- **RMW_QOS_POLICY_DURABILITY_TRANSIENT_LOCAL**: Late joiners receive recent messages
- **RMW_QOS_POLICY_DURABILITY_VOLATILE**: Only new messages are delivered

### History Policy
- **RMW_QOS_POLICY_HISTORY_KEEP_LAST**: Store only the most recent messages
- **RMW_QOS_POLICY_HISTORY_KEEP_ALL**: Store all messages (use with caution)

### Depth Parameter
Controls how many messages to queue when using KEEP_LAST policy.

## Advanced Communication Techniques

### Namespaces and Remapping

Namespaces organize nodes and topics logically:

```cpp
// Create node with namespace
auto node = std::make_shared<rclcpp::Node>("node_name", "/robot1");
```

Remapping allows connecting nodes with different topic names:
```bash
ros2 run package_name node_name --ros-args --remap old_topic:=new_topic
```

### Composition

Node composition allows multiple nodes to run in the same process, reducing communication overhead:

```cpp
#include "rclcpp_components/register_node_macro.hpp"
#include "rclcpp_components/component_manager.hpp"

// Register component
RCLCPP_COMPONENTS_REGISTER_NODE(my_package::MinimalComposedNode)
```

### Intra-Process Communication

When nodes are composed in the same process, ROS 2 can optimize communication by passing data by reference instead of serialization:

```cpp
// Enable intra-process communication
auto options = rclcpp::NodeOptions()
  .use_intra_process_comms(true);
```

## Performance Optimization

### Message Design

- Minimize message size for high-frequency topics
- Use fixed-size arrays when possible
- Consider compression for large data like images

### Bandwidth Management

- Use appropriate data types (float32 vs float64)
- Throttle high-frequency publishers
- Use different QoS profiles for different data types

### Memory Management

- Pre-allocate message objects when possible
- Use message pools for frequently allocated messages
- Monitor memory usage for long-running systems

## Debugging Communication Issues

### Tools

- **ros2 topic**: Monitor and inspect topic data
- **ros2 node**: List and inspect nodes
- **ros2 bag**: Record and replay topic data
- **rqt_graph**: Visualize the node graph

### Common Issues

- Topic mismatches due to typos or namespaces
- QoS policy conflicts preventing communication
- Network configuration issues for multi-machine setups

Understanding these communication patterns and optimizing them for your specific application is crucial for building responsive and efficient robot systems.