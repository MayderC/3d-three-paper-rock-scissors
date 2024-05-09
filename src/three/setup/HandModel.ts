import { AnimationClip, Object3D } from "three";
import { Loader } from "./Loader";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export class Hand {
  private loader: Loader;
  private model: Object3D | null = null;
  private isShadowCaster: boolean = true;
  private animations : AnimationClip[];

  constructor(fn: Function) {
    this.loader = new Loader(fn);
    this.animations = [];
  }

  private setShadowCaster() {
    if (!this.model || !this.isShadowCaster) return;
    this.model.traverse((child: any) => {
      child.castShadow = true;
      child.receiveShadow = false;
    });
  }

  public async loadHand(): Promise<Object3D> {
    if (this.model) {
      console.log("Hand model already loaded");
      return this.model;
    }
    console.log("Loading hand model");
    const hand = await this.loader.loadAsync("/hands_low_poly2.glb");

    this.animations = hand.animations;
    this.model = hand.scene;
    this.model.scale.set(4.5, 4.5, 4.5);
    this.model.rotation.y = Math.PI / 90;
    this.setShadowCaster();
    return this.model;
  }

  public getModel() {
    if (!this.model) throw new Error("Model not loaded");
    return SkeletonUtils.clone(this.model);
  }

  public getAnimations() {
    return this.animations;
  }
}
