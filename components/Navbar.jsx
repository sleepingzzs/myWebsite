"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";

export default function Nav() {
	const [showMenu, setShowMenu] = useState(false);
	let path = usePathname();
	if (path === "/") path = "/home";
	return (
		<nav className='max-w-5xl mx-auto'>
			<div className='py-5 cursor-default border-b-2'>
				<ul className='flex flex-row justify-between mx-5'>
					<li>
						<button
							onClick={() => {
								setShowMenu((a) => !a);
							}}
							className='hidden small:block'
						>
							{!showMenu && (
								<IoMenuOutline className='text-[38px]'></IoMenuOutline>
							)}
							{showMenu && (
								<IoMdClose className='text-[38px]'></IoMdClose>
							)}
						</button>
					</li>
					<li className='text-[24px] px-2 bg-white text-black rounded-md hidden small:block '>
						{path.charAt(1).toUpperCase() + path.slice(2)}
					</li>
				</ul>
				<ul className='flex flex-row justify-center gap-20 text-[24px] small:hidden'>
					<li
						className={
							path === "/home"
								? "px-2 bg-white text-black rounded-md "
								: "px-2 hover:bg-[#fff] hover:text-black  duration-300 ease-in-out rounded-md"
						}
					>
						<Link href='/'>Home</Link>
					</li>
					<li
						className={
							path === "/repos"
								? "px-2 bg-white text-black rounded-md"
								: "px-2 hover:bg-[#fff] hover:text-black  duration-300 ease-in-out rounded-md"
						}
					>
						<Link href='/repos'>Repos</Link>
					</li>
					<li
						className={
							path === "/pics"
								? "px-2 bg-white text-black rounded-md"
								: "px-2 hover:bg-[#fff] hover:text-black  duration-300 ease-in-out rounded-md"
						}
					>
						<Link href='/pics'>Pics</Link>
					</li>
				</ul>
			</div>
			{showMenu && (
				<div className='absolute left-1 right-1 py-2 mx-auto bg-black bg-opacity-80 text-white my-2 text-[24px] flex justify-center border-b-2'>
					<div className='flex flex-col gap-5'>
						<Link href='/'>
							<button
								onClick={() => {
									setShowMenu((a) => !a);
								}}
							>
								Home
							</button>
						</Link>
						<Link href='/repos'>
							<button
								onClick={() => {
									setShowMenu((a) => !a);
								}}
							>
								Repos
							</button>
						</Link>
						<Link href='/pics'>
							<button
								onClick={() => {
									setShowMenu((a) => !a);
								}}
							>
								Pics
							</button>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
