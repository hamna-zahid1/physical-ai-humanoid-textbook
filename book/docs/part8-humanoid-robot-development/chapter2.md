---
sidebar_position: 2
---

# Humanoid Locomotion and Balance Control

## Overview

Humanoid locomotion represents one of the most complex challenges in robotics, requiring sophisticated control algorithms to maintain balance while achieving dynamic movement. This chapter explores the principles of bipedal walking, balance control strategies, and the integration of perception and control for stable humanoid locomotion.

## Bipedal Walking Fundamentals

### Walking Phases and Gait Cycle

#### Double and Single Support Phases
- **Double Support**: Both feet in contact with ground
- **Single Support**: One foot in contact, other swinging
- **Heel Strike**: Initial contact phase
- **Toe Off**: Propulsion phase

#### Gait Parameters
```python
class GaitAnalyzer:
    def __init__(self):
        self.parameters = {
            'stride_length': 0.6,  # meters
            'step_width': 0.2,     # meters
            'step_time': 0.8,      # seconds
            'duty_factor': 0.6,    # fraction of cycle in contact
            'walking_speed': 0.8   # m/s
        }

    def analyze_gait_phase(self, foot_positions, time):
        """Analyze current gait phase based on foot positions"""

        left_foot_contact = self._is_foot_in_contact(foot_positions['left'], 'ground')
        right_foot_contact = self._is_foot_in_contact(foot_positions['right'], 'ground')

        if left_foot_contact and right_foot_contact:
            return 'double_support'
        elif left_foot_contact and not right_foot_contact:
            return 'right_swing'
        elif not left_foot_contact and right_foot_contact:
            return 'left_swing'
        else:
            return 'flight'  # Both feet off ground (not typical for normal walking)

    def calculate_gait_metrics(self, trajectory_data):
        """Calculate key gait metrics from trajectory data"""

        stride_lengths = self._calculate_stride_lengths(trajectory_data)
        step_times = self._calculate_step_times(trajectory_data)
        cadence = len(step_times) / (max(trajectory_data['time']) - min(trajectory_data['time']))

        return {
            'mean_stride_length': np.mean(stride_lengths),
            'std_stride_length': np.std(stride_lengths),
            'mean_step_time': np.mean(step_times),
            'std_step_time': np.std(step_times),
            'cadence': cadence,
            'walking_speed': np.mean(stride_lengths) * cadence
        }
```

### Center of Mass (CoM) Dynamics

#### CoM Trajectory Planning
- **Inverted Pendulum Model**: Simplified balance model
- **Linear Inverted Pendulum**: Constant height assumption
- **Capture Point**: Location where CoM can be stopped
- **Divergent Component of Motion**: Instability analysis

#### Dynamic Balance Equations
```python
class CoMController:
    def __init__(self, robot_height, gravity=9.81):
        self.height = robot_height
        self.gravity = gravity
        self.omega = np.sqrt(gravity / robot_height)

    def calculate_capture_point(self, com_pos, com_vel):
        """Calculate the capture point for balance control"""
        cp_x = com_pos[0] + com_vel[0] / self.omega
        cp_y = com_pos[1] + com_vel[1] / self.omega

        return [cp_x, cp_y]

    def plan_com_trajectory(self, start_pos, goal_pos, duration, dt=0.01):
        """Plan CoM trajectory using 3rd order polynomial"""

        t = np.arange(0, duration, dt)

        # 3rd order polynomial: x(t) = a0 + a1*t + a2*t^2 + a3*t^3
        # With boundary conditions: pos(0)=start, pos(T)=goal, vel(0)=0, vel(T)=0

        a0 = start_pos
        a1 = 0
        a2 = 3 * (goal_pos - start_pos) / (duration**2)
        a3 = -2 * (goal_pos - start_pos) / (duration**3)

        trajectory = a0 + a1*t + a2*(t**2) + a3*(t**3)
        velocity = a1 + 2*a2*t + 3*a3*(t**2)
        acceleration = 2*a2 + 6*a3*t

        return trajectory, velocity, acceleration
```

## Balance Control Strategies

### Zero Moment Point (ZMP) Control

#### ZMP Fundamentals
The Zero Moment Point is the point where the net moment of the ground reaction force is zero:

```
ZMP_x = x - (h/g) * (ẍ + g*z_ddot)/z_ddot
ZMP_y = y - (h/g) * (ÿ + g*z_ddot)/z_ddot
```

Where (x,y,z) is the center of mass position, h is the CoM height, and g is gravity.

