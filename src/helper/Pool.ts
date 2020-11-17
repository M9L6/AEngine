type Constructor<T = {}> = new (...args: any[]) => T;

export class Pool<T> {
  private _objs: Array<T>;
  private _idx: number;

  private _base: Constructor<T>;

  constructor(base: Constructor<T>, size: number) {
    this._objs = new Array<T>(size);
    this._idx = size - 1;
    this._base = base;
    for (let i = 0; i < size; i++) {
      this._objs[i] = new this._base();
    }
  }

  private _expand(size: number): void {
    const old = this._objs;

    this._objs = new Array<T>(size);

    const len = size - old.length;

    for (let i = 0; i < len; i++) {
      this._objs[i] = new this._base();
    }

    for (let i = len, j = 0; i < size; i++, j++) {
      this._objs[i] = old[j];
    }

    this._idx += len;
  }

  public allocate(): T {
    if (this._idx < 0) {
      this._expand(this._objs.length * 2);
    }
    const obj = this._objs[this._idx];
    this._objs.splice(this._idx);
    this._idx--;
    return obj;
  }

  public free(obj: T) {
    this._idx++;
    this._objs[this._idx] = obj;
  }

  public freeAll(fn: (t: T) => void) {
    for (let i = 0; i <= this._idx; i++) {
      if (fn) {
        fn(this._objs[i]);
      }
    }
    this._objs.splice(0);
    this._idx = -1;
  }
}
