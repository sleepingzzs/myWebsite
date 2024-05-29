"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenuOutline } from "react-icons/io5";
export default function Nav() {
	let path = usePathname();
	if (path === "/") path = "/home";
	return (
		<nav className='flex max-w-5xl justify-center mx-auto py-5 cursor-default border-b-2'>
			<ul className='flex flex-row justify-between'>
				<li className=''>
					<IoMenuOutline className='hidden small:block text-[38px]'></IoMenuOutline>
				</li>
				<li className='text-[24px] px-2 bg-white text-black rounded-md hidden small:block '>
					{path.charAt(1).toUpperCase() + path.slice(2)}
				</li>
			</ul>
			<ul className='flex flex-row gap-20 text-[24px] small:hidden'>
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
		</nav>
	);
}
