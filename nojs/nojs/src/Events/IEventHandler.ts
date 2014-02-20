
declare module System {
    export module Events {
        export interface IEventHandle {
            Callback(args: IEventArgs): void;
            Context: any;
            Invoke(args: IEventArgs): void;
        }
    }
}