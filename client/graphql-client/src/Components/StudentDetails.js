import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Avatar,
  Typography,
} from "@mui/material";
import { useState } from "react";

import contactImg from "../assets/contact.jpg";

const StudentDetails = ({ studentData, onCloseDialog }) => {
  const [open, setOpen] = useState(true);

  console.log("Student data in dialog", studentData);

  const handleClose = () => {
    setOpen(false);
    onCloseDialog();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={contactImg} sx={{ width: 100, height: 100 }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: "600",
            }}
          >
            {studentData.name}
          </DialogContentText>
          <Typography gutterBottom>
            is a {studentData.gender} candidate, lives in {studentData.address}.
            His date of birth is{" "}
            {studentData.dateOfBirth.toString().split("T")[0]}. He has qualified{" "}
            {studentData.course} from XYZ Academy with {studentData.grade} Grade
            this year. His roll number in the academy was {studentData.rollNo}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentDetails;
