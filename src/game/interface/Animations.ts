import { MainThree } from "@/three/setup/MainThree";
import { Object3D } from "three";
import * as THREE from "three";
import { ALLOWED_MOVEMENTS, ANIMATION_NAMES } from "../logic/constants/AllowedMovements";

export const enum POSITION {
  LEFT = "left",
  RIGHT = "right",
}

export const sayHello = (model: Object3D, wait: number) => {
  if (!model) return;
  const animationClip = MainThree.model.getAnimations()[0];
  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(animationClip);
  action.loop = THREE.LoopOnce;

  const clock = new THREE.Clock();
  action.play();
  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta());
  };
  setTimeout(() => {
    animate();
  }, wait);

};


export const attemptAnimation = (model: Object3D, name: ANIMATION_NAMES | ALLOWED_MOVEMENTS, wait: number =0, cb?: Function) => {
  
  const animationClip = MainThree.animations.get(name);
  if (!animationClip || !model) return;

  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(animationClip);
  action.loop = THREE.LoopOnce;

  action.timeScale = 1 / 2;

  if (cb) {
    mixer.addEventListener("finished", () => {
      cb();
    });
  }
  action.play();
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta());
  };

  setTimeout(() => {
    animate();
  }, wait);

}
