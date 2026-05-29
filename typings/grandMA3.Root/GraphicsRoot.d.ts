type GraphicsRoot = Obj<'GraphicsRoot', Root, any> &
	any[] & { [index: string]: any } & {
		TextureCollect: TextureCollect;
		PultCollect: PultCollect;
	};

type TextureCollect = Obj<'TextureCollect', GraphicsRoot, Textures> & {
	Textures: Textures;
};
type Textures = Obj<'Textures', TextureCollect, Texture> & {
	[name: string]: Texture;
};
type TextureProps = ObjProps & {
	fileName: string;
	textureRect: { h: number; w: number; x: number; y: number };
	textureIndex: number;
};
type Texture = Obj<'Texture', Textures, never, TextureProps> & TextureProps;

type PultCollect = Obj<'PultCollect', GraphicsRoot, Pult> & {
	[name: string]: Pult;
};
type Pult = Obj<'Pult', PultCollect, Devices | DisplayCollect, PultProps> & PultProps;
type PultProps = ObjProps;
type Devices = Obj<'Devices', Pult, any>;
