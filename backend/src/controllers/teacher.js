const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Teacher dashboard controller
exports.getDashboard = async (req, res) => {
  try {
    // Return teacher dashboard data
    return res.status(200).json({
      teacher: {
        name: "Teacher Name",
        email: "teacher@example.com",
        id: "teacher123"
      },
      stats: {
        students: 24,
        activeLessons: 5,
        completedAssignments: 18
      }
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Teacher assignments controller
exports.getAssignments = async (req, res) => {
  try {
    // Return sample assignments data
    return res.status(200).json([
      {
        id: '1',
        title: 'Waste Reduction Challenge',
        description: 'Create a plan to reduce waste at home',
        dueDate: '2023-12-15',
        xpReward: 50,
        badge: 'eco-warrior',
        ecoTheme: 'waste'
      },
      {
        id: '2',
        title: 'Water Conservation Project',
        description: 'Track and reduce water usage for one week',
        dueDate: '2023-12-20',
        xpReward: 75,
        badge: 'water-guardian',
        ecoTheme: 'water'
      }
    ]);
  } catch (error) {
    console.error('Teacher assignments error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Create new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, xpReward, badge, ecoTheme } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    
    // Return a mock response with generated ID
    const newAssignment = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      xpReward,
      badge,
      ecoTheme,
      createdAt: new Date().toISOString()
    };
    
    return res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Create assignment error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};