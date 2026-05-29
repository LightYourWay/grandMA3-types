type Masters = Obj<'Masters', ShowData, any> & {
	Grand: Grand;
	Playback: Playback;
	Speed: Speed;
	Timing: Timing;
};

type Playback = Obj<'MasterPoolPlayback', Masters, MasterPlayback>;

type MasterPlayback = Obj<'MasterPlayback', Playback, never>;

type Speed = Obj<'MasterPoolSpeed', Masters, MasterSpeed>;

type MasterSpeed = Obj<'MasterSpeed', Speed, never, MasterSpeedProps> & MasterSpeedProps;

type Grand = Obj<'MasterPoolGrand', Masters, MasterGrand>;

type MasterGrand = Obj<'MasterGrand', Grand, never>;

type Timing = Obj<'MasterPoolTiming', Masters, MasterTiming>;

type MasterTiming = Obj<'MasterTiming', Timing, never>;

type MasterSpeedProps = ObjProps & {
	/**
	 * Values are ...-2,-1,0,1,2...
	 * A 2^x scale factor
	 */
	speedScale: number;
};
