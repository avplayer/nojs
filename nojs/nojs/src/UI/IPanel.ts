
declare module System {
    export module Web {
        export module UI {
            export interface IPanel extends IControl {
                Layout(layout: LayoutStyle, col: number): void;
            }
        }
    }
}