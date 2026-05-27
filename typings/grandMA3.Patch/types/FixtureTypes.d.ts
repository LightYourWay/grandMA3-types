type FixtureTypes = Obj<string, Patch, FixtureTypeObj> &
	FixtureTypeObj[] & { [index: string]: FixtureTypeObj };

type FixtureTypeObj = Obj<string, FixtureTypes, any> &
	any[] & { [index: string]: any } & {
		DMXModes: DMXModes;
		Wheels: Wheels;
		AttributeDefinitions: AttributeDefinitions;
	};

type DMXModes = Obj<string, FixtureTypeObj, DMXMode> &
	DMXMode[] & { [index: string]: DMXMode } & {
		Default: DMXMode;
	};

type DMXMode = Obj<string, DMXModes, any> &
	any[] & { [index: string]: any } & {
		DMXChannels: DMXChannels;
		Relations: Relations;
		SubfixtureOverview: SubfixtureOverview;
		totalFootPrint: number; // Number of DMX Channels
	};

type DMXChannels = Obj<string, DMXMode, DMXChannel> &
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

type DMXChannel = Obj<string, DMXChannels, LogicalChannel, DMXChannelProps> &
	DMXChannelProps &
	LogicalChannel[] & { [index: string]: LogicalChannel };

type LogicalChannelProps = ObjProps & {
	attribute: string;
	snap: any;
	master: any;
	physicalFrom: number;
	physicalTo: number;
};
type LogicalChannel = Obj<string, DMXChannel, ChannelFunction, LogicalChannelProps> &
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
type ChannelFunction = Obj<string, LogicalChannel, ChannelSet, ChannelFunctionProps> &
	ChannelFunctionProps & {
		wheel: Wheel;
	};

type ChannelSetProps = ObjProps & {
	DMXfrom: number;
	DMXto: number;
	wheelSlotIndex: number;
};
type ChannelSet = Obj<string, ChannelFunction, any, ChannelSetProps> & ChannelSetProps;

type Wheels = Obj<string, FixtureTypeObj, Wheel> & Wheel[] & { [index: string]: Wheel };

type Wheel = Obj<string, Wheels, Slot> & Slot[];

type Slot = Obj<string, Wheel, any> & {
	color: string; // R,G,B,A : normalized 0-1
	image: GoboImage;
};

type AttributeDefinitions = Obj<string, FixtureTypeObj, any> & {
	FeatureGroups: FeatureGroups;
	Attributes: Attributes;
};

type FeatureGroups = Obj<string, AttributeDefinitions, FeatureGroup>;
type FeatureGroup = Obj<string, FeatureGroups, Feature> & { [key: string]: Feature };

type Feature = Obj<string, FeatureGroup, any>;

/**
 * NOTE: Using attributes.Children() doesn't give all attributes.
 * Also we access the attributes by name attribute['ColorRGB_R'],
 * since not ALL attributes appear this way.
 * We need to get attributes with GetAttributeByUIChannel().
 *
 * GetAttributeCount() is not the same as GetUIChannelCount().
 */
type Attributes = Obj<string, AttributeDefinitions, any> & { [key: string]: Attribute };

type Attribute = Obj<string, Attributes, any> & {
	Feature: Feature;
	Color: any;
};

type Relations = Obj<string, DMXMode, any> & { [key: string]: any };

type SubfixtureOverview = Obj<string, DMXMode, FTSubfixture> & { [key: number]: FTSubfixture };

type FTSubfixture = Obj<string, SubfixtureOverview, any> & any[];
