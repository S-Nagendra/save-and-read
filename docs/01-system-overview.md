# System Overview

## Goal

Build an application that continues working without internet connectivity.

The application always reads from local storage first and synchronizes with the server whenever connectivity is restored.

---

## Core Principles

- Local First
- Event Driven
- Offline First
- Repository Pattern
- Separation of Concerns

---

## Components

- React Native UI
- Redux Toolkit
- Repository Layer
- SQLite Database
- File Storage
- Sync Engine
- Event Bus
- Network Monitor

---

## Responsibilities

### UI

Displays data.

Never communicates directly with SQLite.

---

### Redux

Stores UI state.

Dispatches asynchronous actions.

---

### Repository

Single source for data access.

Responsible for SQLite and remote APIs.

---

### SQLite

Persistent local storage.

Acts as the source of truth.

---

### Sync Engine

Processes pending actions.

Updates local storage after successful synchronization.

---

### Event Bus

Notifies interested components when synchronization completes.

Keeps SyncEngine independent from Redux.