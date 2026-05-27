type LayoutElementDefaultsCollect = Obj<string, UserProfile, LayoutDefault> &
	LayoutDefault[] & { [index: string]: LayoutDefault };

type LayoutDefault = Obj<string, LayoutElementDefaultsCollect, undefined> & {
	ElementType: string;
	Action: string;
};
