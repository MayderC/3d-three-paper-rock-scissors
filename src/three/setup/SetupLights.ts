import * as THREE from "three";

export class SetupLights {
  constructor() {}

  public static getLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1284;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.far = 15;

    const left = new THREE.PointLight("#ff00ff", 16, 10);
    left.position.set(-4, 0.5, 1);
    left.shadow.camera.far = 15;
    left.castShadow = true;

    const mid = new THREE.PointLight("#00ffff", 16, 10);
    mid.position.set(0, 0.5, 1);
    mid.shadow.camera.far = 15;
    mid.castShadow = true;

    const right = new THREE.PointLight("#ffff00", 16, 10);
    right.position.set(4, 0.5, 1);
    right.shadow.camera.far = 15;
    right.castShadow = true;

    //helpers

    const arrHelper = [];
    arrHelper.push(new THREE.PointLightHelper(left));
    arrHelper.push(new THREE.PointLightHelper(mid));
    arrHelper.push(new THREE.PointLightHelper(right));

    const cameraHelper = [];
    //cameraHelper.push(new THREE.CameraHelper(left.shadow.camera));
    cameraHelper.push(new THREE.CameraHelper(mid.shadow.camera));
    //cameraHelper.push(new THREE.CameraHelper(right.shadow.camera));

    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);

    return [
      ambientLight,
      directionalLight,
      left,
      mid,
      right,
      helper,
      ...arrHelper,
      ...cameraHelper,
    ];
  }
}
