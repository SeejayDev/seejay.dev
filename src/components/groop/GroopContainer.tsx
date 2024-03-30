import React from "react";
import GroopHeader from "./GroopHeader";

const GroopContainer = (props: any) => {
  return (
    <div className="px-2 w-full mx-auto max-w-xs mt-8">
      <GroopHeader />
      {props.children}
    </div>
  );
};

export default GroopContainer;
