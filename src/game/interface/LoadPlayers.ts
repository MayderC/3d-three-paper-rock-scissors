import { Hand } from "@/three/setup/HandModel";
import { Party } from "../logic/Party";
import { setPlayerPosition } from "./PlayerPosition";
import { MainThree } from "@/three/setup/MainThree";
import { attemptAnimation, POSITION, rotateModelY, sayHello } from "./Animations";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import { Object3D, Scene } from "three";

export const loadPlayers = (party: Party) => {
  if (!party.localPlayer || !party.remotePlayer)
    throw new Error("Players not found in loadPlayers");

  const hand = MainThree.model.getModel();
  

  hand.rotation.y = 0

  party.localPlayer.model = hand
  party.remotePlayer.model = SkeletonUtils.clone(hand);
  setPlayerPosition(party);

  sayHello(party.localPlayer.model, 0);
  sayHello(party.remotePlayer.model, 200);


  MainThree.scene.add(party.localPlayer.model);
  MainThree.scene.add(party.remotePlayer.model);

  console.log(MainThree.scene.children);
};
