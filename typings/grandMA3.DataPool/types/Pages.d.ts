type Pages = Obj<'Pages', DataPool, Page> & (Page | undefined)[] & Record<string, Page | undefined>;

type Page = Obj<'Page', Pages, Executor | Proxy>;

type ExecutorProxyProps = {
	fader: 'Master' | 'Temp'; //...
};

type ExecutorProps = ObjProps &
	ExecutorProxyProps & {
		object: GenericObj;
		width: number;
		height: number;
	};
type Executor = Obj<'Executor', Page, never, ExecutorProps> & ExecutorProps;

type ProxyProps = ObjProps & ExecutorProxyProps;
type Proxy = Obj<'Proxy', Page, never, ProxyProps> & ProxyProps;
