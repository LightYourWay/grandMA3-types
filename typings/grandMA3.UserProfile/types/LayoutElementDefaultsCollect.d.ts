// LayoutElementDefaultsCollect
type LayoutElementDefaultsCollect = Obj<
	'LayoutElementDefaultsCollect',
	UserProfile,
	LayoutElementDefaults
> &
	(LayoutElementDefaults | undefined)[] &
	Record<string, LayoutElementDefaults | undefined>;

// LayoutElementDefaults
type LayoutElementDefaultsProperties = ObjProps & {
	ElementType: string;
	Action: string;
};
type LayoutElementDefaults = Obj<
	'LayoutElementDefaults',
	LayoutElementDefaultsCollect,
	never,
	LayoutElementDefaultsProperties
> &
	LayoutElementDefaultsProperties;
