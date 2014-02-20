/// <reference path="../System.ts" />

module System {
    export module Core {
        export class Pixel {            
            constructor(public Value: number,
                public Units: string = "px",
                public Auto: boolean = false) {

            }

            static FromString(value: string): Pixel {
                if (value === "auto") {
                    return new Pixel(0, "", true);
                } else if (value === null || value.trim() === "") {
                    return new Pixel(0, "", true);
                } else {
                    var Value = parseInt(value, 10);
                    var Units = value.indexOf("%") > -1 ? "%" : (value.indexOf("em") > -1 ? "em" : "px");

                    return new Pixel(Value, Units);
                }
            }

            ToString(): string {
                return this.Auto ? "auto" : this.Value.toString() + this.Units;
            }
        } // end class Pixel

        export var Pad = function (str, field) {
            var n = '' + str;
            var w = n.length;
            var l = field.length;
            var pad = w < l ? l - w : 0;
            return n + field.substr(0, pad);
        };

        export var GetType = function (x: any): string {
            return Object.prototype.toString.call(x);
        };

        export var IsNumber = function (x: any): boolean {
            return GetType(x) === "[object Number]";
        };

        export var IsString = function (x: any): boolean {
            return GetType(x) === "[object String]";
        };

        export var IsDate = function (x: any): boolean {
            return GetType(x) === "[object Date]";
        };

        export var IsFunction = function (x: any): boolean {
            return GetType(x) === "[object Function]";
        };

        export var IsArray = function (x: any): boolean {
            return GetType(x) === "[object Array]";
        };
    
        export var StopEvent = function (jqEvent: JQueryEventObject) {
            if (!jqEvent.keyCode || jqEvent.keyCode === 13 || jqEvent.keyCode === 8 || (jqEvent.keyCode >= 17 && jqEvent.keyCode <= 90) || (jqEvent.keyCode >= 96 && jqEvent.keyCode <= 111) || (jqEvent.keyCode >= 186 && jqEvent.keyCode <= 222)) {
                jqEvent.stopPropagation();
                jqEvent.stopImmediatePropagation();
                jqEvent.preventDefault();
            }
        }
    
        export var GetPosition = function (control: any): { top: number; left: number; } {
            var element = control.AnimationElement();

            var startPosObj = {
                top: control.Top(),
                left: control.Left()
            };
            var startPos = {
                top: 0,
                left: 0
            };

            if (startPosObj.left.Units === "%") {
                var parentWidth = element.parent().width();
                var leftPerc = startPosObj.left.Value;
                startPos.left = (leftPerc / 100) * parentWidth;
            } else {
                startPos.left = startPosObj.left.Value;
            }

            if (startPosObj.top.Units === "%") {
                var parentHeight = element.parent().height();
                var topPerc = startPosObj.top.Value;
                startPos.top = (topPerc / 100) * parentHeight;
            } else {
                startPos.top = startPosObj.top.Value;
            }

            return startPos;
        }
   
        export var GetSize = function (control: any): { width: number; height: number; } {
            var element = control.AnimationElement();

            var startPosObj = {
                width: control.Width(),
                height: control.Height()
            };

            var startPos = {
                width: 0,
                height: 0
            };

            if (startPosObj.width.Units === "%") {
                var parentWidth = element.parent().width();
                var leftPerc = startPosObj.width.Value;
                startPos.width = (leftPerc / 100) * parentWidth;
            } else {
                startPos.width = startPosObj.width.Value;
            }

            if (startPosObj.height.Units === "%") {
                var parentHeight = element.parent().height();
                var topPerc = startPosObj.height.Value;
                startPos.height = (topPerc / 100) * parentHeight;
            } else {
                startPos.height = startPosObj.height.Value;
            }

            return startPos;
        }
    
        export var RoundTo = function (x: number, multiple: number) {
            var neg = x < 0 ? -1 : 1;

            x = Math.abs(x);

            var resto = x % multiple;

            if (resto <= (multiple / 2)) {
                return (x - resto) * neg;
            } else {
                return (x + multiple - resto) * neg;
            }
        }

        export var StandardiseEvent = function (jqEvent: any): JQueryEventObject {
            if (jqEvent) {
                if (jqEvent.originalEvent) {
                    if (jqEvent.originalEvent.touches) {
                        if (jqEvent.originalEvent.touches.length > 0) {
                            jqEvent.pageX = jqEvent.originalEvent.touches[0].pageX;
                            jqEvent.pageY = jqEvent.originalEvent.touches[0].pageY;
                        }
                    }
                }
            }

            return jqEvent;
        }

        export var GetFlagsString = function (enumType: any, status: number) {
            var statuses = "";

            if (status == 0) {
                statuses = enumType[status];
            } else {
                for (var i = 1; ; i *= 2) {
                    if (!enumType[i]) {
                        break;
                    } else {
                        if ((status & i) > 0) {
                            statuses += enumType[i] + "; ";
                        }
                    }
                }
            }

            return statuses;
        };
        
        (<any>Function.prototype).Trace = function () {
            var trace = [];
            var current = this;
            while (current) {
                trace.push(current.Signature());
                current = current.caller;
            }
            return trace;
        };

        (<any>Function.prototype).Signature = function () {
            var signature = {
                name: this.GetName(),
                params: [],
                toString: function () {
                    var params = this.params.length > 0 ?
                        "'" + this.params.join("', '") + "'" : "";
		            return this.name + "(" + params + ")"
	            }
            }
            if (this.arguments) {
                for (var x = 0; x < this.arguments.length; x++)
                    signature.params.push(this.arguments[x]);
            }
            return signature;
        };

        (<any>Function.prototype).GetName = function () {
            if (this.name)
                return this.name;
            var definition = this.toString().split("\n")[0];
            var exp = /^function ([^\s(]+).+/;
            if (exp.test(definition))
                return definition.split("\n")[0].replace(exp, "$1") || "anonymous";
            return "anonymous";
        };
    }
}