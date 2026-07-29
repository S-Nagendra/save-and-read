# Offline First News App

An offline-first React Native application built with Expo that demonstrates how modern mobile applications continue to function without an internet connection.

The project focuses on system design, clean architecture, synchronization, and local data persistence rather than UI design.

---

## Features

- Offline-first architecture
- Local SQLite database
- Repository Pattern
- Redux Toolkit
- Download articles for offline viewing
- Save / Unsave articles
- Mark Read / Unread
- Outbox Pattern
- Automatic synchronization
- Event-driven communication
- React Navigation
- Cross-platform (Android + Web)

---

## Tech Stack

- React Native
- Expo
- TypeScript
- Redux Toolkit
- React Navigation
- Expo SQLite
- Expo File System
- NetInfo

---

# Architecture

```
                  React Native UI
                         │
                         ▼
                  Redux Toolkit
                         │
                         ▼
                Repository Layer
             ┌──────────┴──────────┐
             ▼                     ▼
        SQLite Database      File Storage
             │
             ▼
      Pending Actions (Outbox)
             │
             ▼
          Sync Engine
             │
             ▼
         Mock Backend
```

---

# Project Structure

```
src
│
├── app
│   ├── bootstrap
│   ├── navigation
│   └── store
│
├── core
│   ├── database
│   ├── events
│   ├── filesystem
│   ├── models
│   ├── network
│   ├── repositories
│   ├── services
│   └── sync
│
├── features
│   └── articles
│
├── mock
│
├── screens
│
└── shared
    ├── components
    └── utils
```

---

# Offline First Flow

1. User opens the application.
2. Articles are loaded from SQLite.
3. Cached data is displayed immediately.
4. Application attempts to refresh from the server.
5. If online, SQLite is updated.
6. Redux reloads data.
7. UI automatically refreshes.

---

# Save Article Flow

User taps Save

↓

SQLite updated immediately

↓

Pending Action added

↓

UI updated instantly

↓

Background synchronization

↓

Pending Action removed

---

# Download Flow

Download button

↓

DownloadService

↓

Expo File System

↓

Image stored locally

↓

SQLite updated

↓

Offline image available

---

# Synchronization

Whenever the network becomes available:

NetworkManager

↓

SyncCoordinator

↓

SyncEngine

↓

Read Pending Actions

↓

Send to Server

↓

Update SQLite

↓

Remove Pending Actions

↓

Emit Sync Completed Event

↓

Reload Feed

---

# Design Patterns

- Repository Pattern
- Outbox Pattern
- Event Bus
- Dependency Injection (Repository Abstraction)
- Feature-Based Architecture

---

# Future Improvements

- Authentication
- Background Sync
- Conflict Resolution
- Delta Synchronization
- Push Notifications
- Pagination
- Search
- Image Cache Eviction

---

# Running

Install dependencies

```
npm install
```

Start Expo

```
npx expo start
```

Android

```
a
```

Web

```
w
```

---

# Purpose

This project demonstrates how to design an offline-first mobile application using Clean Architecture principles rather than focusing on UI design.