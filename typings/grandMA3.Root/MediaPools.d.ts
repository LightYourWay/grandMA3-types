// MediaPools
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

// MediaObj
type MediaObj = GoboImage | SymbolImage | UserImage | MeshImage | Video | Sound;

// GoboImages
type GoboImages = Obj<'GoboImages', MediaPools, GoboImage> &
	(GoboImage | undefined)[] &
	Record<string, GoboImage | undefined>;

// GoboImage
type GoboImage = Obj<'GoboImage', GoboImages, never>;

// Symbols
type Symbols = Obj<'Symbols', MediaPools, SymbolImage> &
	(SymbolImage | undefined)[] &
	Record<string, SymbolImage | undefined>;

// SymbolImage
type SymbolImage = Obj<'SymbolImage', Symbols, never>;

// Images
type Images = Obj<'Images', MediaPools, UserImage> &
	(UserImage | undefined)[] &
	Record<string, UserImage | undefined>;

// UserImage
type UserImageProperties = ObjProps & { note: string };
type UserImage = Obj<'UserImage', Images, never, UserImageProperties> & UserImageProperties;

// MeshImagePool
type MeshImagePool = Obj<'MeshImagePool', MediaPools, MeshImage> &
	(MeshImage | undefined)[] &
	Record<string, MeshImage | undefined>;

// MeshImage
type MeshImage = Obj<'MeshImage', MeshImagePool, never>;

// Videos
type Videos = Obj<'Videos', MediaPools, Video> &
	(Video | undefined)[] &
	Record<string, Video | undefined>;

// Video
type Video = Obj<'Video', Videos, never>;

// Sounds
type Sounds = Obj<'Sounds', MediaPools, Sound> &
	(Sound | undefined)[] &
	Record<string, Sound | undefined>;

// Sound
type Sound = Obj<'Sound', Sounds, never>;
