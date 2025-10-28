import FrostedCards from "@/components/card/FrostedCards";

export default function Home() {
	return (
		<main
			className="relative flex items-center justify-center min-h-screen w-full 
                 overflow-hidden">
			<div className=" ml-20 relative h-screen w-screen flex items-center justify-center w-full">
				{/* Container scales with screen size */}
				{/* <div className="relative w-[80vw] max-w-6xl aspect-[5/3]"> */}
				{/* <div className="relative w-[80vw] max-w-6xl aspect-[5/3] flex justify-left"> */}
				<div className="  w-[50vw] max-w-6xl aspect-[5/3] flex ">
					{/* right (back) card */}
					<div
						className="absolute left-[2.5%] top-1/2 -translate-y-1/2 
                     w-[45%] h-[80%] 
                     backdrop-blur-2xl bg-white/50 rounded-2xl shadow-md
                     border border-white/10 z-0">
						{/* placeholder */}
					</div>

					{/* left (front) card */}
					<div
						className="absolute left-0 top-1/2 -translate-y-1/2 
                     w-[20%] h-[75%] 
                     backdrop-blur-2xl bg-white/0 rounded-2xl shadow-xl
                     border border-white/20 z-10">
						{" "}
						{/* placeholder */}
					</div>
				</div>
				{/* dark transparent card */}
				<div className="relative h-screen w-screen flex items-center justify-left">
					<div
						className=" 
					w-[45%] h-[80%] p-20
					backdrop-blur-2xl bg-white/50 rounded-2xl 
					border border-white/10 flex">
						hallo
						{/* placeholder */}
					</div>
				</div>
			</div>
		</main>
	);
}
