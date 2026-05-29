type Sequences = Obj<'Sequences', Pool, Sequence> &
	(Sequence | undefined)[] &
	Record<string, Sequence | undefined>;

type SequenceProps = ObjProps & {
	appearance: Appearance | null;
	autoStart: boolean;
	autoStop: boolean;
	autoFix: boolean;
	autoStomp: boolean;
	autoPrePos: boolean;
	cueCommand: Enums.CueCommandMode;
	executorDisplayMode: Enums.ExecDisplayMode;
	includeLinkLastGo: boolean;
	killProtect: boolean;
	masterGoMode: Enums.SeqMasterGoMode;
	offWhenOverridden: boolean;
	playbackMaster: Enums.PlaybackMaster;
	preferCueAppearance: boolean;
	priority: Enums.PlaybackPriority;
	rateMaster: Enums.SpeedMaster;
	rateScale: Enums.SpeedScale;
	releaseFirstCue: boolean;
	restartMode: Enums.SeqRestartMode;
	sequMib?: Enums.MibEnableMode;
	sequMibMode?: Enums.MibModeSequence;
	softLTP: boolean;
	speedFromRate: boolean;
	speedMaster: Enums.SpeedMaster;
	speedScale: Enums.SpeedScale;
	swapProtect: boolean;
	useExecutorTime: boolean;
	wrapAround: boolean;
	xFadeMode: boolean;
	xFadeReload: boolean;
};
type Sequence = Obj<'Sequence', Sequences, Cue, SequenceProps> &
	(Cue | undefined)[] &
	Record<string, Cue | undefined> &
	SequenceProps;

type CueProperties = ObjProps & {
	/**
	 * This is the cue number multiplied by a 1000.
	 * e.g. Cue number 5.1 is 5100
	 * This should be used as a cue identifier and NOT the "index" property which is
	 * an integer and for cue numbers 5.1 and 5.2 , both indexes will be 5.
	 */
	no: number;
};
type Cue = Obj<'Cue', Sequence, Part, CueProperties> &
	(Part | undefined)[] &
	Record<string, Part | undefined> &
	CueProperties;

type PartProps = ObjProps & {
	appearance: Appearance;
	command: string;
	note: string;
	part: number;
	/**
	 * Before MA3 v2.3 : Raw Seconds. 1 sec = 16777216
	 * Since MA3 v2.3 : Seconds.
	 */
	cueInFade: number;
	/**
	 * Before MA3 v2.3 : Raw Seconds. 1 sec = 16777216
	 * Since MA3 v2.3 : Seconds.
	 */
	cueInDelay: number;
	sync: boolean;
};
type Part = Obj<'Part', Cue, Recipe, PartProps> &
	(Recipe | undefined)[] &
	Record<string, Recipe | undefined> &
	PartProps;
