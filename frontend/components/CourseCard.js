import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CourseCard = ({ course, onClick }) => {
  return (
    <Card style={{ margin: "16px", cursor: "pointer" }} onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={course.image || "/default-image.jpg"}
        alt={course.name}
      />
      <CardContent>
        <Typography variant="h6">{course.name}</Typography>
        <Typography variant="body2">Code: {course.code}</Typography>
        <Typography variant="body2">Credits: {course.credit}</Typography>
        <Typography variant="body2">{course.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
