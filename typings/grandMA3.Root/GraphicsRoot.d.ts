// GraphicsRoot
type GraphicsRootChildren = {
	TextureCollect: TextureCollect;
	PultCollect: PultCollect;
};
type GraphicsRoot = Obj<'GraphicsRoot', Root, GraphicsRootChildren[keyof GraphicsRootChildren]> &
	GraphicsRootChildren[keyof GraphicsRootChildren][] &
	Record<string, GraphicsRootChildren[keyof GraphicsRootChildren] | undefined> &
	GraphicsRootChildren;

// TextureCollect
type TextureCollectChildren = {
	Textures: Textures;
};
type TextureCollect = Obj<
	'TextureCollect',
	GraphicsRoot,
	TextureCollectChildren[keyof TextureCollectChildren]
> &
	TextureCollectChildren[keyof TextureCollectChildren][] &
	TextureCollectChildren;

// Textures
type Textures = Obj<'Textures', TextureCollect, Texture> &
	(Texture | undefined)[] &
	Record<string, Texture | undefined>;

// Texture
type TextureProperties = ObjProps & {
	fileName: string;
	textureRect: { h: number; w: number; x: number; y: number };
	textureIndex: number;
};
type Texture = Obj<'Texture', Textures, never, TextureProperties> & TextureProperties;

// PultCollect
type PultCollect = Obj<'PultCollect', GraphicsRoot, Pult> &
	(Pult | undefined)[] &
	Record<string, Pult | undefined>;

// Pult
type PultChildren = Devices | DisplayCollect;
type Pult = Obj<'Pult', PultCollect, PultChildren> & PultChildren[];

// Devices
type Devices = Obj<'Devices', Pult, never>;
