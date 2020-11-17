import { Vector4 } from "./Vector4";

export class Matrix4 {
  public static Identify = new Matrix4();

  public elements: Array<number>;
  constructor(
    m11: number = 1,
    m12: number = 0,
    m13: number = 0,
    m14: number = 0,
    m21: number = 0,
    m22: number = 1,
    m23: number = 0,
    m24: number = 0,
    m31: number = 0,
    m32: number = 0,
    m33: number = 1,
    m34: number = 0,
    m41: number = 0,
    m42: number = 0,
    m43: number = 0,
    m44: number = 1
  ) {
    this.elements = [
      m11,
      m12,
      m13,
      m14,
      m21,
      m22,
      m23,
      m24,
      m31,
      m32,
      m33,
      m34,
      m41,
      m42,
      m43,
      m44,
    ];
  }

  public multiplyVec4(v: Vector4, dest: Vector4 | null = null): Vector4 {
    if (dest === null) dest = new Vector4();
    return dest;
  }
}
