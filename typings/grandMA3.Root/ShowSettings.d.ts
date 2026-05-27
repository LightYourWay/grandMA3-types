type ShowSettings = Obj<string, ShowData, Obj> & {
	AddonVariables: AddonVariables;
};

type AddonVariables = Obj<string, ShowSettings, Variables> & Record<string, Variables>;

type Variables = Obj<string, AddonVariables, null>;
