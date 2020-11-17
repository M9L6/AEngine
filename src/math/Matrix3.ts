import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";

export class Matrix3 {
  public multiplyVec2(v: Vector2, dest: Vector2 | null = null): Vector2 {
    if (dest === null) dest = v;
    return v;
  }

  public multiplyVec3(v: Vector3, dest: Vector3 | null = null): Vector3 {
    if (dest === null) dest = v;
    return v;
  }
}
