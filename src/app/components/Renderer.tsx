"use client";
import "../globals.css";
import { Menu } from "@/game/interface/Menu";
import { Camera } from "@/three/setup/Camera";
import { MainThree } from "@/three/setup/MainThree";
import { useEffect, useState } from "react";
import { Party } from "@/game/logic/Party";
import { useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";
import { InterfaceView } from "./interface/InterfaceView";
import { Control } from "./interface/control/Control";

const Renderer = () => {
  const [party, setParty] = useState<Party | null>(null);
  const [secondsPerRound, setSecondsPerRound] = useState<number>(0);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const refLoad = useRef<HTMLDivElement | null>(null);
  const [move, setMove] = useState<string>("");

  useEffect(() => {
    if (!loading) refLoad.current?.classList.add("hidden");
  }, [loading]);

  const setLoadingHandler = (value: boolean) => setLoading(value);



  useEffect(() => {
    if (MainThree.renderer) return;
    const init = async () => {
      const cam = new Camera();
      MainThree.camera = cam;
      await MainThree.init(setLoadingHandler);
      const menu = Menu.getInstance();
      menu.setStateSecondsHandler(setSecondsPerRound)
      setMenu(menu);
      setParty(Party.getParty());
    };

    init();
  }, []);

  return (
    <main className="main">
      <div ref={refLoad} className="loading">
        <h1 className="title">Rock Paper Scissors</h1>
        <LoadingAnimation />
      </div>
      <canvas id="three"></canvas>
      <div className="game-interface">
        <InterfaceView setMove={setMove} move={move} party={party!} menu={menu!} seconds={secondsPerRound!} />
        <Control setMove={setMove} party={party!}></Control>
      </div>
    </main>
  );
};

export default Renderer;
