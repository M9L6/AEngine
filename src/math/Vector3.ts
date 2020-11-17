import { epsilon } from "./MathUtils";
import { Matrix3 } from "./Matrix3";
import { Quaternion } from "./Quaternion";

export class Vector3 {
  private _values: Float32Array = new Float32Array(3);

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

  constructor(
    x: number | [number, number, number] = 0,
    y: number = 0,
    z: number = 0
  ) {
    if (Array.isArray(x)) {
      this._values[0] = x[0];
      this._values[1] = x[1];
      this._values[2] = x[2];
    } else {
      this._values[0] = x;
      this._values[1] = y;
      this._values[2] = z;
    }
  }

  public at(idx: number): number {
    return this._values[idx];
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  public copy(dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = new Vector3();
    dest.x = this.x;
    dest.y = this.y;
    dest.z = this.z;
    return dest;
  }

  public negative(dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = this;
    dest.x = -this.x;
    dest.y = -this.y;
    dest.z = -this.z;
    return dest;
  }

  public equals(v: Vector3, threshold: number = epsilon): boolean {
    return (
      Math.abs(this.x - v.x) <= threshold &&
      Math.abs(this.y - v.y) <= threshold &&
      Math.abs(this.z - v.z) <= threshold
    );
  }

  public squredLength(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public length(): number {
    return Math.sqrt(this.squredLength());
  }

  public add(v: Vector3): Vector3 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  public substract(v: Vector3): Vector3 {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  public multiply(v: Vector3): Vector3 {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }

  public divide(v: Vector3): Vector3 {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }

  public scale(s: number, dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = this;
    dest.x = this.x * s;
    dest.y = this.y * s;
    dest.z = this.z * s;
    return dest;
  }

  public normalize(dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = this;
    let l = this.length();
    if (l === 1) return this;
    if (l === 0) {
      dest.x = 0;
      dest.y = 0;
      dest.z = 0;
      return dest;
    }
    l = 1 / l;
    dest.x = this.x * l;
    dest.y = this.y * l;
    dest.z = this.z * l;
    return dest;
  }

  public multiplyMat3(mat: Matrix3, dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = this;
    return mat.multiplyVec3(this, dest);
  }

  public multiplyByQuat(
    quat: Quaternion,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = this;
    return quat.multiplyVec3(this, dest);
  }

  public toQuat(dest: Quaternion | null = null): Quaternion {
    if (dest === null) dest = new Quaternion();

    const c = new Vector3(),
      s = new Vector3();

    c.x = Math.cos(this.x * 0.5);
    s.x = Math.sin(this.x * 0.5);

    c.y = Math.cos(this.y * 0.5);
    s.y = Math.sin(this.y * 0.5);

    c.z = Math.cos(this.z * 0.5);
    s.z = Math.sin(this.z * 0.5);

    dest.x = s.x * c.x * c.z - c.x * s.y * s.z;
    dest.y = c.x * s.y * c.z + s.x + c.y * s.z;
    dest.z = c.x * c.y * s.z - s.x * s.y * c.z;
    dest.w = c.x * c.y * c.z + s.x * s.y * s.z;
    return dest;
  }

  public static readonly zero = new Vector3(0, 0, 0);
  public static readonly one = new Vector3(1, 1, 1);
  public static readonly right = new Vector3(1, 0, 0);
  public static readonly up = new Vector3(0, 1, 0);
  public static readonly forward = new Vector3(0, 0, 1);

  public static cross(
    v1: Vector3,
    v2: Vector3,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    const x = v1.x,
      y = v1.y,
      z = v1.z,
      x2 = v2.x,
      y2 = v2.y,
      z2 = v2.z;
    dest.x = y * z2 - z * y2;
    dest.y = z * x2 - x * z2;
    dest.z = x * y2 - y * x2;
    return dest;
  }

  public static dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  public static squaredDistance(v1: Vector3, v2: Vector3): number {
    const dx = v2.x - v1.x,
      dy = v2.y - v1.y,
      dz = v2.z - v1.z;
    return dx * dx + dy * dy + dz * dz;
  }

  public static distance(v1: Vector3, v2: Vector3): number {
    return Math.sqrt(Vector3.squaredDistance(v1, v2));
  }

  public static direction(
    v1: Vector3,
    v2: Vector3,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    const x = v2.x - v1.x,
      y = v2.y - v1.y,
      z = v2.z - v1.z;
    let l = Math.sqrt(x * x + y * x + z * z);
    if (l === 0) {
      dest.x = 0;
      dest.y = 0;
      dest.z = 0;
      return dest;
    }
    l = 1 / l;
    dest.x = x * l;
    dest.y = y * l;
    dest.z = z * l;
    return dest;
  }

  public static mix(
    v1: Vector3,
    v2: Vector3,
    t: number,
    dest: Vector3 | null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    dest.x = v1.x + t * (v2.x - v1.x);
    dest.y = v1.y + t * (v2.y - v1.y);
    dest.z = v1.z + t * (v2.z - v1.z);
    return dest;
  }

  public static sum(
    v1: Vector3,
    v2: Vector3,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    dest.x = v1.x + v2.x;
    dest.y = v1.y + v2.y;
    dest.z = v1.z + v2.z;
    return dest;
  }

  public static difference(
    v1: Vector3,
    v2: Vector3,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    dest.x = v1.x - v2.x;
    dest.y = v1.y - v2.y;
    dest.z = v1.z - v2.z;
    return dest;
  }

  public static product(
    v1: Vector3,
    v2: Vector3,
    dest: Vector3 | null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    dest.x = v1.x * v2.x;
    dest.y = v1.y * v2.y;
    dest.z = v1.z * v2.z;
    return dest;
  }

  public static quotient(
    v1: Vector3,
    v2: Vector3,
    dest: Vector3 | null = null
  ): Vector3 {
    if (dest === null) dest = new Vector3();
    dest.x = v1.x / v2.x;
    dest.y = v1.y / v2.y;
    dest.z = v1.z / v2.z;
    return dest;
  }
}
