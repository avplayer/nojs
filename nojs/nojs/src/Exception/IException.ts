
declare module System {
    export interface IException {
        Message: string;
        Trace: string;
        InnerException: IException;
        ToString(): string;
    }
}