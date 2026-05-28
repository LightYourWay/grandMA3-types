type Plugins = Obj<string, DataPool, Plugin> & { [index: string]: Plugin | undefined };

type PluginProps = ObjProps & {
	scribble: Obj<string, any, any>;
	appearance: Obj<string, any, any>;
	author: string;
	version: string;
	path: string;
	userRights: string;
};

type Plugin = Obj<string, Plugins, LuaComponent, PluginProps> &
	PluginProps & { note: string } & { [index: string]: LuaComponent | undefined };

type LuaComponentProps = ObjProps & {
	fileName: string;
	filePath: string;
	fileSize: number;
	isResource: boolean;
	inStream: boolean;
	installed: boolean;
};
type LuaComponent = Obj<string, Plugin, never, LuaComponentProps> & {
	[index: string]: undefined;
};
