import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Sidebar from "./Sidebar";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import ViewStudentModal from "./ViewStudentModal";
import {
  Box,
  Button,
  Paper,
  Modal,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handleAddStudent = () => setShowModal(true);

  const handleView = (student) => setSelectedStudent(student);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        const studentDoc = doc(db, "students", studentToDelete.id);
        await deleteDoc(studentDoc);
        setStudents(students.filter((s) => s.id !== studentToDelete.id));
        setSnackbarMessage("Student deleted successfully");
        setSnackbarOpen(true);
        setShowDeleteConfirmation(false);
        setStudentToDelete(null);
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleBatchDelete = async () => {
    try {
      for (let studentId of selectedRows) {
        const studentDoc = doc(db, "students", studentId);
        await deleteDoc(studentDoc);
      }
      setStudents(students.filter((student) => !selectedRows.includes(student.id)));
      setSnackbarMessage("Selected students deleted successfully");
      setSnackbarOpen(true);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting selected students:", error);
    }
  };

  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "class", headerName: "Class", width: 130 },
    { field: "section", headerName: "Section", width: 130 },
    { field: "rollNumber", headerName: "Roll Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={() => handleView(params.row)} color="primary">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)} color="secondary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
      width: 180,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Sidebar />
      <Box sx={{ marginLeft: { xs: 0, sm: "10px" }, padding: "20px", flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1>Students</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStudent}
            sx={{ width: { xs: "50%", sm: "auto" }, marginRight: { xs: "10px", sm: 0 } }}
          >
            Add Student
          </Button>
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            paddingY: 2,
            paddingX: 2,
            borderRadius: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <TextField
              label="Search User"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: { xs: "100%", sm: "30%" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {selectedRows.length > 0 && (

              <DeleteIcon onClick={handleBatchDelete} sx={{
                padding:"10px",
                marginRight:{xs:0,sm:2},
              }} />
            )}
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
            <DataGrid
              rows={filteredStudents}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              checkboxSelection
              disableSelectionOnClick
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
              sx={{
                height: 400,
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            />
          </Paper>
        </Box>
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
        <Modal open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
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
              Are you sure you want to delete this user?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowDeleteConfirmation(false)}
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default StudentPage;
