type UserProfiles = Obj<ShowData, UserProfile> &
	(UserProfile | null)[] & { [index: string]: UserProfile | null };
