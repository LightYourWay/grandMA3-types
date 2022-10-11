type RemoteTypes = DCRemote | MIDIRemote | DMXRemote;

type Remotes = Obj<ShowData, RemoteType<RemoteTypes>> &
	RemoteType<RemoteTypes>[] & { [index: string]: RemoteType<RemoteTypes> } & {
		DCRemotes: RemoteType<DCRemote>;
		MIDIRemotes: RemoteType<MIDIRemote>;
		DMXRemotes: RemoteType<DMXRemote>;
	};

type RemoteType<T> = Obj<Remotes, T> &
	T[] & { [index: string]: T } & {
		enabled: boolean;
		feedbackinput: boolean;
	};

type DCRemote = Obj<RemoteType<DCRemote>, null> & null[] & { [index: string]: null } & {};

type MIDIRemote = Obj<RemoteType<MIDIRemote>, null> &
	null[] & { [index: string]: null } & {
		target: Sequence
		fader: string
		key: string
		midichannel: number
		midiindex: number
		miditype: number
	};

type DMXRemote = Obj<RemoteType<DMXRemote>, null> & null[] & { [index: string]: null } & {};
