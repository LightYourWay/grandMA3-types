type PresetFamilyType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 21 | 22 | 23 | 24 | 25;

type PresetPools = Obj<DataPoolClass, Presets> & {
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
type Presets = Obj<PresetPools, Preset>;
type PresetMode = 'Universal' | 'Global' | 'Selective';
type PresetProps = ObjProps & {
	appearance: Appearance;
	scribble: Scribble;
	storedData: PresetMode; // ReadOnly
	presetMode: Enums.PresetMode; // ReadOnly
	presetModeInternal: PresetMode;
} & MAtrickOnlyProps;
type Preset = Obj<PresetPools, Recipe, PresetProps> & PresetProps;
