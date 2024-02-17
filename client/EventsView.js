import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FilterOptions from "./FilterOptions";

import {
  Container,
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EventListView from "./EventListView";

const localizer = momentLocalizer(moment);

function EventsView() {
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState({
    Merger: true,
    Dividends: true,
    NewCapital: true,
    Hire: true,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("/events")
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  };

  const eventPropGetter = (event) => {
    const backgroundColor = getColorForEventType(event.type);
    return { style: { backgroundColor } };
  };

  const allViews = Object.keys(Views).map((k) => Views[k]);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredEvents = events.filter((event) => filter[event.type]);

  const activeButtonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
  };
  return (
    <Container>
      {viewMode === "month" && (
        <FilterOptions onFilterChange={handleFilterChange} />
      )}
      <ButtonGroup
        color="primary"
        aria-label="outlined primary button group"
        style={{ marginBottom: "20px" }}
      >
        <Button
          style={viewMode === "list" ? activeButtonStyle : null}
          onClick={() => setViewMode("list")}
        >
          List View
        </Button>
        <Button
          style={viewMode === "month" ? activeButtonStyle : null}
          onClick={() => setViewMode("month")}
        >
          Timeline View
        </Button>
      </ButtonGroup>

      {viewMode === "list" ? (
        <EventListView events={events} />
      ) : (
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          views={allViews}
          step={60}
          showMultiDayTimes
          max={moment().endOf("day").toDate()}
          defaultDate={new Date()}
          view={viewMode}
          onView={(view) => setViewMode(view)}
          eventPropGetter={eventPropGetter}
          onSelectEvent={handleEventSelect}
          style={{ height: "75vh", marginTop: "20px" }}
        />
      )}

      <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedEvent && (
              <>
                <div>Title: {selectedEvent.title}</div>
                <div>Type: {selectedEvent.type}</div>
                <div>Start: {moment(selectedEvent.start).format("LLL")}</div>
                <div>End: {moment(selectedEvent.end).format("LLL")}</div>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function getColorForEventType(eventType) {
  const eventColors = {
    Merger: "#f44336",
    Dividends: "#ff9800",
    NewCapital: "#4caf50",
    Hire: "#2196f3",
  };
  return eventColors[eventType] || "#757575";
}

export default EventsView;
