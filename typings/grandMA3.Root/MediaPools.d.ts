type MediaPoolsChildren = {
	Gobos: GoboImages;
	Symbols: Symbols;
	Images: Images;
	MeshImagePool: MeshImagePool;
	Videos: Videos;
	Sounds: Sounds;
};

type MediaPools = Obj<
	string,
	ShowData,
	GoboImages | Symbols | Images | MeshImagePool | Videos | Sounds
> &
	MediaPoolsChildren;

type MediaObj = GoboImage | SymbolImage | UserImage | MeshImage | Video | Sound;
type GoboImages = Obj<string, MediaPools, GoboImage>;
type GoboImage = Obj;

type Symbols = Obj<string, MediaPools, SymbolImage>;
type SymbolImage = Obj;

type Images = Obj<string, MediaPools, UserImage> & UserImage[] & { [index: string]: UserImage };
type UserImage = Obj<string, Images, undefined> & { note: string };

type MeshImagePool = Obj<string, MediaPools, MeshImage>;
type MeshImage = Obj;

type Videos = Obj<string, MediaPools, Video>;
type Video = Obj;
type Sounds = Obj<string, MediaPools, Sound>;
type Sound = Obj;