#### ZMP-Based Walking Pattern Generation
```python
class ZMPLocomotion:
    def __init__(self, com_height, gravity=9.81):
        self.com_height = com_height
        self.gravity = gravity
        self.omega = np.sqrt(gravity / com_height)

    def solve_dcm_equation(self, zmp_ref, init_pos, init_vel, t):
        """Solve the Divergent Component of Motion equation"""

        # DCM = CoM + CoM_dot/w (where w = sqrt(g/h))
        # DCM(t) = DCM(0)*exp(w*t) + (1 - exp(w*t))*ZMP_ref

        dcm_init = init_pos + init_vel / self.omega
        dcm_traj = dcm_init * np.exp(self.omega * t) + \
                  (1 - np.exp(self.omega * t)) * zmp_ref

        return dcm_traj

    def generate_footsteps(self, desired_velocity, turning_rate, step_time=0.8):
        """Generate footsteps based on desired velocity and turning"""

        # Calculate step locations
        step_length = desired_velocity * step_time
        step_width = 0.2  # nominal step width

        footsteps = []
        current_pos = [0, 0, 0]  # x, y, theta

        for i in range(10):  # Generate 10 steps ahead
            # Alternate feet
            if i % 2 == 0:  # Left foot
                foot_offset = [step_length/2, step_width/2, 0]
            else:  # Right foot
                foot_offset = [step_length/2, -step_width/2, 0]

            # Transform based on current orientation
            cos_theta = np.cos(current_pos[2])
            sin_theta = np.sin(current_pos[2])

            dx = foot_offset[0] * cos_theta - foot_offset[1] * sin_theta
            dy = foot_offset[0] * sin_theta + foot_offset[1] * cos_theta

            foot_pos = [
                current_pos[0] + dx,
                current_pos[1] + dy,
                current_pos[2] + turning_rate * step_time
            ]

            footsteps.append(foot_pos)

            # Update current position
            current_pos[0] += desired_velocity * step_time * np.cos(current_pos[2])
            current_pos[1] += desired_velocity * step_time * np.sin(current_pos[2])
            current_pos[2] += turning_rate * step_time

        return footsteps
```

### Whole-Body Control Approaches

#### Inverse Kinematics for Balance
```python
class WholeBodyBalanceController:
    def __init__(self, robot_model):
        self.model = robot_model
        self.kinematics = robot_model.kinematics

    def balance_ik(self, desired_com, desired_orientation, support_feet):
        """Solve inverse kinematics for balance maintenance"""

        # Define optimization problem
        # Minimize deviation from desired CoM and orientation
        # Subject to support polygon constraints

        def objective_function(joint_angles):
            # Calculate current CoM from joint angles
            current_com = self._calculate_com(joint_angles)
            current_orientation = self._calculate_orientation(joint_angles)

            # Compute error
            com_error = np.linalg.norm(desired_com - current_com)
            orient_error = np.linalg.norm(desired_orientation - current_orientation)

            return com_error + 0.5 * orient_error

        def constraint_function(joint_angles):
            # Check if CoM is within support polygon
            current_com = self._calculate_com(joint_angles)
            support_polygon = self._calculate_support_polygon(support_feet)

            return self._point_in_polygon(current_com[:2], support_polygon)

        # Solve optimization problem
        result = minimize(
            objective_function,
            x0=self.model.get_current_joints(),
            constraints={'type': 'eq', 'fun': constraint_function},
            method='SLSQP'
        )

        return result.x
```

### Capture Point Based Control

#### Capture Point Fundamentals
The capture point is where the CoM would need to be placed to bring the robot to rest:

```python
class CapturePointController:
    def __init__(self, com_height, gravity=9.81):
        self.com_height = com_height
        self.gravity = gravity
        self.omega = np.sqrt(gravity / com_height)

    def calculate_capture_point(self, com_pos, com_vel):
        """Calculate current capture point"""
        cp_x = com_pos[0] + com_vel[0] / self.omega
        cp_y = com_pos[1] + com_vel[1] / self.omega
        return np.array([cp_x, cp_y])

    def plan_step_to_stabilize(self, current_cp, support_polygon):
        """Plan step location to stabilize the robot"""

        # Find nearest point in support polygon to current capture point
        nearest_support_point = self._nearest_point_in_polygon(current_cp, support_polygon)

        # Plan step to move capture point toward support polygon
        step_location = nearest_support_point + self._calculate_step_bias()

        return step_location

    def estimate_stability_margin(self, current_cp, support_polygon):
        """Estimate stability margin based on capture point position"""

        # Distance from capture point to nearest edge of support polygon
        distance_to_boundary = self._distance_to_polygon_boundary(current_cp, support_polygon)

        # Normalize by characteristic length (e.g., step length)
        normalized_margin = distance_to_boundary / 0.3  # assuming 0.3m characteristic length

        return normalized_margin
```

## Advanced Locomotion Techniques

### Dynamic Walking

#### Spring-Loaded Inverted Pendulum (SLIP) Model
- **Leg Compliance**: Spring-like leg behavior
- **Energy Conservation**: Maintain walking energy
- **Stable Gaits**: Self-stabilizing walking patterns

