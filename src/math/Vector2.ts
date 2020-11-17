import { epsilon } from "./MathUtils";
import { Matrix2 } from "./Matrix2";
import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";

export class Vector2 {
  private _values: Float32Array = new Float32Array(2);

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

  public set xy(v: [number, number]) {
    this._values[0] = v[0];
    this._values[1] = v[1];
  }

  public get xy(): [number, number] {
    return [this._values[0], this._values[1]];
  }

  constructor(x: number | [number, number] = 0, y: number = 0) {
    if (Array.isArray(x)) {
      this._values[0] = x[0];
      this._values[1] = x[1];
    } else {
      this._values[0] = x;
      this._values[1] = y;
    }
  }

  public at(idx: number): number {
    return this._values[idx];
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
  }

  public copy(dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = new Vector2();
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  public negative(dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = this;
    dest.x = -this.x;
    dest.y = -this.y;
    return dest;
  }

  public equals(vec: Vector2, threshold: number = epsilon): boolean {
    return (
      Math.abs(this.x - vec.x) <= threshold &&
      Math.abs(this.y - vec.y) < threshold
    );
  }

  public squaredLength(): number {
    return this.x * this.x + this.y * this.y;
  }

  public length(): number {
    return Math.sqrt(this.squaredLength());
  }

  public add(vec: Vector2): Vector2 {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  public substract(vec: Vector2): Vector2 {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  public multiply(vec: Vector2): Vector2 {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  }

  public divide(vec: Vector2): Vector2 {
    this.x /= vec.x;
    this.y /= vec.y;
    return this;
  }

  public scale(s: number, dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = this;
    dest.x = this.x * s;
    dest.y = this.y * s;
    return dest;
  }

  public normalize(dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = this;
    let l = this.length();
    if (l === 1) return this.copy(dest);
    if (l === 0) {
      dest.x = 0;
      dest.y = 0;
      return dest;
    }
    l = 1 / l;
    dest.x = this.x * l;
    dest.y = this.y * l;
    return dest;
  }

  public multiplyMat2(mat: Matrix2, dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = this;
    return mat.multiplyVec2(this, dest);
  }

  public multiplyMat3(mat: Matrix3, dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = this;
    return mat.multiplyVec2(this, dest);
  }

  public static readonly one: Vector2 = new Vector2(1, 1);
  public static readonly zero: Vector2 = new Vector2(0, 0);

  public static cross(
    v1: Vector2,
    v2: Vector2,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    const x = v1.x,
      y = v1.y,
      x2 = v2.x,
      y2 = v2.y;
    const z = x * y2 - y * x2;
    dest.x = 0;
    dest.y = 0;
    dest.z = z;
    return dest;
  }

  public static dot(v1: Vector2, v2: Vector2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static squaredDistance(v1: Vector2, v2: Vector2): number {
    const dx = v2.x - v1.x,
      dy = v2.y - v1.y;
    return dx * dx + dy * dy;
  }

  public static distance(v1: Vector2, v2: Vector2): number {
    return Math.sqrt(Vector2.squaredDistance(v1, v2));
  }

  public static direction(
    v1: Vector2,
    v2: Vector2,
    dest: Vector2 | null = null
  ): Vector2 {
    if (dest === null) dest = new Vector2();
    const x = v2.x - v1.x,
      y = v2.y - v1.y;
    let l = Math.sqrt(x * x + y * y);
    if (l === 0) {
      dest.x = 0;
      dest.y = 0;
      return dest;
    }
    l = 1 / l;
    dest.x = x * l;
    dest.y = y * l;
    return dest;
  }

  public static mix(
    v1: Vector2,
    v2: Vector2,
    t: number,
    dest: Vector2 | null = null
  ): Vector2 {
    if (dest === null) dest = new Vector2();
    const x = v1.x,
      y = v1.y,
      x2 = v2.x,
      y2 = v2.y;
    dest.x = x + t * (x2 - x);
    dest.y = y + t * (y2 - y);
    return dest;
  }

  public static sum(
    v1: Vector2,
    v2: Vector2,
    dest: Vector2 | null = null
  ): Vector2 {
    if (dest === null) dest = new Vector2();
    dest.x = v1.x + v2.x;
    dest.y = v1.y + v2.y;
    return dest;
  }

  public static difference(
    v1: Vector2,
    v2: Vector2,
    dest: Vector2 | null = null
  ): Vector2 {
    if (dest === null) dest = new Vector2();
    dest.x = v1.x - v2.x;
    dest.y = v1.y - v2.y;
    return dest;
  }

  public static product(
    v1: Vector2,
    v2: Vector2,
    dest: Vector2 | null = null
  ): Vector2 {
    if (dest === null) dest = new Vector2();
    dest.x = v1.x * v2.x;
    dest.y = v1.y * v2.y;
    return dest;
  }

  public static quotient(
    v1: Vector2,
    v2: Vector2,
    dest: Vector2 | null = null
  ): Vector2 {
    if (dest === null) dest = new Vector2();
    dest.x = v1.x / v2.x;
    dest.y = v1.y / v2.y;
    return dest;
  }
}
