
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
      await updateDoc(studentDoc, formData);
      onSuccess();
      onClose();
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
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxHeight: "90vh",
          bgcolor: "background.paper",
          border: "2px solid #ccc",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
          Edit Student Details
        </Typography>
        <Box
          sx={{
            maxHeight: "calc(90vh - 150px)",
            overflowY: "auto",
            pr: { xs: 1, sm: 2 },
          }}
        >
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              fullWidth
              label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              variant="outlined"
              sx={{
                marginBottom: 2,
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                },
                "& .MuiInputBase-root": {
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                },
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditStudentModal;
