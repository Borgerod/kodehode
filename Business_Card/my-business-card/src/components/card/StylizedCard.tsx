// //> Placeholder
"use client";
import { Card } from "@/components/card/Card";
import FrostedGlass from "@/components/card/FrostedGlass";
import { Button } from "@/components/button/Button";
import { Tag } from "@/components/button/Tag";
import { LuChevronsRight } from "react-icons/lu";
import { JSX } from "react";
import { StylizedCircle } from "../accessories/StylizedCircle";
import { cn } from "@/lib/utils";

function getContent(): JSX.Element {
	return (
		<>
			<h3 className="text-xm">MY NUMBERS</h3>

			<div className="flex flex-row justify-start gap-5">
				<div className="flex flex-col justify-start gap-0">
					<div className="flex flex-col">
						<p className="text-xl">944</p>
						<p className="text-xs">GitHub contributions</p>
					</div>

					<div className="flex flex-col">
						<p className="text-xl">5+</p>
						<p className="text-xs">Years experience</p>
					</div>

					<div className="flex flex-col">
						<p className="text-xl">50</p>
						<p className="text-xs">Leetcode submissions</p>
					</div>
				</div>

				<div className="flex flex-col justify-start gap-0">
					<div className="flex flex-col">
						<p className="text-xl">39</p>
						<p className="text-xs">Repositories</p>
					</div>
					<div className="flex flex-col">
						<p className="text-xl">3+</p>
						<p className="text-xs">Years as professional</p>
					</div>
					<div className="flex flex-col">
						<p className="text-xl">Beats 61.7%</p>
						<p className="text-xs">of other participants</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default function StylizedCard() {
	return (
		<Card
			disableInnerWrapper
			className={cn(
				"relative rounded-2xl   text-text-white-translucent-primary font-light p-0 m-0 w-full h-full min-h-0",
				"bg-transparent",
				"grid [grid-template-areas:'stack'] grid-rows-[1fr] grid-cols-[1fr] place-items-center",
				"overflow-clip"
			)}
		>
			<div className="[grid-area:stack] relative h-full w-full m-0 overflow-visible bg-transparent pt-4">
				<StylizedCircle className="h-[80%] aspect-square rounded-full bg-gradient-to-br place-self-end translate-x-3/6 filter blur-xs opacity-90" />
			</div>

			<div
				className={cn(
					"[grid-area:stack] relative z-10 w-full h-full p-0 m-0",
					"bg-transparent",
					"text-secondary"
				)}
			>
				{getContent()}
			</div>
		</Card>
	);
}
