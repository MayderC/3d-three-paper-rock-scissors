import {
  WebGLRenderer,
  PCFSoftShadowMap,
  Scene,
  AxesHelper,
  AmbientLight,
  PerspectiveCamera,
} from "three";
import { Camera } from "./Camera";

export class MainThree {
  public static renderer: WebGLRenderer | null = null;
  public static camera: Camera;

  public static scene: Scene = new Scene();

  private constructor() {}

  public static async init() {
    MainThree.setRender();
    MainThree.onResize();
    if (!MainThree.renderer) return;

    MainThree.renderer.shadowMap.enabled = true;
    MainThree.renderer.shadowMap.type = PCFSoftShadowMap;
    MainThree.renderer.setSize(window.innerWidth, window.innerHeight);

    const axis = new AxesHelper(5);
    MainThree.scene.add(axis);
    MainThree.camera.position.z = 5;
    MainThree.camera.lookAt(0, 0, 0);
    const light = new AmbientLight(0xffffff, 2);
    MainThree.scene.add(light);
    MainThree.loop();
  }

  private static setRender() {
    MainThree.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("three") as HTMLCanvasElement,
    });
  }

  public static onResize() {
    window.addEventListener("resize", () => {
      if (!MainThree.renderer) return;
      MainThree.renderer.setSize(window.innerWidth, window.innerHeight);
      MainThree.camera.onResize();
    });
  }

  private static loop() {
    requestAnimationFrame(MainThree.loop);
    MainThree.renderer?.render(MainThree.scene, MainThree.camera);
  }
}
