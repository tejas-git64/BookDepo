import { useContext, useEffect, useState } from "react";
import { AuthorType } from "../../types/AuthorTypes";
import authorbio from "../../data/authorbio.json";
import Results from "../Results/Results";
import { AppContext } from "../../App";

export default function AuthorDetails(props: {
	isRevealed: boolean;
	setIsRevealed: React.Dispatch<React.SetStateAction<boolean>>;
	authorId: number;
}) {
	const [authorBio, setAuthorBio] = useState<AuthorType | null>(authorbio);
	const AuthorContext = useContext(AppContext);
	function close(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		props.setIsRevealed(false);
	}

	const url = `https://hapi-books.p.rapidapi.com/author/${props.authorId}`;
	async function getAuthorDetailsById() {
		try {
			const response = await fetch(url, AuthorContext?.options);
			const readableStream = await response.text();
			const result = JSON.parse(readableStream);
			result.length > 0 && setAuthorBio(result);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getAuthorDetailsById();
	}, [props.authorId]);

	return (
		<>
			<dialog
				style={{
					background: "linear-gradient(0deg, #0006 ,#fffc)",
				}}
				className={`${
					props.isRevealed ? "flex" : "hidden"
				} fixed top-0 left-0 w-full h-full items-center justify-center`}>
				<section className='w-[95%] xl:w-[1250px] h-[80%] bg-white rounded-3xl pb-10 overflow-y-scroll'>
					<div className='w-full flex justify-between items-center border-b-2 px-4 py-3 rounded-t-2xl'>
						<h2 className='font-semibold'>Author information</h2>
						<button
							onClick={close}
							className='p-[1px] px-[8px] rounded-full font-bold text-neutral-700 bg-neutral-100 outline-none'>
							x
						</button>
					</div>
					<div className='w-full h-auto'>
						<div className='w-full h-auto p-2 pt-5 flex flex-col md:flex-row items-center justify-center md:items-start'>
							<img
								src={authorBio?.image}
								alt='author-boi'
								className='w-44 md:w-40 mb-6 md:mb-0 rounded-3xl md:mx-[2.5%]'
							/>
							<div className='md:mx-[2.5%] w-[80%] md:w-[600px] xl:w-[700px] pb-4'>
								<h3 className='md:text-left font-bold text-xl'>
									{authorBio?.name}
								</h3>
								<p className='md:text-left text-sm font-semibold mt-2 text-neutral-500'>
									Born on: {authorBio?.born}
								</p>
								<p className='md:text-left text-sm font-semibold mb-4 md:mb-2 text-neutral-500'>
									Died on: {authorBio?.died}
								</p>
								<p className='text-justify text-sm text-neutral-700'>
									{authorBio?.info}
								</p>
							</div>
						</div>
						<div className='w-full border-t-[1px] pt-3 mx-auto px-[10%] md:px-[3.5%] lg:px-[7%] xl:px-[12%]'>
							<h2 className='font-semibold text-lg text-left'>Famous Books</h2>
							<ul>
								{authorBio?.author_books ? (
									authorBio?.author_books.map((book, i) => (
										<Results
											key={i}
											book_id={0}
											name={book.name}
											cover={""}
											url={book.url}
											authors={[""]}
											rating={book.rating || 0}
											created_editions={0}
											year={book.date}
										/>
									))
								) : (
									<p>Unable to fetch books</p>
								)}
							</ul>
						</div>
					</div>
				</section>
			</dialog>
		</>
	);
}
