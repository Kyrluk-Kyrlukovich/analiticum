export interface StateTypes {
	isOpen: boolean;
	view: object;
	actions?: ActionType[];
	header: string;
}

export interface ActionType {
	label: string;
	callback: Function;
}