#### Hybrid Zero Dynamics (HZD)
- **Poincaré Sections**: Discrete state transitions
- **Virtual Constraints**: Enforce stable walking
- **Optimal Control**: Optimize walking efficiency

### Adaptive Locomotion

#### Terrain Adaptation
```python
class TerrainAdaptiveWalker:
    def __init__(self, base_controller):
        self.base_controller = base_controller
        self.terrain_classifier = TerrainClassifier()
        self.adaptation_manager = AdaptationManager()

    def adapt_to_terrain(self, terrain_sensing_data):
        """Adapt walking parameters based on terrain"""

        # Classify terrain type
        terrain_type = self.terrain_classifier.classify(terrain_sensing_data)

        # Get adaptation parameters for terrain
        adaptation_params = self.adaptation_manager.get_parameters(terrain_type)

        # Adjust walking parameters
        self._adjust_step_height(adaptation_params.step_height)
        self._adjust_step_width(adaptation_params.step_width)
        self._adjust_com_height(adaptation_params.com_height)
        self._adjust_impedance(adaptation_params.impedance)

        return terrain_type, adaptation_params

    def _adjust_step_height(self, height):
        """Adjust step height for obstacle negotiation"""
        self.base_controller.swing_leg_height = height

    def _adjust_impedance(self, impedance_params):
        """Adjust joint impedance for terrain compliance"""
        for joint, params in impedance_params.items():
            self.base_controller.set_impedance(joint, params.stiffness, params.damping)
```

### Multi-Modal Locomotion

#### Gait Transitions
- **Standing to Walking**: CoM trajectory planning
- **Walking to Running**: Dynamic gait transition
- **Walking to Climbing**: Mode switching for stairs

## Perception Integration

### State Estimation

#### Extended Kalman Filter for Balance
```python
class BalanceStateEstimator:
    def __init__(self):
        # State: [com_x, com_y, com_z, com_dx, com_dy, com_dz, orientation, omega]
        self.state_dim = 8
        self.observation_dim = 6  # IMU readings

        # Initialize covariance matrices
        self.P = np.eye(self.state_dim) * 0.1  # Process noise
        self.Q = np.eye(self.state_dim) * 0.01  # Process covariance
        self.R = np.eye(self.observation_dim) * 0.1  # Measurement covariance

    def predict(self, control_input, dt):
        """Prediction step of EKF"""

        # State transition model (simplified)
        F = self._calculate_jacobian(self.state, control_input)

        # Predict state
        self.state = self._state_transition(self.state, control_input, dt)

        # Predict covariance
        self.P = F @ self.P @ F.T + self.Q

    def update(self, measurement):
        """Update step of EKF"""

        # Calculate innovation
        predicted_measurement = self._observation_model(self.state)
        innovation = measurement - predicted_measurement

        # Calculate Kalman gain
        H = self._observation_jacobian(self.state)
        S = H @ self.P @ H.T + self.R
        K = self.P @ H.T @ np.linalg.inv(S)

        # Update state
        self.state = self.state + K @ innovation

        # Update covariance
        I = np.eye(self.state_dim)
        self.P = (I - K @ H) @ self.P
```

### Environment Perception for Locomotion

#### Footstep Planning with Perception
```python
class PerceptionGuidedStepper:
    def __init__(self, planner, perception_system):
        self.planner = planner
        self.perception = perception_system

    def plan_safe_footsteps(self, goal_position, current_map):
        """Plan footsteps considering environmental constraints"""

        # Get terrain information
        terrain_info = self.perception.analyze_terrain(current_map)

        # Identify safe stepping areas
        safe_zones = self._identify_safe_zones(terrain_info)

        # Plan path considering safe zones
        footsteps = self.planner.plan_path_with_constraints(
            start=self.current_position,
            goal=goal_position,
            constraints=safe_zones
        )

        # Verify footstep stability
        verified_footsteps = []
        for footstep in footsteps:
            if self._is_footstep_stable(footstep, terrain_info):
                verified_footsteps.append(footstep)
            else:
                # Find alternative footstep
                alternative = self._find_alternative_footstep(footstep, safe_zones)
                if alternative:
                    verified_footsteps.append(alternative)

        return verified_footsteps
```

## Control Implementation

### Real-time Considerations

#### Control Loop Timing
- **High-Frequency Control**: Joint-level control at 1-2 kHz
- **Balance Control**: 100-200 Hz for balance feedback
- **Step Planning**: 10-20 Hz for footstep generation
- **Trajectory Updates**: 50-100 Hz for CoM trajectory

### Robustness and Adaptation

#### Disturbance Rejection
- **Push Recovery**: React to external disturbances
- **Slip Recovery**: Handle foot slippage
- **Sensor Failure**: Graceful degradation with sensor faults

Humanoid locomotion requires sophisticated integration of balance control, trajectory planning, and real-time adaptation to achieve stable and efficient bipedal walking in various environments.