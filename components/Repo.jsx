import Link from "next/link";
import { FaRegStar, FaCode } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";

export default function Card({
	name,
	url,
	description,
	stars,
	language,
	push,
}) {
	let last = Math.floor((Date.now() - push) / 86400000);
	if (last < 1) {
		last = "today";
	} else if (last < 30) {
		last = last + " days ago";
	} else if (last < 365) {
		last = Math.floor(last / 30) + " months ago";
	} else last = Math.floor(last / 365) + " years ago";
	if (last.startsWith("1")) last = last.replace("s", "");

	return (
		<Link href={url}>
			<div className='flex flex-col bg-white bg-opacity-10 gap-2 p-2 rounded-md hover:bg-opacity-20 h-[120px] justify-between'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row gap-2'>
						<RiGitRepositoryLine className='text-[24px]'></RiGitRepositoryLine>
						<h1 className='font-semibold hover:underline'>
							{name}
						</h1>
					</div>
					<p className='text-[12px] line-clamp-2'>{description}</p>
				</div>
				<ul className='flex flex-row justify-between text-[12px]'>
					<li className='flex flex-row gap-2'>
						<FaRegStar className='text-[16px]'></FaRegStar>
						{stars}
					</li>
					<li className='flex flex-row gap-2'>
						<FaCode className='text-[16px]'></FaCode> {language}
					</li>
					<li>Last updated {last}</li>
				</ul>
			</div>
		</Link>
	);
}
