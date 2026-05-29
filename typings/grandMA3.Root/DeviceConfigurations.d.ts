type DeviceConfigurations = Obj<'DeviceConfigurations', Root, DMXProtocols> & {
	DMXProtocols: DMXProtocols;
};

type DMXProtocols = Obj<'DMXProtocols', DeviceConfigurations, sACN | ArtNet> & {
	sACN: sACN;
	ArtNet: ArtNet;
};

type ArtNet = Obj<'ArtNet', DMXProtocols, ArtNetDataCollect | ArtNetNodeCollect> & {
	ArtNetDataCollect: ArtNetDataCollect;
	ArtNetNodeCollect: ArtNetNodeCollect;
};

type sACN = Obj<'sACN', DMXProtocols, sACNDataCollect | sACNDiscoveryCollect> & {
	sACNDataCollect: sACNDataCollect;
	sACNDiscoveryCollect: sACNDiscoveryCollect;
};

// ArtNet
type ArtNetDataCollect = Obj<'ArtNetDataCollect', ArtNet, ArtNetData>;
type ArtNetDataProps = ObjProps & {
	localUniverse: DMXUniverseNumber;
	mode: Enums.ArtNetDataMode;
};
type ArtNetData = Obj<'Art-Net-Data', ArtNetDataCollect, never, ArtNetDataProps> & ArtNetDataProps;

type ArtNetNodeCollect = Obj<'ArtNetNodeCollect', ArtNet, ArtNetData>;

// sACN
type sACNDataCollect = Obj<'sACNDataCollect', sACN, sACNData>;
type sACNDataProps = ObjProps & {
	localUniverse: number;
	mode: Enums.SacnDataMode;
};
type sACNData = Obj<'sACNData', sACNDataCollect, never, sACNDataProps> & sACNDataProps;

type sACNDiscoveryCollect = Obj<'sACNDiscoveryCollect', sACN, never>;
