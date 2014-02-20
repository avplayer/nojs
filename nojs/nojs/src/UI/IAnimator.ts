
declare module System {
    export module Web {
        export module UI {
            export interface IAnimator {
                Show(Control: IControl, Callback?: () => void): void;                
                Hide(Control: IControl, Callback?: () => void): void;
            }
        }
    }
}