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
type PresetsProperties = ObjProps & {
	/** Preset pool number as used on the command line, e.g. `4` for `Preset 4.x`, `21` for "All 1". */
	no: number;
};
type Presets = Obj<'Presets', PresetPools, Preset, PresetsProperties> &
	PresetsProperties &
	(Preset | undefined)[] &
	Record<string, Preset | undefined>;

type PresetMode = 'Universal' | 'Global' | 'Selective';

// Preset
type PresetProperties = PoolItemProperties & {
	scribble: Scribble;
	readonly storedData: PresetMode;
	readonly presetMode: Enums.PresetMode;
	presetModeInternal: PresetMode;
} & MAtrickOnlyProperties;
type Preset = Obj<'Preset', Presets, Recipe, PresetProperties> & PresetProperties;
