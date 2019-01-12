export interface AppAction {
    type: string;
    payload: any;
    resolve: () => void;
    reject: () => void;
}
