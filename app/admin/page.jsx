"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { db, storage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Admin() {
	const { handleSubmit, register, formState } = useForm();
	const route = useRouter();
	//login
	const [session, setSession] = useState(false);
	const login = (value) => {
		if (value.pass === process.env.NEXT_PUBLIC_ADMIN) {
			setSession((a) => !a);
		}
	};

	//post pic
	const submitForm = async (values) => {
		const ts = Date.now();
		route.push("/gallery");
		const picRef = ref(storage, `pics/${ts}`);

		//uploading
		const uploaded = await uploadBytes(picRef, values.pic[0]);
		const downloadUrl = await getDownloadURL(uploaded.ref);

		const colref = collection(db, "pics");
		await addDoc(colref, {
			timestamp: ts,
			caption: values.caption,
			pic: downloadUrl,
			views: 0,
		});
	};
	const { errors } = formState;

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
			{session && (
				<form
					onSubmit={handleSubmit(submitForm)}
					className='flex flex-col items-center mt-10 cursor-default bg-white bg-opacity-10 rounded-md p-2'
					noValidate
				>
					<div className='flex flex-col gap-10'>
						<header className='text-[2em]'>
							# Upload a picture!
						</header>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor='caption'
								className='text-base italic'
							>
								*Post&apos;s caption
							</label>
							<input
								{...register("caption", {
									required: {
										value: true,
										message: "*caption is required",
									},
								})}
								type='text'
								id='caption'
								placeholder='caption'
								autoComplete='off'
								className='outline-none bg-white bg-opacity-5 p-2 rounded-md'
							/>
							<label htmlFor='pic' className='text-base italic'>
								*Your pic
							</label>
							<input
								{...register("pic", {
									required: {
										value: true,
										message:
											"*you must upload an image or video",
									},
									validate: (field) => {
										if (
											!(
												field[0].name.endsWith("jpg") ||
												field[0].name.endsWith(
													"jpeg"
												) ||
												field[0].name.endsWith("png")
											)
										) {
											return "*file must be in jpg, jpeg, or png formats";
										} else if (field[0].size >= 15728640) {
											return "*file size must be less than or equal to 15MB";
										}
									},
								})}
								type='file'
								id='pic'
								className='bg-white cursor-pointer bg-opacity-5 p-2 rounded-md'
							/>
						</div>
						<button
							type='submit'
							className='p-2 rounded-md border-[#fff] border-2 transition-colors duration-300 ease-in-out hover:bg-[#fff] hover:text-black'
						>
							Upload
						</button>
						<ul className='text-red-500 italic text-base'>
							<li>{errors.pic?.message}</li>
						</ul>
					</div>
				</form>
			)}
		</div>
	);
}
