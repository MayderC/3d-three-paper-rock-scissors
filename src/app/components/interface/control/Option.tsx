"use client";
import React, { MouseEventHandler } from "react";
import Image from "next/image";

const Option = ({
  fn,
  src,
}: {
  fn: MouseEventHandler<HTMLDivElement>;
  src: string;
}) => {
  return (
    <>
      <div onClick={fn}>
        <Image
          className="option"
          src={`/${src}`}
          alt={src.split(".")[0]}
          width={500}
          height={500}
        />
      </div>
    </>
  );
};

export default Option;
