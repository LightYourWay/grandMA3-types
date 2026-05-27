type UserProfileProps = ObjProps & {
	encoderUIStyle: Enums.EncoderUIStyle;
	autoRemoveGaps: boolean;
};

type UserProfile = Obj<string, UserProfiles, any, UserProfileProps> &
	any[] & { [index: string]: any } & {
		Environments: Environments;
		Views: Views;
		KeyboardShortCuts: KeyboardShortCuts;
		ScreenConfigurations: ScreenConfigurations;
		LayoutElementDefaultsCollect: LayoutElementDefaultsCollect;
		UserAttributePreferences: UserAttributePreferences;
		Name: string;
	};

type Environments = Obj<string, Environments, UserEnvironment> & {
	/** Main Programmer Environment */
	1: UserEnvironment;
	/** Preview Programmer Environment */
	2: UserEnvironment;
};

type Views = Obj<string, UserProfiles, View>;

type View = Obj<string, Views, WindowBase>;

type UserAttributePreferences = Obj<string, UserProfile, UserAttribute>;

type UserAttribute = Obj<string, UserAttributePreferences, void> & {
	EncoderResolution: Enums.AttriebuteEncoderResolution;
};

type UserEnvironmentChildTypes = Selection | Programmer | AtFilter | LivePatch3dSelection;
type UserEnvironment = Obj<string, Environments, UserEnvironmentChildTypes> & {
	Selection: Selection;
	Programmer: Programmer;
	AtFilter: AtFilter;
	LivePatch3dSelection: LivePatch3dSelection;
};
type Selection = Obj<string, UserEnvironment, any>;
type Programmer = Obj<string, UserEnvironment, ProgPart>;
type ProgPart = Obj<string, Programmer, any>;
type AtFilterProps = ObjProps & { filterRef: Filter };
type AtFilter = Obj<string, UserEnvironment, any, AtFilterProps>;
type LivePatch3dSelection = Obj<string, UserEnvironment, any>;
