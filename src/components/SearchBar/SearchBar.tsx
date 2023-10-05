import searchIcon from "../../assets/images/icons8-search-50.png";

export default function SearchBar(props: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchFromQuery: any;
	setQuery: (arg0: string) => void;
}) {
	return (
		<>
			<div className='w-[90%] sm:w-[80%] h-20 flex items-center justify-center'>
				<input
					type='text'
					onChange={(e) => props.setQuery(e.target.value.replace(" ", "+"))}
					className='px-4 border-[1px] w-[90%] h-12 rounded-l-full outline-none bg-white md:bg-neutral-50 shadow-inner font-semibold placeholder:font-semibold'
					placeholder='Search for your next book..'
				/>
				<button
					onClick={props.searchFromQuery}
					className='border-2 border-black bg-black py-[10px] rounded-l-none rounded-r-full'>
					<img src={searchIcon} alt='search' className='w-6 bg-black' />
				</button>
			</div>
		</>
	);
}
