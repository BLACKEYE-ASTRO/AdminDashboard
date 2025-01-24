import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal"; // Import the EditStudentModal
import ViewStudentModal from "./ViewStudentModal"; 
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, IconButton, Modal, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [studentToDelete, setStudentToDelete] = useState(null); 

  // Fetch the students list
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, "/students");
      const snapshot = await getDocs(studentsCollection);
      const studentsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    };
    fetchStudents();
  }, []);

  // Handle Add Student
  const handleAddStudent = () => {
    setShowModal(true);
  };

  // Handle View Action: Set selected student and open the modal
  const handleView = (student) => {
    setSelectedStudent(student);
  };

  // Handle Edit Action: Set selected student and open the edit modal
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  // Handle Delete Action: Set student to delete and show confirmation modal
  const handleDelete = (student) => {
    setStudentToDelete(student); 
    setShowDeleteConfirmation(true); 
  };

  // Confirm Delete Action
  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        const studentDoc = doc(db, "students", studentToDelete.id);
        await deleteDoc(studentDoc);
        setStudents(students.filter((student) => student.id !== studentToDelete.id)); 
        setShowDeleteConfirmation(false); 
        setStudentToDelete(null); 
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Cancel Delete Action
  const cancelDelete = () => {
    setShowDeleteConfirmation(false); 
    setStudentToDelete(null); 
  };

  // Handle Close Edit Modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ marginLeft: "10px", padding: "20px", flex: 1 }}>
        <h1>Students</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddStudent}
          sx={{ marginBottom: "20px" }}
        >
          Add Student
        </Button>
        {showModal && (
          <AddStudentModal
            onClose={() => setShowModal(false)}
            onSuccess={() => window.location.reload()}
          />
        )}
        {selectedStudent && !editModalOpen && (
          <ViewStudentModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)} 
          />
        )}
        {editModalOpen && (
          <EditStudentModal
            student={selectedStudent}
            onClose={handleCloseEditModal}
            onSuccess={() => window.location.reload()} 
          />
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="students table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Section</TableCell>
                <TableCell align="center">Roll Number</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell align="center">{student.name}</TableCell>
                  <TableCell align="center">{student.class}</TableCell>
                  <TableCell align="center">{student.section}</TableCell>
                  <TableCell align="center">{student.rollNumber}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleView(student)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(student)} color="secondary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(student)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteConfirmation} onClose={cancelDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this student?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={cancelDelete}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentsPage;
