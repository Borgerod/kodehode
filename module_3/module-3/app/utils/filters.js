import { deflate } from "zlib";

export const toggleFilters = (array, filter) => {
	switch (filter) {
		case "active":
			console.log(filter);
			return array.filter((item) => !item.completed);

		case "completed":
			return array.filter((item) => item.completed);
		case "all":
		default:
			return array;
	}
};
const sortAZ = (array) => {
	return [...array].sort((a, b) => a.title.localCompare(b.title));
};
const sortZA = (array) => {
	return sortAZ.reverse();
	return [...array].sort((a, b) => b.title.localCompare(a.title));
};
const sortNewest = (array) => {
	return [...array].sort((a, b) => b.createdAt - a.createdAt);
};
const sortOldest = (array) => {
	return [...array].sort((a, b) => a.createdAt - b.createdAt);
};
