type Plugins = Obj<'Plugins', Pool, UserPlugin> &
	(UserPlugin | undefined)[] &
	Record<string, UserPlugin | undefined>;

type UserPluginProperties = ObjProps & {
	scribble: Scribble;
	appearance: Appearance;
	author: string;
	version: string;
	path: string;
	userRights: string;
	note: string;
};
type UserPlugin = Obj<'UserPlugin', Plugins, LuaComponent, UserPluginProperties> &
	(LuaComponent | undefined)[] &
	Record<string, LuaComponent | undefined> &
	UserPluginProperties;

type LuaComponentProperties = ObjProps & {
	fileName: string;
	filePath: string;
	fileSize: number;
	isResource: boolean;
	inStream: boolean;
	installed: boolean;
};
type LuaComponent = Obj<'LuaComponent', UserPlugin, never, LuaComponentProperties> &
	LuaComponentProperties;
