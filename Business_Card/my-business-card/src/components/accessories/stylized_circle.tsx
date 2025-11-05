import React from "react";
import { cn } from "@/lib/utils";

// StylizedCircle: presentational circle using CSS variables for the gradient.
// Accepts standard div props so callers can size and position it as needed.
export const StylizedCircle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	const styles =
		"bg-gradient-to-r from-[var(--color-surface-green-secondary)] to-[var(--color-surface-green-tertiary)]";

	return <div className={cn(styles, className)} {...props} />;
};

