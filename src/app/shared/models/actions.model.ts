export interface Action {
    label: string;
    function: Function;
    multiple?: boolean;
    tag?: string;
}
