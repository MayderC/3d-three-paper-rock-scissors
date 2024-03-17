import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
export class Loader extends GLTFLoader {
  constructor() {
    super();

    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();

    this.setDRACOLoader(dracoLoader);
  }
}
