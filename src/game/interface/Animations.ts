import { Object3D } from "three";
import * as THREE from "three";

export const enum POSITION {
  LEFT = "left",
  RIGHT = "right",
}

export const animationTest = (model: Object3D) => {
  console.log("animationTest");
  const bones = model.children[1].children[1];

  model.rotation.y = 1.5;

  bones.children[3].rotation.x = 1.5;
  bones.children[3].children[0].rotation.x = 1.5;
  bones.children[3].children[0].children[0].rotation.x = 1;

  bones.children[4].rotation.x = 1.5;
  bones.children[4].children[0].rotation.x = 1.5;
  bones.children[4].children[0].children[0].rotation.x = 1;

  //rotate in z axis -0.3

  bones.children[3].rotation.z = 0.3;

  bones.children[4].rotation.z = 0.2;
  bones.children[4].children[0].rotation.z = 0.2;

  //create my own animation rotating the bones

  //const mixer = new THREE.AnimationMixer(bones.children[1]);

  // const track = new THREE.NumberKeyframeTrack(
  //   ".rotation[x]",
  //   [0, 1, 2, 3, 4, 5],
  //   [0, 0.5, 0, 0.5, 0, 0.5],
  //   THREE.InterpolateSmooth
  // );

  // const clip = new THREE.AnimationClip("rotate", 5, [track]);

  // const action = mixer.clipAction(clip);

  // action.play();

  // const clock = new THREE.Clock();

  // const animate = () => {
  //   requestAnimationFrame(animate);

  //   mixer.update(clock.getDelta());

  //   console.log(bones.rotation.x);
  // };

  // animate();
};

const rotateGeneric = (model: Object3D, position: POSITION) => {};

export const rotateModelY = (
  model: Object3D,
  position: POSITION,
  cb?: Function
) => {
  if (!model) return;

  const val = position === POSITION.LEFT ? 1.6 : -1.6;
  const y = model.rotation.y;
  const mixer = new THREE.AnimationMixer(model);

  const track = new THREE.NumberKeyframeTrack(
    ".rotation[y]",
    [0, 1, 2, 3, 4, 5],
    [y, val, y, val, y, val],
    THREE.InterpolateSmooth
  );

  if (cb) {
    mixer.addEventListener("finished", () => {
      cb();
    });
  }

  const clip = new THREE.AnimationClip("rotate", 1, [track]);
  const action = mixer.clipAction(clip);

  action.loop = THREE.LoopOnce;
  action.clampWhenFinished = true;
  action.play();
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getElapsedTime() * 0.5);
  };
  animate();
};

export const rotateModelYZero = (model: Object3D) => {
  if (!model) return;

  const y = model.rotation.y;
  const mixer = new THREE.AnimationMixer(model);

  const track = new THREE.NumberKeyframeTrack(
    ".rotation[y]",
    [0, 1, 2, 3, 4, 5],
    [y, 0, y, 0, y, 0],
    THREE.InterpolateSmooth
  );

  const clip = new THREE.AnimationClip("rotate", 1, [track]);

  const action = mixer.clipAction(clip);

  action.loop = THREE.LoopOnce;
  action.clampWhenFinished = true;

  action.play();

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getElapsedTime() * 0.5);
  };

  animate();
};

export const sayHello = (model: Object3D, dir: number, cb?: Function) => {
  if (!model) return;

  const mixer = new THREE.AnimationMixer(model);
  const y = model.rotation.y;
  const angle = 0.2;

  const values =
    dir === 1
      ? [y, y + angle, y, y + angle, y, y + angle]
      : [y, y - angle, y, y - angle, y, y - angle];

  const track = new THREE.NumberKeyframeTrack(
    ".rotation[x]",
    [0, 1, 2, 3, 4, 5],
    values,
    THREE.InterpolateSmooth
  );

  const clip = new THREE.AnimationClip("rotate", 4, [track]);

  const action = mixer.clipAction(clip);

  action.loop = THREE.LoopOnce;
  action.clampWhenFinished = true;

  if (cb) {
    mixer.addEventListener("finished", () => {
      cb();
    });
  }

  action.play();

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getElapsedTime() * 0.09);
  };

  animate();
};

export const hiFive = (left: Object3D, right: Object3D, cb?: Function) => {
  if (!left || !right) return;
  const xl = left.position.x;
  const arr = [];
  const speed = 1.4;
  for (let i = 1; i < 3; i++) arr.push(xl + speed * i);
  const arr2 = [xl, ...arr, ...arr.reverse(), xl];

  let arrRotation = [0, 0.3, 0.3 * 2, 0.3 * 2, 0.3, 0];

  hiFiveAnimation(left, arr2, arrRotation, cb);
  hiFiveAnimation(
    right,
    arr2.map((r) => r * -1),
    arrRotation.map((r) => r * -1),
    cb
  );
};

const hiFiveAnimation = (
  model: Object3D,
  arr: number[],
  ro: number[],
  cb?: Function
) => {
  const mixer = new THREE.AnimationMixer(model);
  const leftTrack = new THREE.NumberKeyframeTrack(
    ".position[x]",
    [0, 1, 2, 3, 4, 5],
    arr,
    THREE.InterpolateSmooth
  );

  console.log({ arr, ro });

  const axisZTrack = new THREE.NumberKeyframeTrack(
    ".position[z]",
    [0, 1, 2, 3, 4, 5],
    ro.map((r) => r * -2.5),
    THREE.InterpolateSmooth
  );

  const miniRotationTrack = new THREE.NumberKeyframeTrack(
    ".rotation[x]",
    [0, 1, 2, 3, 4, 5],
    ro,
    THREE.InterpolateSmooth
  );

  const leftClip = new THREE.AnimationClip("move", -1, [
    leftTrack,
    miniRotationTrack,
    axisZTrack,
  ]);
  const leftAction = mixer.clipAction(leftClip);

  leftAction.loop = THREE.LoopOnce;
  leftAction.clampWhenFinished = true;

  if (cb) {
    mixer.addEventListener("finished", () => {
      cb();
    });
  }

  leftAction.play();

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getElapsedTime() * 0.09);
  };
  animate();
};
