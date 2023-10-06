export type AuthorBooks = {
	name: string;
	url: string;
	rating: number | null;
	date: number;
};

export type BookAuthor = {
	author_id: number;
	name: string;
	image: string;
	url: string;
	popular_book_url: string;
	number_published_books: number;
};

export type AuthorType = {
	author_id: number;
	name: string;
	image: string;
	rating: number;
	info: string;
	born: string;
	died: string;
	author_books: AuthorBooks[];
};
