"use client";

import { useEffect } from "react";
import Renderer from "./components/Renderer";
import { Main } from "../three/setup/Main";

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
