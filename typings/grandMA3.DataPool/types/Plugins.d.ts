type Plugins = Obj<'Plugins', Pool, UserPlugin> & { [index: string]: UserPlugin | undefined };

type UserPluginProps = ObjProps & {
	scribble: Scribble;
	appearance: Appearance;
	author: string;
	version: string;
	path: string;
	userRights: string;
};
type UserPlugin = Obj<'UserPlugin', Plugins, LuaComponent, UserPluginProps> &
	UserPluginProps & { note: string } & { [index: string]: LuaComponent | undefined };

type LuaComponentProps = ObjProps & {
	fileName: string;
	filePath: string;
	fileSize: number;
	isResource: boolean;
	inStream: boolean;
	installed: boolean;
};
type LuaComponent = Obj<'LuaComponent', UserPlugin, never, LuaComponentProps> & {
	[index: string]: undefined;
};
