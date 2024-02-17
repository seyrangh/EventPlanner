# Event Planner Application

## Project Overview

This Event Planner application is a full-stack web project designed to manage and visualize events in both list and timeline views. It allows users to create, edit, and delete events, offering an intuitive interface for seamless event management.

## Tech Stack and Libraries

### Frontend
- **React:** Utilized for building the user interface, leveraging its component-based architecture for maintainability and reusability.
- **Material-UI (@mui/material):** Employed for designing a modern, responsive UI with pre-built components and custom styling capabilities.
- **React Big Calendar:** Integrated for the timeline view, enabling an interactive calendar experience for users.
- **Axios:** Used for making HTTP requests to the server, handling data fetching, and sending updates.

### Backend
- **Node.js and Express:** Chosen for the server-side logic, providing a robust framework for routing and handling API requests.
- **UUID:** Incorporated for generating unique identifiers for each event.

### Development Tools
- **ESLint:** Integrated for maintaining code quality and consistency.
- **Nodemon:** Used in the development environment for automatic server restarts upon code changes.

## Architecture

The application is divided into client and server directories:

- **Client:** Contains all the React components, styling, and client-side logic. The client interacts with the server via API calls to fetch, add, edit, and delete event data.
- **Server:** Responsible for handling API requests, managing event data, and communicating with the client. It serves as the central point for processing and storing all event information.

## Final Notes

Towards the end of the project development, I encountered difficulties with Git commands on my Mac. To ensure timely submission, I decided to manually commit the files to the GitHub repository. This decision was made to prioritize the project's completion and submission.
