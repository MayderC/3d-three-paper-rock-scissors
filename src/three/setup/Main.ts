import {
  WebGLRenderer,
  PCFSoftShadowMap,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  AxesHelper,
  ArrayCamera,
  AmbientLight,
  PointLight,
} from "three";
import { HandleCameras } from "./HandleCameras";
import { Hand } from "./Hand";

export class Main {
  private static renderer: WebGLRenderer | null = null;
  private static camera: ArrayCamera = new HandleCameras();

  private static scene: Scene = new Scene();

  private constructor() {}

  public static async init() {
    Main.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("three") as HTMLCanvasElement,
    });
    Main.renderer.shadowMap.enabled = true;
    Main.renderer.shadowMap.type = PCFSoftShadowMap;
    Main.renderer.setSize(window.innerWidth, window.innerHeight);

    const axis = new AxesHelper(5);
    Main.scene.add(axis);
    Main.camera.cameras.forEach((camera) => {
      camera.position.z = 5;
    });

    const light = new AmbientLight(0xffffff, 0.5);

    const hand = new Hand();
    const model = await hand.getModel();

    console.log("Model", model);
    Main.scene.add(model);
    Main.scene.add(light);

    const pointLight = new PointLight(0xffffff, 50);
    pointLight.position.set(1, 1, 10);
    pointLight.castShadow = true;
    Main.scene.add(pointLight);

    Main.loop();
    //Main.testCube();
  }

  private static testCube() {
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    Main.scene.add(cube);
  }

  public resize() {
    Main.renderer?.setSize(window.innerWidth, window.innerHeight);
  }

  private static loop() {
    requestAnimationFrame(Main.loop);
    Main.renderer?.render(Main.scene, Main.camera.cameras[0]);
  }
}
