import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button, TextField } from "@mui/material";
import axios from "axios";

const ViewCourseDialog = ({ open, onClose, course, onUpdate, onDelete }) => {
  const [courseDetails, setCourseDetails] = useState({
    name: "",
    code: "",
    credit: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (course) {
      setCourseDetails({
        name: course.name,
        code: course.code,
        credit: course.credit,
        description: course.description,
        image: course.image,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put(
        `https://course-helper-two.vercel.app/courses/${course.id}`,
        courseDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Course updated successfully");
      console.log("Course updated:", response.data);
      onUpdate(course.id, response.data);
      onClose();
    } catch (error) {
      alert("Failed to update course.\nLogin if you haven't already.");
      console.error("Error updating course:", error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`https://course-helper-two.vercel.app/courses/${course.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Course deleted successfully");
      console.log("Course deleted");
      onDelete(course.id);
      onClose();
    } catch (error) {
      alert("Failed to delete course.\nLogin if you haven't already.");
      console.error("Error deleting course:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>View Course</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Course Name"
          type="text"
          fullWidth
          value={courseDetails.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="code"
          label="Course Code"
          type="text"
          fullWidth
          value={courseDetails.code}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="credit"
          label="Credits"
          type="number"
          fullWidth
          value={courseDetails.credit}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={courseDetails.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="image"
          label="Image URL"
          type="text"
          fullWidth
          value={courseDetails.image}
          onChange={handleChange}
        />
        <Button onClick={handleUpdate} color="primary" variant="contained">
          Update
        </Button>
        <Button onClick={handleDelete} color="secondary" variant="contained">
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCourseDialog;
