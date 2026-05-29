// DataPool
type DataPoolsProperties = ObjProps & {
	readonly Default: Pool;
};
type DataPools = Obj<'DataPools', ShowData, Pool, DataPoolsProperties> &
	(Pool | undefined)[] &
	Record<string, Pool | undefined> &
	DataPoolsProperties;
