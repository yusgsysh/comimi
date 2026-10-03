import type {
  ViewerEventHandler,
  ViewerEventMap,
  ViewerEventName
} from "../types";

export class EventEmitter {
  private handlers = new Map<ViewerEventName, Set<(payload: unknown) => void>>();

  on<T extends ViewerEventName>(
    eventName: T,
    handler: ViewerEventHandler<T>
  ): () => void {
    let handlers = this.handlers.get(eventName);
    if (!handlers) {
      handlers = new Set();
      this.handlers.set(eventName, handlers);
    }

    handlers.add(handler as (payload: unknown) => void);

    return () => {
      handlers.delete(handler as (payload: unknown) => void);
    };
  }

  has(eventName: ViewerEventName): boolean {
    const handlers = this.handlers.get(eventName);
    return Boolean(handlers && handlers.size > 0);
  }

  emit<T extends ViewerEventName>(
    eventName: T,
    payload: ViewerEventMap[T]
  ): void {
    const handlers = this.handlers.get(eventName);

    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      try {
        handler(payload);
      } catch (error) {
        console.error(error);
      }
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}
