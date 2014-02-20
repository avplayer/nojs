
declare module System {
    export module Events {
        export interface IEvent {
            Handlers: IEventHandle[];

            OnHandlerAttached(): void;
            OnHandlerAttachedContext: any;

            OnHandlerDettached(): void;
            OnHandlerDettachedContext: any;

            Attach(handler: IEventHandle): void;
            Detach(handler: IEventHandle): void;

            IsAttached(handler: IEventHandle): boolean;

            Invoke(args: IEventArgs);
        }
    }
}