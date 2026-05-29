// Patch
type PatchChildren = {
	FixtureTypes: FixtureTypes;
};
type Patch = Obj<'Patch', ShowData, PatchChildren[keyof PatchChildren]> &
	PatchChildren[keyof PatchChildren][] &
	Record<string, PatchChildren[keyof PatchChildren] | undefined> &
	PatchChildren;

// LivePatch
type LivePatchChildren = {
	AttributeDefinitions: AttributeDefinitions;
	FixtureTypes: FixtureTypes;
	Stages: Stages;
	UIChannels: UIChannels;
};
type LivePatch = Obj<'Patch', ShowData, LivePatchChildren[keyof LivePatchChildren]> &
	LivePatchChildren[keyof LivePatchChildren][] &
	Record<string, LivePatchChildren[keyof LivePatchChildren] | undefined> &
	LivePatchChildren;

// Stages
type Stages = Obj<'Stages', LivePatch | Patch, Stage> &
	(Stage | undefined)[] &
	Record<number, Stage | undefined>;

// Stage
type StageChildren = {
	Spaces: Spaces;
	Fixtures: Fixtures;
};
type StageProperties = ObjProps & {
	note: string;
};
type Stage = Obj<'Stage', Stages, StageChildren[keyof StageChildren], StageProperties> &
	StageChildren[keyof StageChildren][] &
	StageChildren &
	StageProperties;

// Spaces
type Spaces = Obj<'Spaces', Stage, never>;

// Fixtures
type Fixtures = Obj<'Fixtures', Stage, Fixture> &
	(Fixture | undefined)[] &
	Record<string, Fixture | undefined>;

// DMXMultiAddrString
type DMXMultiAddrString =
	| DMXAddrString
	| `${DMXAddrString},${DMXAddrString}`
	| `${DMXAddrString},${DMXAddrString},${DMXAddrString}`; // May be more ?

// Fixture
type FixtureProperties = ObjProps & {
	/**
	 * If the fixture has a CID, then the index is the CID.
	 * If not, it will be the 1-based index of the fixture within the Stage.
	 */
	index: number;
	fid: number | 'None';
	cid: number | 'None';
	fixtureType: FixtureType;
	/**
	 * I saw one case where the Universal fixture has a child of class Fixture (Not Subfixture),
	 * and it doesn't have any mode or modeDirect.
	 */
	mode?: DMXMode;
	modeDirect?: DMXMode;
	patch: DMXMultiAddrString | '';
};
type Fixture = Obj<'Fixture', Fixtures, any, FixtureProperties> & FixtureProperties;

// SubFixture
type SubFixtureProperties = ObjProps & {
	fixture: Fixture;
	stage: Stage;
};
type SubFixture = Obj<'SubFixture', Fixtures, any, SubFixtureProperties> & SubFixtureProperties;

// UIChannels
type UIChannels = Obj<'UIChannels', LivePatch | Patch, UIChannel> &
	(UIChannel | undefined)[] &
	Record<string, UIChannel | undefined>;

// UIChannel
type UIChannelProperties = ObjProps & {
	logical_channel: LogicalChannel;
	attr_index: number;
	rt_index: number;
	subAttribute: AttributeName;
};
type UIChannel = Obj<'UIChannel', UIChannels, never, UIChannelProperties> & UIChannelProperties;
