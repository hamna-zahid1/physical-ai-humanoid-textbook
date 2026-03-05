---
sidebar_position: 2
---

# URDF and Robot Description

## Overview

The Unified Robot Description Format (URDF) is the standard way to describe robot models in ROS. This chapter covers the complete syntax and best practices for creating accurate, functional robot descriptions that work seamlessly with ROS tools and simulation environments.

## URDF Structure and Syntax

### Basic Robot Declaration

Every URDF file begins with a robot declaration:

```xml
<?xml version="1.0"?>
<robot name="my_robot" xmlns:xacro="http://www.ros.org/wiki/xacro">
  <!-- Links and joints go here -->
</robot>
```

The robot element requires a name attribute and can include additional attributes like version.

### Link Elements

Links represent rigid bodies in the robot:

```xml
<link name="base_link">
  <!-- Optional: visual representation -->
  <visual>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <geometry>
      <box size="0.5 0.5 0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 1 1"/>
    </material>
  </visual>

  <!-- Optional: collision geometry -->
  <collision>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <geometry>
      <box size="0.5 0.5 0.2"/>
    </geometry>
  </collision>

  <!-- Required for dynamics: inertial properties -->
  <inertial>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <mass value="1.0"/>
    <inertia ixx="0.1" ixy="0.0" ixz="0.0"
             iyy="0.1" iyz="0.0" izz="0.1"/>
  </inertial>
</link>
```

#### Visual Elements

Visual elements define how the robot appears in visualization tools:

- **Origin**: Position and orientation offset from the link frame
- **Geometry**: Shape definition (box, cylinder, sphere, mesh)
- **Material**: Color and texture information

#### Collision Elements

Collision elements define shapes for collision detection:

- **Simplification**: Often simpler than visual geometry for performance
- **Multiple shapes**: Can include multiple collision elements per link
- **Offset**: Can be positioned differently from visual elements

#### Inertial Elements

Inertial elements are crucial for dynamics simulation:

- **Mass**: Scalar mass value
- **Inertia matrix**: 6 values representing the symmetric 3x3 inertia matrix
- **Origin**: Offset for inertial calculations

### Joint Elements

Joints connect links and define their relative motion:

```xml
<joint name="joint1" type="revolute">
  <parent link="base_link"/>
  <child link="link1"/>
  <origin xyz="0 0 0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-3.14" upper="3.14" effort="100" velocity="1"/>
  <dynamics damping="0.1" friction="0.0"/>
</joint>
```

#### Joint Types

- **revolute**: Rotational joint with 1 DOF, limited range
- **continuous**: Rotational joint with 1 DOF, unlimited range
- **prismatic**: Linear sliding joint with 1 DOF
- **fixed**: No movement, connects two links rigidly
- **floating**: 6 DOF, typically for base of floating-base robots
- **planar**: 3 DOF, constrained to planar motion

#### Joint Properties

- **Parent/Child**: Defines the kinematic chain
- **Origin**: Position and orientation of joint frame
- **Axis**: Direction of joint motion
- **Limits**: Range, effort, and velocity constraints
- **Dynamics**: Damping and friction parameters

## Advanced URDF Features

### Transmission Elements

Transmissions define how actuators connect to joints:

```xml
<transmission name="tran1">
  <type>transmission_interface/SimpleTransmission</type>
  <joint name="joint1">
    <hardwareInterface>hardware_interface/EffortJointInterface</hardwareInterface>
  </joint>
  <actuator name="motor1">
    <hardwareInterface>hardware_interface/EffortJointInterface</hardwareInterface>
    <mechanicalReduction>1</mechanicalReduction>
  </actuator>
</transmission>
```

### Gazebo Extensions

Gazebo-specific properties can be added to URDF:

