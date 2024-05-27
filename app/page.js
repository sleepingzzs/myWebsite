"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaInstagram, FaSpotify, FaSteam } from "react-icons/fa";
import Link from "next/link";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Pic from "@/components/PicCard";

export default function Home() {
	const [allPics, setAllPics] = useState([]);

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
	}, []);

	return (
		<div className='flex flex-col items-center justify-between pt-10'>
			<div className='flex justify-center items-center xl:flex-row flex-col gap-10 pb-10'>
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
						I'm a 16 year old guy who's interested in 'techie'
						stuff. For now, web-dev is just my hobby and I plan on
						pursuing data science as a career option in the future.
						Besides the techie stuff, I like staying at home and
						play videogames with occasionally hanging out with the
						homies. Oh! I almost forgot to mention - I use linux
						BTW.
					</p>{" "}
					<div className='py-2 flex justify-center xl:justify-start items-center'>
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
							<Link href='https://instagram.com/abismxr'>
								<li className='flex flex-row gap-2 rounded-md bg-white p-1 opacity-60 hover:opacity-100'>
									<FaInstagram className='fill-black' />
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
			<div className='grid grid-cols-1 gap-10 mx-auto my-5 sm:grid-cols-2 sm:max-w-2xl lg:grid-cols-3 lg:max-w-5xl'>
				<div className='flex flex-col gap-2'>
					<h1 className='text-[28px]'># Recent pics</h1>
					{allPics.map((post) => (
						<Pic key={post.id} {...post}></Pic>
					))}
				</div>
			</div>
		</div>
	);
}
