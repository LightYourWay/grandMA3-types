type KeyboardShortCutsProps = ObjProps & {
	keyboardShortcutsActive: boolean;
};

type KeyboardShortCuts = Obj<'KeyboardShortCuts', UserProfile, any> & KeyboardShortCutsProps;
