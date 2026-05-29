type ShowDataChildren = {
	DataPools: DataPools;
	LivePatch: LivePatch;
	MediaPools: MediaPools;
	Masters: Masters;
	UserProfiles: UserProfiles;
	Appearances: Appearances;
	Remotes: Remotes;
	ShowSettings: ShowSettings;
	Scribbles: Scribbles;
	Tags: Tags;
};

type ShowData = Obj<'ShowData', Root, ShowDataChildren[keyof ShowDataChildren]> &
	ShowDataChildren[keyof ShowDataChildren][] &
	ShowDataChildren &
	ObjProps;
