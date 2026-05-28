type ShowDataChildren = {
	DataPools: DataPools;
	LivePatch: LivePatch;
	// MediaPools: MediaPools;
	// Masters: Masters;
	// UserProfiles: UserProfiles;
	// Appearances: Appearances;
	// Remotes: Remotes;
	// ShowSettings: ShowSettings;
	// Scribbles: Scribbles;
	// Tags: Tags;
};
type ShowDataProperties = ObjProps & {
	tollesWeiteresProp: string;
};

type ShowData = Obj<string, Root, ShowDataChildren[keyof ShowDataChildren], ShowDataProperties> &
	ShowDataChildren[keyof ShowDataChildren][] &
	ShowDataChildren &
	ShowDataProperties;
