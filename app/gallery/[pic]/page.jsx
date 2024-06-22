"use client";
import Link from "next/link";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Post({ params }) {
	const [post, setPost] = useState([]);
	const getPosts = async () => {
		setPost((await getDoc(doc(db, "pics", params.pic))).data());
	};
	const updateViews = async () => {
		const _doc = doc(db, "pics", params.pic);
		await updateDoc(_doc, {
			views: (await getDoc(doc(db, "pics", params.pic))).data().views + 1,
		});
	};

	useEffect(() => {
		getPosts();
		updateViews();
	}, []);

	return (
		<div className='flex flex-col items-center mb-5'>
			<div className='flex flex-col gap-2 p-2 bg-white bg-opacity-5 rounded-md cursor-pointer mx-auto max-w-md h-[100] my-5'>
				<ul className='flex flex-row justify-between text-base'>
					<li>
						{new Date(post.timestamp).toLocaleString("en-IN", {
							day: "2-digit",
							year: "2-digit",
							month: "2-digit",
						})}
					</li>
					<li>{post.views}</li>
				</ul>

				<Image
					className='rounded-md'
					width={1000}
					height={1000}
					src={post.pic}
					alt='Could not load image'
				></Image>

				<h1>{post.caption}</h1>
			</div>
			<Link href='/gallery'>
				<h1 className='text-2xl underline '>Go back?</h1>
			</Link>
		</div>
	);
}
