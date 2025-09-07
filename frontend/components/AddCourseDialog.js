import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import axios from "axios";

const AddCourseDialog = ({ open, onClose, onSuccess }) => {
  const [courseDetails, setCourseDetails] = useState({
    name: "",
    code: "",
    credit: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Token:", token);
      console.log("Course Details:", courseDetails);

      const response = await axios.post(
        "https://course-helper-two.vercel.app/courses",
        courseDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Course added successfully");
      console.log("Course added:", response.data);
      onSuccess(response.data);
      onClose();
    } catch (error) {
      alert("Failed to add course.\nLogin if you haven't already.");
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error adding course:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error adding course: No response received", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error adding course:", error.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Course Name"
          type="text"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={courseDetails.name}
        />
        <TextField
          name="code"
          label="Course Code"
          type="text"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={courseDetails.code}
        />
        <TextField
          name="credit"
          label="Credit"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={courseDetails.credit}
        />
        <TextField
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          onChange={handleChange}
          value={courseDetails.description}
        />
        <TextField
          name="image"
          label="Image URL"
          type="text"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={courseDetails.image}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
