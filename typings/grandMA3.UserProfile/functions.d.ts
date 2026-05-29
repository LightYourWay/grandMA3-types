type UserProfileChildren = {
	Environments: Environments;
	Views: Views;
	KeyboardShortCuts: KeyboardShortCuts;
	ScreenConfigurations: ScreenConfigurations;
	LayoutElementDefaultsCollect: LayoutElementDefaultsCollect;
	UserAttributePreferences: UserAttributePreferences;
};
type UserProfileProperties = ObjProps & {
	encoderUIStyle: Enums.EncoderUIStyle;
	autoRemoveGaps: boolean;
	Name: string;
};

type UserProfile = Obj<
	'UserProfile',
	UserProfiles,
	UserProfileChildren[keyof UserProfileChildren],
	UserProfileProperties
> &
	UserProfileChildren[keyof UserProfileChildren][] &
	Record<string, UserProfileChildren[keyof UserProfileChildren] | undefined> &
	UserProfileChildren &
	UserProfileProperties;

type EnvironmentsProperties = ObjProps & {
	/** Main Programmer Environment */
	1: UserEnvironment;
	/** Preview Programmer Environment */
	2: UserEnvironment;
};
type Environments = Obj<'Environments', UserProfile, UserEnvironment, EnvironmentsProperties> &
	(UserEnvironment | undefined)[] &
	Record<string, UserEnvironment | undefined> &
	EnvironmentsProperties;

type Views = Obj<'Views', UserProfile, View> &
	(View | undefined)[] &
	Record<string, View | undefined>;

type View = Obj<'View', Views, ViewWidget> &
	(ViewWidget | undefined)[] &
	Record<string, ViewWidget | undefined>;

type UserAttributePreferences = Obj<'UserAttributePreferences', UserProfile, UserAttribute> &
	(UserAttribute | undefined)[] &
	Record<string, UserAttribute | undefined>;

type UserAttributeProperties = ObjProps & {
	EncoderResolution: Enums.AttriebuteEncoderResolution;
};
type UserAttribute = Obj<
	'UserAttribute',
	UserAttributePreferences,
	never,
	UserAttributeProperties
> &
	UserAttributeProperties;

type UserEnvironmentChildren = {
	Selection: Selection;
	Programmer: Programmer;
	AtFilter: AtFilter;
	LivePatch3dSelection: LivePatch3dSelection;
};
type UserEnvironment = Obj<
	'UserEnvironment',
	Environments,
	UserEnvironmentChildren[keyof UserEnvironmentChildren]
> &
	UserEnvironmentChildren[keyof UserEnvironmentChildren][] &
	UserEnvironmentChildren;
type Selection = Obj<'Selection', UserEnvironment, never>;
type Programmer = Obj<'Programmer', UserEnvironment, ProgPart> &
	(ProgPart | undefined)[] &
	Record<string, ProgPart | undefined>;
type ProgPart = Obj<'ProgPart', Programmer, never>;
type AtFilterProperties = ObjProps & { filterRef: Filter };
type AtFilter = Obj<'AtFilter', UserEnvironment, never, AtFilterProperties> & AtFilterProperties;
type LivePatch3dSelection = Obj<'LivePatch3dSelection', UserEnvironment, never>;
