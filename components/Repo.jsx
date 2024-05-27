import Image from "next/image";
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
	return (
		<Link href={url}>
			<div className='flex flex-col bg-white bg-opacity-10 gap-2 w-[500px] p-2 rounded-md hover:bg-opacity-20	h-[125px] justify-between'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row gap-2'>
						<RiGitRepositoryLine className='text-[24px]'></RiGitRepositoryLine>
						<h1 className='font-semibold hover:underline'>
							{name}
						</h1>
					</div>
					<p className='text-[12px]'>{description}</p>
				</div>
				<ul className='flex flex-row justify-between text-[12px]'>
					<li className='flex flex-row gap-2'>
						<FaRegStar className='text-[16px]'></FaRegStar>
						{stars}
					</li>
					<li className='flex flex-row gap-2'>
						<FaCode className='text-[16px]'></FaCode> {language}
					</li>
					<li>Last updated {push}</li>
				</ul>
			</div>
		</Link>
	);
}
