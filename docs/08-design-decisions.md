# Design Decisions

## Why SQLite?

SQLite provides reliable local persistence and enables offline-first functionality.

---

## Why Repository Pattern?

Repositories hide implementation details from the UI.

The UI never knows where data comes from.

---

## Why Outbox Pattern?

Offline user actions are persisted and replayed once connectivity returns.

---

## Why EventBus?

The SyncEngine should not depend on Redux.

Instead, it emits events and interested components respond.

This keeps the architecture loosely coupled.

---

## Why Local First?

Reading from SQLite is significantly faster than waiting for network requests.

Users should never wait for content they already have.