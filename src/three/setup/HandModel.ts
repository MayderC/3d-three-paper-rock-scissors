import { Object3D } from "three";
import { Loader } from "./Loader";
import { is } from "./../../../node_modules/@babel/types/lib/index-legacy.d";

export class Hand {
  private loader: Loader = new Loader();
  public model: Object3D | null = null;
  private isShadowReceiver: boolean = true;
  private isShadowCaster: boolean = true;

  constructor() {
    this.loadHand().then((model) => {
      this.model = model;
    });
  }

  private setShadowReceiver() {
    if (!this.model || !this.isShadowReceiver) return;
    this.model.traverse((child) => {
      if (child instanceof Object3D) {
        child.receiveShadow = true;
      }
    });
    this.model.receiveShadow = true;
  }

  private setShadowCaster() {
    if (!this.model || !this.isShadowCaster) return;
    this.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    this.model.castShadow = true;
  }

  private async loadHand(): Promise<Object3D> {
    if (this.model) return this.model;
    const hand = await this.loader.loadAsync("/hand.glb");
    this.model = hand.scene;

    this.setShadowReceiver();
    this.setShadowCaster();

    return hand.scene;
  }

  public async getModel() {
    return await this.loadHand();
  }
}
