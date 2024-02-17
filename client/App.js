import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "./CreateEvent";
import EventsView from "./EventsView";

function App() {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <CreateEvent fetchEvents={fetchEvents} />
      <EventsView events={events} fetchEvents={fetchEvents} />
    </div>
  );
}

export default App;
