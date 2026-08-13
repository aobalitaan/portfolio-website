"use client";

import { useScrollTheme } from "../utils/ScrollProvider";
import Wave from "./Wave";

export default function Backdrop() {
  const { bgColor, blur } = useScrollTheme();

  return (
    <>
      <div className={`fixed inset-0 z-0 w-screen ${bgColor} transition-colors duration-500 ease-in`}>
        <div className="h-screen w-full opacity-50 [mask-image:linear-gradient(to_top,rgba(0,0,0,0.25)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0.25)_100%)]">
          <Wave />
        </div>
      </div>

      <div className={`fixed inset-0 z-0 h-screen w-screen ${blur} transition-all duration-750 ease-in`} />
    </>
  );
}
