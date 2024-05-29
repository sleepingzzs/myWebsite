"use client";
import { repos } from "@/utils/github";
import { useState, useEffect } from "react";
import Repo from "@/components/Repo";

export default function Repos() {
	const [allRepos, setAllRepos] = useState([]);
	const getPosts = async () => {
		setAllRepos(await repos);
	};

	useEffect(() => {
		getPosts();
	}, []);
	return (
		<div className='grid grid-cols-2 gap-5 mx-auto mt-5 medium:grid-cols-1'>
			{allRepos.map((repo) => (
				<Repo key={repo.name} {...repo}></Repo>
			))}
		</div>
	);
}
