// Layouts
type Layouts = Obj<'Layouts', Pool, Layout> &
	(Layout | undefined)[] &
	Record<string, Layout | undefined>;

// Layout
type Layout = Obj<'Layout', Layouts, Element, PoolItemProperties> &
	(Element | undefined)[] &
	Record<string, Element | undefined> &
	PoolItemProperties;

// Element
type ElementProperties = ObjProps & {
	assignType: number;
	action: Enums.AssignmentButtonFunctionsSequence;
	appearance: Appearance;
	borderSize: number;
	/** 8 character hex string RGBA */
	borderColor: string;
	/** 8 character hex string RGBA */
	customTextColor: string;
	customTextAlignmentH: Enums.LayoutElementAlignmentH;
	customTextAlignmentV: Enums.LayoutElementAlignmentV;
	customTextSize: Enums.SelectionViewFontSize;
	customTextText: string;
	fullResolution: boolean;
	height: number;
	id: number;
	visibilityElement: boolean;
	visibilityBar: boolean;
	visibilityObjectName: boolean;
	visibilityID: boolean;
	visibilityCID: boolean;
	visibilityBorder: boolean;
	visibilityValue: boolean;
	visibilityIndicatorBar: boolean;
	visibilitySelectionRelevance: boolean;
	paddingLeft: number;
	paddingRight: number;
	paddingTop: number;
	paddingBottom: number;
	posX: number;
	posY: number;
	width: number;
	object: GenericObj;
	note: string;
};
type Element = Obj<'Element', Layout, never, ElementProperties> & ElementProperties;
