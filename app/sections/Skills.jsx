import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTracker } from "../utils/ScrollTracker";

export default function Skills() {

  const { activeSection, bgColor, actText, inacText, blur, sections, scrollPercent } = ScrollTracker();


  return (
    <div
      id="skills"
      className={`pt-20 relative h-full w-full bg-brand-black backdrop-blur-md text-${inacText} px-4 py-4 md:px-8 lg:px-16 overflow-visible`}
    >
      Under Construction
    </div>
  );
}
