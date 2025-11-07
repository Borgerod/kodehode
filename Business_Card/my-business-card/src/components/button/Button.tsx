// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/lib/utils"; // simple className combiner (optional)
// type ButtonBrightness = "light" | "dark";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "solid" | "frosted";
	shape?: "default" | "circular" | "pill";
	mode?: "text" | "icon" | "text-icon";
	color?:
		| "none"
		| "white"
		| "white_secondary"
		| "grey"
		| "black"
		| "very_black"
		| "green";
	brightness?: "light" | "dark"; //in relation to dark-mode
	clickable?: true | false;
	//   brightness?: ButtonBrightness;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "solid",
	shape = "default",
	mode = "text",
	color = "none",
	brightness = "dark",
	clickable = true,
	className,
	children,
	...props
}) => {
	// const buttonBrightness: Record<ButtonBrightness, string> = {

	const variantStyles = {
		solid: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
		// frosted should provide blur and border but not force text/bg colors.
		frosted: "backdrop-blur-md border-white/40",
		// "relative isolate flex flex-col gap-0  p-1 rounded-[1rem] backdrop-blur-[10px] max-w-150 flex-1 min-h-0",
	};

	const baseColor = {
		none: "", // default - "transparent" will inherit some color from variantStyles(frosted)
		white: "bg-[var(--color-surface-white-primary)]    hover:bg-[var(--color-surface-white-secondary)]    active:bg-[var(--color-surface-white-primary)]       text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
		white_secondary:
			"bg-[var(--color-surface-white-12-primary)] hover:bg-[var(--color-surface-white-12-secondary)] active:bg-[var(--color-surface-white-12-primary)]    text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
		grey: "bg-[var(--color-surface-grey-primary)]     hover:bg-[var(--color-surface-grey-secondary)]     active:bg-[var(--color-surface-grey-primary)]        text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
		black: "bg-[var(--color-surface-black-secondary)]  hover:bg-[var(--color-surface-black-primary)]     active:bg-[var(--color-surface-black-primary)]     text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
		very_black:
			"bg-[var(--color-surface-very-black-primary)]  hover:bg-[var(--color-surface-very-black-secondary)]     active:bg-[var(--color-surface-vary-black-secondary)]     text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
		green: "bg-[var(--color-surface-green-primary)]    hover:bg-[var(--color-surface-green-secondary)]    active:bg-[var(--color-surface-green-primary)]       text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
	};

	const buttonBrightness = {
		// Brightness adjustments should not force background colors for the
		// frosted variant. Keep only subtle text/border tweaks here so callers
		// or explicit className can fully control translucent backgrounds.
		// dark: "text-[var(--color-foreground)]",
		// light: "text-primary",

		dark: "text-[var(--color-text-white-translucent-primary)] hover:text-[var(--color-text-white-translucent-secondary)]",
		light: "text-primary hover:text-secondary",
	};

	const baseStyles =
		"inline-flex items-center justify-center font-normal transition-all duration-200 focus:outline-none";

	const shapeStyles = {
		default: "rounded-xl px-4 py-2",
		circular: "rounded-full p-3 aspect-square",
		pill: "rounded-full px-4 py-2 border-none",
	};

	const modeStyles = {
		text: "",
		icon: "p-2 text-xl",
		"text-icon": "gap-2",
	};

	// Compose final classes: base, variant, shape, mode, color overrides and brightness
	let classes = cn(
		baseStyles,
		variantStyles[variant],
		shapeStyles[shape],
		modeStyles[mode],
		// apply color-specific base styles (empty string if color === 'none')
		// apply brightness adjustments (for frosted/backdrop variants or dark mode)
		// brightness should come before baseColor so an explicit `color` (bg-*)
		// can override the brightness background when provided.
		baseColor[color],
		buttonBrightness[brightness],
		className
	);

	// If the button is not clickable, strip interactive state variants so there are
	// no `hover:`, `active:` or `focus:` classes left in the final output. This
	// keeps the visual base styles while removing hover/active/focus behavior.
	if (!clickable) {
		// remove tokens like `hover:bg-...`, `active:bg-...`, `focus:ring-...` etc.
		classes = classes
			.replace(/\b(?:hover|active|focus):\S+/g, "")
			.replace(/\s+/g, " ")
			.trim();
	}

	return (
		<button {...props} className={classes}>
			{children}
		</button>
	);
};
