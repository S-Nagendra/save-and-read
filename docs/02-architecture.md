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
      Pending Actions
             │
             ▼
        Sync Engine
             │
             ▼
         Mock Backend
```

---

## Why this architecture?

The UI never knows whether data comes from:

- SQLite
- REST API
- GraphQL
- Cache

It only communicates with repositories.

This makes the application maintainable and testable.