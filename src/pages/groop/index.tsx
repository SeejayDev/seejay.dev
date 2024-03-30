import GroopHeader from "@/components/groop/GroopHeader";
import CameraIcon from "@/icons/CameraIcon";
import GroupIcon from "@/icons/GroupIcon";
import SpeedIcon from "@/icons/SpeedIcon";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="px-2 w-full mx-auto max-w-xs mt-8">
      <GroopHeader />
      <div className="flex items-center justify-center space-x-1 font-medium mt-8">
        <p className="">What kind of</p>
        <p className=" uppercase font-bold text-purple-600">groop</p>
        <p className="">do you need?</p>
      </div>

      <div className="mt-4 space-y-2">
        <Link
          href="/groop/quick"
          className="border-4 border-purple-600 rounded-md p-2 flex items-center space-x-2"
        >
          <div className="w-1/5 p-2 aspect-square text-purple-600 flex justify-center">
            <SpeedIcon className="text-4xl" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Quick Groop</p>
            <ul className="list-disc ml-4 text-sm italic">
              <li>No names</li>
              <li>Enter no. of people and go</li>
            </ul>
          </div>
        </Link>

        <Link
          href="/groop/advanced"
          className="border-4 border-purple-600 rounded-md p-2 flex items-center space-x-2"
        >
          <div className="w-1/5 p-2 aspect-square text-purple-600 flex justify-center">
            <GroupIcon className="text-4xl" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Advanced Groop</p>
            <ul className="list-disc ml-4 text-sm italic">
              <li>Enter player names</li>
              <li>History tracking</li>
              <li>Duplication avoidance</li>
            </ul>
          </div>
        </Link>

        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-1 bg-black rounded-full"></div>
          <p className="font-bold">OR</p>
          <div className="flex-1 h-1 bg-black rounded-full"></div>
        </div>

        <Link
          href="/groop/join"
          className="border-4 border-purple-600 rounded-md flex items-center space-x-2 px-2 pointer-events-none opacity-50"
        >
          <div className="w-1/5 p-2 aspect-square text-purple-600 flex justify-center items-center">
            <CameraIcon className="text-4xl" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Scan a Groop QR</p>
            <ul className="list-disc ml-4 text-sm italic">
              <li>View upcoming rounds</li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default index;
