
declare module System {
    export interface ILog {
        Message: string;

        TraceType: string;

        StackTrace?: string;

        DataTrace?: {
            Value: any;
            Type: string;
        };

        ErrorTrace?: {
            RawError: any;
            Message: string;
            Type: string;
            RecoveryInfo: {
                Mode: RecoveryModes;
                Info?: string
            };
        };
    }

    export interface ILogger {
        Enabled: boolean;

        TraceTypesToShow: string[];

        Log(log: ILog): void;

        GetFullLog(): string;

        WriteLine(text: string);

        OnLog: Events.TextChangeEvent;
    }
}