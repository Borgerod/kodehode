import Child from "./Child";

export default function Parent() {
	return (
		<div className=" p-10 border rounded-lg flex flex-col justify-center items-center h-100 w-200 bg-amber-800">
			<h1 className="text-2xl">Parent</h1>
			<Child></Child>
		</div>
	);
}
