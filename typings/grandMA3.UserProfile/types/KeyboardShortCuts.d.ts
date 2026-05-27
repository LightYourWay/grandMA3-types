type KeyboardShortCutsProps = ObjProps & {
	keyboardShortcutsActive: boolean;
};

type KeyboardShortCuts = Obj<string, UserProfile, any> & KeyboardShortCutsProps;
