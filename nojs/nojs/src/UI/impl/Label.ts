/// <reference path="../ILabel.ts" />
/// <reference path="Control.ts" />

module System {
    export module Web {
        export module UI {
            export class Label extends Control implements ILabel {
                constructor(text: string = null) {
                    super();

                    this.Text(text || " ");

                    //this.OnClick.Attach(new Events.ClickEventHandler(this._This_Clicked, this));
                }

                _This_Clicked(eventArgs: Events.ClickEventArgs) {
                    if (this.Focusable()) {
                        this.Focus();
                    }
                }

                Text(value: string = null): string {
                    if (value !== null) {
                        value = value.replace("\n", "<br />");
                        this._RootElements.html(value);
                    }
                    return this._RootElements.text();
                }
                HTML(value: string = null): string {
                    if (value !== null) {
                        this._RootElements.html(value);
                    }
                    return this._RootElements.html();
                }
                _Focusable_AddedByLink: boolean = false;
                Link(value: string = null): string {
                    if (value !== null) {
                        if (value === "") {
                            this.Text(this.Text());

                            if (this._Focusable && this._Focusable_AddedByLink) {
                                this.Focusable(false);
                            }
                        } else {
                            var text = this.Text();
                            var newHTML = "<a href=\"" + value + "\" target=\"_blank\">" + text + "</a>";
                            this.HTML(newHTML);

                            if (!this._Focusable) {
                                this.Focusable(true);
                                this._Focusable_AddedByLink = true;
                            }
                        }
                    }
                    var elem = this._RootElements.find("a");
                    var retVal = null;
                    if (elem.length > 0) {
                        retVal = elem.first().attr("href");
                    }
                    return retVal;
                }

                ConstructDOM(parent: JQuery, onComplete: () => void = null): void {
                    super.ConstructDOM(parent, onComplete);
                }

                set OnClick(Callback: (Args: Events.IEventArgs) => void) {

                }

                Focusable(value: boolean = null): boolean {
                    var result = super.Focusable(value);
                    if (value !== null) {
                        this._Focusable_AddedByLink = false;
                    }
                    return result;
                }

                InvokeDefaultAction(): void {
                    var link = this.Link();
                    if (link !== null) {
                        //OpenInNewWindow(link);
                    } else {
                        this._RootElements.click();
                    }
                }
            } // end class label
        }
    }
}