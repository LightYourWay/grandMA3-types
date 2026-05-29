type UIObjectProps = ObjProps & {
	// Layout Props
	anchors: Anchors;
	backColor: Color | string;
	padding: Padding;
	margin: Margin;
	maxSize: MAUISize;
	minSize: MAUISize;
	h: Height;
	w: Width;
	x: number;
	y: number;
	contentDriven: YesNo;
	contentWidth: YesNo;
	contentHeight: YesNo;
	forceContentMin: YesNo;
	separator: YesNo;

	// Appearance Props
	focus: Focus;
	hasFocus: YesNo;
	hideFocusFrame: YesNo;
	interactive: YesNo;
	visible: BooleanString;
	mixInBackColor: unknown;

	// Text Props
	alignmentH: AlignmentH;
	alignmentV: AlignmentV;
	font: Font;
	hasHover: YesNo;
	icon: string; // texture name
	iconColor: Color;
	iconAlignmentH: AlignmentH;
	iconAlignmentV: AlignmentV;
	text: string;
	textAlignmentH: AlignmentH;
	textColor: Color | string;
	textShadow: number;
	textShadowColor: unknown;
	/**
	 * Scales down the text to fit the box. Also enabled text wrapping.
	 */
	textAutoAdjust: YesNo;
	texture: string;
	transparent: YesNo;
};

type UIObjectSignals = {
	onLoad: SignalId;
	onVisible: SignalId;
	keyDown: SignalId;
	keyUp: SignalId;
	doubleClicked: SignalId;
	execute: SignalId;
	clicked: SignalId;
	focusGet: SignalId;
	focusLost: SignalId;
};

type UIObject = Obj<'UIObject', never, never, UIObjectProps> &
	UIObjectProps &
	UIObjectSignals & {
		readonly absRect: Rect;
		readonly absClientRect: Rect;
		GetOverlay(): Popup;
	};

type ScrollBox = Obj<'ScrollBox', never, never, UIObjectProps> &
	UIObjectProps &
	UIObjectSignals & {
		readonly absRect: Rect;
		readonly absClientRect: Rect;
		GetOverlay(): Popup;
	};
