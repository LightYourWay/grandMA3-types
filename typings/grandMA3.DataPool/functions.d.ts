type DataPool = {
	[index: string]: any; // any string access that is unspecified, treat as any
	Sequences: {
		[index: string]: any; // any string access that is unspecified, treat as any
		[key: number]: Sequence;
	};
};
