
declare module System {
    export module Web {
        export module UI {
            export interface ILink extends IControl {
                Href: string;
                Text: string;
            }
        }
    }
}