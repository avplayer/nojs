/// <reference path="../IPanel.ts" />

module System {
    export module Web {
        export module UI {
            export class Panel extends Control implements IPanel {
                _layout: LayoutStyle;
                _col_width: number;
                _auto_width: boolean;

                constructor() {
                    super(); 

                    this._layout = LayoutStyle.BoxLayout;
                    this._col_width = 1;
                    this._auto_width = true;
                }

                Layout(layout: LayoutStyle, col: number): void {
                    this._layout = layout;
                    if (col) {
                        this._auto_width = false;
                        this._col_width = col;
                    }
                    if (this.DOMConstructed) {
                        // remove and add class
                    }
                }

                ConstructDOM(parent: JQuery, onComplete: () => void = null): void {
                    if (this.DOMConstructed) return;

                    if (this._layout === LayoutStyle.BoxLayout) {
                        this._RootElements = $("<div class=\"row\"></div>");
                    } else if (this._layout === LayoutStyle.FlowLayout) {
                        this._RootElements = $("<div class=\"col-md-" + this._col_width + "\" />");
                    }

                    super.ConstructDOM(parent, onComplete);

                    for (var i = 0; i < this.Controls.Count(); i++) {
                        this.Controls.ElementAt(i).ConstructDOM(this.Self, onComplete);
                    }
                }
            } // end Panel
        }
    }
}