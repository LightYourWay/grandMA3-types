// ScreenConfigurations
type ScreenConfigurationsProperties = ObjProps & {
	Default: ScreenConfig;
};
type ScreenConfigurations = Obj<
	'ScreenConfigurations',
	UserProfile,
	ScreenConfig,
	ScreenConfigurationsProperties
> &
	(ScreenConfig | undefined)[] &
	Record<string, ScreenConfig | undefined> &
	ScreenConfigurationsProperties;

// ScreenConfig
type ScreenConfigChildren = {
	ScreenContents: ScreenContents;
	'ViewButtonScreens 2': ViewButtonScreens;
};
type ScreenConfig = Obj<
	'ScreenConfig',
	ScreenConfigurations,
	ScreenConfigChildren[keyof ScreenConfigChildren]
> &
	ScreenConfigChildren[keyof ScreenConfigChildren][] &
	ScreenConfigChildren;

// ScreenNumber
type ScreenNumber = number;

// ScreenContentKey
type ScreenContentKey = `ScreenContent ${ScreenNumber}`;

// ScreenContents
type ScreenContents = Obj<'ScreenContents', ScreenConfig, ScreenContent> &
	(ScreenContent | undefined)[] &
	Record<ScreenContentKey, ScreenContent | undefined>;

// ScreenContent
type ScreenContent = Obj<'ScreenContent', ScreenContents, ViewWidget> &
	(ViewWidget | undefined)[] &
	Record<string, ViewWidget | undefined>;

// ViewWidget
type ViewWidgetChildren = {
	SelectionViewSettings: SelectionViewSettings;
	WindowAppearance: WindowAppearance;
	WindowScrollPositions: WindowScrollPositions;
};
type ViewWidgetProperties = ObjProps & {
	appearance: Appearance;
	minH: number;
	minW: number;
	note: string;
	x: number;
	y: number;
	w: number;
	h: number;
	display: number;
	snapToBlockSize: boolean;
	presetPoolType: number;
};
type ViewWidget = Obj<
	'ViewWidget',
	ScreenContent | View,
	ViewWidgetChildren[keyof ViewWidgetChildren],
	ViewWidgetProperties
> &
	ViewWidgetChildren[keyof ViewWidgetChildren][] &
	ViewWidgetChildren &
	ViewWidgetProperties;

// SelectionViewSettings
type SelectionViewSettings = Obj<'SelectionViewSettings', ViewWidget, never>;

// WindowAppearance
type WindowAppearance = Obj<'WindowAppearance', ViewWidget, never>;

// WindowScrollPositions
type WindowScrollPositionsProperties = ObjProps & {
	/**
	 * A string with 2 integer numbers separated by a comma.
	 * The first number is the vertical scroll position.
	 * The second number is the vertical cursor position.
	 */
	scrollV: string;
	/**
	 * A string with 2 integer numbers separated by a comma.
	 * The first number is the horizontal scroll position.
	 * The second number is the horizontal cursor position.
	 */
	scrollH: string;
};
type WindowScrollPositions = Obj<
	'WindowScrollPositions',
	ViewWidget,
	never,
	WindowScrollPositionsProperties
> &
	WindowScrollPositionsProperties;

// WindowLayoutView
interface WindowLayoutView extends ViewWidget {
	name: 'WindowLayoutView';
	LayoutViewSettings: LayoutViewSettings;
}

// LayoutViewSettings
type LayoutViewSettingsProperties = ObjProps & {
	Layout: Layout;
	FitType: 'Elements' | 'Canvas' | 'Both';
	ShowTitleBar: boolean;
	AutoFit: boolean;
	PaddingLeft: number;
	PaddingRight: number;
	PaddingBottom: number;
	PaddingTop: number;
};
type LayoutViewSettings = Obj<
	'LayoutViewSettings',
	ViewWidget,
	never,
	LayoutViewSettingsProperties
> &
	LayoutViewSettingsProperties;

// ViewButtonScreenKey
type ViewButtonScreenKey = `ViewButtonScreen ${number}`;

// ViewButtonScreens
type ViewButtonScreens = Obj<'ViewButtonScreens', ScreenConfig, ViewButtonScreen> &
	(ViewButtonScreen | undefined)[] &
	Record<ViewButtonScreenKey, ViewButtonScreen | undefined>;

// ViewButtonScreen
type ViewButtonScreen = Obj<'ViewButtonScreen', ViewButtonScreens, ViewButton> &
	(ViewButton | undefined)[] &
	Record<string, ViewButton | undefined>;

// ViewButton
type ViewButton = Obj<'ViewButton', ViewButtonScreen, never>;

// WindowEncoderBar
interface WindowEncoderBar extends ViewWidget {
	name: 'WindowEncoderBar';
	EncoderBarWindowSettings: EncoderBarWindowSettings;
}

// EncoderBarWindowSettings
type EncoderBarWindowSettingsProperties = ObjProps & {
	fadeEncoder: boolean;
};
type EncoderBarWindowSettings = Obj<
	'EncoderBarWindowSettings',
	ViewWidget,
	never,
	EncoderBarWindowSettingsProperties
> &
	EncoderBarWindowSettingsProperties;
