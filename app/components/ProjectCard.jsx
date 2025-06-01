import React from "react";
import { useRef } from "react";
import Image from "next/image";

export default function ProjectCard({ disableSwitch, project, switchCard, changeHoveredCard, index  }) {
  const colorList = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-rose-100", text: "text-rose-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-violet-100", text: "text-violet-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-teal-100", text: "text-teal-700" },
    { bg: "bg-green-200", text: "text-green-700" },
    { bg: "bg-lime-100", text: "text-lime-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
  ];


  const getLetterSum = (str) =>
    str.toLowerCase().split("").reduce((sum, char) => {
      const code = char.charCodeAt(0);

      if (code >= 97 && code <= 122) {
      // letters a-z
        return sum + (code - 96);
      } else if (code >= 48 && code <= 57) {
      // digits 0-9
        return sum + (code - 48);
      }
      return sum; // ignore other chars
    }, 0);


  const addTag = (tag, index) => {
    const sum = getLetterSum(tag + tag.slice(0,4));
    const color = colorList[sum % colorList.length];

    return (
      <div
        key={index}
        className={`px-2 py-1 rounded-full smalltext ${color.bg} ${color.text}`}
      >
        {tag}
      </div>
    );
  };

  const hoverTimeout = useRef(null); // holds the timer

  const handlePointerOver = (index) => {
    if (disableSwitch == true) return;
    hoverTimeout.current = setTimeout(() => {
      switchCard(index);
    }, 300); // adjust hover delay here (e.g., 150ms)
  };

  const handlePointerOut = () => {
    clearTimeout(hoverTimeout.current); // cancel if moved away early
    changeHoveredCard(null);
  };


  return (
    <div className="h-fit w-auto cursor-pointer rounded-2xl bg-brand-white p-4 shadow-md">

      <div
        onPointerOver={() => handlePointerOver(index)}
        onPointerOut={() => handlePointerOut()}
        className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-1/2 hidden -translate-y-1/2 z-25 h-[75%] w-[80%] lg:block"
      />

      <div className={`relative h-75 w-[80vw] md:w-90 bg-[${project.color}] rounded-xl`}>
        <Image
          src={`/${project.imagePath}`}
          alt={project.title}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      <div className={`heading2 line-clamp-1 pt-4 text-[${project.color}]`}>
        {project.title}
      </div>

      <div className="mt-2 flex flex-row gap-1 overflow-x-auto">
        {project.stack.map((tag, index) => addTag(tag, index))}
      </div>

      <div className="smalltext w-[80vw] md:w-90 line-clamp-3 h-[6rem] pt-4 text-brand-black">
        {project.desc}
      </div>


    </div>
  );
}
