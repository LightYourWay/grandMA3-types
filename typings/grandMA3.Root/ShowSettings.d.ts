type ShowSettingsChildren = {
	AddonVariables: AddonVariables;
	[index: string]: unknown;
	[index: number]: unknown;
};

type ShowSettings = Obj<
	'ShowSettings',
	ShowData,
	ShowSettingsChildren[keyof ShowSettingsChildren]
> &
	ShowSettingsChildren[keyof ShowSettingsChildren][] &
	ShowSettingsChildren;

type AddonVariables = Obj<'AddonVariables', ShowSettings, Variables> & Record<string, Variables>;

type Variables = Obj<'Variables', AddonVariables, never>;
