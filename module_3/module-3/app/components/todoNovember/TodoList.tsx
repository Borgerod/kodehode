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
	onEdit: (id: string, newText: string) => void;
}

export default function TodoList({
	todos,
	onDelete,
	onToggle,
	onEdit,
}: // ...rest
TodoListProps) {
	if (!Array.isArray(todos)) return null;

	return (
		//<div className="@Container">
		<ul className="bg-gray-900 rounded-xl h-fit min-h-30 p-5 ">
			<div className="flex items-center justify-between gap-2 text-xs text-white/40 p-0 m-0">
				<label className="flex items-center  ">Staus</label>
				<label className="flex w-full items-start text-left ">
					Task
				</label>
				<label className="flex w-full text-end ">Date</label>
			</div>
			{todos.map((t) => (
				<TaskCard
					key={t.id}
					task={t}
					onDelete={onDelete}
					onToggle={onToggle}
					onEdit={onEdit}
				/>
			))}
		</ul>
		//</div>
	);
}
