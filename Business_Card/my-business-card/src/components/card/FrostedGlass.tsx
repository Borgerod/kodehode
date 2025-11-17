"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FrostedGlassVariant = "light" | "dark";
type Color = "white" | "grey" | "black" | "green";

export interface FrostedGlassProps extends HTMLAttributes<HTMLDivElement> {
	variant?: FrostedGlassVariant;
	/** If true, render the card as an overlay outside the page flow (stacked above everything) */
	offset?: boolean;
	color?: Color;
}

const baseClasses =
	// "relative isolate flex flex-col gap-4 rounded-[1rem] p-4 backdrop-blur-[10px]  max-w-150";
	"relative isolate flex flex-col gap-0 p-4 rounded-3xl backdrop-blur-[10px] max-w-150";

// "relative isolate flex w-full flex-col gap-4 rounded-[1rem] p-4 backdrop-blur-[10px]";
// "relative isolate flex w-full max-w-[320px] flex-col gap-4 rounded-[1rem] p-4 backdrop-blur-[10px]";

const variantClasses: Record<FrostedGlassVariant, string> = {
	light: "border-white/40 bg-white/20 text-[var(--color-foreground)] ",
	dark: "border-white/10 bg-neutral-900/65 text-[var(--color-background)]",
};

const colorVariants: Record<Color, string> = {
	white: "bg-[var(--color-surface-white-secondary)]",
	grey: "bg-[var(--color-surface-grey-primary)]",
	black: "bg-[var(--color-surface-black-secondary)]",
	green: "bg-[var(--color-surface-green-primary)]",
};
// (overlay portal rendered directly into document.body; positioning handled via inline styles)

// use `cn()` (clsx + tailwind-merge) so caller classNames can override
// internal utilities such as `p-4` with `p-1`/`px-*`.

export default function FrostedGlass({
	variant = "light",
	className,
	style,
	children,
	color,
	offset = false,
	...rest
}: FrostedGlassProps) {
	// portal container used only when offset === true
	const portalElRef = useRef<HTMLDivElement | null>(null);
	// wrapper ref (kept for compatibility) but portal will mount to document.body for precise positioning
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	// overlay rectangle (left/top in page coords, width, height)
	const [overlayRect, setOverlayRect] = useState<{
		left: number;
		top: number;
		width: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		if (!offset) return;
		const el = document.createElement("div");
		portalElRef.current = el;
		// append portal mount to document.body so we can position using viewport coordinates
		document.body.appendChild(el);

		// measure the first in-flow light card (non-offset)
		let ro: ResizeObserver | undefined;
		let raf = 0 as number | undefined;
		let attempts = 0;
		const MAX_ATTEMPTS = 240; // ~4 seconds at 60fps
		const HEIGHT_SCALE = 0.95; // single authoritative scale for overlay height

		const measure = () => {
			// prefer the specific reference that has the `h-150` utility (the one you referenced in page.tsx)
			const target =
				(document.querySelector(
					".frosted-light-reference.h-150"
				) as HTMLElement | null) ||
				(document.querySelector(
					".frosted-light-reference"
				) as HTMLElement | null);
			if (!target) {
				// target not mounted yet — clear overlay and retry a few times
				setOverlayRect(null);
				attempts++;
				if (attempts < MAX_ATTEMPTS) requestAnimationFrame(measure);
				return;
			}
			const rect = target.getBoundingClientRect();
			const width = Math.round(rect.width * 0.5);
			const height = Math.round(rect.height * HEIGHT_SCALE);
			const left = Math.round(rect.left + window.scrollX - 20); // offset 20px to the left
			// center vertically relative to the reference element
			const top = Math.round(
				rect.top + window.scrollY + (rect.height - height) / 2
			);
			setOverlayRect({ left, top, width, height });

			if (typeof ResizeObserver !== "undefined" && !ro) {
				ro = new ResizeObserver(() => {
					const r = target.getBoundingClientRect();
					const w = Math.round(r.width * 0.5);
					const h = Math.round(r.height * HEIGHT_SCALE);
					const l = Math.round(r.left + window.scrollX - 20);
					const t = Math.round(
						r.top + window.scrollY + (r.height - h) / 2
					);
					setOverlayRect({ left: l, top: t, width: w, height: h });
				});
				ro.observe(target);
			}
		};

		const onScrollOrResize = () => {
			// throttle via rAF
			if (raf) cancelAnimationFrame(raf);
			raf = requestAnimationFrame(measure) as unknown as number;
		};

		// measure initially after next tick (ensure target mounted)
		requestAnimationFrame(measure);
		window.addEventListener("resize", onScrollOrResize);
		window.addEventListener("scroll", onScrollOrResize, { passive: true });

		return () => {
			if (portalElRef.current && portalElRef.current.parentElement) {
				portalElRef.current.parentElement.removeChild(
					portalElRef.current
				);
			}
			portalElRef.current = null;
			if (ro) {
				ro.disconnect();
				ro = undefined;
			}
			if (raf) cancelAnimationFrame(raf as number);
			window.removeEventListener("resize", onScrollOrResize);
			window.removeEventListener("scroll", onScrollOrResize);
		};
	}, [offset]);

	// add a small reference class to the in-flow light card so the overlay can measure it
	const referenceClass =
		!offset && variant === "light" ? "frosted-light-reference" : undefined;

	// When color prop is provided, use a variant class without bg (to avoid conflict)
	const variantClassToUse = color
		? variant === "light"
			? "border-white/40 text-foreground"
			: "border-white/10 text-white/90"
		: variantClasses[variant];
	const card = (
		<div
			className={cn(
				baseClasses,
				variantClassToUse,
				referenceClass,
				// apply color variant class when `color` prop is provided
				color ? colorVariants[color] : undefined,
				className
			)}
			style={{
				// only apply forced height for overlay instance via createPortal path
				...style,
			}}
			{...rest}
		>
			{children}
		</div>
	);

	if (offset) {
		// render positioned overlay outside of main flow
		// overlayRect contains left/top/width/height when measured
		const mount = portalElRef.current;

		// wrapper that is fixed at the reference's left/top and sized to the reference height.
		// it uses flex-column + justify-center to vertically center the overlay card inside it
		const portalContent = overlayRect ? (
			<div
				style={{
					position: "fixed",
					left: `${overlayRect.left}px`,
					top: `${overlayRect.top}px`,
					width: `${overlayRect.width}px`,
					height: `${overlayRect.height}px`,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					pointerEvents: "none",
					zIndex: 1000,
				}}
			>
				<div
					className={cn(
						baseClasses,
						variantClassToUse,
						color ? colorVariants[color] : undefined,
						className
					)}
					style={{
						padding: "1rem",
						width: "100%",
						height: `${overlayRect.height}px`,
						pointerEvents: "auto",
						...style,
					}}
					{...rest}
				>
					{children}
				</div>
			</div>
		) : null;

		return (
			<div style={{ padding: 10 }} ref={wrapperRef}>
				{mount ? createPortal(portalContent, mount) : null}
			</div>
		);
	}

	// Return the card directly so this component itself becomes the flex-item
	// in parent containers (passing flex classes from the caller through `className`).
	// We intentionally do not change height here.
	return card;
}
