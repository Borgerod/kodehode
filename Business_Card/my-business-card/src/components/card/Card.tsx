import { cn } from "@/lib/utils";

export type CardProps = {
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
	disableInnerWrapper?: boolean;
};

export function Card({ children, className, disableInnerWrapper }: CardProps) {
	return (
		<section
			className={cn(
				"rounded-xl p-0 w-full h-full flex-1 text-[var(--color-foreground)]",
				className
			)}
		>
			{disableInnerWrapper ? (
				children
			) : (
				<div className="h-full w-full min-h-0 flex flex-col text-sm text-[var(--color-foreground)]">
					{children}
				</div>
			)}
		</section>
	);
}
