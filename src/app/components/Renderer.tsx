"use client";

import { Menu } from "@/game/interface/Menu";
import { Camera } from "@/three/setup/Camera";
import { MainThree } from "@/three/setup/MainThree";
import { useEffect } from "react";

const Renderer = () => {
  useEffect(() => {
    if (MainThree.renderer) return;

    const init = async () => {
      const cam = new Camera();
      MainThree.camera = cam;
      await MainThree.init();
      const menu = Menu.getInstance();
      menu.start();
    };

    init();
  }, []);

  return <canvas id="three"></canvas>;
};

export default Renderer;
