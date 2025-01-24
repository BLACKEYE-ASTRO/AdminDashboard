import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditStudentModal = ({ student, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    class: student.class,
    section: student.section,
    rollNumber: student.rollNumber,
    age: student.age || "",
    gender: student.gender || "",
    email: student.email || "",
    phone: student.phone || "",
    address: student.address || "",
    fatherName: student.fatherName || "",
    motherName: student.motherName || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const studentDoc = doc(db, "students", student.id);
      await updateDoc(studentDoc, formData); // Update the document with the form data
      onSuccess(); // Call onSuccess after successful update
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

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
          maxHeight: "80vh", // Set max height for the modal
          overflowY: "auto", // Enable scrolling if content exceeds maxHeight
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Student Details
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Class"
          name="class"
          value={formData.class}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Section"
          name="section"
          value={formData.section}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Father's Name"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Mother's Name"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditStudentModal;
