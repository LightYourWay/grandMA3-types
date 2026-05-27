type Pages = Obj<DataPoolClass, Page> &
	(Page | undefined)[] & { [index: string]: Page | undefined };

type Page = Obj<Pages, Executor | ExecutorProxy>;

type ExecutorBaseProps = {
	fader: 'Master' | 'Temp'; //...
};
type ExecutorProps = ObjProps &
	ExecutorBaseProps & {
		object: Obj;
		width: number;
		height: number;
	};
type Executor = Obj<Page, undefined, ExecutorProps, 'Exec'>;

type ExecutorProxyProps = ObjProps & ExecutorBaseProps;
type ExecutorProxy = Obj<Page, undefined, ExecutorProxyProps, 'Proxy'> & ExecutorProxyProps;
