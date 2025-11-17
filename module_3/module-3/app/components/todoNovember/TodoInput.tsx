import React, { useState } from "react";

type TodoInputProps = {
	onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
	const [text, setText] = useState<string>("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.trim()) {
			onAdd(text);
			setText("");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				aria-label="Add todo form"
				className="flex gap-5"
			>
				<label htmlFor="todo-input" className="sr-only">
					Add todo
				</label>
				<input
					id="todo-input"
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Enter a todo..."
					title="Enter a todo"
					required
					className="p-2 bg-gray-800 rounded-md"
				/>
				<button
					type="submit"
					className="bg-gray-500 py-2 px-5 rounded-full"
				>
					Add
				</button>
			</form>
		</>
	);
}
