// ColorTheme
type ColorThemeChildren = {
	ColorDefCollect: ColorDefCollect;
	ColorGroups: ColorGroups;
};
type ColorTheme = Obj<'ColorTheme', Root, ColorThemeChildren[keyof ColorThemeChildren]> &
	ColorThemeChildren[keyof ColorThemeChildren][] &
	ColorThemeChildren;
