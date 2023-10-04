export type Book = {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: {
		title: string;
		subtitle: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		industryIdentifiers: [
			{
				type: string;
				identifier: string;
			}
		];
		readingModes: {
			text: boolean;
			image: boolean;
		};
		pageCount: number;
		printedPageCount: number;
		dimensions: {
			height: string;
			width: string;
			thickness: string;
		};
		printType: string;
		categories: string[];
		maturityRating: string;
		allowAnonLogging: boolean;
		contentVersion: string;
		panelizationSummary: {
			containsEpubBubbles: boolean;
			containsImageBubbles: boolean;
		};
		imageLinks: {
			smallThumbnail: string;
			thumbnail: string;
			small: string;
			medium: string;
			large: string;
		};
		language: string;
		previewLink: string;
		infoLink: string;
		canonicalVolumeLink: string;
	};
	saleInfo: {
		country: string;
		saleability: string;
		isEbook: boolean;
	};
	accessInfo: {
		country: string;
		viewability: string;
		embeddable: boolean;
		publicDomain: boolean;
		textToSpeechPermission: string;
		epub: {
			isAvailable: boolean;
		};
		pdf: {
			isAvailable: boolean;
		};
		webReaderLink: string;
		accessViewStatus: string;
		quoteSharingAllowed: boolean;
	};
};
