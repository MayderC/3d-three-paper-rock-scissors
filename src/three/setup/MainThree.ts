import {
  WebGLRenderer,
  PCFSoftShadowMap,
  Scene,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  Fog,
  AnimationClip,
} from "three";
import { Camera } from "./Camera";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { SetupLights } from "./SetupLights";
import { Hand } from "./HandModel";
import {  ALLOWED_MOVEMENTS, ANIMATION_NAMES } from "@/game/logic/constants/AllowedMovements";


export class MainThree {
  public static renderer: WebGLRenderer | null = null;
  public static camera: Camera;
  public static model: Hand;
  public static animations: Map<ANIMATION_NAMES | ALLOWED_MOVEMENTS, AnimationClip> = new Map();

  public static scene: Scene = new Scene();

  private constructor() {}

  public static async init(fn: Function) {
    MainThree.setRender();
    MainThree.onResize();
    if (!MainThree.renderer) return;

    MainThree.model = new Hand(fn);
    await MainThree.model.loadHand();

    MainThree.animations.set(ANIMATION_NAMES.HELLO, MainThree.model.getAnimations()[0]);
    MainThree.animations.set(ANIMATION_NAMES.PAPER, MainThree.model.getAnimations()[1]);
    MainThree.animations.set(ANIMATION_NAMES.ROCK, MainThree.model.getAnimations()[2]);
    MainThree.animations.set(ANIMATION_NAMES.SCISSORS, MainThree.model.getAnimations()[3]);

    MainThree.renderer.shadowMap.enabled = true;
    MainThree.renderer.shadowMap.type = PCFSoftShadowMap;
    MainThree.renderer.setSize(window.innerWidth, window.innerHeight);

    MainThree.camera.position.z = 5;
    MainThree.camera.lookAt(0, 0, 0);

    MainThree.setFog();
    MainThree.setLights();
    MainThree.setPlane();
    MainThree.setOrbitControls();
    MainThree.loop();
  }
  private static setFog() {
    if (!MainThree.renderer) return;
    const fog = new Fog("#ff00ff", 4.5, 12.5);

    MainThree.scene.fog = fog;
    MainThree.renderer.setClearColor(fog.color);
  }

  private static setLights() {
    const lights = SetupLights.getLights();
    MainThree.scene.add(...lights);
  }

  private static setPlane() {
    const planeGeo = new PlaneGeometry(37, 13.5);

    const plane = new Mesh(
      planeGeo,
      new MeshStandardMaterial({ color: 0xffffff })
    );
    plane.rotation.x = (Math.PI / 180) * -45;
    plane.position.y = 0;
    plane.position.z = -2;
    plane.receiveShadow = true;
    MainThree.scene.add(plane);
  }

  private static setOrbitControls() {
    if (!MainThree.renderer) return;

    const controls = new OrbitControls(
      MainThree.camera,
      MainThree.renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.update();
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
