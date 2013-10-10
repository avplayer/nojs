/// <reference path="System.ts" />
/**
* System.Generic
*
* IList, List
*/
var System;
(function (System) {
    (function (Generic) {
        var List = (function () {
            function List() {
                this._count = 0;

                this._list = [];
            }
            Object.defineProperty(List.prototype, "Count", {
                get: function () {
                    return this._count;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(List.prototype, "Item", {
                get: // 这个方法是不安全的
                // 因为目前还没有办法检查诸如this._list[1023] = 12这样的操作
                // 很明显,上面这个操作已经越界了
                // 但是确不会出现异常
                function () {
                    return this._list;
                },
                enumerable: true,
                configurable: true
            });

            List.prototype.Add = function (element) {
                try  {
                    this._list.push(element);
                    ++this._count;
                } catch (e) {
                    throw e;
                }
            };

            List.prototype.Clear = function () {
                this._list = [];
            };

            List.prototype.Contains = function (element) {
                do {
                    for (var i = 0; i < this._list.length; i++) {
                        if (this._list[i] === element)
                            return true;
                    }
                } while(0);

                return false;
            };
            return List;
        })();
        Generic.List = List;
    })(System.Generic || (System.Generic = {}));
    var Generic = System.Generic;
})(System || (System = {}));
