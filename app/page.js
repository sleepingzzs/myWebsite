"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import {
	FaGithub,
	FaInstagram,
	FaSpotify,
	FaSteam,
	FaDiscord,
} from "react-icons/fa";
import Link from "next/link";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Pic from "@/components/PicCard";
import Repo from "@/components/RepoCard";
import { repos } from "@/utils/github";

export default function Home() {
	const [allPics, setAllPics] = useState([]);
	const [allRepos, setAllRepos] = useState([]);
	const getRepos = async () => {
		setAllRepos((await repos).slice(0, 3));
	};

	const getPics = async () => {
		const colref = collection(db, "pics");
		const queue = query(colref, orderBy("timestamp", "desc"));
		const pics = onSnapshot(queue, (snapshot) => {
			setAllPics(
				snapshot.docs
					.slice(0, 3)
					.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
		return pics;
	};
	useEffect(() => {
		getPics();
		getRepos();
	}, []);
	const age = Math.floor((Date.now() - 1202182200000) / 86400000 / 365);
	return (
		<div className='flex flex-col  justify-between pt-10'>
			<div className='flex justify-center items-center flex-row medium:flex-col gap-10 pb-10'>
				<Image
					className='rounded-full w-[300px] h-[300px] object-cover'
					width={200}
					height={200}
					src={require("@/icons/icon.png")}
					alt='Could not load image'
					priority
				></Image>
				<div className='flex flex-col gap-5 self-center'>
					<h1 className='text-[28px] font-semibold'>
						<TypeAnimation
							sequence={[
								// Same substring at the start will only be typed out once, initially
								"Hey! I'm Abismar!",
								3000, // wait 1s before replacing "Mice" with "Hamsters"
								"Hey! I'm sleepingzzs!",
								3000,
								"Hey! I'm bizi!",
								3000,
							]}
							wrapper='span'
							speed={50}
							style={{ fontSize: "28px" }}
							repeat={Infinity}
						/>
					</h1>
					<p className='leading-8'>
						I'm a {age} year old geek who likes modern technology. I
						do web-dev for fun but also interested in AI/ML. Besides
						the techie stuff, I like to spend my time playing
						videogames, listening to music, reading webtoons,
						watching anime... yada yada and hanging out with
						friends. Oh! I almost forgot to mention - I use linux
						BTW.
					</p>
					<div className='py-2 flex medium:justify-center justify-start items-center'>
						<ul className='flex flex-row text-[36px] gap-4'>
							<Link href='https://github.com/sleepingzzs'>
								<li className='flex flex-row gap-2 rounded-md bg-white p-1 opacity-60 hover:opacity-100'>
									<FaGithub className='fill-black' />
								</li>
							</Link>
							<Link href='https://open.spotify.com/user/62znb2onqvzufw1rq406e8ots'>
								<li className='flex flex-row gap-2 rounded-md bg-white p-1 opacity-60 hover:opacity-100'>
									<FaSpotify className='fill-black' />
								</li>
							</Link>
							<Link href='https://discord.com/users/739438952775286926'>
								<li className='flex flex-row gap-2 rounded-md bg-white p-1 opacity-60 hover:opacity-100'>
									<FaDiscord className='fill-black' />
								</li>
							</Link>
							<Link href='https://steamcommunity.com/profiles/76561199105868897/'>
								<li className='flex flex-row gap-2 rounded-md bg-white p-1 opacity-60 hover:opacity-100'>
									<FaSteam className='fill-black' />
								</li>
							</Link>
						</ul>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-5 mt-5 ms:grid-cols-1'>
				<div className='flex flex-col gap-2'>
					<h1 className='text-[28px]'># Recent pics</h1>
					{allPics.map((post) => (
						<Pic key={post.id} {...post}></Pic>
					))}
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='text-[28px]'># Recent repos</h1>
					{allRepos.map((repo) => (
						<Repo key={repo.name} {...repo}></Repo>
					))}
				</div>
			</div>
		</div>
	);
}
