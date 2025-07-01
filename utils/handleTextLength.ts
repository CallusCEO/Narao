const handleTextLength = (text: string, max: number, min?: number) => {
	return text.trim().length < max ? text.trim() : text.slice(min || 0, max).trim() + '...';
};

export default handleTextLength;
