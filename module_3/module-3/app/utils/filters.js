// import { deflate } from "zlib";
import { FILTER, SORT_ORDERS } from "@/filterConfig.js";

export const toggleFilters = (array, filter) => {
	switch (filter) {
		case FILTER.ACTIVE:
			console.log(filter);
			return array.filter((item) => !item.completed);

		case FILTER.COMPLETED:
			return array.filter((item) => item.completed);

		case FILTER.ALL:
			return array;
		default:
			return array.filter((item) => !item.completed);
	}
};

export const sortArray = (array, sortOrder) => {
	switch (sortOrder) {
		case SORT_ORDERS.AZ:
			return sortAZ(array);

		case SORT_ORDERS.ZA:
			return sortZA(array);

		case SORT_ORDERS.NEW_OLD:
			return sortNewest(array);

		case SORT_ORDERS.OLD_NEW:
			return sortOldest(array);
	}
};

const sortAZ = (array) => {
	return [...array].sort((a, b) => a.title.localeCompare(b.title));
};
const sortZA = (array) => {
	return [...array].sort((a, b) => b.title.localeCompare(a.title));
};
const sortNewest = (array) => {
	return [...array].sort((a, b) => b.createdAt - a.createdAt);
};
const sortOldest = (array) => {
	return [...array].sort((a, b) => a.createdAt - b.createdAt);
};
