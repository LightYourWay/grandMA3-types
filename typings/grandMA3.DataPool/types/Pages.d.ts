type Pages = Obj<string, DataPoolClass, Page> &
	(Page | undefined)[] &
	Record<string, Page | undefined>;

type Page = Obj<string, Pages, Executor | ExecutorProxy>;

type ExecutorBaseProps = {
	fader: 'Master' | 'Temp'; //...
};
type ExecutorProps = ObjProps &
	ExecutorBaseProps & {
		object: Obj;
		width: number;
		height: number;
	};
type Executor = Obj<'Exec', Page, undefined, ExecutorProps>;

type ExecutorProxyProps = ObjProps & ExecutorBaseProps;
type ExecutorProxy = Obj<'Proxy', Page, undefined, ExecutorProxyProps> & ExecutorProxyProps;
