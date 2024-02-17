import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function CreateEvent({ fetchEvents }) {
  const [eventData, setEventData] = useState({
    title: "",
    type: "",
    startDate: "",
    endDate: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/events", eventData)
      .then((response) => {
        console.log("Event created:", response.data);
        fetchEvents();
        setSnackbarMessage("Event created successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        resetForm();
        handleCloseDialog();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        setSnackbarMessage("Error creating event");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const resetForm = () => {
    setEventData({ title: "", type: "", startDate: "", endDate: "" });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <div style={{ paddingBottom: "30px" }}>
        {" "}
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1, color: "#1976d2" }}>
              Event Planner
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenDialog}
            >
              Create New Event
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Event</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="event-type-label">Type</InputLabel>
                  <Select
                    labelId="event-type-label"
                    id="event-type-select"
                    name="type"
                    value={eventData.type}
                    onChange={handleChange}
                    label="Type"
                  >
                    <MenuItem value="Merger">Merger</MenuItem>
                    <MenuItem value="Dividends">Dividends</MenuItem>
                    <MenuItem value="NewCapital">New Capital</MenuItem>
                    <MenuItem value="Hire">Hire</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateEvent;
