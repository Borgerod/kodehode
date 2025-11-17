// ...existing code...
"use client";

import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import FrostedGlass from "@/components/card/FrostedGlass";
import {
	TiSocialLinkedin,
	TiSocialFacebook,
	TiSocialGithub,
} from "react-icons/ti";
import { SiLeetcode } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { Tag } from "@/components/button/Tag";
import { ButtonGrid } from "@/components/button/ButtonGrid";
import { StylizedCircle } from "@/components/accessories/StylizedCircle";
import WorkExperience from "@/components/sections/WorkExperience";
import { ListWrapper } from "@/components/sections/ListWrapper";
import StylizedCard from "@/components/card/StylizedCard";
import { cn } from "@/lib/utils";

export default function Home() {
	return (
		<main
			className={cn(
				// "grid grid-cols-30 grid-rows-30 gap-5",
				// "px-40 py-20",
				// "px-[10%] py-[10%]",
				// "flex justify-center align-middle content-center h-full w-full max-h-[100vh] max-w-[100vw]",
				// "flex justify-center align-middle content-center",
				// "flex",
				// "max-h-[100vh] max-w-[100vw]",
				// " h-full w-full",
				// "h-[100vh] w-[100vw]",
				// "content-center",
				// "align-middle",
				// "justify-center",
				// "max-w-[80rem]",
				// "max-h-[80vh]",
				// "w-full",
				"max-w-[80vw]",
				"max-h-[40rem]",
				"aspect-[20/11]",
				"aspect-[16/11]",
				// "aspect-[1/1]",
				// "px-30",
				// "px-[10%]",
				"grid grid-cols-30 grid-rows-30 gap-5",
				// "bg-amber-400",
				""
			)}
		>
			{/* <div
				className={cn(
					"grid grid-cols-30 grid-rows-30 gap-5",
					// "grid grid-cols-16 grid-rows-30 gap-5", //TEMP
					// "aspect-[16/11]",
					// "gap-0",
					""
				)}
			> */}
			{/* PROFILE */}
			<FrostedGlass
				variant="light"
				className={cn(
					// "@container",
					"col-start-1 col-span-9",
					"col-start-1 col-span-8",
					"row-start-2 row-span-28",
					"bg-gray-100/70 w-full h-full",
					"z-1",
					"justify-between",
					// "w-70",
					// "min-w-60",
					""
				)}
			>
				<div className="rounded-full aspect-square bg-gray-100"></div>
				<div>
					<h1 className="text-lg">ALEKSANDER BORGERØD</h1>
					<h2 className="text-sm">Fullstackutvikler og økonom</h2>
				</div>

				<div
					className={cn(
						"flex flex-col justify-around",
						"gap-2 text-xs text-secondary"
					)}
				>
					<span className="">
						With a broad knowledge within development and business,
						that stretches over statistics, marketing and design;
						makes me the perfect fit for your company.
					</span>
					<span className="">
						A diligent worker that strives for flourishing profit
						margins, ambitious to climb your corporate ladder. As an
						aspiring family man i seek the stability of a long term
						employment.
					</span>
					<span className="">
						So, with my vigor and good solutions, I am confident
						that I am the one you are looking for.
					</span>
				</div>
				<div className="flex flex-row self-baseline w-full justify-around text-white fill-white text-sm">
					<Button
						brightness="dark"
						variant="frosted"
						shape="pill"
						color="very_black"
						className="text-white/90  w-full"
					>
						Send me an Email
					</Button>
					<Button
						brightness="dark"
						variant="frosted"
						shape="circular"
						mode="icon"
						color="very_black"
						className="text-white/70 h-full aspect-square"
					>
						<FaPhone />
					</Button>
				</div>
			</FrostedGlass>
			{/* MAIN  */}
			<FrostedGlass
				className={cn(
					// "col-start-2 col-span-16",
					"col-start-2 col-span-17",
					"row-span-full",
					"bg-gray-100/70 w-full h-full",
					"grid grid-cols-16 grid-rows-30",
					"grid grid-cols-subgrid grid-rows-subgrid",
					"gap-1",

					""
				)}
			>
				<div
					className={cn(
						// "col-start-9 col-span-8",
						"col-start-9 col-span-9",
						"col-start-8 col-span-10",
						"row-start-1 row-span-10",
						// "bg-amber-300",
						""
					)}
				>
					<StylizedCard />
				</div>
				<div
					className={cn(
						"col-start-2 col-span-16",
						"row-start-10 row-span-11 ",
						// "bg-amber-500",
						"content-center justify-items-center"
					)}
				>
					<StylizedCircle
						className={cn(
							// "rounded-full h-[17rem] w-[17rem] pointer-events-none"
							"rounded-full h-full aspect-square pointer-events-none"
						)}
					/>
				</div>
				<div
					className={cn(
						"col-start-9 col-span-8",
						"col-start-9 col-span-9",
						"col-start-8 col-span-10",
						"row-start-21 row-span-9 ",
						""
						// "bg-amber-700"
					)}
				>
					<WorkExperience />
				</div>
			</FrostedGlass>
			{/* LEFT SIDE */}
			<FrostedGlass
				className={cn(
					"col-start-19 col-span-14",
					"row-start-1 row-span-10",
					// "bg-gray-500/70 ",
					"w-full h-full",
					"text-secondary",
					""
				)}
			>
				<h2 className="text-lg font-display mb-0 p-0 m-0  text-secondary">
					My Projects
				</h2>
				{/* wrap grid in an overflow-safe container so it fits the parent's height */}
				{/* <ButtonGrid color="grey" frosted > */}
				<ButtonGrid frosted>
					<a className="text-xs" href="https://b_1.com">
						b_1
					</a>
					<a className="text-xs" href="https://b_2.com">
						b_2
					</a>
					<a className="text-xs" href="https://b_3.com">
						b_3
					</a>
					<a className="text-xs" href="https://b_4.com">
						b_4
					</a>
					<a className="text-xs" href="https://b_5.com">
						b_5
					</a>
					<a className="text-xs" href="https://b_6.com">
						b_6
					</a>
					<a className="text-xs" href="https://b_7.com">
						b_7
					</a>
					<a className="text-xs" href="https://b_8.com">
						b_8
					</a>
				</ButtonGrid>
			</FrostedGlass>
			<FrostedGlass
				className={cn(
					"col-start-19 col-span-4",
					"row-start-11 row-span-full",
					"bg-gray-900/70 w-full h-full",
					"flex  flex-col justify-center",
					// "max-w-30",
					// "p-2",
					""
				)}
			>
				<h2 className="text-lg font-display text-center  mb-1 text-white/80">
					Links
				</h2>

				<div
					className={cn(
						"h-full w-full min-h-0",
						"flex flex-col justify-evenly items-center",
						// "gap-4",
						// "p-0",
						// "px-[10%]",
						// "px-4",
						""
					)}
				>
					<Button
						variant="frosted"
						shape="circular"
						mode="icon"
						color="black"
						className={cn(
							"p-2",
							" flex justify-center align-middle ",
							" w-full aspect-square",
							// "min-h-10 min-w-10",
							"max-h-15 max-w-15",
							""
						)}
						// className="h-15 p-2 flex justify-center align-middle aspect-square"
					>
						<TiSocialLinkedin className="aspect-square h-full w-full" />
						{/* <TiSocialLinkedin className="  aspect-square h-full w-full p-2" /> */}
					</Button>
					<Button
						variant="frosted"
						shape="circular"
						mode="icon"
						color="black"
						className={cn(
							"p-2",
							" flex justify-center align-middle ",
							" w-full aspect-square",
							// "min-h-10 min-w-10",
							"max-h-15 max-w-15",
							""
						)}
					>
						<TiSocialFacebook className="  aspect-square h-full w-full" />
					</Button>
					<Button
						variant="frosted"
						shape="circular"
						mode="icon"
						color="black"
						className={cn(
							"p-2",
							" flex justify-center align-middle ",
							" w-full aspect-square",
							// "min-h-10 min-w-10",
							"max-h-15 max-w-15",
							""
						)}
					>
						<TbBrandGithubFilled className=" aspect-square  h-full w-full" />
					</Button>
					<Button
						variant="frosted"
						shape="circular"
						mode="icon"
						color="black"
						className={cn(
							"p-2",
							" flex justify-center align-middle ",
							" w-full aspect-square",
							// "min-h-10 min-w-10",
							"max-h-15 max-w-15",
							""
						)}
					>
						<SiLeetcode className="aspect-square h-full w-full" />
					</Button>
				</div>
			</FrostedGlass>
			<FrostedGlass
				className={cn(
					"col-start-23 col-span-10",
					"row-start-11 row-span-8",
					"bg-gray-100/70 w-full h-full",
					"p-3"
				)}
			>
				<h2 className="text-lg font-display mb-0 p-0 m-0  text-secondary">
					Tools
				</h2>
				<ListWrapper>
					<Tag> Python </Tag>
					<Tag> Javascript </Tag>
					<Tag> Typescript </Tag>
					<Tag> Dart </Tag>
					<Tag>Flutter</Tag>
					<Tag>React</Tag>
					<Tag>Svelte</Tag>
					<Tag>HTML/CSS</Tag>
					<Tag>GitHub</Tag>
					<Tag>Figma</Tag>
					<Tag>PostgreSQL</Tag>
					<Tag>Insomnia</Tag>
					<Tag>WordPress</Tag>
					<Tag>Stata</Tag>
					<Tag>PowerBI</Tag>
					<Tag>Trippletex</Tag>
					<Tag>AiFlow</Tag>
					<Tag>Monday</Tag>
					<Tag>Autodesk</Tag>
					<Tag>Microsoft 365</Tag>
					<Tag>AWS</Tag>
					<Tag>Google Ads</Tag>
				</ListWrapper>
			</FrostedGlass>
			<FrostedGlass
				className={cn(
					"col-start-23 col-span-10",
					"row-start-19 row-span-12",
					"bg-gray-100/70 w-full h-full",
					"p-3",

					""
				)}
			>
				<h2 className="text-lg font-display mb-0 p-0 m-0  text-secondary">
					Skills
				</h2>

				<ListWrapper>
					<Tag> Front-end </Tag>
					<Tag> Back-end </Tag>
					<Tag> Full-stack </Tag>
					<Tag> Mobile app </Tag>
					<Tag> SQL </Tag>
					<Tag> Data extraction </Tag>
					<Tag> Algorithms </Tag>
					<Tag> Two-factor Auth </Tag>
					<Tag>OAuth</Tag>
					<Tag>Database Management</Tag>
					<Tag>API development</Tag>
					<Tag>Cloud Services</Tag>
					<Tag>3D printing</Tag>
					<Tag>UX / UI desgin</Tag>
					<Tag>CAD desgin</Tag>
					<Tag>Data visualization</Tag>
					<Tag>Data mining</Tag>
					<Tag>Statistics</Tag>
					<Tag>SEO / AEO</Tag>
					<Tag>Market analysis</Tag>
					<Tag>Digital marketing</Tag>
					<Tag>Business development</Tag>
					<Tag>Accounting</Tag>
					<Tag>Strategy</Tag>
					<Tag>HR management</Tag>
					<Tag>Business intelligence</Tag>
				</ListWrapper>
				<ListWrapper>
					{/* {[
						"Fronte-end",
						"Back-end",
						"Full-stack",
						"Mobile app",
						"SQL",
						"Data extraction",
						"Algorithms",
						"Two-factor Auth",
					]} */}
					{/* Fronte-end Back-end Full-stack Mobile app SQL Data
					extraction Algorithms Two-factor Auth */}

					{/* <Tag> Python </Tag>

					<Tag> Front-end </Tag>
					<Tag> Back-end </Tag>
					<Tag> Full-stack </Tag>
					<Tag> Mobile app </Tag>
					<Tag> SQL </Tag>
					<Tag> Data extraction </Tag>
					<Tag> Algorithms </Tag>
					<Tag> Two-factor Auth </Tag> */}
				</ListWrapper>
			</FrostedGlass>
		</main>
	);
}
