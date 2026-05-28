type ScreenConfigurations = Obj<string, UserProfile, ScreenConfiguration> &
	ScreenConfiguration[] & {
		Default: ScreenConfiguration;
		[index: string]: ScreenConfiguration;
	};

type ScreenConfiguration = Obj<string, ScreenConfigurations, ScreenContents | ViewButtonScreens> & {
	ScreenContents: ScreenContents;
	'ViewButtonScreens 2': ViewButtonScreens;
};

type ScreenNumber = number;
type ScreenContentKey = `ScreenContent ${ScreenNumber}`;
type ScreenContents = Obj<string, ScreenConfiguration, ScreenContent> &
	Record<ScreenContentKey, ScreenContent>;

type ScreenContent = Obj<string, ScreenContents, WindowBase>;

type WindowBaseProps = ObjProps & {
	appearance: Obj<string, any, any>;
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

interface WindowBase
	extends Obj<string, ScreenContent | View, any, WindowBaseProps>, WindowBaseProps {
	WindowAppearance: WindowAppearance;
	WindowScrollPositions: WindowScrollPositions;
}

type WindowAppearance = Obj<string, WindowBase, never>;
type WindowScrollPositions = Obj<string, WindowBase, never> & {
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

interface WindowLayoutView extends WindowBase {
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
type LayoutViewSettings = Obj<string, WindowBase, never> & LayoutViewSettingsProps;

type ViewButtonScreenKey = `ViewButtonScreen ${number}`;
type ViewButtonScreens = Obj<string, ScreenConfiguration, ViewButtonScreen> &
	Record<ViewButtonScreenKey, ViewButtonScreen>;

type ViewButtonScreen = Obj<string, ViewButtonScreens, ViewButton>;

type ViewButton = Obj<string, ViewButtonScreen, never>;

interface WindowEncoderBar extends WindowBase {
	name: 'WindowEncoderBar';
	EncoderBarWindowSettings: EncoderBarWindowSettings;
}
interface EncoderBarWindowSettingsProps {
	fadeEncoder: boolean;
}
type EncoderBarWindowSettings = Obj<string, WindowBase, never> & EncoderBarWindowSettingsProps;
