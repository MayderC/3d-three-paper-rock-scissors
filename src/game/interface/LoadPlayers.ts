import { Hand } from "@/three/setup/HandModel";
import { Party } from "../logic/Party";
import { setPlayerPosition } from "./PlayerPosition";
import { MainThree } from "@/three/setup/MainThree";

export const loadPlayers = async (party: Party) => {
  if (!party.localPlayer || !party.remotePlayer) return;

  const hand = await new Hand();
  const handClone = hand.model?.clone();

  if (!handClone || !hand) return;

  party.localPlayer.model = handClone;
  party.remotePlayer.model = handClone;

  setPlayerPosition(party);

  MainThree.scene.add(party.localPlayer.model);
  MainThree.scene.add(party.remotePlayer.model);
};
