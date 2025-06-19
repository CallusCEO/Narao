const theme = ['sober', 'ocean', 'desert', 'green neon'];

const selected = theme[1];

let Colors = {
	light: {
		primary: '#f5f5f5',
		secondary: '#191919',
	},
	dark: {
		primary: '#191919',
		secondary: '#f5f5f5',
	},
	firstGray: '#262626',
	secondGray: '#363636',
	thirdGray: '#696969',
	fourthGray: '#898989',
	fifthGray: '#999999',
	sixthGray: '#efefef',
	main: '#6666ff',
	mainDistilled: 'rgba(102, 102, 255, 0.7)',
};

if (selected === 'ocean') {
	Colors = {
		light: {
			primary: '#eef5ff',
			secondary: '#161c1d',
		},
		dark: {
			primary: '#161c1d',
			secondary: '#eef5ff',
		},
		firstGray: '#2d2f30',
		secondGray: '#3b3d3f',
		thirdGray: '#616769',
		fourthGray: '#7f8a89',
		fifthGray: '#8f9b9b',
		sixthGray: '#c4e1eb',
		main: '#66a9ff',
		mainDistilled: 'rgba(102, 168, 255, 0.7)',
	};
}

if (selected === 'desert') {
	Colors = {
		light: {
			primary: '#fff6dc',
			secondary: '#271f1d',
		},
		dark: {
			primary: '#271f1d',
			secondary: '#f6f2dc',
		},
		firstGray: '#363229',
		secondGray: '#40401e',
		thirdGray: '#6d675d',
		fourthGray: '#8f8d79',
		fifthGray: '#969481',
		sixthGray: '#f3e5cf',
		main: '#ff9800',
		mainDistilled: 'rgba(255, 152, 0, 0.7)',
	};
}

if (selected === 'green neon') {
	Colors = {
		light: {
			primary: '#dbe7d6',
			secondary: '#181b17',
		},
		dark: {
			primary: '#181b17',
			secondary: '#dbe7d6',
		},
		firstGray: '#232522',
		secondGray: '#343d2e',
		thirdGray: '#666963',
		fourthGray: '#7d887c',
		fifthGray: '#8d9b8c',
		sixthGray: '#d1e2ca',
		main: '#27c200',
		mainDistilled: 'rgba(39, 194, 0, 0.7)',
	};
}

export default Colors;
