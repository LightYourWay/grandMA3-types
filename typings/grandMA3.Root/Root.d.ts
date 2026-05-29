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
	Record<string, RootChildren[keyof RootChildren] | undefined> &
	RootChildren;

type UsbNotifierChildren = {
	StorageDevice: Storage;
};
type UsbNotifier = Obj<'UsbNotifier', Root, UsbNotifierChildren[keyof UsbNotifierChildren]> &
	UsbNotifierChildren[keyof UsbNotifierChildren][] &
	UsbNotifierChildren;
type Storage = Obj<'Storage', UsbNotifier, USBDeviceStorage> &
	(USBDeviceStorage | undefined)[] &
	Record<string, USBDeviceStorage | undefined>;
type USBDeviceStorageProperties = ObjProps & {
	connected: boolean;
	connectedCount: any;
	ip: any;
	mountPoint: any;
};
type USBDeviceStorage = Obj<'USBDeviceStorage', Storage, never, USBDeviceStorageProperties> &
	USBDeviceStorageProperties;

type TempChildren = {
	DriveCollect: DriveCollect;
};
type Temp = Obj<'Temp', Root, TempChildren[keyof TempChildren]> &
	TempChildren[keyof TempChildren][] &
	TempChildren;

type DriveCollect = Obj<'DriveCollect', Temp, Drive> &
	(Drive | undefined)[] &
	Record<string, Drive | undefined>;
type Drive = Obj<'Drive', DriveCollect, never, DriveProperties> & DriveProperties;
type DriveProperties = ObjProps & {
	driveType: 'Removeable' | 'Internal' | 'OldVersion';
	path: string;
};

type MANetSocket = Obj<'MAnetSocket', Root, never, MANetSocketProperties> & MANetSocketProperties;
type MANetSocketProperties = ObjProps & {
	hostName: string;
	readonly primaryIp: string;
	session: string;
	showfile: string;
	readonly status: 'IdleMaster' | string;
	readonly sessionManager: 'Yes' | 'No';
};
