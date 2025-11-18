"use client";
import TodoApp from "@/app/components/todoNovember/TodoApp";
import { cn } from "@/app/utils/cn";

export default function TodoNovember() {
	return (
		<div
			className={cn(
				"flex flex-col",
				"min-h-screen w-full",
				"items-center justify-center",
				"bg-zinc-50 font-sans dark:bg-black",
				""
			)}>
			<TodoApp></TodoApp>
			{/* hei */}
		</div>
	);
}
