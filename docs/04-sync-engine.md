# Synchronization

```
Network Available

↓

NetworkManager

↓

SyncCoordinator

↓

SyncEngine

↓

Read Outbox

↓

Mock Backend

↓

Update SQLite

↓

Remove Pending Actions

↓

Emit Event

↓

Reload Feed
```

---

## Responsibilities

### NetworkManager

Detects connectivity.

---

### SyncCoordinator

Starts synchronization.

Prevents duplicate syncs.

---

### SyncEngine

Processes pending actions.

Updates local database.

Removes completed actions.

Emits sync completion event.