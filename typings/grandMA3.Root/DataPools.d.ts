type DataPools = Obj<string, ShowData, DataPoolClass> &
	DataPoolClass[] & { [index: string]: DataPoolClass } & {
		Default: DataPoolClass;
	};
