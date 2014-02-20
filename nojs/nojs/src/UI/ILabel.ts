
declare module System {
    export module Web {
        export module UI {
            export interface ILabel extends IControl {
                Text(value?: string): string;

                HTML(value?: string): string;
                
                Link(value?: string): string;
            }
        }
    }
}