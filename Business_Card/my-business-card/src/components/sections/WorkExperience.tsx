"use client";

import FrostedGlass from "@/components/card/FrostedGlass";
import { Button } from "@/components/button/Button";
import { Tag } from "@/components/button/Tag";

export default function WorkExperience() {
  return (
    <FrostedGlass
      variant="dark"
      color="green"
      className="rounded-xl flex-1 p-0 flex flex-col justify-between"
    >
      <h2 className="text-lg text-[var(--color-foreground)]">Work Experience</h2>

      {/* JOB LIST */}
      <div className="flex flex-col justify-items-start align-top ">
        {/* Job */}
        <div className="flex flex-row  text-xs font-light items-start justify-evenly">
          {/* date */}
          <div className="text-[9px] font-light flex-none text-left  flex flex-row ">
            <p>Jul 22</p>
            <p> - </p>
            <p>Oct 22</p>
          </div>

          {/* title+where+(tag) - shorter but flexible */}
          <div className="flex-1 min-w-0 flex flex-col ">
            {/* title - don't wrap, allow overflow */}
            <h3 className="text-base whitespace-nowrap overflow-visible">Software Developer</h3>

            <div className="text-[9px] flex flex-row whitespace-nowrap overflow-visible">
              {/* employer */}
              <p className="">Mediavest AS</p>
              <p className="mr-1">,</p>
              {/* place */}
              <p className="mr-1">Bergen</p>
              {/* tag */}
              <Tag className="text-[9px] px-2 h-4 pb-1 pt-0.5 mt-0.5">Project</Tag>
            </div>
          </div>

          {/* read_more - do not stretch, fit content */}
          <div className="flex-none self-start ">
            <Button shape="pill" color="none" className="w-auto inline-flex text-[11px] font-light p-1">Read more</Button>
          </div>
        </div>

        <div className="flex flex-row  text-xs font-light items-start justify-evenly">
          {/* date */}
          <div className="text-[9px] font-light flex-none text-left  flex flex-row ">
            <p>Jul 22</p>
            <p> - </p>
            <p>Oct 22</p>
          </div>

          {/* title+where+(tag) - shorter but flexible */}
          <div className="flex-1 min-w-0 flex flex-col justify-items-center">
            {/* title - don't wrap, allow overflow */}
            <h3 className="text-base whitespace-nowrap overflow-visible">Software Developer</h3>

            <div className="text-[9px] flex flex-row whitespace-nowrap overflow-visible">
              {/* employer */}
              <p className="">Mediavest AS</p>
              <p className="mr-1">,</p>
              {/* place */}
              <p className="mr-1">Bergen</p>
            </div>
          </div>

          {/* read_more - do not stretch, fit content */}
          <div className="flex-none self-start ">
            <Button shape="pill" color="none" className="w-auto inline-flex text-[11px] font-light p-1">Read more</Button>
          </div>
        </div>

        <div className="flex flex-row  text-xs font-light items-start justify-evenly">
          {/* date */}
          <div className="text-[9px] font-light flex-none text-left  flex flex-row ">
            <p>Jul 22</p>
            <p> - </p>
            <p>Oct 22</p>
          </div>

          {/* title+where+(tag) - shorter but flexible */}
          <div className="flex-1 min-w-0 flex flex-col ">
            {/* title - don't wrap, allow overflow */}
            <h3 className="text-base whitespace-nowrap overflow-visible">Software Developer</h3>

            <div className="text-[9px] flex flex-row whitespace-nowrap overflow-visible">
              {/* employer */}
              <p className="">Mediavest AS</p>
              <p className="mr-1">,</p>
              {/* place */}
              <p className="mr-1">Bergen</p>
            </div>
          </div>

          {/* read_more - do not stretch, fit content */}
          <div className="flex-none self-start ">
            <Button shape="pill" color="none" className="w-auto inline-flex text-[11px] font-light p-1">Read more</Button>
          </div>
        </div>
      </div>
    </FrostedGlass>
  );
}
