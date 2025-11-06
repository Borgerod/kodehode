"use client";

import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import FrostedGlass from "@/components/card/FrostedGlass";
import { TiSocialLinkedin, TiSocialFacebook, TiSocialGithub } from "react-icons/ti";
import { SiLeetcode } from "react-icons/si";
import { FaPhone,} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Tag } from "@/components/button/Tag";
import { ButtonGrid } from "@/components/button/ButtonGrid";
import { StylizedCircle } from "@/components/accessories/stylized_circle";
import WorkExperience from "@/components/sections/WorkExperience";



export default function Home() {
	return (
		<main className="h-150 flex flex-row gap-8">
			{/* 1.0) LEFT SIDE */}
			<div className="flex flex-row p-0 m-0 w-full h-full min-w-150 max-w-150">
				
				{/* 1.1) STACKED OFFSET CONTAINER - Profile window */}
				<FrostedGlass variant="light" offset className="flex flex-col justify-between">
				
				<div className="rounded-full aspect-square bg-gray-100"
				></div>

				<b></b>
				<h1 className="text-xl">
					ALEKSANDER BORGERØD
				</h1>
				<h2 className="text-lm">
					Fullstackutvikler og økonom
				</h2>
				{/* BIO */}
				<div className="flex flex-col justify-around gap-2 text-xs text-secondary"
				>

					<p className="">
	With a broad knowledge within development and business, that stretches over statistics, marketing and design; makes me the perfect fit for your company. 
	</p>
					<p className="">
	A diligent worker that strives for flourishing profit margins, ambitious to climb your corporate ladder. As an aspiring family man i seek the stability of a long term employment.


					</p>
					<p className="">
						So, with my vigor and good solutions, I am confident that I am the one you are looking for.   

					</p>
				</div>
				{/* button row */}
				<div className="flex flex-row self-baseline w-full justify-around text-white fill-white text-sm">
					<Button brightness="dark" variant="frosted" shape="pill" color="black">Send me an Email</Button>
					<Button brightness="light" variant="frosted" shape="circular" mode="icon" color="black"> <FaPhone/></Button>
				</div>

				</FrostedGlass>
				
				{/* 1.2) MAIN PROFILE CONTAINER */}
				<FrostedGlass
					variant="light"
					color="white"
					className="h-full flex-[3] relative  min-w-150 max-w-200 max-w-150">
					{/* className="h-150 flex-[3] relative"> */}
					<div className="flex flex-row w-full gap-0 p-0 h-full">
						{/* 1.2.1) MAIN-LEFTSIDE */}
						<div className="flex h-full w-[55%]"></div>
						
						
						{/* 1.2.2) MAIN-RIGHTSIDE */}
						<div className="flex flex-col justify-evenly h-full w-[60%] gap-2 p-1">
							{/* 1.2.2.1) MAIN-RIGHT-TOPSIDE - STYLYZED CARD (stats + logo) */}
							<Card className="bg-[var(--color-surface-green-primary)] p-0 m-0">
								<h2 className="  font-display mb-2 text-secondary">
									MY NUMBERS
								</h2>
							</Card>
							
							{/* 1.2.2.2) MAIN-RIGHT-MIDDLE - INSET CIRCLE (visual interest) */}
							<div className="flex-none h-[17rem] w-full" aria-hidden />
							<StylizedCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-[17rem] w-[17rem] pointer-events-none" />
							
							{/* 1.2.2.2) MAIN-RIGHT-BOTTOMSIDE - SOLID CARD (work history)  */}
							<WorkExperience />
							{/* <Card className="bg-[var(--color-surface-green-primary)] text-[var(--color-foreground)]">

							</Card> */}
						</div>
					</div>
				</FrostedGlass>
			</div>

		
			{/* 2.0) RIGHT SIDE */}
			<div className="flex flex-col gap-8 max-w-150 h-full min-h-0">
				
				{/* 2.1) RIGHT-TOP SECTION - BUTTON GRID (highlighted projects)  */}
				<FrostedGlass
					variant="dark"
					color="grey"
					className="grow-1 basis-0 max-w-150 min-h-0" >
					<h2 className="text-xl font-display mb-4 ">
						My Projects
					</h2>
					{/* wrap grid in an overflow-safe container so it fits the parent's height */}
						{/* <ButtonGrid color="grey" frosted > */}
						<ButtonGrid frosted>
							<a className="text-base" href="https://b_1.com">b_1</a>
							<a className="text-base" href="https://b_2.com">b_2</a>
							<a className="text-base" href="https://b_3.com">b_3</a>
							<a className="text-base" href="https://b_4.com">b_4</a>
							<a className="text-base" href="https://b_5.com">b_5</a>
							<a className="text-base" href="https://b_6.com">b_6</a>
							<a className="text-base" href="https://b_7.com">b_7</a>
							<a className="text-base" href="https://b_8.com">b_8</a>
						</ButtonGrid>

				</FrostedGlass>

				{/* 2.2) RIGHT-BOTTOM SECTION - (TAGs + SOCIAL BUTTONs)  */}
				<div className="flex flex-row gap-8 grow-2 basis-0 min-h-0">
					{/* 2.2.1) LONG BLACK GLASS CONTAINER - (SOCIAL BUTTONS)  */}
					<FrostedGlass
						variant="dark"
						color="black"
						className="min-w-20 max-w-90 h-full min-h-0" >
						<h2 className="text-xl font-display mb-4 ">
							Links
						</h2>
						<div className="flex flex-col justify-evenly grow h-full w-full min-h-0">

						<Button variant="frosted" shape="circular" mode="icon" color="black" >
						<TiSocialLinkedin className=" h-full w-full"/>
						</Button>
						<Button variant="frosted" shape="circular" mode="icon" color="black">
						<TiSocialFacebook className=" h-full w-full"/>
						</Button>
						<Button variant="frosted" shape="circular" mode="icon" color="black" className="p-3 flex justify-center align-middle">
						<TbBrandGithubFilled  className=" h-full w-full"/>

						</Button>
						<Button variant="frosted" shape="circular" mode="icon" color="black" className="p-3">
						<SiLeetcode className=" h-full w-full"/>
						</Button>
						</div>
						

					</FrostedGlass>

					{/* 2.3) TAG CONTAINER COLUMN INV - TOOLS + SKILLS*/}
					<div className="flex flex-col gap-8 h-full min-h-0" >
						{/* 2.3.1) WHITE GLASS CONTAINER - TOOLS */}
						<FrostedGlass
							variant="light"
							color="white"
							// className="h-70 flex-[1] max-w-150">
							className="max-w-150 grow-1 min-h-0">
							<h2 className="text-xl font-display mb-1 text-secondary">
								Tools
							</h2>
							<div className="flex flex-row flex-wrap gap-1">
							<Tag> something </Tag>
							<Tag> something </Tag>
							<Tag> something </Tag>
							<Tag> something </Tag>
							</div>
						</FrostedGlass>

						{/* 2.3.2) WHITE GLASS CONTAINER - SKILLS */}
						<FrostedGlass
							variant="light"
							color="white"
							className="max-w-150 grow-1 min-h-0">
							{/* className="h-70 flex-[1] max-w-150 "> */}
							<h2 className="text-xl font-display mb-1 text-secondary">
								Skills
							</h2>
							<div className="flex flex-row flex-wrap gap-1">
							<Tag> something </Tag>
							<Tag> something </Tag>
							<Tag> something </Tag>
							<Tag> something </Tag>
							<Tag> something </Tag>
							</div>
							
						</FrostedGlass>
					</div>
				</div>
			</div>
			{/* </div> */}
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
