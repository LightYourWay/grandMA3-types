type UserProfiles = Obj<'UserProfiles', ShowData, UserProfile> &
	UserProfile[] & { [index: string]: UserProfile };
