import React from "react";

export default function FrostedCards() {
	return (
		<div className="relative h-screen w-screen flex items-center justify-center">
			{/* Container scales with screen size */}
			<div className="relative w-[80vw] max-w-6xl aspect-[5/3]">
				{/* right (back) card */}
				<div
					className="absolute left-[2.5%] top-1/2 -translate-y-1/2 
                     w-[45%] h-[80%] 
                     backdrop-blur-2xl bg-white/50 rounded-2xl shadow-md
                     border border-white/10 z-0"
				/>

				{/* left (front) card */}
				<div
					className="absolute left-0 top-1/2 -translate-y-1/2 
                     w-[20%] h-[75%] 
                     backdrop-blur-2xl bg-white/0 rounded-2xl shadow-xl
                     border border-white/20 z-10"
				/>
			</div>
		</div>
	);
}
