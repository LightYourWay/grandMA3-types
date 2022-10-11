type Appearances = Obj<ShowData, Appearance> & Appearance[] & { [index: string]: Appearance };

type Appearance = Obj<Appearances, null> &
	null[] & { [index: string]: null } & {
		Image: Image;
		ImageR: number;
		ImageG: number;
		ImageB: number;
		ImageAlpha: number;
		BackR: number;
		BackG: number;
		BackB: number;
		BackAlpha: number;
	};
