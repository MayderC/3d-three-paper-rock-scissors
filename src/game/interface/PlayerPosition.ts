import { Party } from "../logic/Party";

export const setPlayerPosition = (party: Party) => {
  if (!party.localPlayer?.model || !party.remotePlayer?.model)
    throw new Error("Player models not found in setPlayerPosition");

  if (window.innerWidth < 768) {
    party.localPlayer.model.position.x = 0;
    party.localPlayer.model.position.y = 1;
    party.localPlayer.model.position.z = 0;

    party.remotePlayer.model.position.x = 0;
    party.remotePlayer.model.position.y = -1;
    party.remotePlayer.model.position.z = 0;
  } else {
    party.localPlayer.model.position.x = -1;
    party.localPlayer.model.position.y = -4.5;
    party.localPlayer.model.position.z = 1;

    party.remotePlayer.model.position.x = 6.4;
    party.remotePlayer.model.position.y = -4.5;
    party.remotePlayer.model.position.z = 1;

    //rotation

    //party.localPlayer.model.rotation.y = Math.PI;
  }
};
