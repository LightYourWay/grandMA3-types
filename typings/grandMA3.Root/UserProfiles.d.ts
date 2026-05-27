type UserProfiles = Obj<string, ShowData, UserProfile> &
	UserProfile[] & { [index: string]: UserProfile };
