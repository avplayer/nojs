/// <reference path="../IException.ts" />

module System {
    export class Exception implements IException {
        constructor(public Message: string = "",
            public Trace: string = "",
            public InnerException: IException = null) {
            console.log(this.ToString());
        }

        ToString(): string {
            return typeof (this) + ": " + this.Message + "\n" + this.Trace +
                (this.InnerException === null ? "" : "\nInner exception:\n" + this.InnerException.toString());
        }
    }

    export class ArgumentException extends Exception {
        constructor(public ArgumentName: string = "",
            public Trace: string = "",
            public InnerException: IException = null) {
            super("Invalid argument! Name: " + ArgumentName, Trace, InnerException);
        }
    }

    export class IncorrectTypeException extends Exception {
        constructor(public GivenType: string = "",
            public ExpectedType: string = "",
            public Trace: string = "",
            public InnerException: IException = null) {
            super("Incorrect type! Expected type " + ExpectedType + " got " + GivenType, Trace, InnerException);
        }
    }
}