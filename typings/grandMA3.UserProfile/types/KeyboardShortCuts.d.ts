// KeyboardShortCuts
type KeyboardShortCutsProperties = ObjProps & {
	keyboardShortcutsActive: boolean;
};
type KeyboardShortCuts = Obj<'KeyboardShortCuts', UserProfile, never, KeyboardShortCutsProperties> &
	KeyboardShortCutsProperties;
