type MediaPoolsChildren = {
	Gobos: GoboImages;
	Symbols: Symbols;
	Images: Images;
	MeshImagePool: MeshImagePool;
	Videos: Videos;
	Sounds: Sounds;
};

type MediaPools = Obj<'MediaPools', ShowData, MediaPoolsChildren[keyof MediaPoolsChildren]> &
	MediaPoolsChildren[keyof MediaPoolsChildren][] &
	MediaPoolsChildren;

type MediaObj = GoboImage | SymbolImage | UserImage | MeshImage | Video | Sound;
type GoboImages = Obj<'GoboImages', MediaPools, GoboImage> &
	(GoboImage | undefined)[] &
	Record<string, GoboImage | undefined>;
type GoboImage = Obj<'GoboImage', GoboImages, never>;

type Symbols = Obj<'Symbols', MediaPools, SymbolImage> &
	(SymbolImage | undefined)[] &
	Record<string, SymbolImage | undefined>;
type SymbolImage = Obj<'SymbolImage', Symbols, never>;

type Images = Obj<'Images', MediaPools, UserImage> &
	(UserImage | undefined)[] &
	Record<string, UserImage | undefined>;
type UserImageProperties = ObjProps & { note: string };
type UserImage = Obj<'UserImage', Images, never, UserImageProperties> & UserImageProperties;

type MeshImagePool = Obj<'MeshImagePool', MediaPools, MeshImage> &
	(MeshImage | undefined)[] &
	Record<string, MeshImage | undefined>;
type MeshImage = Obj<'MeshImage', MeshImagePool, never>;

type Videos = Obj<'Videos', MediaPools, Video> &
	(Video | undefined)[] &
	Record<string, Video | undefined>;
type Video = Obj<'Video', Videos, never>;
type Sounds = Obj<'Sounds', MediaPools, Sound> &
	(Sound | undefined)[] &
	Record<string, Sound | undefined>;
type Sound = Obj<'Sound', Sounds, never>;
