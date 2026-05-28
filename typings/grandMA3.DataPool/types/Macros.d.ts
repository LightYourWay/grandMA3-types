type Macros = Obj<string, DataPool, Macro> & Macro[] & { [index: string]: Macro };

type Macro = Obj<string, Layouts, MacroLine> &
	MacroLine[] & { [index: string]: MacroLine } & {
		appearance: Appearance;
	};

type MacroLineProps = ObjProps & {
	wait: number;
	command: string;
	note: string;
	enabled: boolean;
	addToCmdLine: boolean;
	execute: boolean;
};
type MacroLine = Obj<string, Macro, never> & MacroLineProps;
