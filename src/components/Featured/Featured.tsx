import { Link } from "react-router-dom";
import { FeaturedType } from "../../types/BookType";

export default function Featured({
	book_id,
	cover,
	name,
	rating,
}: FeaturedType) {
	return (
		<>
			<Link
				to={`/books/:${book_id}`}
				className='w-36 md:w-44 h-[265px] md:h-[300px] mr-4 pb-5 flex flex-col justify-start items-center flex-shrink-0 border-2 rounded-3xl'>
				<img
					src={cover}
					alt='book-cover'
					className='w-44 h-[200px] md:h-[220px] p-2 rounded-3xl'
				/>
				<ul className='w-full h-full flex flex-col justify-between'>
					<li>
						<h2 className='line-clamp-2 whitespace-pre-wrap text-left uppercase text-[12px] md:text-[13px] text-neutral-800 font-bold px-2'>
							{name}
						</h2>
					</li>
					<li>
						<p className='text-left px-2 text-[12px] md:text-sm text-neutral-600'>
							Ratings: {rating}⭐
						</p>
					</li>
				</ul>
			</Link>
		</>
	);
}
