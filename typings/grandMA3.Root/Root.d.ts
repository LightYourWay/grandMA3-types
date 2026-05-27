type Root = Obj<undefined, any> & { [index: string]: any } & {
	ShowData: ShowData;
	ColorTheme: ColorTheme;
	DeviceConfigurations: DeviceConfigurations;
	GraphicsRoot: GraphicsRoot;
	MANetSocket: MANetSocket;
	UsbNotifier: UsbNotifier;
	Temp: RootTemp;
};

type UsbNotifier = Obj<Root, StorageDevice> & {
	StorageDevice: StorageDevice;
};
type StorageDevice = Obj<UsbNotifier, USBDeviceStorage> & USBDeviceStorage[];
type USBDeviceStorageProps = ObjProps & {
	connected: boolean;
	connectedCount: any;
	ip: any;
	mountPoint: any;
};
type USBDeviceStorage = Obj<USBDeviceStorage, undefined, USBDeviceStorageProps, 'USBDeviceStorage'>;

type RootTemp = Obj<Root, any> & {
	DriveCollect: DriveCollect;
};

type DriveCollect = Obj<RootTemp, Drive>;
type Drive = Obj<DriveCollect, undefined, DriveProps, 'Drive'> & DriveProps;
type DriveProps = ObjProps & {
	driveType: 'Removeable' | 'Internal' | 'OldVersion';
	path: string;
};

type MANetSocket = Obj<Root, undefined, MANetSocketProps, 'MAnetSocket'> & MANetSocketProps;
type MANetSocketProps = ObjProps & {
	hostName: string;
	readonly primaryIp: string;
	session: string;
	showfile: string;
	readonly status: 'IdleMaster' | string;
	readonly sessionManager: 'Yes' | 'No';
};
