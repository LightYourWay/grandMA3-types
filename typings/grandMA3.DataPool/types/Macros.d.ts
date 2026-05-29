type Macros = Obj<'Macros', Pool, Macro> &
	(Macro | undefined)[] &
	Record<string, Macro | undefined>;

type MacroProperties = ObjProps & {
	appearance: Appearance;
};
type Macro = Obj<'Macro', Macros, MacroLine, MacroProperties> &
	(MacroLine | undefined)[] &
	Record<string, MacroLine | undefined> &
	MacroProperties;

type MacroLineProperties = ObjProps & {
	wait: number;
	command: string;
	note: string;
	enabled: boolean;
	addToCmdLine: boolean;
	execute: boolean;
};
type MacroLine = Obj<'MacroLine', Macro, never, MacroLineProperties> & MacroLineProperties;
