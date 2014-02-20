/// <reference path="../ILink.ts" />
/// <reference path="Control.ts" />
/// <reference path="../../Extends/String.ts" />

module System {
    export module Web {
        export module UI {
            export class Link extends Control implements ILink {
                constructor() {
                    super();
                }

                set Href(value: string) {
                    if (value === "") {
                        throw new ArgumentException("value", "参数不是有效的URL地址");
                    }

                    this._RootElements.find("a").attr("href", value);
                }

                get Href(): string {
                    return this._RootElements.find("a").attr("href");
                }

                set Text(value: string) {
                    this._RootElements.find("a").text(value);
                }

                get Text(): string {
                    return this._RootElements.find("a").text();
                }

                set OnClick(Callback: (Args: Events.IEventArgs) => void) {

                }

                ConstructDOM(parent: JQuery, onComplete: () => void = null): void {
                    if (this.DOMConstructed) return;

                    this._RootElements.append("<a rel=\"nojs-ui\"></a>");

                    if (String.IsNullOrEmpty(this.Href)) {
                        this.Href = "javascript:void(0)";
                    }
                    if (String.IsNullOrEmpty(this.Text)) {
                        this.Text = "Link";
                    }

                    super.ConstructDOM(parent, onComplete);
                }
            }
        }
    }
}