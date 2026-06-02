type UILayoutGrid = UIObject &
	UILayoutGridProps & {
		Rows: ItemCollectRows;
		Columns: ItemCollectColumns;
	} & Obj<'UILayoutGrid', any, any>;

type UILayoutGridProps = UIObjectProps & {
	columns: number;
	rows: number;
	defaultMargin: `${number}`;
};

type ItemCollectColumns = GenericContainerObj & Record<number, Item>;

type ItemCollectRows = GenericContainerObj & Record<number, Item>;

type ItemPropsFixed = {
	sizePolicy: 'Fixed';
	size?: number;
	minSize?: MAUISize;
};
type ItemPropsStrech = {
	sizePolicy: 'Stretch';
	size?: number;
	minSize?: MAUISize;
};
type ItemPropsContent = {
	sizePolicy: 'Content';
	size?: number;
	minSize?: MAUISize;
};
// type ItemProps = ItemPropsFixed | ItemPropsStrech | ItemPropsContent;

type ItemProps = {
	sizePolicy: SizePolicy;
	size?: number;
	minSize?: MAUISize;
};
type Item = GenericContainerObj & ItemProps;
