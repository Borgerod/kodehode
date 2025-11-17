// interface Todo {
// 	id: string;
// 	title: string;
// 	completed: boolean;
// 	createdAt: number;
// }
import { toggleFilters } from "@/app/utils/filters";
// setTodos(todos.filter((task) => task.id !== id));

export default function TodoFilters() {
	// function setFilter(value: string): void {
	// 	console.log(value);
	// 	toggleFilters()
	// }

	return (
		<>
			<button className="bg-gray-500 rounded-full">show completed</button>
			<select
				className=""
				name=""
				id=""
				onChange={(e) => toggleFilters(e.target.value)}
			>
				{/* <select className="bg-gray-800 rounded-md" name="" id=""> */}

				<option value="all">Show All</option>
				<option value="completed">Completed</option>
				<option value="incompleted">Incompleted</option>
			</select>
		</>
	);
}
