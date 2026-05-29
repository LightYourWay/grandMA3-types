type Appearances = Obj<'Appearances', ShowData, Appearance> &
	(Appearance | undefined)[] &
	Record<string, Appearance | undefined>;

type AppearanceProps = ObjProps & {
	backR: number;
	backG: number;
	backB: number;
	backAlpha: number;
	image: UserImage;
	imageR: number;
	imageG: number;
	imageB: number;
	imageAlpha: number;
};
type Appearance = Obj<'Appearance', Appearances, never, AppearanceProps> & AppearanceProps;

type ScribbleProps = ObjProps & {
	scribble: string; // comma separated list of points and colors
};

type Scribbles = Obj<'Scribbles', ShowData, Scribble> & Scribble[] & { [index: string]: Scribble };
type Scribble = Obj<'Scribble', Scribbles, never, ScribbleProps> & ScribbleProps;

type TagProps = ObjProps;

type Tags = Obj<'Tags', ShowData, Tag> & Tag[] & { [index: string]: Tag };
type Tag = Obj<'Tag', Tags, never, TagProps> & TagProps;
