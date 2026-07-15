// Macros
type Macros = Obj<'Macros', Pool, Macro> &
	(Macro | undefined)[] &
	Record<string, Macro | undefined>;

// Macro
type MacroProperties = PoolItemProperties;
type Macro = Obj<'Macro', Macros, MacroLine, MacroProperties> &
	(MacroLine | undefined)[] &
	Record<string, MacroLine | undefined> &
	MacroProperties;

// MacroLine
type MacroLineProperties = ObjProps & {
	wait: number;
	command: string;
	note: string;
	enabled: boolean;
	addToCmdLine: boolean;
	execute: boolean;
};
type MacroLine = Obj<'MacroLine', Macro, never, MacroLineProperties> & MacroLineProperties;
