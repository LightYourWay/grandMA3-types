// DeviceConfigurations
type DeviceConfigurationsChildren = {
	DMXProtocols: DMXProtocols;
};
type DeviceConfigurations = Obj<
	'DeviceConfigurations',
	Root,
	DeviceConfigurationsChildren[keyof DeviceConfigurationsChildren]
> &
	DeviceConfigurationsChildren[keyof DeviceConfigurationsChildren][] &
	DeviceConfigurationsChildren;

// DMXProtocols
type DMXProtocolsChildren = {
	sACN: sACN;
	ArtNet: ArtNet;
};
type DMXProtocols = Obj<
	'DMXProtocols',
	DeviceConfigurations,
	DMXProtocolsChildren[keyof DMXProtocolsChildren]
> &
	DMXProtocolsChildren[keyof DMXProtocolsChildren][] &
	DMXProtocolsChildren;

// ArtNet
type ArtNetChildren = {
	ArtNetDataCollect: ArtNetDataCollect;
	ArtNetNodeCollect: ArtNetNodeCollect;
};
type ArtNet = Obj<'ArtNet', DMXProtocols, ArtNetChildren[keyof ArtNetChildren]> &
	ArtNetChildren[keyof ArtNetChildren][] &
	ArtNetChildren;

// sACN
type sACNChildren = {
	sACNDataCollect: sACNDataCollect;
	sACNDiscoveryCollect: sACNDiscoveryCollect;
};
type sACN = Obj<'sACN', DMXProtocols, sACNChildren[keyof sACNChildren]> &
	sACNChildren[keyof sACNChildren][] &
	sACNChildren;

// ArtNetDataCollect
type ArtNetDataCollect = Obj<'ArtNetDataCollect', ArtNet, ArtNetData> &
	(ArtNetData | undefined)[] &
	Record<string, ArtNetData | undefined>;

// ArtNetData
type ArtNetDataProperties = ObjProps & {
	localUniverse: DMXUniverseNumber;
	mode: Enums.ArtNetDataMode;
};
type ArtNetData = Obj<'Art-Net-Data', ArtNetDataCollect, never, ArtNetDataProperties> &
	ArtNetDataProperties;

// ArtNetNodeCollect
type ArtNetNodeCollect = Obj<'ArtNetNodeCollect', ArtNet, ArtNetData> &
	(ArtNetData | undefined)[] &
	Record<string, ArtNetData | undefined>;

// sACNDataCollect
type sACNDataCollect = Obj<'sACNDataCollect', sACN, sACNData> &
	(sACNData | undefined)[] &
	Record<string, sACNData | undefined>;

// sACNData
type sACNDataProperties = ObjProps & {
	localUniverse: number;
	mode: Enums.SacnDataMode;
};
type sACNData = Obj<'sACNData', sACNDataCollect, never, sACNDataProperties> & sACNDataProperties;

// sACNDiscoveryCollect
type sACNDiscoveryCollect = Obj<'sACNDiscoveryCollect', sACN, never>;
