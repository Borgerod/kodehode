"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface UserItem {
	navn: string;
	epost: string;
	landskode: string;
	tlf: string;
	id: string;
}
const form_data = {
	navn: "",
	epost: "",
	landskode: "",
	tlf: "+47",
	id: "",
};
export default function UserForm() {
	const [formData, setFormData] = useState<UserItem>(form_data);

	let IsRegistered: boolean = false;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name as keyof UserItem;
		const { value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
		const _id = crypto.randomUUID();
		// const landskode
		console.log(IsRegistered);
		IsRegistered != IsRegistered;
		console.log(IsRegistered);
		setFormData({
			navn: "",
			epost: "",
			landskode: "",
			tlf: "",
			id: _id,
		});
	};
	return (
		<div className="flex flex-col align-top justify-start bg-gray-800 p-10 rounded-xl gap-10">
			<h2 className="text-2xl">Bruker Skjema</h2>
			<form
				onSubmit={handleSubmit}
				// action=""

				className="flex flex-col gap-5 w-md"
			>
				<label className="rounded-md  flex flex-row align-middle justify-between">
					<p className="flex ">Navn:</p>
					<input
						className="flex flex-row  bg-gray-950 rounded-md p-2"
						type="text"
						name="navn"
						onChange={handleChange}
						value={formData.navn}
					/>
				</label>
				<label className="rounded-md  flex flex-row align-middle justify-between">
					<p className="flex ">epost:</p>
					<input
						className="flex flex-row  bg-gray-950 rounded-md p-2"
						type="text"
						name="epost"
						onChange={handleChange}
						value={formData.epost}
					/>
				</label>
				<label className="rounded-md  flex flex-row align-middle justify-between">
					<p className="flex ">tlf:</p>

					<div className="flex flex-row gap-4">
						<input
							className="flex flex-row w-15 bg-gray-950 rounded-md p-2"
							type="number"
							aria-label="country-code"
							name="landskode"
							placeholder="+47"
							onChange={handleChange}
							value={formData.landskode}
						/>
						<input
							className="flex flex-row w-full bg-gray-950 rounded-md p-2"
							type="number"
							aria-label="phone-number"
							name="tlf"
							onChange={handleChange}
							value={formData.tlf}
							align-middle
							justify-center
						/>
					</div>
				</label>
				<div className="w-full flex justify-center mt-5">
					<button
						type="submit"
						className="bg-green-600 p-1 px-20 rounded-2xl"
					>
						registrer
					</button>
				</div>
			</form>
			<br />
			<div className="flex flex-col bg-gray-950 p-5 rounded-2xl">
				<h2 className="text-2xl">Dev window - preview</h2>

				<div className="px-5">
					<p>
						user registration:
						{IsRegistered ? " Succsess" : " Not Registered"}
					</p>
					<p> Navn: {formData.navn}</p>
					<p> Epost: {formData.epost}</p>
					<p>
						Telefon: {formData.landskode}
						{formData.tlf}
					</p>
					<p> user ID: {formData.id}</p>
				</div>
			</div>
		</div>
	);
}
