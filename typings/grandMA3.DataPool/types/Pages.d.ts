type Pages = Obj<'Pages', Pool, Page> & (Page | undefined)[] & Record<string, Page | undefined>;

type Page = Obj<'Page', Pages, Executor | Proxy> &
	(Executor | Proxy | undefined)[] &
	Record<string, Executor | Proxy | undefined>;

type ExecutorProxyProperties = {
	fader: 'Master' | 'Temp'; //...
};

type ExecutorProperties = ObjProps &
	ExecutorProxyProperties & {
		object: GenericObj;
		width: number;
		height: number;
	};
type Executor = Obj<'Executor', Page, never, ExecutorProperties> & ExecutorProperties;

type ProxyProperties = ObjProps & ExecutorProxyProperties;
type Proxy = Obj<'Proxy', Page, never, ProxyProperties> & ProxyProperties;
