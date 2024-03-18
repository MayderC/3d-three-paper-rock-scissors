import { Hand } from "@/three/setup/HandModel";
import { Party } from "../logic/Party";
import { setPlayerPosition } from "./PlayerPosition";
import { MainThree } from "@/three/setup/MainThree";

export const loadPlayers = async (party: Party) => {
  if (!party.localPlayer || !party.remotePlayer)
    throw new Error("Players not found in loadPlayers");

  const loaderHand = new Hand();
  const hand = await loaderHand.getModel();
  const handClone = hand.clone(true);

  if (!handClone || !hand) throw new Error("Hand model not found");

  party.localPlayer.model = hand;
  party.remotePlayer.model = handClone;

  setPlayerPosition(party);

  MainThree.scene.add(party.localPlayer.model);
  MainThree.scene.add(party.remotePlayer.model);

  console.log(MainThree.scene);
};
