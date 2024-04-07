import { Hand } from "@/three/setup/HandModel";
import { Party } from "../logic/Party";
import { setPlayerPosition } from "./PlayerPosition";
import { MainThree } from "@/three/setup/MainThree";
import { hiFive, POSITION, rotateModelY, sayHello } from "./Animations";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const loadPlayers = (party: Party) => {
  if (!party.localPlayer || !party.remotePlayer)
    throw new Error("Players not found in loadPlayers");

  const hand = MainThree.model.getModel();
  const handClone = SkeletonUtils.clone(hand);
  handClone.name = "handClone";

  party.localPlayer.model = hand;
  party.remotePlayer.model = handClone;

  setPlayerPosition(party);

  //animationTest(party.localPlayer.model);

  // setTimeout(() => {
  //   console.log("rotateModelY LEFT");
  //   if (party.remotePlayer?.model && party.localPlayer?.model) {
  //     rotateModelY(party.remotePlayer.model, POSITION.RIGHT);
  //     rotateModelY(party.localPlayer.model, POSITION.LEFT);
  //     sayHello(party.remotePlayer.model, 1);
  //     sayHello(party.localPlayer.model, -1, () => {
  //       if (party?.remotePlayer?.model && party?.localPlayer?.model)
  //         hiFive(party.localPlayer.model, party.remotePlayer.model);
  //     });
  //   }
  // }, 1000);

  MainThree.scene.add(party.localPlayer.model);
  MainThree.scene.add(party.remotePlayer.model);
};
