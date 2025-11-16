// import ToDo from "../components/ToDo";
// import UserForm from "../components/UserForm";
"use client";
import { userAgent } from "next/server";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function Home() {
	// NORMAL USE EFFECT
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log("only on mount");
	});

	useEffect(() => {
		console.log("on mount and on count");
		return () => {
			console.log("on dismount");
		};
	}, [count]);

	// EVENT LISTNER
	const [key, setKey] = useState("");
	useEffect(() => {
		// TODO: not working
		const handleKey = (event: KeyboardEvent) => {
			setKey(event.key);
			window.addEventListener("keydown", handleKey);
			console.log("down was pressed");
			return () => {
				window.removeEventListener("keydown", handleKey);
			};
		};
	}, []);

	// ARRAY LOOP
	const nameArray = ["lars", "mia", "eivind", "henning"];
	const [name, setName] = useState(nameArray[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (count < nameArray.length) {
				setCount((prev) => prev + 1);
			} else {
				setCount(0);
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});

	useEffect(() => {
		setName(nameArray[count]);
	}, [count]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			{/* <p className="p-10 mr-10 bg-gray-500 ">{count}</p>
			<button
				onClick={() => setCount((prev) => prev + 1)}
				className="bg-green-600 px-2 py-1 rounded-xl"
			>
				press me
			</button> */}
			{/* LOOP */}
			<h1> Velkommen {name} </h1>
		</div>
	);
}
