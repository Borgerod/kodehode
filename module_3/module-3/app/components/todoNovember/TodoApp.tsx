"use client";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import { useState } from "react";

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

export default function TodoApp() {
	const [todos, setTodos] = useState<Todo[]>([
		{
			id: crypto.randomUUID(),
			title: "placeholder",
			completed: false,
			createdAt: Date.now(),
		},
	]);

	const createTask = (text: string): Todo => {
		return {
			id: crypto.randomUUID(),
			title: text,
			completed: false,
			createdAt: Date.now(),
		};
	};

	const addTask = (text: string) => {
		setTodos((prev) => [...prev, createTask(text)]);
	};

	const deleteTask = (id: string) => {
		setTodos(todos.filter((task) => task.id !== id));

		// setTodos((prev) => [...prev, deleteTask(text)]);
	};

	const toggleComplete = (id: string) => {
		setTodos((prev) =>
			prev.map((task) => {
				return task.id === id
					? { ...task, completed: !task.completed }
					: task;
			})
		);
	};

	return (
		<>
			<div className="bg-gray-700 rounded-2xl p-10 flex flex-col content-around justify-around h-130 w-200 align-middle">
				<h1 className="text-4xl p-10">velkommen</h1>
				<TodoInput onAdd={addTask} />
				<TodoFilters />
				<TodoList
					todos={todos}
					onDelete={deleteTask}
					onToggle={toggleComplete}
				/>
			</div>
		</>
	);
}
