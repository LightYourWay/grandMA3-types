type UserProfileProps = ObjProps & {
	encoderUIStyle: Enums.EncoderUIStyle;
	autoRemoveGaps: boolean;
};

type UserProfile = Obj<UserProfiles, any, UserProfileProps> &
	any[] & { [index: string]: any } & {
		Environments: Environments;
		Views: Views;
		KeyboardShortCuts: KeyboardShortCuts;
		ScreenConfigurations: ScreenConfigurations;
		LayoutElementDefaultsCollect: LayoutElementDefaultsCollect;
		UserAttributePreferences: UserAttributePreferences;
		Name: string;
	};

type Environments = Obj<Environments, UserEnvironment> & {
	/** Main Programmer Environment */
	1: UserEnvironment;
	/** Preview Programmer Environment */
	2: UserEnvironment;
};

type Views = Obj<UserProfiles, View>;

type View = Obj<Views, WindowBase>;

type UserAttributePreferences = Obj<UserProfile, UserAttribute>;

type UserAttribute = Obj<UserAttributePreferences, void> & {
	EncoderResolution: Enums.AttriebuteEncoderResolution;
};

type UserEnvironmentChildTypes = Selection | Programmer | AtFilter | LivePatch3dSelection;
type UserEnvironment = Obj<Environments, UserEnvironmentChildTypes> & {
	Selection: Selection;
	Programmer: Programmer;
	AtFilter: AtFilter;
	LivePatch3dSelection: LivePatch3dSelection;
};
type Selection = Obj<UserEnvironment, any>;
type Programmer = Obj<UserEnvironment, ProgPart>;
type ProgPart = Obj<Programmer, any>;
type AtFilterProps = ObjProps & { filterRef: Filter };
type AtFilter = Obj<UserEnvironment, any, AtFilterProps>;
type LivePatch3dSelection = Obj<UserEnvironment, any>;
