import ToDo from "./components/ToDo";
import UserForm from "./components/UserForm";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">
				{/* <ToDo></ToDo> */}
				<UserForm></UserForm>
			</main>
		</div>
	);
	// export default function Home() {
}
