"use client";
import React from "react";

const LandingHeader = () => {
  return (
    <div className="mx-2 flex flex-row justify-between md:mx-20 lg:mx-20 xl:mx-20 2xl:mx-20">
      <div className="mt-4 flex">
        <span className="text-2xl font-bold  hover:cursor-pointer text-black">
          Product<span className="text-[#9333EA]">Hunt</span>
        </span>
      </div>
    </div>
  );
};

export default LandingHeader;
