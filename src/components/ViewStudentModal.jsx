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
          width: { xs: "90%", sm: "70%", md: "50%" },
          maxHeight: "90vh",
          bgcolor: "background.paper",
          border: "2px solid #ccc",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
          Student Details
        </Typography>
        <Box>
          {Object.entries(student).map(([key, value]) => (
            <Typography
              key={key}
              variant="body1"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                marginBottom: 1,
              }}
            >
              <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong> {value}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
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
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewStudentModal;
