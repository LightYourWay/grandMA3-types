type FixtureTypes = Obj<'FixtureTypes', Patch, FixtureType> &
	FixtureType[] & { [index: string]: FixtureType };

type FixtureType = Obj<'FixtureType', FixtureTypes, any> &
	any[] & { [index: string]: any } & {
		DMXModes: DMXModes;
		Wheels: Wheels;
		AttributeDefinitions: AttributeDefinitions;
	};

type DMXModes = Obj<'DMXModes', FixtureType, DMXMode> &
	DMXMode[] & { [index: string]: DMXMode } & {
		Default: DMXMode;
	};

type DMXMode = Obj<'DMXMode', DMXModes, any> &
	any[] & { [index: string]: any } & {
		DMXChannels: DMXChannels;
		Relations: Relations;
		SubfixtureOverview: SubfixtureOverview;
		totalFootPrint: number; // Number of DMX Channels
	};

type DMXChannels = Obj<'DMXChannels', DMXMode, DMXChannel> &
	DMXChannel[] & { [index: string]: DMXChannel };

type DMXChannelProps = ObjProps & {
	attribute: string;
	dmxBreak: number;
	coarse: number | 'None';
	fine: number | 'None';
	ultra: number | 'None';
	Highlight: number;
	lowLight: number;
};

type DMXChannel = Obj<'DMXChannel', DMXChannels, LogicalChannel, DMXChannelProps> &
	DMXChannelProps &
	LogicalChannel[] & { [index: string]: LogicalChannel };

type LogicalChannelProps = ObjProps & {
	attribute: string;
	snap: any;
	master: any;
	physicalFrom: number;
	physicalTo: number;
};
type LogicalChannel = Obj<'LogicalChannel', DMXChannel, ChannelFunction, LogicalChannelProps> &
	LogicalChannelProps & {
		ChannelFunction: ChannelFunction;
	};

type ChannelFunctionProps = ObjProps & {
	attribute: string;
	dmxFrom: number;
	dmxTo: number; // READ ONLY
	physicalFrom: number;
	physicalTo: number;
	wheel: Wheel;
	dmxInvert: boolean;
};
type ChannelFunction = Obj<'ChannelFunction', LogicalChannel, ChannelSet, ChannelFunctionProps> &
	ChannelFunctionProps & {
		wheel: Wheel;
	};

type ChannelSetProps = ObjProps & {
	DMXfrom: number;
	DMXto: number;
	wheelSlotIndex: number;
};
type ChannelSet = Obj<'ChannelSet', ChannelFunction, any, ChannelSetProps> & ChannelSetProps;

type Wheels = Obj<'Wheels', FixtureType, Wheel> & Wheel[] & { [index: string]: Wheel };

type Wheel = Obj<'Wheel', Wheels, Slot> & Slot[];

type Slot = Obj<'Slot', Wheel, any> & {
	color: string; // R,G,B,A : normalized 0-1
	image: GoboImage;
};

type AttributeDefinitions = Obj<'AttributeDefinitions', FixtureType, any> & {
	FeatureGroups: FeatureGroups;
	Attributes: Attributes;
};

type FeatureGroups = Obj<'FeatureGroups', AttributeDefinitions, FeatureGroup>;
type FeatureGroup = Obj<'FeatureGroup', FeatureGroups, Feature> & { [key: string]: Feature };

type Feature = Obj<'Feature', FeatureGroup, any>;

/**
 * NOTE: Using attributes.Children() doesn't give all attributes.
 * Also we access the attributes by name attribute['ColorRGB_R'],
 * since not ALL attributes appear this way.
 * We need to get attributes with GetAttributeByUIChannel().
 *
 * GetAttributeCount() is not the same as GetUIChannelCount().
 */
type Attributes = Obj<'Attributes', AttributeDefinitions, any> & { [key: string]: Attribute };

type Attribute = Obj<'Attribute', Attributes, any> & {
	Feature: Feature;
	Color: any;
};

type Relations = Obj<'Relations', DMXMode, any> & { [key: string]: any };

type SubfixtureOverview = Obj<'SubfixtureOverview', DMXMode, FTSubfixture> & {
	[key: number]: FTSubfixture;
};

type FTSubfixture = Obj<'FTSubfixture', SubfixtureOverview, any> & any[];
