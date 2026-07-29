type EventName = "syncCompleted";

type Listener = () => void;

class EventBus {
  private listeners = new Map<EventName, Listener[]>();

  on(event: EventName, listener: Listener) {
    const current = this.listeners.get(event) ?? [];

    this.listeners.set(event, [...current, listener]);
  }

  off(event: EventName, listener: Listener) {
    const current = this.listeners.get(event) ?? [];

    this.listeners.set(
      event,
      current.filter((l) => l !== listener),
    );
  }

  emit(event: EventName) {
    const current = this.listeners.get(event) ?? [];

    current.forEach((listener) => listener());
  }
}

export const eventBus = new EventBus();
