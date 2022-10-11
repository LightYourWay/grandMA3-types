type Pages = Obj<DataPool, Page> & (Page | null)[] & { [index: string]: Page | null };

type Page = Obj<Pages, Executor> & (Executor | null)[] & { [index: string]: Executor | null };

type Executor = Obj<Page, null> & null[] & { [index: string]: null };
