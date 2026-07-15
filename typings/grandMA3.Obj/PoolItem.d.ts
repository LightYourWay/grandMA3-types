/**
 * Properties shared by every pool item (direct child of a pool, e.g. Macro,
 * Preset, Group, Sequence, UserPlugin, MAtrick, Page, Layout, Timecode, Filter).
 */
type PoolItemProperties = ObjProps & {
	appearance: Appearance;
};
