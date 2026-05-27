type Macros = Obj<string, DataPoolClass, Macro> & Macro[] & { [index: string]: Macro };

type Macro = Obj<string, Layouts, MacroLine> &
	MacroLine[] & { [index: string]: MacroLine } & {
		appearance: Obj;
	};

type MacroLineProps = ObjProps & {
	wait: number;
	command: string;
	note: string;
	enabled: boolean;
	addToCmdLine: boolean;
	execute: boolean;
};
type MacroLine = Obj<string, Macro, undefined> & MacroLineProps;
