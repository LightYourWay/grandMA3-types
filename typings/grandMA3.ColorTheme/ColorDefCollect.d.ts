// ColorDefCollect
type ColorDefCollectProperties = ObjProps & {
	global: ColorDefGroupGlobal;
	sheetColor: ColorDefGroup;
	playback: ColorDefGroup;
	poolDefault: ColorDefGroup;
};
type ColorDefCollect = Obj<
	'ColorDefCollect',
	ColorTheme,
	ColorDefGroup,
	ColorDefCollectProperties
> &
	(ColorDefGroup | undefined)[] &
	Record<string, ColorDefGroup | undefined> &
	ColorDefCollectProperties;

// ColorDefGroup
type ColorDefGroup = Obj<'ColorDefGroup', ColorDefCollect, ColorDef> &
	(ColorDef | undefined)[] &
	Record<string, ColorDef | undefined>;

// ColorDefGroup > Global
type ColorDefGroupGlobalProperties = ObjProps & {
	text: ColorDef;
	textDefault: ColorDef;
	textDark: ColorDef;
	background: ColorDef;
	backgroundDark: ColorDef;
	header: ColorDef;
	altHeader: ColorDef;
	defaultCellBackground: ColorDef;
	defaultCellAltBackground: ColorDef;
	selected: ColorDef;
	selectedInverted: ColorDef;
	selectedEdge: ColorDef;
	invalidGridPosition: ColorDef;
	mainMultiPatchSelected: ColorDef;
	partlySelected: ColorDef;
	selectedPreset: ColorDef;
	partlySelectedPreset: ColorDef;
	backgroundSelected: ColorDef;
	backgroundInvalidGridPosition: ColorDef;
	backgroundMainMultiPatchSelected: ColorDef;
	backgroundSelectedInverted: ColorDef;
	connected: ColorDef;
	lasso: ColorDef;
	focusFrame: ColorDef;
	windowFocus: ColorDef;
	hover: ColorDef;
	selectedFrameBackground: ColorDef;
	selectedRowBorder: ColorDef;
	pressed: ColorDef;
	buttonBackground: ColorDef;
	activeIcon: ColorDef;
	inactive: ColorDef;
	bright: ColorDef;
	titleGray: ColorDef;
	labelText: ColorDef;
	indicatorBar: ColorDef;
	buttonBackgroundDarker: ColorDef;
	propertyBackground: ColorDef;
	propertyBackgroundActive: ColorDef;
	fixed: ColorDef;
	icon: ColorDef;
	buttonIndicatorIcon: ColorDef;
	iconHover: ColorDef;
	redIndicator: ColorDef;
	darkRedIndicator: ColorDef;
	greenIndicator: ColorDef;
	darkGreenIndicator: ColorDef;
	yellowIndicator: ColorDef;
	orangeIndicator: ColorDef;
	cyanIndicator: ColorDef;
	updateIndicator: ColorDef;
	updateAddIndicator: ColorDef;
	updateIntegrated: ColorDef;
	updateAddIntegrated: ColorDef;
	warning: ColorDef;
	error: ColorDef;
	alert: ColorDef;
	success: ColorDef;
	redBackground: ColorDef;
	overlayBackground: ColorDef;
	greenBackground: ColorDef;
	shadow: ColorDef;
	shadowDark: ColorDef;
	deskLock: ColorDef;
	disabled: ColorDef;
	referenced: ColorDef;
	afterGlow: ColorDef;
	globalPreset: ColorDef;
	selectivePreset: ColorDef;
	universalPreset: ColorDef;
	forSome: ColorDef;
	forAll: ColorDef;
	forNone: ColorDef;
	lightened: ColorDef;
	darkened: ColorDef;
	transparent: ColorDef;
	transparent25: ColorDef;
	transparent50: ColorDef;
	transparent75: ColorDef;
	parked: ColorDef;
	remoteInputLock: ColorDef;
	textViewSelectedRow: ColorDef;
	textViewBackground: ColorDef;
	textViewFixedBackground: ColorDef;
	collected: ColorDef;
	userChanged: ColorDef;
};
type ColorDefGroupGlobal = Obj<
	'ColorDefGroup',
	ColorDefCollect,
	ColorDef,
	ColorDefGroupGlobalProperties
> &
	(ColorDef | undefined)[] &
	Record<string, ColorDef | undefined> &
	ColorDefGroupGlobalProperties;

// ColorDef
type ColorDefProps = ObjProps & {
	rgba: string;
};
type ColorDef = Obj<'ColorDef', ColorDefGroup, never, ColorDefProps> & ColorDefProps;
