//For Books entirely
export type Title = {
	book_id: number;
	name: string;
	author: string;
	votes: number;
	cover: string;
	url: string;
} | null;

//For Featured Books
export type FeaturedType = {
	book_id: string;
	position: string;
	name: string;
	cover: string;
	rating: number;
	url: string;
};

export type TitleById = {
	book_id: number;
	name: string;
	cover: string;
	url: string;
	authors: string[];
	rating: number;
	pages: number;
	published_date: string;
};

export type TitleSearch = {
	book_id: number;
	name: string;
	cover: string;
	url: string;
	authors: string[];
	rating: number;
	created_editions: number;
	year: number;
};

export type ResultType = {
	searchResults: TitleSearch[] | null;
	setSearchResults: React.Dispatch<React.SetStateAction<TitleSearch[] | null>>;
};

export type Genres = {
	book_id: number;
	name: string;
	cover: string;
	url: string;
}[];
