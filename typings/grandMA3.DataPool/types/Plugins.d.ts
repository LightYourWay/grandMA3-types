// Plugins
type Plugins = Obj<'Plugins', Pool, UserPlugin> &
	(UserPlugin | undefined)[] &
	Record<string, UserPlugin | undefined>;

// UserPlugin
type UserPluginProperties = PoolItemProperties & {
	scribble: Scribble;
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

// LuaComponent
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
