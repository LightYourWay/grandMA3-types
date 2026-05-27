type Appearances = Obj<string, ShowData, Appearance> &
	Appearance[] & { [index: string]: Appearance };

type Appearance = Obj<string, Appearances, undefined, AppearanceProps> & AppearanceProps;

type AppearanceProps = ObjProps & {
	BACKR: number;
	BACKG: number;
	BACKB: number;
	BACKALPHA: number;
	image: UserImage;
	IMAGER: number;
	IMAGEG: number;
	IMAGEB: number;
	IMAGEALPHA: number;
};

type ScribbleProps = ObjProps & {
	scribble: string; // comma separated list of points and colors
};

type Scribbles = Obj<string, ShowData, Scribble> & Scribble[] & { [index: string]: Scribble };
type Scribble = Obj<string, Appearances, undefined, ScribbleProps> & ScribbleProps;

type TagProps = ObjProps & {};

type Tags = Obj<string, ShowData, Tag> & Tag[] & { [index: string]: Tag };
type Tag = Obj<string, Tags, undefined, TagProps> & TagProps;
