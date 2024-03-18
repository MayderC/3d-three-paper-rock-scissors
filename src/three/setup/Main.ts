import {
  WebGLRenderer,
  PCFSoftShadowMap,
  Scene,
  AxesHelper,
  AmbientLight,
} from "three";
import { Camera } from "./Camera";

export class Main {
  private static renderer: WebGLRenderer | null = null;
  private static camera: Camera = new Camera();

  private static scene: Scene = new Scene();

  private constructor() {}

  public static async init() {
    Main.setRender();
    Main.onResize();
    if (!Main.renderer) return;

    Main.renderer.shadowMap.enabled = true;
    Main.renderer.shadowMap.type = PCFSoftShadowMap;
    Main.renderer.setSize(window.innerWidth, window.innerHeight);

    const axis = new AxesHelper(5);
    Main.scene.add(axis);
    Main.camera.position.z = 5;

    const light = new AmbientLight(0xffffff, 0.5);
    Main.scene.add(light);
    Main.loop();
  }

  private static setRender() {
    Main.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("three") as HTMLCanvasElement,
    });
  }

  public static onResize() {
    window.addEventListener("resize", () => {
      if (!Main.renderer) return;
      Main.renderer.setSize(window.innerWidth, window.innerHeight);
      Main.camera.onResize();
    });
  }

  private static loop() {
    requestAnimationFrame(Main.loop);
    Main.renderer?.render(Main.scene, Main.camera);
  }
}
