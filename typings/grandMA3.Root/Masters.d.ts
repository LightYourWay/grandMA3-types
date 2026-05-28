type Masters = Obj<string, ShowData, any> & {
	Grand: Grand;
	Playback: Playback;
	Speed: Speed;
	Timing: Timing;
};

type Playback = Obj<string, Masters, MasterPlayback>;

type MasterPlayback = Obj<string, Playback, never>;

type Speed = Obj<string, Masters, MasterSpeed>;

type MasterSpeed = Obj<string, Speed, never, MasterSpeedProps> & MasterSpeedProps;

type Grand = Obj<string, Masters, MasterGrand>;

type MasterGrand = Obj<string, Grand, never>;

type Timing = Obj<string, Masters, MasterTiming>;

type MasterTiming = Obj<string, Timing, never>;

type MasterSpeedProps = ObjProps & {
	/**
	 * Values are ...-2,-1,0,1,2...
	 * A 2^x scale factor
	 */
	speedScale: number;
};
