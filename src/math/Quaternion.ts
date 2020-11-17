import { Vector3 } from "./Vector3";

export class Quaternion {
  private _values: Float32Array = new Float32Array(4);

  public get values(): Float32Array {
    return this._values;
  }

  public get x(): number {
    return this._values[0];
  }

  public set x(v: number) {
    this._values[0] = v;
  }

  public get y(): number {
    return this._values[1];
  }

  public set y(v: number) {
    this._values[1] = v;
  }

  public get z(): number {
    return this._values[2];
  }

  public set z(v: number) {
    this._values[2] = v;
  }

  public get w(): number {
    return this._values[3];
  }

  public set w(v: number) {
    this._values[3] = v;
  }

  public get xy(): [number, number] {
    return [this._values[0], this._values[1]];
  }

  public set xy(v: [number, number]) {
    this._values[0] = v[0];
    this._values[1] = v[1];
  }

  public get xyz(): [number, number, number] {
    return [this._values[0], this._values[1], this._values[2]];
  }

  public set xyz(v: [number, number, number]) {
    this._values[0] = v[0];
    this._values[1] = v[1];
    this._values[2] = v[2];
  }

  public get xyzw(): [number, number, number, number] {
    return [this._values[0], this._values[1], this._values[2], this._values[3]];
  }

  public set xyzw(v: [number, number, number, number]) {
    this._values[0] = v[0];
    this._values[1] = v[1];
    this._values[2] = v[2];
    this._values[3] = v[3];
  }

  public multiplyVec3(v: Vector3, dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = new Vector3();
    return dest;
  }
}
