import React from "react";
import { cn } from "@/lib/utils";

export const StylizedCircle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	const styles =
		"bg-gradient-to-r from-[var(--color-surface-green-secondary)] to-[var(--color-surface-green-tertiary)]";

	return <div className={cn(styles, className)} {...props} />;
};
