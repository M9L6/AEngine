export class Timer {
  public static now(): number {
    return performance ? performance.now() : Date.now();
  }

  private _a: number;
  private _b: number;

  private _isRunning: boolean;

  constructor() {
    this._a = 0;
    this._b = 0;
    this._isRunning = false;
  }

  public start() {
    this._isRunning = true;
    this._a = Timer.now();
  }

  public stop() {
    this._isRunning = false;
    this._b = Timer.now();
  }

  public getDeltaTime() {
    return this._b - this._a;
  }
}
