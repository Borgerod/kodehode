import GrandChild from "./GrandChild";
import { useAppContext } from "../context/AppContext";

export default function Child() {
	const { data } = useAppContext();

	return (
		<div className="bg-amber-700 p-10 border w-full h-full rounded-lg flex flex-col justify-center items-center">
			<h2 className="text-xl">Child</h2>
			<GrandChild></GrandChild>
		</div>
	);
}
