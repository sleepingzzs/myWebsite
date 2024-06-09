import Image from "next/image";
import Link from "next/link";

export default function Card({ caption, pic, timestamp, id }) {
	let last = Math.floor((Date.now() - timestamp) / 86400000);
	if (last < 1) {
		last = "today";
	} else if (last < 30) {
		last = last + " days ago";
	} else if (last < 365) {
		last = Math.floor(last / 30) + " months ago";
	} else last = Math.floor(last / 365) + " years ago";
	if (last.startsWith("1")) last = last.replace("s", "");
	return (
		<Link href='/gallery'>
			<div className='flex flex-row bg-white bg-opacity-10 gap-2 h-[100px] p-2 rounded-md hover:bg-opacity-20'>
				<Image
					className='rounded-md aspect-square object-cover'
					width='90'
					height='90'
					src={pic}
					alt='Could not load image'
					priority
				></Image>
				<div className='flex flex-col justify-between w-screen'>
					<p className='text-[14px] line-clamp-2'>{caption}</p>
					<ul className='flex flex-row justify-between'>
						<li className='text-[12px]'>views</li>
						<li className='text-[12px]'>Posted {last}</li>
					</ul>
				</div>
			</div>
		</Link>
	);
}
