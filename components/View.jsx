"use client";
import { useRouter } from "next/navigation";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "next/navigation";
export default function View({ pic }) {
	const param = useSearchParams().get("view");
	const updateViews = async () => {
		const _doc = doc(db, "pics", param);
		await updateDoc(_doc, {
			views: (await getDoc(doc(db, "pics", param))).data().views + 1,
		});
	};

	useEffect(() => {
		updateViews();
	}, []);
	const router = useRouter();
	const close = () => {
		router.push("/gallery");
	};
	return (
		// <div className='absolute z-100 flex justify-center left-0 right-0 mx-auto bg-opacity-50  bg-white max-w-5xl'>
		<div className='absolute z-100 flex justify-center h-[100%] top-0 left-0 right-0 mx-auto backdrop-blur-sm  overflow-y-hidden'>
			<div className='relative m-auto'>
				<Image
					className='rounded-md object-cover w-[500px] ms:w-'
					width={1000}
					height={1000}
					src={pic}
					alt='e '
					priority
				></Image>
				<button
					onClick={close}
					className='text-[32px] bg-white rounded-full text-black absolute top-2 right-2'
				>
					<IoMdClose></IoMdClose>
				</button>
			</div>
		</div>
		// </div>
	);
}
