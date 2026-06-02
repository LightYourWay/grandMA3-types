type DisplayCollect = Obj<'DisplayCollect', Pult, Display>;
type Display = GenericContainerObj &
	UILayoutGrid & {
		CmdLineSection: CmdLineSection;
		MainMenuCnt: MainMenuCnt;
		ScrollIndicatorBox: ScrollIndicatorBox;
		ViewBar: ViewBar;
		EncoderBarContainer: EncoderBarContainer;
		MainDialog: PlaceHolder;
		MainOverlay: PlaceHolder;
		FullScreen: PlaceHolder;
		ScreenOverlay: PlaceHolder;
		ModalOverlay: PlaceHolder;
		/**
		 * Integer number as string
		 */
		w: string;
		/**
		 * Integer number as string
		 */
		h: string;
	} & {
		scaleRatio: DisplayScaleRatio;
	};
type DisplayScaleRatio = '0.5x' | '0.75x' | '1x' | '1.25x' | '1.5x' | '1.75x' | '2x' | '2.5x';
type CmdLineSection = GenericContainerObj;
type MainMenuCnt = GenericContainerObj;
type ScrollIndicatorBox = GenericContainerObj;
type ViewBar = GenericContainerObj;
type EncoderBarContainer = GenericContainerObj;
// type ScreenOverlay = Obj<unknown, Display, any> &
// 	UILayoutGrid & {
// 		ClearUIChildren(): void;
// 		Close(): void;
// 	};
// type ModalOverlay = Obj<unknown, Display, any> &
// 	UILayoutGrid & {
// 		ClearUIChildren(): void;
// 	};
