type DeviceConfigurations = Obj<string, Root, DMXProtocols> & {
	DMXProtocols: DMXProtocols;
};

type DMXProtocols = Obj<string, DeviceConfigurations, sACN | ArtNet> & {
	sACN: sACN;
	ArtNet: ArtNet;
};

type ArtNet = Obj<string, DMXProtocols, ArtNetDataCollect | ArtNetNodeCollect> & {
	ArtNetDataCollect: ArtNetDataCollect;
	ArtNetNodeCollect: ArtNetNodeCollect;
};

type sACN = Obj<string, DMXProtocols, sACNDataCollect | sACNDiscoveryCollect> & {
	sACNDataCollect: sACNDataCollect;
	sACNDiscoveryCollect: sACNDiscoveryCollect;
};

// ArtNet
type ArtNetDataCollect = Obj<string, ArtNet, ArtNetData>;
type ArtNetDataProps = ObjProps & {
	localUniverse: DMXUniverseNumber;
	mode: Enums.ArtNetDataMode;
};
type ArtNetData = Obj<string, ArtNetDataCollect, never, ArtNetDataProps> & ArtNetDataProps;

type ArtNetNodeCollect = Obj<string, ArtNet, ArtNetData>;

// sACN
type sACNDataCollect = Obj<string, sACN, sACNData>;
type sACNDataProps = ObjProps & {
	localUniverse: number;
	mode: Enums.SacnDataMode;
};
type sACNData = Obj<string, sACNDataCollect, never, sACNDataProps> & sACNDataProps;

type sACNDiscoveryCollect = Obj<string, sACN, never>;
