import { Vector2 } from "./Vector2";

export class Matrix2 {
  public multiplyVec2(v: Vector2, dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = v;
    return dest;
  }
}
