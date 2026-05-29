type ScreenConfigurations = Obj<'ScreenConfigurations', UserProfile, ScreenConfig> &
	ScreenConfig[] & {
		Default: ScreenConfig;
		[index: string]: ScreenConfig;
	};

type ScreenConfig = Obj<
	'ScreenConfig',
	ScreenConfigurations,
	ScreenContents | ViewButtonScreens
> & {
	ScreenContents: ScreenContents;
	'ViewButtonScreens 2': ViewButtonScreens;
};

type ScreenNumber = number;
type ScreenContentKey = `ScreenContent ${ScreenNumber}`;
type ScreenContents = Obj<'ScreenContents', ScreenConfig, ScreenContent> &
	(ScreenContent | undefined)[] &
	Record<ScreenContentKey, ScreenContent | undefined>;

type ScreenContent = Obj<'ScreenContent', ScreenContents, ViewWidget> &
	(ViewWidget | undefined)[] &
	Record<string, ViewWidget | undefined>;

type ViewWidgetChildren = {
	SelectionViewSettings: SelectionViewSettings;
	WindowAppearance: WindowAppearance;
	WindowScrollPositions: WindowScrollPositions;
};
type ViewWidgetProps = ObjProps & {
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
	ViewWidgetProps
> &
	ViewWidgetChildren[keyof ViewWidgetChildren][] &
	ViewWidgetChildren &
	ViewWidgetProps;

type SelectionViewSettings = Obj<'SelectionViewSettings', ViewWidget, never>;
type WindowAppearance = Obj<'WindowAppearance', ViewWidget, never>;
type WindowScrollPositions = Obj<'WindowScrollPositions', ViewWidget, never> & {
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

interface WindowLayoutView extends ViewWidget {
	name: 'WindowLayoutView';
	LayoutViewSettings: LayoutViewSettings;
}

interface LayoutViewSettingsProps {
	Layout: Layout;
	FitType: 'Elements' | 'Canvas' | 'Both';
	ShowTitleBar: boolean;
	AutoFit: boolean;
	PaddingLeft: number;
	PaddingRight: number;
	PaddingBottom: number;
	PaddingTop: number;
}
type LayoutViewSettings = Obj<'LayoutViewSettings', ViewWidget, never> & LayoutViewSettingsProps;

type ViewButtonScreenKey = `ViewButtonScreen ${number}`;
type ViewButtonScreens = Obj<'ViewButtonScreens', ScreenConfig, ViewButtonScreen> &
	Record<ViewButtonScreenKey, ViewButtonScreen>;

type ViewButtonScreen = Obj<'ViewButtonScreen', ViewButtonScreens, ViewButton>;

type ViewButton = Obj<'ViewButton', ViewButtonScreen, never>;

interface WindowEncoderBar extends ViewWidget {
	name: 'WindowEncoderBar';
	EncoderBarWindowSettings: EncoderBarWindowSettings;
}
interface EncoderBarWindowSettingsProps {
	fadeEncoder: boolean;
}
type EncoderBarWindowSettings = Obj<'EncoderBarWindowSettings', ViewWidget, never> &
	EncoderBarWindowSettingsProps;
