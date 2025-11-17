"use client";

import FrostedGlass from "@/components/card/FrostedGlass";
import { Button } from "@/components/button/Button";
import { Tag } from "@/components/button/Tag";
import { LuChevronsRight } from "react-icons/lu";
import { cn } from "@/lib/utils";

export default function WorkExperience() {
	return (
		<FrostedGlass
			variant="dark"
			color="green"
			//   className="h-60 w-80 rounded-xl flex-1 p-0 flex flex-col justify-between "
			className={cn(
				"rounded-xl flex-1 flex flex-col  gap-1 ",
				// "p-3",
				"px-4 py-3",
				// "justify-between",
				"justify-evenly",
				"h-full"
			)}
		>
			<h2 className="text-md font-thin text-[var(--color-foreground)]">
				{" "}
				Work Experience{" "}
			</h2>
			<hr className="text-[var(--color-surface-white-12-secondary))]" />

			{/* JOB-LIST */}
			{/* <div className="flex flex-col justify-items-start align-top gap-2"> */}
			<div
				className={cn(
					"flex flex-col gap-2",
					"h-full w-full",
					"justify-evenly",
					// "justify-between",
					// "justify-start",
					// "justify-self-stretch",
					// "align-top",
					// "justify-around"
					""
				)}
			>
				{/* Job */}
				<div className="flex flex-row w-full text-xs font-light items-start justify-between">
					{/* date */}
					<div className="py-0.5 text-[8px] font-light flex-none text-left  flex flex-row italic">
						<p className="mr-0.5">Jul 22</p>
						<p className="mr-0.5"> - </p>
						<p>Oct 22</p>
					</div>

					{/* title+where+(tag) - shorter but flexible */}
					<div className="flex-1 min-w-0 flex flex-col items-start pl-2 gap-0.5">
						{/* title - don't wrap, allow overflow */}
						<h3 className="m-0 p-0 mt-0 self-start leading-none text-sm whitespace-nowrap ">
							Software Developer
						</h3>

						<div className="text-[9px] flex flex-row whitespace-nowrap ">
							{/* employer */}
							<p className="">Mediavest AS</p>
							<p className="mr-1">,</p>
							{/* place */}
							<p className="mr-1">Bergen</p>
							{/* tag */}
							{/* <Tag className="text-[9px] px-1 py-0 leading-none text-[rgba(255,255,255,0.65)] bg-[rgba(255,255,255,0.04)] " color="white">Project</Tag> */}
							<Tag
								className="text-[9px] font-thin px-2 py-0 leading-none "
								color="white_secondary"
							>
								Project
							</Tag>
						</div>
					</div>

					{/* read_more - do not stretch, fit content */}
					<div className="flex-none self-start ">
						<Button
							shape="pill"
							color="white_secondary"
							variant="frosted"
							brightness="dark"
							//   className="w-auto inline-flex items-center gap-1 text-[11px] font-light px-2 py-0.5 h-auto leading-none text-[rgba(255,255,255,0.65)] bg-[rgba(255,255,255,0.04)]" variant="frosted"
							className="w-auto inline-flex items-center gap-1 text-[11px] font-light px-2 py-0.5 h-auto leading-none "
						>
							<span>Read more</span>
							<LuChevronsRight />
						</Button>
					</div>
				</div>

				{/* Job */}
				<div className="flex flex-row w-full text-xs font-light items-start justify-between">
					{/* date */}
					<div className="text-[8px] font-light flex-none text-left  flex flex-row italic ">
						<p className="mr-0.5">Jul 22</p>
						<p className="mr-0.5"> - </p>
						<p>Oct 22</p>
					</div>

					{/* title+where+(tag) - shorter but flexible */}
					<div className="flex-1 min-w-0 flex flex-col items-start pl-2 gap-0.5">
						{/* title - don't wrap, allow overflow */}
						<h3 className="m-0 p-0 mt-0 self-start leading-none text-sm whitespace-nowrap ">
							Software Developer
						</h3>

						<div className="text-[9px] flex flex-row whitespace-nowrap ">
							{/* employer */}
							<p className="">Mediavest AS</p>
							<p className="mr-1">,</p>
							{/* place */}
							<p className="mr-1">Bergen</p>
						</div>
					</div>

					{/* read_more - do not stretch, fit content */}
					<div className="flex-none self-start ">
						<Button
							shape="pill"
							color="white_secondary"
							variant="frosted"
							brightness="dark"
							//   className="w-auto inline-flex items-center gap-1 text-[11px] font-light px-2 py-0.5 h-auto leading-none text-[rgba(255,255,255,0.65)] bg-[rgba(255,255,255,0.04)]" variant="frosted"
							className="w-auto inline-flex items-center gap-1 text-[11px] font-light px-2 py-0.5 h-auto leading-none "
						>
							<span>Read more</span>
							<LuChevronsRight />
						</Button>
					</div>
				</div>

				{/* Job */}
				<div className="flex flex-row w-full text-xs font-light items-start justify-between">
					{/* date */}
					<div className="text-[8px] font-light flex-none text-left  flex flex-row italic ">
						<p className="mr-0.5">Jul 22</p>
						<p className="mr-0.5"> - </p>
						<p>Oct 22</p>
					</div>

					{/* title+where+(tag) - shorter but flexible */}
					<div className="flex-1 min-w-0 flex flex-col items-start pl-2 gap-0.5">
						{/* title - don't wrap, allow overflow */}
						<h3 className="m-0 p-0 mt-0 self-start leading-none text-sm whitespace-nowrap ">
							Software Developer
						</h3>

						<div className="text-[9px] flex flex-row whitespace-nowrap ">
							{/* employer */}
							<p className="">Mediavest AS</p>
							<p className="mr-1">,</p>
							{/* place */}
							<p className="mr-1">Bergen</p>
						</div>
					</div>

					{/* read_more - do not stretch, fit content */}
					<div className="flex-none self-start ">
						<Button
							shape="pill"
							color="white_secondary"
							variant="frosted"
							brightness="dark"
							//   className="w-auto inline-flex items-center gap-1 text-[11px] font-light px-2 py-0.5 h-auto leading-none text-[rgba(255,255,255,0.65)] bg-[rgba(255,255,255,0.04)]" variant="frosted"
							className="w-auto inline-flex items-center gap-1 text-[11px] font-light px-2 py-0.5 h-auto leading-none "
						>
							<span>Read more</span>
							<LuChevronsRight />
						</Button>
					</div>
				</div>
			</div>
		</FrostedGlass>
	);
}
