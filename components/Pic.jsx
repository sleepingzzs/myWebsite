import Image from "next/image";
import Link from "next/link";

export default function Pic({ caption, pic, timestamp, id }) {
	const time = Date.now() - timestamp;
	return (
		<div className='flex flex-col gap-2 justify-center  cursor-pointer mx-auto max-w-[400px]'>
			<Link href={`/explore/${id}`}>
				<div className='flex flex-col gap-2 p-2 bg-white bg-opacity-10 rounded-md cursor-pointer max-w-[300px]'>
					<ul className='flex flex-row justify-between text-base'>
						<li>
							{new Date(timestamp).toLocaleString("en-IN", {
								day: "2-digit",
								year: "2-digit",
								month: "2-digit",
							})}
						</li>
					</ul>

					<Image
						className='rounded-md w-[300px] h-[300px] object-cover'
						width={200}
						height={200}
						src={pic}
						alt='Could not load image'
						priority
					></Image>

					<h1>{caption}</h1>
				</div>
			</Link>
		</div>
	);
}
