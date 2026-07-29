# Outbox Pattern

The Outbox Pattern guarantees that user actions are never lost while offline.

## Flow

```
User Action

↓

SQLite Updated

↓

Pending Action Stored

↓

Offline

↓

Network Restored

↓

Replay Pending Actions

↓

Server Updated

↓

Remove Pending Action
```

---

## Why?

Without the Outbox Pattern:

- Offline changes would be lost.

With the Outbox Pattern:

- Every action is persisted locally.
- Synchronization can be retried safely.