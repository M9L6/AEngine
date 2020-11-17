import { Matrix4 } from "../math/Matrix4";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { EventDispatch } from "./EventDispatch";

export class GraphNode extends EventDispatch {
  public uuid: string;
  public name: string;

  public localPosition: Vector3;

  private _position: Vector3;
  public getWorldPosition(): Vector3 {
    return this._position;
  }

  public quaternion: Quaternion;

  private _worldMatrix: Matrix4;

  private _localMatrix: Matrix4;

  constructor(name: string = "Node") {
    super();
    this.name = name;
    this.localPosition = new Vector3();
    this._position = new Vector3();
  }
}
