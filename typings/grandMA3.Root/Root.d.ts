// Root
type RootChildren = {
	ShowData: ShowData;
	ColorTheme: ColorTheme;
	DeviceConfigurations: DeviceConfigurations;
	GraphicsRoot: GraphicsRoot;
	MANetSocket: MANetSocket;
	UsbNotifier: UsbNotifier;
	Temp: Temp;
};
type Root = Obj<'Root', never, RootChildren[keyof RootChildren]> &
	RootChildren[keyof RootChildren][] &
	RootChildren;

// UsbNotifier
type UsbNotifierChildren = {
	StorageDevice: Storage;
};
type UsbNotifier = Obj<'UsbNotifier', Root, UsbNotifierChildren[keyof UsbNotifierChildren]> &
	UsbNotifierChildren[keyof UsbNotifierChildren][] &
	UsbNotifierChildren;

// Storage
type Storage = Obj<'Storage', UsbNotifier, USBDeviceStorage> &
	(USBDeviceStorage | undefined)[] &
	Record<string, USBDeviceStorage | undefined>;

// USBDeviceStorage
type USBDeviceStorageProperties = ObjProps & {
	connected: boolean;
	connectedCount: any;
	ip: any;
	mountPoint: any;
};
type USBDeviceStorage = Obj<'USBDeviceStorage', Storage, never, USBDeviceStorageProperties> &
	USBDeviceStorageProperties;

// Temp
type TempChildren = {
	DriveCollect: DriveCollect;
};
type Temp = Obj<'Temp', Root, TempChildren[keyof TempChildren]> &
	TempChildren[keyof TempChildren][] &
	TempChildren;

// DriveCollect
type DriveCollect = Obj<'DriveCollect', Temp, Drive> &
	(Drive | undefined)[] &
	Record<string, Drive | undefined>;

// Drive
type DriveProperties = ObjProps & {
	driveType: 'Removeable' | 'Internal' | 'OldVersion';
	path: string;
};
type Drive = Obj<'Drive', DriveCollect, never, DriveProperties> & DriveProperties;

// MANetSocket
type MANetSocketProperties = ObjProps & {
	hostName: string;
	readonly primaryIp: string;
	session: string;
	showfile: string;
	readonly status: 'IdleMaster' | string;
	readonly sessionManager: 'Yes' | 'No';
};
type MANetSocket = Obj<'MAnetSocket', Root, never, MANetSocketProperties> & MANetSocketProperties;