```xml
<gazebo reference="link_name">
  <mu1>0.2</mu1>
  <mu2>0.2</mu2>
  <material>Gazebo/Blue</material>
  <turnGravityOff>false</turnGravityOff>
</gazebo>

<!-- Plugins -->
<gazebo>
  <plugin name="diff_drive" filename="libgazebo_ros_diff_drive.so">
    <left_joint>left_wheel_joint</left_joint>
    <right_joint>right_wheel_joint</right_joint>
    <wheel_separation>0.3</wheel_separation>
    <wheel_diameter>0.15</wheel_diameter>
  </plugin>
</gazebo>
```

### Sensors

Sensors can be attached to links:

```xml
<gazebo reference="camera_link">
  <sensor name="camera" type="camera">
    <pose>0 0 0 0 0 0</pose>
    <camera name="head_camera">
      <horizontal_fov>1.089</horizontal_fov>
      <image>
        <width>640</width>
        <height>480</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.1</near>
        <far>100</far>
      </clip>
    </camera>
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so"/>
  </sensor>
</gazebo>
```

## Xacro Macros and Best Practices

### Xacro Basics

Xacro allows for parameterization and macro definitions:

```xml
<?xml version="1.0"?>
<robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="robot">

  <!-- Properties -->
  <xacro:property name="robot_width" value="0.3"/>
  <xacro:property name="robot_length" value="0.5"/>

  <!-- Math operations -->
  <xacro:property name="half_width" value="${robot_width/2}"/>

  <!-- Macro definition -->
  <xacro:macro name="wheel" params="prefix parent xyz *origin">
    <joint name="${prefix}_joint" type="continuous">
      <xacro:insert_block name="origin"/>
      <parent link="${parent}"/>
      <child link="${prefix}_link"/>
      <axis xyz="0 1 0"/>
    </joint>

    <link name="${prefix}_link">
      <visual>
        <geometry>
          <cylinder radius="0.05" length="0.05"/>
        </geometry>
      </visual>
      <collision>
        <geometry>
          <cylinder radius="0.05" length="0.05"/>
        </geometry>
      </collision>
      <inertial>
        <mass value="0.1"/>
        <inertia ixx="0.001" ixy="0" ixz="0" iyy="0.001" iyz="0" izz="0.001"/>
      </inertial>
    </link>
  </xacro:macro>

  <!-- Using the macro -->
  <xacro:wheel prefix="front_left" parent="base_link" xyz="0.2 0.1 0">
    <origin xyz="0.2 0.1 0" rpy="0 0 0"/>
  </xacro:wheel>

</robot>
```

### Best Practices

#### File Organization

- Split complex robots into multiple files
- Use xacro:include to combine parts
- Maintain a clear hierarchy (base, arms, sensors, etc.)

#### Naming Conventions

- Use descriptive names with prefixes/suffixes
- Consistent casing (snake_case recommended)
- Logical relationship between joint and link names

#### Inertial Properties

- Calculate using CAD software when possible
- Ensure positive definite inertia matrices
- Verify with simulation validation

## Validation and Debugging

### URDF Validation Tools

```bash
# Check URDF syntax
check_urdf my_robot.urdf

# Display robot information
urdf_to_graphiz my_robot.urdf
```

### RViz Visualization

Load the robot model in RViz to visualize the kinematic structure and verify joint limits.

### TF Frames

Use `tf2_tools` to visualize the transform tree and ensure proper frame relationships.

## Common Pitfalls

### Inertial Issues

- Invalid inertia matrices (not positive definite)
- Incorrect center of mass offsets
- Mass values that are too small/large

### Joint Configuration

- Over-constrained systems
- Incorrect joint axis directions
- Missing joint limits for revolute joints

### Geometry Problems

- Self-collisions in home position
- Misaligned visual and collision geometries
- Missing geometries causing errors

## Integration with ROS Tools

### Robot State Publisher

The robot_state_publisher node broadcasts transforms for the robot's kinematic structure based on joint states.

### MoveIt Integration

Proper URDF is essential for MoveIt's motion planning capabilities, including collision checking and inverse kinematics.

### Simulation

Accurate URDF ensures realistic simulation behavior in Gazebo and other physics engines.

Creating accurate and efficient URDF models is fundamental to successful robot development, enabling proper visualization, simulation, and control of robotic systems.