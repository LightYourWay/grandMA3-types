// Based on http://w3.impa.br/~diego/software/luasocket/ftp.html

/// <reference lib="es2015.iterable" />

/** @noSelfInFile */

/**
 * a module that contains general helping functions for gma3
 * @example```
 * // to load the gma3_helpers module run:
 * import 'gma3_helpers'
 * ```
 *
 * @noResolution
 */
declare module 'gma3_helpers' {}

/**
 * a module that contains general helping functions for gma3
 * @example```
 * // to load the gma3_helpers module run:
 * import 'gma3_helpers'
 * ```
 */
declare const gma3_helpers: {
	/**
	 * Returns content of given variable as string (works with every type, incl. gma3-objects)
	 */
	dump: (o: any) => string;

	/**
	 * Returns content of gma3-object as string
	 */
	dumpObj: (o: any) => string;

	/**
	 * Creates fixed width headline
	 */
	headline: (headlineString: string, myFill: string, size: number) => string;

	/**
	 * Convert \n and \t for Printf()
	 */
	printfWithNewline: (str: string) => string;

	/**
	 * Create tree-like output of gma3-object
	 */
	tree: (o: any, maxDepth: number) => void;

	/**
	 * Convert a table like this:
	 * ```lua
	 * {
	 * 	[1] = {name="testHTP", result=3, min=0, max=100},
	 * 	[2] = {name="testLTP", result=5, min=15, max=100}
	 * }
	 * ```
	 * to this:
	 * ```markdown
	 * |-----------|-----------|-----------|-----------|-----------|
	 * |           | name      | result    | min       | max       |
	 * |-----------|-----------|-----------|-----------|-----------|
	 * | 1         | testHTP   | 3         | 0         | 100       |
	 * |-----------|-----------|-----------|-----------|-----------|
	 * | 2         | testLTP   | 5         | 15        | 100       |
	 * |-----------|-----------|-----------|-----------|-----------|
	 * ```
	 * @returns generated string for printing
	 * @param t is any multidimensional table
	 * @param forcedColumns is a list of column keys (sorted)
	 * @param noPrint if Printf to cmdline should be blocked
	 */
	printTableEntries: (t: any[], forcedColumns: string[], noPrint: boolean) => string;

	/**
	 * Convert a table like this:
	 * ```lua
	 * {
	 * 	[1] = { [1] = "something", [2] = "else"},
	 * 	[2] = { [1] = "test", [2] = "abc"}
	 * }
	 * ```
	 * to this:
	 * ```markdown
	 * |-----------|-----------|
	 * | something | else      |
	 * |-----------|-----------|
	 * | test      | abc       |
	 * |-----------|-----------|
	 * ```
	 * @returns generated string for printing
	 * @param t is any multidimensional table
	 * @param noPrint if Printf to cmdline should be blocked
	 */
	printTable2D: (t: any[], noPrint: boolean) => string;

	/**
	 * helper function for os.execute that prints it's result
	 * @param cmd is the instruction you want to run on the host system
	 */
	osExecute: (cmd: string) => void;

	/**
	 * helper function for io.popen
	 * @param path
	 */
	ioPopen: (path: string) => string;

	getObjectExportPath: (object: Obj<any, any>) => string;

	getDirectoryContent: (
		path: string,
	) => { type: 'directory' | 'file'; fullPath: string; name: string }[];

	copyFile: (src: string, dst: string) => void;

	deleteFolderContent: (desc: {
		path: string;
		confirm: boolean;
		recursive: boolean;
		filterFn(name: string): boolean;
	}) => void;

	repeatUntilTrue: (desc: { func(): boolean; tolerance?: number; interval?: number }) => boolean;

	editLuaTable: (t: any[]) => boolean;
};
