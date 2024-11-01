"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaSpotify, FaSteam, FaDiscord } from "react-icons/fa";
import { SiAnilist } from "react-icons/si";
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
	const [currentTrack, setCurrentTrack] = useState([]);

	//get repos
	const getRepos = async () => {
		setAllRepos((await repos).slice(0, 3));
	};

	//get track
	const getTrack = async () => {
		const res = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sleepingzzs&api_key=${process.env.NEXT_PUBLIC_LASTFM}&format=json`
		);
		let data = await res.json();
		try {
			setCurrentTrack({
				name: data.recenttracks.track[0].name,
				artist: data.recenttracks.track[0].artist["#text"],
				url: data.recenttracks.track[0].url,
				isPlaying:
					data.recenttracks.track[0]["@attr"].nowplaying === "true"
						? true
						: false,
			});
		} catch {
			setCurrentTrack({
				name: data.recenttracks.track[0].name,
				artist: data.recenttracks.track[0].artist["#text"],
				url: data.recenttracks.track[0].url,
				isPlaying: false,
			});
		}
	};

	//get pics
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
	};
	useEffect(() => {
		getTrack();
	}, []);
	useEffect(() => {
		getPics();
		getRepos();
		const interval = setInterval(() => {
			getTrack();
		}, 30000);

		return () => clearInterval(interval);
	}, []);

	const age = Math.floor((Date.now() - 1202182200000) / 86400000 / 365);
	return (
		<div className='flex flex-col justify-between py-10'>
			<div className='flex justify-center items-center flex-row medium:flex-col gap-10 pb-10'>
				<div className='flex flex-col relative justify-center items-center min-w-80 mx-auto ms:w-[250px] ms:h-[250px]'>
					<Image
						className='rounded-full w-[275px] h-[275px] object-cover ms:w-[250px] ms:h-[250px]'
						width={200}
						height={200}
						src={require("@/public/icon.png")}
						alt='Could not load image'
						priority
					></Image>
					{currentTrack.isPlaying && (
						<div className='absolute right-0 left-0 bottom-2 text-[12px] mx-auto flex flex-row justify-center rounded-md bg-white bg-opacity-10'>
							<p className='whitespace-nowrap line-clamp-1 text-ellipsis'>
								🎶 Listening to{" "}
								<span className='text-[12px] font-semibold hover:underline'>
									<Link
										href={currentTrack.url}
										target='_blank'
									>
										{currentTrack.name} -{" "}
										{currentTrack.artist}
									</Link>
								</span>
							</p>
						</div>
					)}
				</div>

				<div className='flex flex-col gap-5 self-center'>
					<h1 className='text-[28px] font-semibold'>
						<TypeAnimation
							sequence={[
								"Hey! I'm Abismar!",
								3000,
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
					<div className='leading-8 flex flex-col gap-2'>
						<p>
							I'm your average {age} year old chronically online
							geek who never leaves his computer screen. Science
							fascinates me and technology excites me! Besides
							being a cool tech-bro, I spend my hours in various
							video games, music, anime, webtoons, etc.
						</p>
						<p>I use linux BTW-</p>
					</div>
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
							<Link href='https://anilist.co/user/sleepingzzs/'>
								<li className='flex flex-row gap-2 rounded-md bg-white p-1 opacity-60 hover:opacity-100'>
									<SiAnilist className='fill-black'></SiAnilist>
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
