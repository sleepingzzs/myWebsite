"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
	const path = usePathname();
	return (
		<nav className='flex max-w-5xl justify-center mx-auto py-5 cursor-default border-b-2'>
			<ul className='flex flex-row gap-20 text-[24px]'>
				<li
					className={
						path === "/"
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
