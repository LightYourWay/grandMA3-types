type Macros = Obj<'Macros', Pool, Macro> & Macro[] & { [index: string]: Macro };

type Macro = Obj<'Macro', Layouts, MacroLine> &
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
type MacroLine = Obj<'MacroLine', Macro, never> & MacroLineProps;
