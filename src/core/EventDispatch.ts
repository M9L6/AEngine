export class EventDispatch {
  private _listeners: {
    [key: string]: Array<{ callback: Function; scope: any; once: boolean }>;
  };

  constructor() {
    this._listeners = {};
  }

  private _addCallback(
    name: string,
    callback: Function,
    scope: any = this,
    once: boolean = false
  ) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    this._listeners[name].push({
      callback: callback,
      scope: scope,
      once: once,
    });
  }

  /**
   *
   * @param name
   * @param callback
   * @param scope
   */
  public on(name: string, callback: Function, scope: any = this): this {
    this._addCallback(name, callback, scope);
    return this;
  }

  /**
   *
   * @param name
   * @param callback
   * @param scope
   */
  public once(name: string, callback: Function, scope: any = this): this {
    this._addCallback(name, callback, scope, true);
    return this;
  }

  /**
   * 移除事件
   * @param name 不填    清除所有事件
   * @param callback 不填   清除该事件的所有绑定
   * @param scope
   */
  public off(
    name: string | null = null,
    callback: Function | null = null,
    scope: any = this
  ): this {
    if (name === null) {
      this._listeners = {};
    } else if ((callback = null)) {
      if (this._listeners[name]) {
        this._listeners[name] = [];
      }
    } else {
      const events = this._listeners[name];
      let count = events.length;
      for (let i = 0; i < count; i++) {
        if (events[i].callback !== callback) continue;
        if (events[i].scope !== scope) continue;
        events[i--] = events[--count];
      }
      events.length = count;
    }
    return this;
  }

  /**
   * 触发事件
   * @param name 事件类型
   * @param args
   */
  public fire(name: string, ...args: any[]): boolean {
    if (!this._listeners[name]) return false;

    const events = this._listeners[name];

    let count = events.length;
    for (let i = 0; i < count; i++) {
      events[i].callback.call(events[i].scope, args);
      if (events[i].once) events[i--] = events[--count];
    }
    events.length = count;

    return true;
  }

  public hasEvent(name: string): boolean {
    return this._listeners[name] && this._listeners[name].length !== 0;
  }
}
