// UserProfiles
type UserProfiles = Obj<'UserProfiles', ShowData, UserProfile> &
	(UserProfile | undefined)[] &
	Record<string, UserProfile | undefined>;
