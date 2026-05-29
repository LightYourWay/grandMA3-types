type IndicatorButtonProps = ButtonProps & {
	colorIndicator: string | Color;
	textLeftCorner: string;
};
type IndicatorButton = UIObject & IndicatorButtonProps & ButtonSignals;
