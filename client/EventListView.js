import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EventListView() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  };

  const handleDelete = (eventId) => {
    axios
      .delete(`/events/${eventId}`)
      .then(() => {
        fetchEvents();
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    setEditingEvent(eventToEdit);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setEditingEvent({ ...editingEvent, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    axios
      .put(`/events/${editingEvent.id}`, editingEvent)
      .then(() => {
        fetchEvents();
        setIsEditDialogOpen(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error updating event:", error));
  };

  const getRowStyle = (eventType) => {
    switch (eventType) {
      case "Merger":
        return { backgroundColor: "rgba(244, 67, 54, 0.5)" };
      case "Dividends":
        return { backgroundColor: "rgba(255, 152, 0, 0.5)" };
      case "NewCapital":
        return { backgroundColor: "rgba(76, 175, 80, 0.5)" };
      case "Hire":
        return { backgroundColor: "rgba(33, 150, 243, 0.5)" };
      default:
        return {};
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} style={getRowStyle(event.type)}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.startDate}</TableCell>
              <TableCell>{event.endDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(event.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(event.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            name="title"
            value={editingEvent?.title || ""}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={editingEvent?.type || ""}
              onChange={handleEditChange}
            >
              <MenuItem value="Merger">Merger</MenuItem>
              <MenuItem value="Dividends">Dividends</MenuItem>
              <MenuItem value="NewCapital">New Capital</MenuItem>
              <MenuItem value="Hire">Hire</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            variant="outlined"
            name="startDate"
            value={editingEvent?.startDate || ""}
            onChange={handleEditChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            name="endDate"
            value={editingEvent?.endDate || ""}
            onChange={handleEditChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EventListView;
