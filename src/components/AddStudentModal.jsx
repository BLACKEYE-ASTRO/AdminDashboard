import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudentModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    fatherName: "",
    motherName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
  };

  const handleSubmit = async () => {
    // Validate fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the data if validation passes
    try {
      await addDoc(collection(db, "students"), formData);
      toast.success("New student added successfully!"); // Show toast on success
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to add student: " + error.message);
    }
  };

  return (
    <>
      <Modal open onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "500px" },
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #ccc",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add Student
          </Typography>
          <Box
            sx={{
              maxHeight: "calc(80vh - 120px)",
              overflowY: "auto",
              pr: { xs: 0, sm: 2 },
            }}
          >
            <Grid container spacing={2}>
              {Object.keys(formData).map((key) => {
                if (key === "section") {
                  return (
                    <Grid item xs={12} key={key}>
                      <FormControl fullWidth error={!!errors[key]}>
                        <InputLabel>Section</InputLabel>
                        <Select
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          label="Section"
                        >
                          <MenuItem value="A">A</MenuItem>
                          <MenuItem value="B">B</MenuItem>
                          <MenuItem value="C">C</MenuItem>
                          <MenuItem value="D">D</MenuItem>
                        </Select>
                        <Typography variant="body2" color="error">
                          {errors[key]}
                        </Typography>
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === "gender") {
                  return (
                    <Grid item xs={12} key={key}>
                      <Typography variant="subtitle1" gutterBottom>
                        Gender
                      </Typography>
                      <FormControl component="fieldset" error={!!errors[key]}>
                        <RadioGroup
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          row
                        >
                          <FormControlLabel value="Male" control={<Radio />} label="Male" />
                          <FormControlLabel value="Female" control={<Radio />} label="Female" />
                          <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        <Typography variant="body2" color="error">
                          {errors[key]}
                        </Typography>
                      </FormControl>
                    </Grid>
                  );
                }

                return (
                  <Grid item xs={12} key={key}>
                    <TextField
                      fullWidth
                      label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      variant="outlined"
                      error={!!errors[key]}
                      helperText={errors[key]}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddStudentModal;