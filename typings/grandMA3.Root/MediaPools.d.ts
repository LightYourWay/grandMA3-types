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
type GoboImages = Obj<'GoboImages', MediaPools, GoboImage>;
type GoboImage = Obj<'GoboImage', GoboImages, never>;

type Symbols = Obj<'Symbols', MediaPools, SymbolImage>;
type SymbolImage = Obj<'SymbolImage', Symbols, never>;

type Images = Obj<'Images', MediaPools, UserImage> & UserImage[] & { [index: string]: UserImage };
type UserImage = Obj<'UserImage', Images, never> & { note: string };

type MeshImagePool = Obj<'MeshImagePool', MediaPools, MeshImage>;
type MeshImage = Obj<'MeshImage', MeshImagePool, never>;

type Videos = Obj<'Videos', MediaPools, Video>;
type Video = Obj<'Video', Videos, never>;
type Sounds = Obj<'Sounds', MediaPools, Sound>;
type Sound = Obj<'Sound', Sounds, never>;
