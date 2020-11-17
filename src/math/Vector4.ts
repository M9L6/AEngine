import { epsilon } from "./MathUtils";
import { Matrix4 } from "./Matrix4";

export class Vector4 {
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

  constructor(
    x: number | [number, number, number, number] = 0,
    y: number = 0,
    z: number = 0,
    w: number = 0
  ) {
    if (Array.isArray(x)) {
      this._values[0] = x[0];
      this._values[1] = x[1];
      this._values[2] = x[2];
      this._values[3] = x[3];
    } else {
      this._values[0] = x;
      this._values[1] = y;
      this._values[2] = z;
      this._values[3] = w;
    }
  }

  public at(idx: number): number {
    return this._values[idx];
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
  }

  public copy(dest: Vector4 | null = null): Vector4 {
    if (dest === null) dest = new Vector4();
    dest.x = this.x;
    dest.y = this.y;
    dest.z = this.z;
    dest.w = this.w;
    return dest;
  }

  public negative(dest: Vector4 | null = null): Vector4 {
    if (dest === null) dest = this;
    dest.x = -this.x;
    dest.y = -this.y;
    dest.z = -this.z;
    dest.w = -this.w;
    return dest;
  }

  public equals(
    v1: Vector4,
    v2: Vector4,
    threshold: number = epsilon
  ): boolean {
    return (
      Math.abs(v1.x - v2.x) <= threshold &&
      Math.abs(v1.y - v2.y) <= threshold &&
      Math.abs(v1.z - v2.z) <= threshold &&
      Math.abs(v1.w - v2.w) <= threshold
    );
  }

  public squaredLength(): number {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }

  public length(): number {
    return Math.sqrt(this.squaredLength());
  }

  public add(v: Vector4): Vector4 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }

  public substract(v: Vector4): Vector4 {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }

  public multiply(v: Vector4): Vector4 {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }

  public divide(v: Vector4): Vector4 {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    this.w /= v.w;
    return this;
  }

  public scale(s: number, dest: Vector4 | null = null): Vector4 {
    if (dest === null) dest = this;
    dest.x = this.x * s;
    dest.y = this.y * s;
    dest.z = this.z * s;
    dest.w = this.w * s;
    return dest;
  }

  public normalize(dest: Vector4 | null = null): Vector4 {
    if (dest === null) dest = this;
    let l = this.length();
    if (l === 1) return this;
    if (l === 0) {
      dest.x = 0;
      dest.y = 0;
      dest.z = 0;
      dest.w = 0;
      return dest;
    }
    l = 1 / l;
    dest.x = this.x * l;
    dest.y = this.y * l;
    dest.z = this.z * l;
    dest.w = this.w * l;
    return dest;
  }

  public multiplyMat4(mat: Matrix4, dest: Vector4 | null = null): Vector4 {
    if (dest === null) dest = this;
    return mat.multiplyVec4(this, dest);
  }

  public static zero = new Vector4(0, 0, 0, 0);
  public static one = new Vector4(1, 1, 1, 1);

  public static mix(
    v1: Vector4,
    v2: Vector4,
    t: number,
    dest: Vector4 | null = null
  ): Vector4 {
    if (dest === null) dest = new Vector4();
    dest.x = v1.x + t * (v2.x - v1.x);
    dest.y = v1.y + t * (v2.y - v1.y);
    dest.z = v1.z + t * (v2.z - v1.z);
    dest.w = v1.w + t * (v2.w - v1.w);
    return dest;
  }

  public static sum(
    v1: Vector4,
    v2: Vector4,
    dest: Vector4 | null = null
  ): Vector4 {
    if (dest === null) dest = new Vector4();
    dest.x = v1.x + v2.x;
    dest.y = v1.y + v2.y;
    dest.z = v1.z + v2.z;
    dest.w = v1.w + v2.w;
    return dest;
  }

  public static difference(
    v1: Vector4,
    v2: Vector4,
    dest: Vector4 | null = null
  ): Vector4 {
    if (dest === null) dest = new Vector4();
    dest.x = v1.x - v2.x;
    dest.y = v1.y - v2.y;
    dest.z = v1.z - v2.z;
    dest.w = v1.w - v2.w;
    return dest;
  }

  public static product(
    v1: Vector4,
    v2: Vector4,
    dest: Vector4 | null = null
  ): Vector4 {
    if (dest === null) dest = new Vector4();
    dest.x = v1.x * v2.x;
    dest.y = v1.y * v2.y;
    dest.z = v1.z * v2.z;
    dest.w = v1.w * v2.w;
    return dest;
  }

  public static quotient(
    v1: Vector4,
    v2: Vector4,
    dest: Vector4 | null = null
  ): Vector4 {
    if (dest === null) dest = new Vector4();
    dest.x = v1.x / v2.x;
    dest.y = v1.y / v2.y;
    dest.z = v1.z / v2.z;
    dest.w = v1.w / v2.w;
    return dest;
  }
}
