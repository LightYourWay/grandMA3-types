type GraphicsRoot = Obj<string, Root, any> &
	any[] & { [index: string]: any } & {
		TextureCollect: TextureCollect;
		PultCollect: PultCollect;
	};

type TextureCollect = Obj<string, GraphicsRoot, Textures> & {
	Textures: Textures;
};
type Textures = Obj<string, TextureCollect, Texture> & {
	[name: string]: Texture;
};
type TextureProps = ObjProps & {
	fileName: string;
	textureRect: { h: number; w: number; x: number; y: number };
	textureIndex: number;
};
type Texture = Obj<string, Textures, never, TextureProps> & TextureProps;

type PultCollect = Obj<string, GraphicsRoot, Pult> & {
	[name: string]: Pult;
};
type Pult = Obj<string, PultCollect, Devices | DisplayCollect, PultProps> & PultProps;
type PultProps = ObjProps;
type Devices = Obj<string, Pult, any>;
