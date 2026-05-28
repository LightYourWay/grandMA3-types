type ShowSettingsChildren = AddonVariables | Obj<string, ShowSettings, any>;

type ShowSettings = Obj<string, ShowData, ShowSettingsChildren> & {
	AddonVariables: AddonVariables;
};

type AddonVariables = Obj<string, ShowSettings, Variables> & Record<string, Variables>;

type Variables = Obj<string, AddonVariables, never>;
