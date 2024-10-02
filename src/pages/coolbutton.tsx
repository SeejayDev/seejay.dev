import { LightIcon } from "@/icons/LightIcon";
import React, { useState } from "react";

const coolbutton = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="w-full max-w-2xl px-4 mx-auto mt-8">
      <div className="flex flex-wrap items-center text-lg justify-center">
        <p>The</p>
        <img
          className="w-36 mx-2 mt-0.5"
          src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
        />
        <p>button</p>
      </div>

      <div className="mt-8">
        <p>One of the cleanest implementations of skeuomorphism I have seen.</p>
        <p className="mt-2">So I decided to steal it.</p>
      </div>

      <div className="mt-8 w-full">
        <p>First I recreated:</p>
        <button className="bg-green-600 mt-1 active:bg-green-700 md:hover:bg-green-700 rounded-md px-4 py-1 text-sm text-white font-bold shadow-[0_8px_#166534] active:shadow-none active:translate-y-[8px] transition-all duration-150">
          <p>The original</p>
        </button>

        <div className="mt-8">
          <p>Then I did it my way:</p>
          <button
            className="group w-full aspect-[7/3] relative flex flex-col justify-end mt-2 shadow-lg rounded-2xl"
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={() => setIsPressed(false)}
          >
            <div className="bg-green-600 active:bg-green-700 md:hover:bg-green-700 rounded-2xl w-full h-5/6 z-20 absolute top-0 group-active:translate-y-[20%] transition-all duration-150">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white font-bold text-4xl md:text-5xl select-none">
                  Button Pro Max
                </p>
              </div>
            </div>
            <div className="relative h-1/2 w-full pointer-events-none">
              <div className="bg-green-800 rounded-2xl h-full z-10 relative"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default coolbutton;
