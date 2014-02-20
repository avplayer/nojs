/// <reference path="../IButton.ts" />
/// <reference path="../ILabel.ts" />
/// <reference path="../ILink.ts" />
/// <reference path="../IParent.ts" />
/// <reference path="ControlStyle.ts" />
/// <reference path="Link.ts" />
/// <reference path="Control.ts" />
/// <reference path="Link.ts" />

module System {
    export module Web {
        export module UI {     
            export class Button extends Control implements IButton {
                private _BtnType: ButtonStyle;
                private _Link: ILink;
                private _BtnTypeMap: string[] =
                    ["btn-default", "btn-primary", "btn-success",
                        "btn-info", "btn-warning", "btn-danger", "btn-link"];

                constructor() {
                    super();

                    this._BtnType = ButtonStyle.Default;
                    this._Link = new Link();
                    this.Children.Add(this._Link);

                    this.Focusable(true);
                }

                public set Text(value: string) {
                    this._Link.Text = value;
                }

                public get Text(): string {
                    return this._Link.Text;
                }

                public set Parent(value: any) {
                    this.__Parent = value;
                }

                public set ButtonStyle(value: ButtonStyle) {   
                    this._Link.RemoveClass(this._BtnTypeMap[this._BtnType]);
                    this._Link.AddClass(this._BtnTypeMap[value]);

                    this._BtnType = value;
                }

                set OnClick(Callback: (Args: Events.IEventArgs) => void) {
                    this.__OnClick.Attach(new Events.ClickEventHandler(Callback, this.__Parent));
                }

                InvokeDefaultAction(): void {
                    this._RootElements.click();
                }

                ConstructDOM(parent: JQuery, onComplete: () => void = null): void {  
                    if (this.DOMConstructed) return;
                                      
                    super.ConstructDOM(parent, onComplete);

                    this._Link.AddClass("btn");
                    this._Link.AddClass(this._BtnTypeMap[this._BtnType]);
                }

                InitializeComponents(scope: ISelf, onComplete?: () => void): void {
                    this.Parent = scope;
                    this.ConstructDOM(scope.Self, onComplete);
                }
            } // end class Button
        }
    }
}
