type Layouts = Obj<string, DataPool, Layout> & Layout[] & { [index: string]: Layout };

type Layout = Obj<string, Layouts, Element> & Element[] & { [index: string]: Element };

type LayoutElementCustomTextSize = 'Default' | 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32;
type ElementProps = ObjProps & {
	assignType: number;
	action: Enums.AssignmentButtonFunctionsSequence;
	appearance: Appearance;
	borderSize: number;
	/** 8 character hex string RGBA */
	borderColor: string;
	/** 8 character hex string RGBA */
	customTextColor: string;
	customTextAlignmentH: 'Center' | 'Left' | 'Right';
	customTextAlignmentV: 'Center' | 'Top' | 'Bottom' | 'Above';
	customTextSize: LayoutElementCustomTextSize;
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
};

type Element = Obj<string, Layout, never> &
	ElementProps & {
		object: GenericObj;
		note: string;
	};
