// import ToDo from "../components/ToDo";
// import UserForm from "../components/UserForm";
"use client";
import TodoApp from "@/app/components/todoNovember/TodoApp";
import { userAgent } from "next/server";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function TodoNovember() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
			<TodoApp></TodoApp>
		</div>
	);
}
