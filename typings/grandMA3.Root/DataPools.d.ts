type DataPools = Obj<'DataPools', ShowData, DataPool> &
	DataPool[] & { [index: string]: DataPool } & {
		Default: DataPool;
	};
