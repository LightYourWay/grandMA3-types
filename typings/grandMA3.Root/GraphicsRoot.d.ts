type GraphicsRootChildren = {
	TextureCollect: TextureCollect;
	PultCollect: PultCollect;
};
type GraphicsRoot = Obj<'GraphicsRoot', Root, GraphicsRootChildren[keyof GraphicsRootChildren]> &
	GraphicsRootChildren[keyof GraphicsRootChildren][] &
	Record<string, GraphicsRootChildren[keyof GraphicsRootChildren] | undefined> &
	GraphicsRootChildren;

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
type Textures = Obj<'Textures', TextureCollect, Texture> &
	(Texture | undefined)[] &
	Record<string, Texture | undefined>;
type TextureProperties = ObjProps & {
	fileName: string;
	textureRect: { h: number; w: number; x: number; y: number };
	textureIndex: number;
};
type Texture = Obj<'Texture', Textures, never, TextureProperties> & TextureProperties;

type PultCollect = Obj<'PultCollect', GraphicsRoot, Pult> &
	(Pult | undefined)[] &
	Record<string, Pult | undefined>;
type PultChildren = Devices | DisplayCollect;
type PultProperties = ObjProps;
type Pult = Obj<'Pult', PultCollect, PultChildren, PultProperties> &
	PultChildren[] &
	PultProperties;
type Devices = Obj<'Devices', Pult, never>;
