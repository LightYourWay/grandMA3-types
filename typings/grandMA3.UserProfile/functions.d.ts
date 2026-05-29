type UserProfileProps = ObjProps & {
	encoderUIStyle: Enums.EncoderUIStyle;
	autoRemoveGaps: boolean;
};

type UserProfile = Obj<'UserProfile', UserProfiles, any, UserProfileProps> &
	any[] & { [index: string]: any } & {
		Environments: Environments;
		Views: Views;
		KeyboardShortCuts: KeyboardShortCuts;
		ScreenConfigurations: ScreenConfigurations;
		LayoutElementDefaultsCollect: LayoutElementDefaultsCollect;
		UserAttributePreferences: UserAttributePreferences;
		SelectedPage: number;
		Name: string;
	};

type Environments = Obj<'Environments', UserProfile, UserEnvironment> & {
	/** Main Programmer Environment */
	1: UserEnvironment;
	/** Preview Programmer Environment */
	2: UserEnvironment;
};

type Views = Obj<'Views', UserProfiles, View>;

type View = Obj<'View', Views, ViewWidget>;

type UserAttributePreferences = Obj<'UserAttributePreferences', UserProfile, UserAttribute>;

type UserAttribute = Obj<'UserAttribute', UserAttributePreferences, never> & {
	EncoderResolution: Enums.AttriebuteEncoderResolution;
};

type UserEnvironmentChildTypes = Selection | Programmer | AtFilter | LivePatch3dSelection;
type UserEnvironment = Obj<'UserEnvironment', Environments, UserEnvironmentChildTypes> & {
	Selection: Selection;
	Programmer: Programmer;
	AtFilter: AtFilter;
	LivePatch3dSelection: LivePatch3dSelection;
};
type Selection = Obj<'Selection', UserEnvironment, any>;
type Programmer = Obj<'Programmer', UserEnvironment, ProgPart>;
type ProgPart = Obj<'ProgPart', Programmer, any>;
type AtFilterProps = ObjProps & { filterRef: Filter };
type AtFilter = Obj<'AtFilter', UserEnvironment, any, AtFilterProps>;
type LivePatch3dSelection = Obj<'LivePatch3dSelection', UserEnvironment, any>;
