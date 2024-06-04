import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function Pic({ caption, pic, timestamp, id }) {
	const [showCaption, setShowCaption] = useState(false);
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
		<div className='flex flex-col mx-auto cursor-pointer '>
			<div className='flex flex-col bg-white bg-opacity-10 rounded-md cursor-pointer'>
				<div className='flex flex-row justify-between p-1'>
					<div className='text-[12px] flex flex-col justify-center'>
						{last}
					</div>
					<button
						onClick={() => {
							setShowCaption((a) => !a);
						}}
					>
						<BsThreeDotsVertical className='text-[22px]'></BsThreeDotsVertical>
					</button>

					{/* <li>
						<FaRegHeart className='text-[16px]' />
					</li>
					<li>
						<FaRegComment className='text-[16px]' />
					</li> */}
				</div>
				<div>
					{showCaption && (
						<div className='absolute left-2 right-2 min-h-[100px] bg-black bg-opacity-80 text-white border-b-2 rounded-t-md'>
							<p className='leading-8 mx-2'> {caption}</p>
						</div>
					)}
					<Image
						className='rounded-md object-cover w-screen h-[100%]'
						width={200}
						height={200}
						src={pic}
						alt='Could not load image'
						priority
					></Image>
				</div>
			</div>
		</div>
	);
}
