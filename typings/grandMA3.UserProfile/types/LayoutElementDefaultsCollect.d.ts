type LayoutElementDefaultsCollect = Obj<
	'LayoutElementDefaultsCollect',
	UserProfile,
	LayoutElementDefaults
> &
	LayoutElementDefaults[] & { [index: string]: LayoutElementDefaults };

type LayoutElementDefaults = Obj<'LayoutElementDefaults', LayoutElementDefaultsCollect, never> & {
	ElementType: string;
	Action: string;
};
