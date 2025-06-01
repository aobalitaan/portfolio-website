import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTracker } from "../utils/ScrollTracker";

export default function Contact() {

  const { activeSection, bgColor, actText, inacText, blur, sections, scrollPercent } = ScrollTracker();
 
  return (
    <div
      id="contact"
      className={`pt-20 relative bg-brand-white backdrop-blur-md h-full w-full text-${inacText} px-4 py-4 md:px-8 lg:px-16 overflow-visible`}
    >
      Contact
    </div>
  );
}
