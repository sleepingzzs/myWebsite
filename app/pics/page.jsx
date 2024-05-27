"use client";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "@/components/Pic";

export default function Explore() {
	const [allPosts, setAllPosts] = useState([]);

	const getPosts = async () => {
		const colref = collection(db, "pics");
		const queue = query(colref, orderBy("timestamp", "desc"));
		const posts = onSnapshot(queue, (snapshot) => {
			setAllPosts(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
		return posts;
	};
	useEffect(() => {
		getPosts();
	}, []);
	return (
		<div className='grid grid-cols-1 gap-10 mx-auto my-5 sm:grid-cols-2 sm:max-w-2xl lg:grid-cols-3 lg:max-w-5xl'>
			{allPosts.map((post) => (
				<Post key={post.id} {...post}></Post>
			))}
		</div>
	);
}
