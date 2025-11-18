"use client";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import { useState, Dispatch, SetStateAction } from "react";
import { FILTER, SORT_ORDERS } from "@/filterConfig.js";
import { sortArray, toggleFilters } from "@/app/utils/filters";
import { useLocalStorage } from "@/app/hooks/useLocalStorage.js";
import useTodos from "@/app/hooks/useTodos";
import { cn } from "@/app/utils/cn";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

export default function TodoApp() {
	const [filter, setFilter] = useState(FILTER.ALL);
	const [sortOrder, setSortOrder] = useState(SORT_ORDERS.AZ);

	const _todosTuple = useLocalStorage("todo", []) as [
		Todo[] | undefined,
		Dispatch<SetStateAction<Todo[]>>
	];
	const [todos, setTodos] = _todosTuple as [
		Todo[],
		Dispatch<SetStateAction<Todo[]>>
	];

	const { addTask, deleteTask, toggleComplete, editTask } = useTodos(
		todos,
		setTodos
	);

	return (
		// <div>
		<div
			className={cn(
				"flex flex-col",
				"align-middle",
				"justify-around",
				"content-around",
				"",
				"bg-gray-700 rounded-2xl",
				// "h-full w-full",
				"h-fit w-fit",
				// "gap-5",
				"p-10",
				""
			)}>
			<h1 className={cn("text-3xl text-left", "py-10", "w-full", "")}>
				TODO LIST
			</h1>
			<div
				className={cn(
					"flex flex-col",
					"align-middle",
					"justify-around",
					"content-around",
					"",
					"bg-gray-700 rounded-2xl",
					"h-full w-full",
					// "h-full w-fit",
					"gap-5",
					// "p-10",
					"@Container",
					""
				)}>
				<TodoInput onAdd={addTask} />
				<TodoFilters
					{...{ filter, setFilter, sortOrder, setSortOrder }}
				/>
				<TodoList
					todos={
						sortArray(
							toggleFilters(todos, filter),
							sortOrder
						) as Todo[]
					}
					onDelete={deleteTask}
					onToggle={toggleComplete}
					onEdit={editTask}
				/>
			</div>
		</div>
	);
}
