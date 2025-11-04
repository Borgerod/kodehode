export type CardProps = {
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
};

export function Card({ children, className }: CardProps) {
	return (
		<section
			className={`rounded-xl p-6 backdrop-blur-xl max-w-md w-full flex-1 ${
				className ?? "bg-surface-white-primary/50"
			}`}>
			<div className="text-sm ">{children}</div>
		</section>
	);
}
