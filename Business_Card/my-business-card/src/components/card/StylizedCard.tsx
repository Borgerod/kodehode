//> Placeholder
"use client";

import { Card } from "@/components/card/Card";
import FrostedGlass from "@/components/card/FrostedGlass";
import { Button } from "@/components/button/Button";
import { Tag } from "@/components/button/Tag";
import { LuChevronsRight } from "react-icons/lu";
import { JSX } from "react";
import { StylizedCircle } from "../accessories/stylized_circle";

function getContent(): JSX.Element {
	return (
		<>
			{/* Card content */}
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

export default function WorkExperience() {
	return (
		<Card className="bg-[var(--color-surface-green-primary)] p-0 m-0 text-text-white-translucent-primary font-light">
			{/*  */}
			{/* <div className="w-full h-40 flex items-center justify-end p-2"></div> */}
			{/* TODO: create mask */}
			<div className="w-full h-40 flex items-center justify-end p-2">
				<StylizedCircle className="rounded-full h-full aspect-square translate-x-1/2" />
			</div>
			{/* {getContent()} */}
		</Card>
	);
}
