export type CardProps = {
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
};

export function Card({ children, className }: CardProps) {
	return (
		<section
			className={`rounded-xl p-0 backdrop-blur-xl max-w-md w-full flex-1 text-[var(--color-foreground)] ${
				className ?? "bg-surface-white-primary/50"
			}`}
		>
			<div className="text-sm  text-[var(--color-foreground)]">
				{children}
			</div>
		</section>
	);
}
