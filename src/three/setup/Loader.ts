import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { LoadingManager } from "three";

export class Loader extends GLTFLoader {
  constructor(fn: Function) {
    const loadManager = new LoadingManager();

    loadManager.onStart = () => fn(true);
    loadManager.onLoad = () => fn(false);

    super(loadManager);

    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();

    this.setDRACOLoader(dracoLoader);
  }
}
