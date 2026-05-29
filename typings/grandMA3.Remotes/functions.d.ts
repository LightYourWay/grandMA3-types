type Remotes = Obj<'Remotes', ShowData, MIDIRemotes | DCRemotes | DmxRemotes> & {
	DCRemotes: DCRemotes;
	MIDIRemotes: MIDIRemotes;
	DmxRemotes: DmxRemotes;
};

type DmxRemotesProps = ObjProps & {
	enabled: boolean;
};

type DCRemotes = Obj<'DCRemotes', ShowData, any>;
type DmxRemotes = Obj<'DmxRemotes', ShowData, any> & DmxRemotesProps & { [key: string]: DmxRemote };

type MIDIRemotesProps = ObjProps & {
	enabled: boolean;
	feedbackInput: boolean;
};

type MIDIRemotes = Obj<'MIDIRemotes', ShowData, MIDIRemote> & {
	Image: UserImage;
} & MIDIRemotesProps;

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
type MIDIRemoteProps = ObjProps & {
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

type MIDIRemote = Obj<'MIDIRemote', MIDIRemotes, never, MIDIRemoteProps>;

type DmxRemoteResolution = '8bit' | '16bit' | '24bit';
type DmxRemoteProps = ObjProps & {
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

type DmxRemote = Obj<'DmxRemote', DmxRemotes, never, DmxRemoteProps>;
