export type BookAuthors = {
	author_id: number;
	name: string;
	image: string;
	url: string;
	popular_book_url: string;
	number_published_books: number;
}[];

export type Author = {
	author_id: number;
	name: string;
	image: string;
	rating: number;
	info: string;
	born: string;
	died: string;
};
