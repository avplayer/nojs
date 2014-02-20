
interface String {
    EndsWith(str);
    StartsWith(str);
}

module System {
    export class String {
        static IsNullOrEmpty(str: string): boolean {
            return str === undefined ? true : !!str;
        }
    }
}