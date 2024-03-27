import { Hand } from "@/three/setup/HandModel";
import { Party } from "../logic/Party";
import { setPlayerPosition } from "./PlayerPosition";
import { MainThree } from "@/three/setup/MainThree";

export const loadPlayers = async (party: Party) => {
  if (!party.localPlayer || !party.remotePlayer)
    throw new Error("Players not found in loadPlayers");

  const loaderHand = new Hand();
  //TODO: Fix to load the same model for both players
  // clone the model to have two different instances
  const hand = await loaderHand.getModel();
  const handClone = await loaderHand.getModel();

  if (!handClone || !hand) throw new Error("Hand model not found");

  party.localPlayer.model = hand;
  party.remotePlayer.model = handClone;

  setPlayerPosition(party);

  MainThree.scene.add(party.localPlayer.model);
  MainThree.scene.add(party.remotePlayer.model);
};
