type LayoutElementDefaultsCollect = Obj<string, UserProfile, LayoutDefault> &
	LayoutDefault[] & { [index: string]: LayoutDefault };

type LayoutDefault = Obj<string, LayoutElementDefaultsCollect, never> & {
	ElementType: string;
	Action: string;
};
