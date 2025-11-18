import { FILTER, SORT_ORDERS } from "@/filterConfig";
type Props = {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
	sortOrder: string;
	setSortOrder: React.Dispatch<React.SetStateAction<string>>;
};
export default function TodoFilters({
	filter,
	setFilter,
	sortOrder,
	setSortOrder,
}: Props) {
	return (
		<>
			<select
				className=""
				name=""
				id=""
				value={filter}
				onChange={(e) => setFilter(e.target.value)}>
				{Object.values(FILTER).map((item: string) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>

			<select
				className=""
				name=""
				id=""
				autoComplete={sortOrder}
				onChange={(e) => setSortOrder(e.target.value)}>
				{Object.values(SORT_ORDERS).map((item: string) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
		</>
	);
}
