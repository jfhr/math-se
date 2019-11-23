type kbHandler = (ev: KeyboardEvent) => void;

export class GlobalKeyboardShortcut {
  private readonly handlers: kbHandler[];

  constructor(...handlers: kbHandler[]) {
    this.handlers = handlers;
  }

  public startListener() {
    for (const handler of this.handlers) {
      document.addEventListener('keyup', handler);
    }
  }

  public stopListener() {
    for (const handler of this.handlers) {
      document.removeEventListener('keyup', handler);
    }
  }
}
