import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const ViewStudentModal = ({ student, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #ccc",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Student Details
        </Typography>
        <Box>
          <Typography variant="body1">
            <strong>ID:</strong> {student.id}
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {student.name}
          </Typography>
          <Typography variant="body1">
            <strong>Class:</strong> {student.class}
          </Typography>
          <Typography variant="body1">
            <strong>Section:</strong> {student.section}
          </Typography>
          <Typography variant="body1">
            <strong>Roll Number:</strong> {student.rollNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Age:</strong> {student.age}
          </Typography>
          <Typography variant="body1">
            <strong>Gender:</strong> {student.gender}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {student.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {student.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {student.address}
          </Typography>
          <Typography variant="body1">
            <strong>Father's Name:</strong> {student.fatherName}
          </Typography>
          <Typography variant="body1">
            <strong>Mother's Name:</strong> {student.motherName}
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewStudentModal;
