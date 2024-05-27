import Image from "next/image";
import Link from "next/link";

export default function Card({ caption, pic, timestamp, id }) {
	return (
		<Link href='/pics'>
			<div className='flex flex-row bg-white bg-opacity-10 gap-2 w-[500px] p-2 rounded-md hover:bg-opacity-20	'>
				<Image
					className='rounded-md w-[80px] h-[80px] object-cover'
					width={200}
					height={200}
					src={pic}
					alt='Could not load image'
					priority
				></Image>
				<div>{caption}</div>
			</div>
		</Link>
	);
}
