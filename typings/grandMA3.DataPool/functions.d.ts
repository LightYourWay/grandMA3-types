// Pool
type PoolChildren = {
	Filters: Filters;
	PresetPools: PresetPools;
	Groups: Groups;
	Sequences: Sequences;
	Plugins: Plugins;
	Macros: Macros;
	MAtricks: MAtricks;
	Pages: Pages;
	Layouts: Layouts;
	Timecodes: Timecodes;
};
type Pool = Obj<'Pool', DataPools, PoolChildren[keyof PoolChildren]> &
	PoolChildren[keyof PoolChildren][] &
	PoolChildren;

// Groups
type Groups = Obj<'Groups', Pool, Group> &
	(Group | undefined)[] &
	Record<string, Group | undefined>;

type GroupProperties = ObjProps & {
	selectionData: FixtureSelectionData[];
};
type Group = Obj<'Group', Groups, never, GroupProperties> & GroupProperties;

type FixtureSelectionData = {
	grid: {
		inv: number;
		x: number;
		x_inv: number;
		y: number;
		y_inv: number;
		z: number;
		z_inv: number;
	};
	sf_index: number;
};

type Filters = Obj<'Filters', Pool, Filter> &
	(Filter | undefined)[] &
	Record<string, Filter | undefined>;
type Filter = Obj<'Filter', Filters, never>;

type RecipeProperties = ObjProps & {
	selection: Group;
	values: Preset;
	matricks?: MAtrick;
	filter: Filter;
};
type Recipe = Obj<'Recipe', Part, never, RecipeProperties> & RecipeProperties;

// Timecodes
type Timecodes = Obj<'Timecodes', Pool, Timecode> &
	(Timecode | undefined)[] &
	Record<string, Timecode | undefined>;

// Timecode
type Timecode = Obj<'Timecode', Timecodes, TrackGroup> &
	(TrackGroup | undefined)[] &
	Record<string, TrackGroup | undefined>;

// TrackGroup
type TrackGroupProperties = ObjProps & {
	readonly Marker: MarkerTrack;
};
type TrackGroup = Obj<'TrackGroup', Timecode, MarkerTrack | Track, TrackGroupProperties> &
	(MarkerTrack | Track | undefined)[] &
	Record<string, MarkerTrack | Track | undefined> &
	TrackGroupProperties;

// MarkerTrack
type MarkerTrack = Obj<'MarkerTrack', TrackGroup, Marker> &
	(Marker | undefined)[] &
	Record<string, Marker | undefined>;

// Marker
type Marker = Obj<'Marker', MarkerTrack, never>;

// Track
type Track = Obj<'Track', TrackGroup, TimeRange> &
	(TimeRange | undefined)[] &
	Record<string, TimeRange | undefined>;

// TimeRange
type TimeRange = Obj<'TimeRange', Track, CmdSubTrack> &
	(CmdSubTrack | undefined)[] &
	Record<string, CmdSubTrack | undefined>;

// CmdSubTrack
type CmdSubTrack = Obj<'CmdSubTrack', TimeRange, CmdEvent> &
	(CmdEvent | undefined)[] &
	Record<string, CmdEvent | undefined>;

// CmdEvent
type CmdEventProperties = ObjProps & {
	rawTime: number;
};
type CmdEvent = Obj<'CmdEvent', CmdSubTrack, never, CmdEventProperties> & CmdEventProperties;
