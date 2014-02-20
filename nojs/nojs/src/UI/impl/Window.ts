/// <reference path="../IApplication.ts" />
/// <reference path="../ISelf.ts" />
/// <reference path="Control.ts" />

module System {
    export module Web {
        export module UI {
            export class Window implements IWindow, IApplication, ISelf {
                public _Container: JQuery = null;

                Children: Generic.IList<IWindow> = new Generic.List<IWindow>();

                Controls: Generic.IList<IWindow> = new Generic.List<IWindow>();

                constructor() {
                      
                }

                InitializeComponents(): void {
                    this._Container = $("<div class=\"container\" />"); 
                    this._Container.appendTo("body");
                }

                public get Self(): JQuery {
                    return this._Container;
                }

                Run(args: string[] = []): void {
                    // 
                    this.InitializeComponents();
                }
            }
        }
    }
}