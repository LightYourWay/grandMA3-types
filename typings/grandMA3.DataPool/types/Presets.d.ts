// PresetFamilyType
type PresetFamilyType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 21 | 22 | 23 | 24 | 25;

// PresetPools
type PresetPoolsChildren = {
	Dimmer: Presets;
	Position: Presets;
	Gobo: Presets;
	Color: Presets;
	Beam: Presets;
	Focus: Presets;
	Control: Presets;
	Shapers: Presets;
	Video: Presets;
	'All 1': Presets;
	'All 2': Presets;
	'All 3': Presets;
	'All 4': Presets;
	'All 5': Presets;
};
type PresetPools = Obj<'PresetPools', Pool, PresetPoolsChildren[keyof PresetPoolsChildren]> &
	PresetPoolsChildren[keyof PresetPoolsChildren][] &
	PresetPoolsChildren;

// Presets
type Presets = Obj<'Presets', PresetPools, Preset> &
	(Preset | undefined)[] &
	Record<string, Preset | undefined>;

// PresetMode
type PresetMode = 'Universal' | 'Global' | 'Selective';

// Preset
type PresetProperties = ObjProps & {
	appearance: Appearance;
	scribble: Scribble;
	readonly storedData: PresetMode;
	readonly presetMode: Enums.PresetMode;
	presetModeInternal: PresetMode;
} & MAtrickOnlyProperties;
type Preset = Obj<'Preset', Presets, Recipe, PresetProperties> & PresetProperties;
