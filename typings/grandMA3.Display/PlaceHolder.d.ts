type PlaceHolderProps = ObjProps;

type PlaceHolder = Obj<'PlaceHolder', Display> &
	UIObject &
	PlaceHolderProps & {
		ClearUIChildren(): void;
		Close(this: void): void;
		ScrollBarH: ScrollBarH;
		ScrollBarV: ScrollBarV;
	};

type ModalPlaceholder = PlaceHolder;
type PopupPlaceholder = PlaceHolder;
