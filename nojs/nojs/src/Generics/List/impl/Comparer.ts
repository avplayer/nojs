
/// <reference path="../IComparer.ts" />

module System {
    export module Generic {
        export class ToStringComparer implements IComparer {
            Compare(x: any, y: any): number {
                return x.toString().localCompare(y.toString());
            }
        }
    }
}