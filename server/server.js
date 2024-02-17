const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(cors());
app.use(express.json());

let events = [];

const findEventById = (id) => events.find((event) => event.id === id);

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  const { title, type, startDate, endDate } = req.body;

  if (!title || !type || !startDate || !endDate) {
    return res.status(400).send("Missing required fields");
  }

  const newEvent = { id: uuidv4(), title, type, startDate, endDate };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { title, type, startDate, endDate } = req.body;

  const event = findEventById(id);

  if (!event) {
    return res.status(404).send("Event not found");
  }

  event.title = title || event.title;
  event.type = type || event.type;
  event.startDate = startDate || event.startDate;
  event.endDate = endDate || event.endDate;

  res.json(event);
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).send("Event not found");
  }

  events.splice(eventIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
