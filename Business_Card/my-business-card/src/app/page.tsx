"use client";

import { Card } from "@/components/card/Card";
import FrostedGlass from "@/components/card/FrostedGlass";

export default function Home() {
	return (
		// <main className="min-h-screen bg-[url('/assets/images/background.jpg')] bg-cover bg-center flex flex-row items-center justify-center gap-8 p-8">

		<main className="min-h-screen bg-[url('/assets/images/background.jpg')] bg-cover bg-center flex flex-row items-center justify-center gap-8 p-8">
			{/* Light frosted glass version */}
			<FrostedGlass variant="light" offset></FrostedGlass>
			{/* use Tailwind arbitrary values for exact sizes and arbitrary flex values for growth */}
			<FrostedGlass
				variant="light"
				color="white"
				className="h-150 flex-[3]">
				{/* updated: fill the parent */}
				<div className="flex flex-row h-full w-full gap-0 p-0">
					{/* left side: centered visual / placeholder */}
					<div className="flex h-full w-[55%]"></div>
					<div className="flex flex-col justify-evenly h-full w-[60%] gap-2 p-1">
						{/* right side: content column that stretches vertically */}{" "}
						<Card className="bg-[var(--color-surface-green-primary)]">
							<h1 className="text-3xl font-display mb-2 text-primary">
								Light Frosted Glass
							</h1>
						</Card>
						<div className="rounded-[100%] bg-[var(--color-surface-green-primary)] h-[17rem] w-[17rem] -translate-x-[65%]"></div>
						{/* <div className="rounded-[200px] bg-green-800 h-[17rem] w-[17rem] -translate-x-[65%]"></div> */}
						<Card className="bg-[var(--color-surface-green-primary)]"></Card>
					</div>
				</div>
			</FrostedGlass>

			{/* Dark frosted glass version */}
			{/* if you want flexible columns: use flex-[2] / flex-[1] on the children inside a flex container */}

			{/* RIGHT SIDE */}
			<div className="flex flex-col gap-8 max-w-[500px] h-150">
				<FrostedGlass
					variant="dark"
					color="grey"
					className="h-70 flex-[1] max-w-[500px]">
					<h1 className="text-3xl font-display mb-4 text-primary">
						Dark Frosted Glass
					</h1>
					<p className="text-secondary">
						This uses the &quot;dark&quot; variant of the frosted
						glass container.
					</p>
				</FrostedGlass>

				<div className="flex flex-row gap-8 ">
					<FrostedGlass
						variant="dark"
						color="black"
						className="flex-[1] max-w-[500px] h-full">
						<h1 className="text-3xl font-display mb-4 text-primary">
							Dark Frosted Glass
						</h1>
						<p className="text-secondary">
							This uses the &quot;dark&quot; variant of the
							frosted glass container.
						</p>
					</FrostedGlass>
					<div className="flex flex-col gap-8">
						<FrostedGlass
							variant="light"
							color="white"
							className="h-70 flex-[1] max-w-[500px]">
							<h1 className="text-3xl font-display mb-4 text-primary">
								Dark Frosted Glass
							</h1>
							<p className="text-secondary">
								This uses the &quot;dark&quot; variant of the
								frosted glass container.
							</p>
						</FrostedGlass>
						<FrostedGlass
							variant="light"
							color="white"
							className="h-70 flex-[1] max-w-[500px]">
							<h1 className="text-3xl font-display mb-4 text-primary">
								Dark Frosted Glass
							</h1>
							<p className="text-secondary">
								This uses the &quot;dark&quot; variant of the
								frosted glass container.
							</p>
						</FrostedGlass>
					</div>
				</div>
			</div>
		</main>
	);
}

// //* THIS IS HOW I WANT IT TO LOOK LIKE
// "use client";
// import FrostedGlass from "@/components/card/FrostedGlass";
// export default function Home() {
// 	return (
// 		<main className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
// 			<div className=" ml-20 relative h-screen w-full flex items-center justify-center">
// 				<div className="  w-[50vw] max-w-6xl aspect-[5/3] flex ">
// 					<div
// 						className="absolute left-[2.5%] top-1/2 -translate-y-1/2
//                      w-[45%] h-[80%]
//                      backdrop-blur-2xl bg-white/50 rounded-2xl shadow-md
//                      border border-white/10 z-0">
// 						{/* placeholder */}
// 					</div>

// 					<div
// 						className="absolute left-0 top-1/2 -translate-y-1/2
//                      w-[20%] h-[75%]
//                      backdrop-blur-2xl bg-white/0 rounded-2xl shadow-xl
//                      border border-white/20 z-10">
// 						{" "}
// 						{/* placeholder */}
// 					</div>
// 				</div>
// 				{/* dark transparent card */}
// 				<div className="relative h-screen w-screen flex items-center justify-left">
// 					<div
// 						className="
// 					w-[45%] h-[80%] p-20
// 					backdrop-blur-2xl bg-white/50 rounded-2xl
// 					border border-white/10 flex">
// 						hallo
// 						{/* placeholder */}
// 					</div>
// 				</div>
// 			</div>
// 		</main>
// 	);
// }
