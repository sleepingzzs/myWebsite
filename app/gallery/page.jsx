"use client";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	doc,
	getDoc,
} from "firebase/firestore";
import Post from "@/components/Pic";
import View from "@/components/View";
import { useSearchParams, useRouter } from "next/navigation";

export default function Explore() {
	const [allPosts, setAllPosts] = useState([]);
	const [view, setView] = useState([]);
	const [toggle, setToggle] = useState(false);
	const router = useRouter();
	const id = useSearchParams().get("view");
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
	const showView = async () => {
		try {
			setView((await getDoc(doc(db, "pics", id))).data());
			setToggle(true);
		} catch (err) {
			router.push("/gallery");
			setToggle(false);
		}
	};
	useEffect(() => {
		getPosts();
	}, []);
	useEffect(() => {
		showView();
	}, [id]);
	return (
		<div className='grid grid-cols-1 gap-5 mx-auto my-5 sm:grid-cols-2 sm:max-w-2xl lg:grid-cols-3 lg:max-w-5xl overflow-y-hidden'>
			{allPosts.map((post) => (
				<Post key={post.id} {...post}></Post>
			))}
			{toggle && <View {...view}></View>}
		</div>
	);
}
