"use client";
import "../globals.css";
import { Menu } from "@/game/interface/Menu";
import { Camera } from "@/three/setup/Camera";
import { MainThree } from "@/three/setup/MainThree";
import { useEffect, useState } from "react";
import { Control } from "./control/Control";
import { Party } from "@/game/logic/Party";
import { useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";

const Renderer = () => {
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const refLoad = useRef<HTMLDivElement | null>(null);

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
      menu.start();
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
      <Control party={party!}></Control>
    </main>
  );
};

export default Renderer;
