// UserProfile
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

// Environments
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

// Views
type Views = Obj<'Views', UserProfile, View> &
	(View | undefined)[] &
	Record<string, View | undefined>;

// View
type View = Obj<'View', Views, ViewWidget> &
	(ViewWidget | undefined)[] &
	Record<string, ViewWidget | undefined>;

// UserAttributePreferences
type UserAttributePreferences = Obj<'UserAttributePreferences', UserProfile, UserAttribute> &
	(UserAttribute | undefined)[] &
	Record<string, UserAttribute | undefined>;

// UserAttribute
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

// UserEnvironment
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

// Selection
type Selection = Obj<'Selection', UserEnvironment, never>;

// Programmer
type Programmer = Obj<'Programmer', UserEnvironment, ProgPart> &
	(ProgPart | undefined)[] &
	Record<string, ProgPart | undefined>;

// ProgPart
type ProgPart = Obj<'ProgPart', Programmer, never>;

// AtFilter
type AtFilterProperties = ObjProps & { filterRef: Filter };
type AtFilter = Obj<'AtFilter', UserEnvironment, never, AtFilterProperties> & AtFilterProperties;

// LivePatch3dSelection
type LivePatch3dSelection = Obj<'LivePatch3dSelection', UserEnvironment, never>;
