"use client";
import { useState } from "react";

interface TodoItem {
	title: string;
	date: Date;
	completed: boolean;
	id: string;
}

export default function ToDo() {
	const [text, setText] = useState<string>("");
	const [list, setList] = useState<TodoItem[]>([]);
	const onAdd = () => {
		if (text.trim() !== "") {
			setList((prevList) => [
				{
					title: text,
					date: new Date(),
					completed: false,
					id: crypto.randomUUID(),
				},

				...prevList,
			]);
			setText(text);
		}
	};
	return (
		<div className="flex flex-col justify-center align-center gap-5 bg-gray-800 p-10  rounded-xl">
			<h1 className="text-5xl">TODO </h1>
			<ul className="flex flex-col list-none bg-gray-900 min-h-50 p-5 rounded-lg">
				{list.map((item, i) => (
					<li className="flex" key={i}>
						- {item.title}
					</li>
				))}
			</ul>
			<br />
			<input
				className="p-1 bg-gray-900 rounded-lg"
				placeholder="write your next task.."
				aria-label="todo input"
				value={text}
				type="text"
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "enter") {
						onAdd();
					}
				}}
			/>
			<div className="flex flex-row justify-between ">
				<button
					onClick={onAdd}
					className="px-4 py-1 bg-gray-500 rounded-2xl"
				>
					Add
				</button>
				<button className="px-4 py-1 bg-gray-500 rounded-2xl ">
					Clear
				</button>
			</div>
		</div>
	);
}
