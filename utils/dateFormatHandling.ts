// October 1, 2025
export const ISOtoAmericanDate = (date: string): string => {
	const dateObj = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return dateObj.toLocaleDateString('en-US', options);
};

// 1 October 2025
export const ISOtoEnglishDate = (date: string): string => {
	const dateObj = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return dateObj.toLocaleDateString('en-GB', options);
};

// 01/10/2025
export const ISOtoFrenchDate = (date: string): string => {
	const dateObj = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	};
	return dateObj.toLocaleDateString('fr-FR', options);
};
