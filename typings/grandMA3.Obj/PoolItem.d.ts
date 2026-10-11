/**
 * Properties shared by every pool item (direct child of a pool), e.g. Macro,
 * Preset, Group, Sequence, Appearance, Scribble, View, Pool or media pool items.
 */
type PoolItemProperties = ObjProps & {
	appearance: Appearance;
	/**
	 * Pool number as used on the command line, e.g. `5` for `Group 5`.
	 * Unlike `index` (position in the children list) it stays stable when items are moved.
	 */
	no: number;
};
