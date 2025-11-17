"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tag } from "@/components/button/Tag";
// NOTE: AI GENERATED

export interface ListProps {
	children?: React.ReactNode;
	className?: string;
}
export function ListWrapper({ children }: ListProps) {
	const measureRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [jsx, setJsx] = useState<React.ReactNode>(children);

	function performSort() {
		const measureEl = measureRef.current;
		const containerEl = containerRef.current;
		if (!measureEl || !containerEl) return;

		const limit = containerEl.getBoundingClientRect().width;
		const gap = 4;

		// all .tag elements in hidden measuring container
		const elements = Array.from(
			measureEl.querySelectorAll<HTMLElement>(".tag")
		);

		const items = elements.map((el, index) => ({
			index,
			text: el.textContent?.trim() ?? "",
			width: el.getBoundingClientRect().width + gap,
		}));

		// sort using FFD
		const sortedBySize = [...items].sort((a, b) => b.width - a.width);
		const rows = [];

		for (const item of sortedBySize) {
			let placed = false;

			for (const row of rows) {
				const rowWidth = row.reduce((s, r) => s + r.width, 0);
				if (rowWidth + item.width <= limit) {
					row.push(item);
					placed = true;
					break;
				}
			}

			if (!placed) rows.push([item]);
		}

		rows.forEach((r) => r.sort((a, b) => a.index - b.index));

		// render rows visibly
		const rendered = rows.map((row, i) => (
			<div key={i} className="flex flex-row flex-wrap gap-1 ">
				{row.map((item, j) => (
					<Tag key={j} className="tag">
						{item.text}
					</Tag>
				))}
			</div>
		));

		setJsx(rendered);
	}

	useEffect(() => {
		performSort();

		const observer = new ResizeObserver(() => {
			performSort();
		});

		observer.observe(containerRef.current!);

		return () => observer.disconnect();
	}, []);

	return (
		<>
			{/* visible container */}
			<div
				ref={containerRef}
				className="flex flex-col gap-1 overflow-auto"
			>
				{jsx}
			</div>

			{/* invisible measuring container (never removed, always contains items) */}
			<div
				ref={measureRef}
				className="absolute opacity-0 pointer-events-none -z-50"
			>
				{React.Children.toArray(children).map((child, i) => {
					let text = "";

					if (React.isValidElement(child)) {
						// Narrow to ReactElement<any, any> so props is not 'unknown'
						const el = child as React.ReactElement<any, any>;
						const inner = el.props?.children;

						if (
							typeof inner === "string" ||
							typeof inner === "number"
						) {
							text = String(inner);
						} else if (Array.isArray(inner)) {
							// join if children is an array of primitives
							text = inner
								.map((x) =>
									typeof x === "string" ||
									typeof x === "number"
										? String(x)
										: ""
								)
								.join("");
						} else {
							text = inner ? String(inner) : "";
						}
					} else if (
						typeof child === "string" ||
						typeof child === "number"
					) {
						text = String(child);
					} else {
						text = "";
					}

					return (
						<Tag key={i} className="tag">
							{text}
						</Tag>
					);
				})}
			</div>
		</>
	);
}
