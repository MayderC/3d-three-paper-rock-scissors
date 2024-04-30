"use client";
import React, { MouseEventHandler } from "react";
import Image from "next/image";

const Option = ({ fn }: { fn: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <>
      <div onClick={fn}>
        <Image src="/images/option.png" alt="option" width={500} height={500} />
      </div>
    </>
  );
};

export default Option;
