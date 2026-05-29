// ShowSettings
type ShowSettingsChildren = {
	AddonVariables: AddonVariables;
};
type ShowSettings = Obj<
	'ShowSettings',
	ShowData,
	ShowSettingsChildren[keyof ShowSettingsChildren]
> &
	ShowSettingsChildren[keyof ShowSettingsChildren][] &
	Record<string, ShowSettingsChildren[keyof ShowSettingsChildren] | undefined> &
	ShowSettingsChildren;

// AddonVariables
type AddonVariables = Obj<'AddonVariables', ShowSettings, Variables> &
	(Variables | undefined)[] &
	Record<string, Variables | undefined>;

// Variables
type Variables = Obj<'Variables', AddonVariables, never>;
