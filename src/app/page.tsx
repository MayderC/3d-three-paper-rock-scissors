"use client";

import { useEffect } from "react";
import Renderer from "./components/Renderer";
import { Main } from "../three/setup/Main";
import { doAttemptWithStrategies } from "@/game/logic/domain/GameLogic";
import { ALLOWED_MOVEMENTS } from "@/game/logic/constants/AllowedMovements";
import { Player } from "@/game/logic/Player";

export default function Home() {
  useEffect(() => {
    const init = async () => {
      await Main.init();
    };

    init();
  }, []);

  return (
    <main>
      <Renderer />
    </main>
  );
}
