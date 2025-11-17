import React from "react";
import TaskCard from "./TaskCard";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

interface TodoListProps {
	todos: Todo[];
	onDelete: (id: string) => void;
	onToggle: (id: string) => void;
}

export default function TodoList({
	todos,
	onDelete,
	onToggle,
	...rest
}: TodoListProps) {
	if (!Array.isArray(todos)) return null;

	return (
		<ul className="bg-gray-900 rounded h-fit min-h-30 p-5">
			{todos.map((t) => (
				<TaskCard task={t} onDelete={onDelete} onToggle={onToggle} />
			))}
		</ul>
	);
}
