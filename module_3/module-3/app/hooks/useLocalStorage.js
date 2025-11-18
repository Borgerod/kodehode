import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		return (
			(typeof window === "undefined" && defaultValue) ||
			(window.localStorage.getItem(key) &&
				JSON.parse(window.localStorage.getItem(key)))
		);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

//> replacing this - raised the issue: "Runtime Error: localStorage is not defined" & "window is not defined"

// import { useEffect, useState } from "react";

// export const useLocalStorage = (key, defaultValue) => {
// 	const [value, setValue] = useState(() => {
// 		const stored = localStorage.getItem(key);
// 		return stored ? JSON.parse(stored) : defaultValue;
// 	});

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(value));
// 	}, [value, key]);

// 	return [value, setValue];
// };
