const express = require('express');
const { getAllCourses, addCourse, updateCourse, deleteCourse } = require('../controllers/coursesController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route
router.get('/', getAllCourses);

// Protected routes
router.post('/', authenticateToken, addCourse);    // Add a new course
router.put('/:id', authenticateToken, updateCourse); // Update a course
router.delete('/:id', authenticateToken, deleteCourse); // Delete a course

module.exports = router;