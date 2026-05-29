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

type Group = Obj<'Group', Groups, any> & {
	selectionData: FixtureSelectionData[];
};

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

type Filters = Obj<'Filters', Pool, Filter>;
type FilterProps = ObjProps;
type Filter = Obj<'Filter', Filters, any, FilterProps>;

type RecipeProps = ObjProps;

type Recipe = Obj<'Recipe', Part, never, RecipeProps> & {
	selection: Group;
	values: Preset;
	matricks?: MAtrick;
	filter: Filter;
};

// Timecodes
type Timecodes = Obj<'Timecodes', Pool, Timecode> &
	(Timecode | undefined)[] &
	Record<string, Timecode | undefined> &
	ObjProps;

// Timecode
type Timecode = Obj<'Timecode', Timecodes, TrackGroup> &
	(TrackGroup | undefined)[] &
	Record<string, TrackGroup | undefined> &
	ObjProps;

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
	Record<string, Marker | undefined> &
	ObjProps;

// Marker
type Marker = Obj<'Marker', MarkerTrack, never>;

// Track
type Track = Obj<'Track', TrackGroup, TimeRange> &
	(TimeRange | undefined)[] &
	Record<string, TimeRange | undefined> &
	ObjProps;

// TimeRange
type TimeRange = Obj<'TimeRange', Track, CmdSubTrack> &
	(CmdSubTrack | undefined)[] &
	Record<string, CmdSubTrack | undefined> &
	ObjProps;

// CmdSubTrack
type CmdSubTrack = Obj<'CmdSubTrack', TimeRange, CmdEvent> &
	(CmdEvent | undefined)[] &
	Record<string, CmdEvent | undefined> &
	ObjProps;

// CmdEvent
type CmdEventProps = ObjProps & {
	rawTime: number;
};
type CmdEvent = Obj<'CmdEvent', TimeRange, never, CmdEventProps> & CmdEventProps;
