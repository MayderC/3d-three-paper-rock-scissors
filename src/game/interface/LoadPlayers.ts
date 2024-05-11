import { Party } from "../logic/Party";
import { setPlayerPosition } from "./PlayerPosition";
import { MainThree } from "@/three/setup/MainThree";

export const loadPlayers = (party: Party) => {
  if (!party.localPlayer || !party.remotePlayer)
    throw new Error("Players not found in loadPlayers");
  
  party.localPlayer.model = MainThree.model.getModel();
  party.remotePlayer.model = MainThree.model.getModel();
  setPlayerPosition(party);

  MainThree.scene.add(party.localPlayer.model);
  MainThree.scene.add(party.remotePlayer.model);
};
