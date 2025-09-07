"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Button } from "@mui/material";
import axios from "axios";
import AppBarComponent from "../components/AppBarComponent";
import CourseCard from "../components/CourseCard";
import AddCourseDialog from "../components/AddCourseDialog";
import ViewCourseDialog from "../components/ViewCourseDialog";

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch all courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://course-helper-two.vercel.app/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses. Please try again.");
      }
    };

    fetchCourses();
  }, []);

  const handleAddOpen = () => setOpenAddDialog(true);
  const handleAddClose = () => setOpenAddDialog(false);

  const handleViewCourse = (course) => setSelectedCourse(course);
  const handleCloseViewDialog = () => setSelectedCourse(null);

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    setSelectedCourse(null);
  };

  const handleUpdateCourse = (id, updatedCourse) => {
    setCourses(courses.map((course) => (course.id === id ? updatedCourse : course)));
    setSelectedCourse(null);
  };

  const handleAddCourseSuccess = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <Box>
      <AppBarComponent title="Course Helper" />

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard course={course} onClick={() => handleViewCourse(course)} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOpen}
        sx={{ position: "fixed", bottom: 16, left: 16 }}
      >
        Add Course
      </Button>

      <AddCourseDialog open={openAddDialog} onClose={handleAddClose} onSuccess={handleAddCourseSuccess} />

      {selectedCourse && (
        <ViewCourseDialog
          open={Boolean(selectedCourse)}
          course={selectedCourse}
          onClose={handleCloseViewDialog}
          onUpdate={handleUpdateCourse}
          onDelete={handleDeleteCourse}
        />
      )}
    </Box>
  );
}
