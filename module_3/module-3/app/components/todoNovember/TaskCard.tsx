// import { RxCross2 } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";

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
}
export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
	return (
		<div className="flex items-center justify-between space-x-4">
			<label className="flex items-center space-x-3">
				<input
					type="checkbox"
					checked={task.completed}
					onChange={() => onToggle(task.id)}
					className="relative float-left mt-[0.15rem] h-4.5 w-4.5 appearance-none rounded-sm border-2 border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none  checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary "

					// className=" accent-gray-600 hover:accent-gray-700 bg-amber-300"
				/>

				<h3 className={task.completed ? "line-through" : ""}>
					{task.title}
				</h3>
			</label>

			<IoIosClose
				className="text-2xl m-0 p-0 hover:text-gray-100 text-gray-400"
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
