"use client";

import Parent from "./components/Parent";
import { AppProvider } from "./context/AppContext";

export default function Context() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
			<h1> DATA </h1>
			<AppProvider>
				<Parent></Parent>
			</AppProvider>
		</div>
	);
}
