
declare module System {
    export module Web {
        export module UI {
            export interface IButton extends IControl, IParent {
                Text: string;
                ButtonStyle: ButtonStyle;
            }
        }
    }
}