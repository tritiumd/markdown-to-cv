# Coding in Event Driven Design for Backend

This document outlines the event-driven design principles for the backend of the CV TritiumD project, focusing on modularity, command/event-based architecture, and RESTful API practices.

## File structure

- src/cv_tritiumd/ is the main source directory containing the backend code. When import, use `import cv_tritiumd...` or `from cv_tritiumd...`.

The structure is organized into the following main components:
- domains/:
    - Domain models are defined in models/
    - Domain logic, including commands and events are defined in commands/ and events/ or commands.py and events.py
- services/:
    - Handle business logic and interact with the domain models. We use Unit of Work (UoW) pattern to manage transactions.
    - Separate se