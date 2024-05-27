"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { db, storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Admin() {
	const { handleSubmit, register, formState } = useForm();
	//login
	const [session, setSession] = useState(false);
	const login = (value) => {
		if (value.pass === process.env.NEXT_PUBLIC_ADMIN) setSession((a) => !a);
	};

	return (
		<div className='flex flex-col'>
			{!session && (
				<form
					className='flex flex-col gap-2 self-center mt-5'
					onSubmit={handleSubmit(login)}
				>
					<input
						className='bg-white bg-opacity-5 outline-none rounded-md p-2'
						type='password'
						{...register("pass")}
						placeholder='password'
					/>
					<button
						type='submit'
						className='p-2 rounded-md border-[#fff] border-2 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-black'
					>
						Login
					</button>
				</form>
			)}
		</div>
	);
}
