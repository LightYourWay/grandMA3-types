type Appearances = Obj<'Appearances', ShowData, Appearance> &
	(Appearance | undefined)[] &
	Record<string, Appearance | undefined>;

type AppearanceProperties = ObjProps & {
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
type Appearance = Obj<'Appearance', Appearances, never, AppearanceProperties> &
	AppearanceProperties;

type ScribbleProperties = ObjProps & {
	scribble: string; // comma separated list of points and colors
};

type Scribbles = Obj<'Scribbles', ShowData, Scribble> &
	(Scribble | undefined)[] &
	Record<string, Scribble | undefined>;
type Scribble = Obj<'Scribble', Scribbles, never, ScribbleProperties> & ScribbleProperties;

type Tags = Obj<'Tags', ShowData, Tag> & (Tag | undefined)[] & Record<string, Tag | undefined>;
type Tag = Obj<'Tag', Tags, never>;
