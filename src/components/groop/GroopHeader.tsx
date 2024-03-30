import Link from "next/link";
import React from "react";

const GroopHeader = () => {
  return (
    <Link href="./">
      <p className="font-bold text-6xl text-purple-600 text-center mt-8">
        GROOP
      </p>
      <p className="text-center text-sm font-bold italic text-purple-600 mb-8">
        A grouping app for badminton
      </p>
    </Link>
  );
};

export default GroopHeader;
