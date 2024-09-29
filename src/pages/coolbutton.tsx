import { LightIcon } from "@/icons/LightIcon";
import React, { useState } from "react";

const coolbutton = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="w-full sm:max-w-2xl mx-auto mt-8">
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
        <button className="bg-green-600 mt-1 hover:bg-green-700 rounded-md px-4 py-1 text-sm text-white font-bold shadow-[0_8px_#166534] active:shadow-none active:translate-y-[8px] transition-all duration-150">
          <p>The original</p>
        </button>

        <div className="mt-8">
          <p>Then I did it my way:</p>
          <button
            className="group w-full aspect-[7/3] relative flex flex-col justify-end mt-2"
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
          >
            <div className="bg-green-600 hover:bg-green-700 rounded-2xl w-full h-5/6 z-20 absolute top-0 group-active:translate-y-[20%] transition-all duration-150">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white font-bold text-6xl">Button Pro Max</p>
              </div>
            </div>
            <div className="relative h-1/2 w-full pointer-events-none">
              <div className="bg-green-800 rounded-2xl h-full z-10 relative"></div>
              {/* <LightIcon className="h-full text-transparent group-active:text-yellow-400 transition-colors duration-150 w-auto absolute right-0 bottom-0 rotate-90 -translate-y-1/4 translate-x-1/2 z-0" />
              <LightIcon className="h-full text-transparent group-active:text-yellow-400 transition-colors duration-150 w-auto absolute left-0 bottom-0 -rotate-90 -translate-y-1/4 -translate-x-1/2 z-0" /> */}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default coolbutton;
