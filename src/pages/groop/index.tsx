import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="px-2 w-full mx-auto max-w-xs mt-8">
      <p className="font-bold text-6xl text-purple-600 text-center">GROOP</p>
      <p className="text-center text-sm font-bold italic text-purple-600">
        A grouping app for badminton
      </p>

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
          <div className="w-1/5 p-2 aspect-square text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.18 10.94c.2-.44.32-.92.32-1.44C15.5 7.57 13.93 6 12 6c-.52 0-1 .12-1.44.32l4.62 4.62z"
              />
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 13c-2.32 0-4.45.8-6.14 2.12A7.957 7.957 0 0 1 4 12c0-1.85.63-3.55 1.69-4.9l2.86 2.86a3.47 3.47 0 0 0 2.99 2.99l2.2 2.2c-.57-.1-1.15-.15-1.74-.15zm6.31 1.9L7.1 5.69A7.902 7.902 0 0 1 12 4c4.42 0 8 3.58 8 8c0 1.85-.63 3.54-1.69 4.9z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-bold">Quick Groop</p>
            <ul className="list-disc ml-4 text-sm italic">
              <li>No names</li>
              <li>Enter no. of people and go</li>
            </ul>
          </div>
        </Link>

        <a
          href="/groop/advanced"
          className="border-4 border-purple-600 rounded-md p-2 flex items-center space-x-2"
        >
          <div className="w-1/5 p-2 aspect-square text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-bold">Advanced Groop</p>
            <ul className="list-disc ml-4 text-sm italic">
              <li>Enter player names</li>
              <li>History tracking</li>
              <li>Duplication avoidance</li>
            </ul>
          </div>
        </a>
      </div>
    </div>
  );
};

export default index;
