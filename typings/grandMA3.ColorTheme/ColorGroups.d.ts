// ColorGroups
type ColorGroupsProperties = ObjProps & {
	global: ColorGroupGlobal;
	poolDefault: ColorGroupPoolDefault;
};
type ColorGroups = Obj<'ColorGroups', ColorTheme, ColorGroup, ColorGroupsProperties> &
	(ColorGroup | undefined)[] &
	Record<string, ColorGroup | undefined> &
	ColorGroupsProperties;

// ColorGroup
type ColorGroup = Obj<'ColorGroup', ColorGroups, Color> &
	(Color | undefined)[] &
	Record<string, Color | undefined>;

// ColorGroup > Global
type ColorGroupGlobalProperties = ObjProps & {
	disabled: Color;
	focus: Color;
	animatedFocus1: Color;
	animatedFocus2: Color;
	hover: Color;
	pressed: Color;
	selected: Color;
	selectedInverted: Color;
	selectedEdge: Color;
	invalidGridPosition: Color;
	partlySelected: Color;
	selectedPreset: Color;
	partlySelectedPreset: Color;
	transparent: Color;
	transparent25: Color;
	transparent50: Color;
	transparent75: Color;
	background: Color;
	backgroundSelected: Color;
	backgroundSelectedInverted: Color;
	buttonBackground: Color;
	buttonBackgroundDarker: Color;
	default: Color;
	inactive: Color;
	bright: Color;
	shadow: Color;
	lightened: Color;
	darkened: Color;
	text: Color;
	labelText: Color;
	warningText: Color;
	errorText: Color;
	alertText: Color;
	successText: Color;
	neutral: Color;
	collected: Color;
	userChanged: Color;
};
type ColorGroupGlobal = Obj<'ColorGroup', ColorGroups, Color, ColorGroupGlobalProperties> &
	(Color | undefined)[] &
	Record<string, Color | undefined> &
	ColorGroupGlobalProperties;

// ColorGroup > PoolDefault
type ColorGroupPoolDefaultProperties = ObjProps & {
	// TODO: Add all pools
	maTricks: Color;
};
type ColorGroupPoolDefault = Obj<
	'ColorGroup',
	ColorGroups,
	Color,
	ColorGroupPoolDefaultProperties
> &
	(Color | undefined)[] &
	Record<string, Color | undefined> &
	ColorGroupPoolDefaultProperties;

// Color
type ColorProperties = ObjProps & {
	/**
	 * HEX string without a leading '#'
	 * HEX string must include 8 characters
	 */
	rgba: string;
};
type Color = Obj<'Color', ColorGroup, never, ColorProperties> & ColorProperties;
