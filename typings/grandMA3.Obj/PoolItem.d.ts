/**
 * Properties shared by every pool item (direct child of a pool), e.g. Macro,
 * Preset, Group, Sequence, Appearance, Scribble, View, Pool or media pool items.
 */
type PoolItemProperties = ObjProps & {
	appearance: Appearance;
};
