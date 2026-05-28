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
type GoboImage = Obj<string, GoboImages, never>;

type Symbols = Obj<string, MediaPools, SymbolImage>;
type SymbolImage = Obj<string, Symbols, never>;

type Images = Obj<string, MediaPools, UserImage> & UserImage[] & { [index: string]: UserImage };
type UserImage = Obj<string, Images, never> & { note: string };

type MeshImagePool = Obj<string, MediaPools, MeshImage>;
type MeshImage = Obj<string, MeshImagePool, never>;

type Videos = Obj<string, MediaPools, Video>;
type Video = Obj<string, Videos, never>;
type Sounds = Obj<string, MediaPools, Sound>;
type Sound = Obj<string, Sounds, never>;
