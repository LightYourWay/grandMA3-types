type RemotesChildren = {
	DCRemotes: DCRemotes;
	MIDIRemotes: MIDIRemotes;
	DmxRemotes: DmxRemotes;
};
type Remotes = Obj<'Remotes', ShowData, RemotesChildren[keyof RemotesChildren]> &
	RemotesChildren[keyof RemotesChildren][] &
	RemotesChildren;

type DmxRemotesProperties = ObjProps & {
	enabled: boolean;
};

type DCRemotes = Obj<'DCRemotes', Remotes, never>;
type DmxRemotes = Obj<'DmxRemotes', Remotes, DmxRemote, DmxRemotesProperties> &
	(DmxRemote | undefined)[] &
	Record<string, DmxRemote | undefined> &
	DmxRemotesProperties;

type MIDIRemotesProperties = ObjProps & {
	enabled: boolean;
	feedbackInput: boolean;
	Image: UserImage;
};

type MIDIRemotes = Obj<'MIDIRemotes', Remotes, MIDIRemote, MIDIRemotesProperties> &
	(MIDIRemote | undefined)[] &
	Record<string, MIDIRemote | undefined> &
	MIDIRemotesProperties;

type RemoteFaderType = '' | 'Master' | 'X' | 'XA' | 'XB' | 'Temp' | 'Rate' | 'Speed' | 'Time';
type RemoteKeyType =
	| ''
	| '>>>'
	| '<<<'
	| 'Black'
	| 'DoubleSpeed'
	| 'Flash'
	| 'Go+'
	| 'Go-'
	| 'Goto'
	| 'HalfSpeed'
	| 'LearnSpeed'
	| 'Load'
	| 'On'
	| 'Off'
	| 'Pause'
	| 'Rate1'
	| 'Select'
	| 'SelFix'
	| 'Speed1'
	| 'Swap'
	| 'Time'
	| 'Temp'
	| 'Toggle'
	| 'Top';
type MIDIMidiType = 'Note' | 'NoteAttack' | 'NoteAttackDecay' | 'Control';
type RemoteLockType = '' | 'Yes';
type MIDIRemoteProperties = ObjProps & {
	lock: RemoteLockType;
	target: GenericObj;
	fader: RemoteFaderType;
	key: RemoteKeyType;
	outFrom: number;
	outTo: number;
	enabled: boolean;
	in: string;
	out: string;
	triggerOn: number;
	triggerOff: number;
	inFrom: number;
	inTo: number;
	midiChannel: number;
	midiIndex: number;
	midiType: MIDIMidiType;
};

type MIDIRemote = Obj<'MIDIRemote', MIDIRemotes, never, MIDIRemoteProperties> &
	MIDIRemoteProperties;

type DmxRemoteResolution = '8bit' | '16bit' | '24bit';
type DmxRemoteProperties = ObjProps & {
	lock: RemoteLockType;
	target: GenericObj;
	fader: RemoteFaderType;
	key: RemoteKeyType;
	outFrom: number;
	outTo: number;
	enabled: boolean;
	in: string;
	out: string;
	triggerOn: number;
	triggerOff: number;
	inFrom: number;
	inTo: number;
	address: number;
	resolution: DmxRemoteResolution;
};

type DmxRemote = Obj<'DmxRemote', DmxRemotes, never, DmxRemoteProperties> & DmxRemoteProperties;
