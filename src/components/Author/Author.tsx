import authorIllustration from "../../assets/illustrations/author-illustration.jpg";

export default function Author(props: {
	setIsRevealed: (arg0: boolean) => void;
	image: string | undefined;
	name: string;
	author_id: number;
	url: string;
	popular_book_url: string;
	number_published_books: number;
	setAuthorId: React.Dispatch<React.SetStateAction<number>>;
}) {
	function preventScroll() {
		window.addEventListener("scroll", (e) => e.preventDefault());
	}

	function showAuthor(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();
		props.setAuthorId(props.author_id);
		preventScroll();
		props.setIsRevealed(true);
	}

	return (
		<>
			<div
				onClick={showAuthor}
				className='w-auto flex flex-col items-center justify-center flex-shrink-0'>
				<img
					src={props.image ? props.image : authorIllustration}
					alt='author-image'
					className='w-24 h-24 md:w-36 md:h-36 bg-transparent border-[1px] rounded-full'
				/>
				<b className='mt-2'>{props.name}</b>
			</div>
		</>
	);
}
