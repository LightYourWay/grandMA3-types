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
type FilterProperties = ObjProps;
type Filter = Obj<'Filter', Filters, never, FilterProperties> & FilterProperties;

type RecipeProperties = ObjProps & {
	selection: Group;
	values: Preset;
	matricks?: MAtrick;
	filter: Filter;
};
type Recipe = Obj<'Recipe', Part, never, RecipeProperties> & RecipeProperties;

// Timecodes
type TimecodesProperties = ObjProps;
type Timecodes = Obj<'Timecodes', Pool, Timecode, TimecodesProperties> &
	(Timecode | undefined)[] &
	Record<string, Timecode | undefined> &
	TimecodesProperties;

// Timecode
type TimecodeProperties = ObjProps;
type Timecode = Obj<'Timecode', Timecodes, TrackGroup, TimecodeProperties> &
	(TrackGroup | undefined)[] &
	Record<string, TrackGroup | undefined> &
	TimecodeProperties;

// TrackGroup
type TrackGroupProperties = ObjProps & {
	readonly Marker: MarkerTrack;
};
type TrackGroup = Obj<'TrackGroup', Timecode, MarkerTrack | Track, TrackGroupProperties> &
	(MarkerTrack | Track | undefined)[] &
	Record<string, MarkerTrack | Track | undefined> &
	TrackGroupProperties;

// MarkerTrack
type MarkerTrackProperties = ObjProps;
type MarkerTrack = Obj<'MarkerTrack', TrackGroup, Marker, MarkerTrackProperties> &
	(Marker | undefined)[] &
	Record<string, Marker | undefined> &
	MarkerTrackProperties;

// Marker
type Marker = Obj<'Marker', MarkerTrack, never>;

// Track
type TrackProperties = ObjProps;
type Track = Obj<'Track', TrackGroup, TimeRange, TrackProperties> &
	(TimeRange | undefined)[] &
	Record<string, TimeRange | undefined> &
	TrackProperties;

// TimeRange
type TimeRangeProperties = ObjProps;
type TimeRange = Obj<'TimeRange', Track, CmdSubTrack, TimeRangeProperties> &
	(CmdSubTrack | undefined)[] &
	Record<string, CmdSubTrack | undefined> &
	TimeRangeProperties;

// CmdSubTrack
type CmdSubTrackProperties = ObjProps;
type CmdSubTrack = Obj<'CmdSubTrack', TimeRange, CmdEvent, CmdSubTrackProperties> &
	(CmdEvent | undefined)[] &
	Record<string, CmdEvent | undefined> &
	CmdSubTrackProperties;

// CmdEvent
type CmdEventProperties = ObjProps & {
	rawTime: number;
};
type CmdEvent = Obj<'CmdEvent', CmdSubTrack, never, CmdEventProperties> & CmdEventProperties;
