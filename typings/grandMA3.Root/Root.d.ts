type Root = Obj<'Root', never, any> & { [index: string]: any } & {
	ShowData: ShowData;
	ColorTheme: ColorTheme;
	DeviceConfigurations: DeviceConfigurations;
	GraphicsRoot: GraphicsRoot;
	MANetSocket: MANetSocket;
	UsbNotifier: UsbNotifier;
	Temp: Temp;
};

type UsbNotifier = Obj<'UsbNotifier', Root, Storage> & {
	StorageDevice: Storage;
};
type Storage = Obj<'Storage', UsbNotifier, USBDeviceStorage> & USBDeviceStorage[];
type USBDeviceStorageProps = ObjProps & {
	connected: boolean;
	connectedCount: any;
	ip: any;
	mountPoint: any;
};
type USBDeviceStorage = Obj<'USBDeviceStorage', USBDeviceStorage, never, USBDeviceStorageProps>;

type Temp = Obj<'Temp', Root, any> & {
	DriveCollect: DriveCollect;
};

type DriveCollect = Obj<'DriveCollect', Temp, Drive>;
type Drive = Obj<'Drive', DriveCollect, never, DriveProps> & DriveProps;
type DriveProps = ObjProps & {
	driveType: 'Removeable' | 'Internal' | 'OldVersion';
	path: string;
};

type MANetSocket = Obj<'MAnetSocket', Root, never, MANetSocketProps> & MANetSocketProps;
type MANetSocketProps = ObjProps & {
	hostName: string;
	readonly primaryIp: string;
	session: string;
	showfile: string;
	readonly status: 'IdleMaster' | string;
	readonly sessionManager: 'Yes' | 'No';
};
