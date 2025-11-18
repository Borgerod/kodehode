import { cn } from "@/app/utils/cn";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { formatTimestamp } from "@/app/utils/formatTimeStamp";

// ! problem !
// TODO: Contains hydration error, need fix

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

interface TaskCardProps {
	task: Todo;
	onDelete: (id: string) => void;
	onToggle: (id: string) => void;
	onEdit: (id: string, newText: string) => void;
}

export default function TaskCard({
	task,
	onDelete,
	onToggle,
	onEdit,
}: TaskCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState<string>(task.title || "");

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newText.trim()) {
			onEdit(task.id, newText.trim());
			setIsEditing(false);
		}
	};

	if (isEditing) {
		return (
			<div className="border border-/40 rounded-md flex flex-row flex-nowrap bg-gray-800 text-white/50">
				<form
					onSubmit={onSubmit}
					className="flex w-full items-center gap-2 p-2">
					<input
						type="text"
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						className="flex-1 bg-transparent text-white"
						aria-label={`Edit ${task.title}`}
					/>
					<button
						type="submit"
						className="px-3 py-1 bg-primary rounded">
						Save
					</button>
					<button
						type="button"
						className="px-3 py-1 bg-gray-600 rounded"
						onClick={() => {
							setNewText(task.title);
							setIsEditing(false);
						}}>
						Cancel
					</button>
				</form>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-between space-x-4">
			<label className="flex items-center space-x-3">
				<input
					type="checkbox"
					checked={task.completed}
					onChange={() => onToggle(task.id)}
					className={cn(
						"before:absolute before:bg-transparent before:content-[''] before:h-3.5 before:opacity-0 before:pointer-events-none before:rounded-full before:scale-0 before:shadow-[0px_0px_0px_13px_transparent] before:w-3.5",
						"appearance-none float-left h-4.5 mt-[0.15rem] relative rounded-sm w-4.5",
						"border-2 border-neutral-300 border-solid outline-none",
						"checked:after:-mt-px checked:after:block checked:after:border-2 checked:after:border-l-0 checked:after:border-solid checked:after:border-t-0 checked:after:border-white checked:after:bg-transparent checked:after:content-[''] checked:after:h-3.25 checked:after:ml-1 checked:after:rotate-45 checked:after:w-1.5 checked:bg-primary checked:border-primary checked:before:opacity-[0.16]",
						"checked:focus:after:-mt-px checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-t-0 checked:focus:after:border-white checked:focus:after:bg-transparent checked:focus:after:h-3.25 checked:focus:after:ml-1 checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:w-1.5 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]",
						"dark:checked:border-primary dark:border-neutral-600",
						"focus:after:absolute focus:after:block focus:after:content-[''] focus:after:h-3.5 focus:after:rounded-xs focus:after:w-3.5 focus:after:z-1 focus:before:opacity-[0.12] focus:before:scale-100 focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:shadow-none focus:transition-[border-color_0.2s]",
						"hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] hover:cursor-pointer"
					)}
				/>

				<h3
					className={task.completed ? "line-through" : ""}
					onDoubleClick={() => setIsEditing(true)}>
					{task.title}
				</h3>
			</label>

			<label className="text-xs text-white/40 font-light  text-right w-full italic">
				{formatTimestamp(task.createdAt)}
			</label>

			<IoIosClose
				className="text-2xl m-0 p-0 hover:text-gray-100 text-gray-400 h-full w-10"
				onClick={() => onDelete(task.id)}
			/>
		</div>
	);
}

// interface Todo {
// 	id: string;
// 	title: string;
// 	completed: boolean;
// 	createdAt: number;
// }

// interface TaskCardProps<> {
// 	task: Todo[];
// 	onDelete: (id: string) => void;
// 	onToggle: (id: string) => void;
// }
// export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
// 	return (
// 		<div className="flex items-center justify-between space-x-4">
// 			<label className="flex items-center space-x-3">
// 				<input
// 					type="checkbox"
// 					checked={task}
// 					onChange={() => onToggle(task.id)}
// 				/>
// 				<h3 className={task.completed ? "line-through" : ""}>
// 					{task.title}
// 				</h3>
// 			</label>

// 			<button
// 				className="px-4 py-1 bg-gray-500 rounded-2xl"
// 				onClick={() => onDelete(task.id)}
// 			>
// 				delete
// 			</button>
// 		</div>
// 	);
// }
