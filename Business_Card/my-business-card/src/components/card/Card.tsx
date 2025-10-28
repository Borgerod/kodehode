export type CardProps = {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
};

export function Card({ title, subtitle, children, className }: CardProps) {
	return (
		<section
			className={`rounded-xl border border-text-white-primary p-6 backdrop-blur-xl max-w-md w-full flex-1 ${
				className ?? "bg-surface-white-primary/50"
			}`}>
			<header className="mb-4">
				<h2 className="text-xl font-semibold text-primary">{title}</h2>
				{subtitle ? (
					<p className="text-sm text-secondary">{subtitle}</p>
				) : null}
			</header>
			<div className="text-sm text-secondary">{children}</div>
		</section>
	);
}
