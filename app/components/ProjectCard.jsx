import React from "react";
import { useRef } from "react";
import Image from "next/image";
import Tag from "./Tag";

export default function ProjectCard({ disableSwitch, project, show, switchCard, changeHoveredCard, index }) {
  const hoverTimeout = useRef(null);

  const handlePointerOver = (index) => {
    if (disableSwitch == true){
      return;
    }
    hoverTimeout.current = setTimeout(() => {
      switchCard(index);
    }, 300);
  };

  const handlePointerOut = () => {
    clearTimeout(hoverTimeout.current);
    changeHoveredCard(null);
  };


  return (
    // Width is pinned here rather than on each child: the tag row is
    // min-content-sized, so an auto-width card stretches to fit every chip.
    <div className={"bg-brand-white duration-250 h-fit w-[80vw] md:w-[392px] rounded-2xl p-4 shadow-md transition-all ease-in"}>

      <div
        onPointerOver={() => handlePointerOver(index)}
        onPointerOut={() => handlePointerOut()}
        className={`z-25 pointer-events-auto absolute left-1/2 top-1/2 hidden h-[75%] w-[80%] -translate-x-1/2 -translate-y-1/2 ${show ? "cursor-pointer" : ""} lg:block`}
      />

      <div
        className="relative aspect-16/10 w-full rounded-xl overflow-hidden"
        style={{ backgroundColor: project.color }}
      >
        <Image
          src={`/${project.imagePath}`}
          alt={`${project.title} — ${project.subtitle}`}
          fill={true}
          sizes="(max-width: 768px) 80vw, 360px"
          priority={index === 0}
          className="rounded-xl object-cover object-top"
        />
      </div>

      <div className="heading2 line-clamp-1 pt-4" style={{ color: project.color }}>
        {project.title}
      </div>

      <div className="regulartext text-brand-black/70 line-clamp-1">
        {project.subtitle}
      </div>

      {/* Wrap rather than scroll — on desktop there's no touch affordance, so a
          horizontally-scrolled row just hides the back half of the stack. */}
      <div className="text-brand-black/70 mt-3 flex min-h-16 w-full flex-wrap content-start gap-1.5">
        {project.stack.map((tag) => <Tag key={tag} label={tag} />)}
      </div>

      <div className="smalltext text-brand-black line-clamp-4 h-[6rem] w-full pt-3">
        {project.desc}
      </div>


    </div>
  );
}
