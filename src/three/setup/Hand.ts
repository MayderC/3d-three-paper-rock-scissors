import { Object3D } from "three";
import { Loader } from "./Loader";

export class Hand {
  private loader: Loader = new Loader();
  public model: Object3D | null = null;

  constructor() {
    this.loadHand().then((model) => {
      this.model = model;
    });
  }

  private async loadHand(): Promise<Object3D> {
    if (this.model) return this.model;
    const hand = await this.loader.loadAsync("/hand.glb");
    this.model = hand.scene;
    console.log("Hand loaded", hand.scene);
    return hand.scene;
  }

  public async getModel() {
    return await this.loadHand();
  }

  init() {
    console.log("Hand initialized");
  }
}
