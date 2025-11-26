import { useContext } from "react";
import { AppProvider, useAppContext } from "../context/AppContext";

export default function GrandChild() {
	const { data } = useAppContext();
	return (
		<div className="bg-amber-600 p-10 border w-full h-full rounded-lg flex flex-col justify-center items-center">
			<h3 className="text-lg">GrandChild</h3>
			<p>data: {data}</p>
		</div>
	);
}
