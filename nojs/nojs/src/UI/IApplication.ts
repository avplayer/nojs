
declare module System {
    export module Web {
        export module UI {
            export interface IApplication {
                Run(args: string[]): void;
            } // end interface IApplication

            export interface IWindow {
                InitializeComponents(): void;

                Children: Generic.IList<IWindow>;

                Controls: Generic.IList<IWindow>;
            } // end interface IWindow
        }
    }
}