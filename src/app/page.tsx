"use client";

import { useEffect } from "react";
import Renderer from "./components/Renderer";
import { MainThree } from "../three/setup/MainThree";

export default function Home() {
  useEffect(() => {
    const init = async () => {
      await MainThree.init();
    };

    init();
  }, []);

  return (
    <main>
      <Renderer />
    </main>
  );
}
