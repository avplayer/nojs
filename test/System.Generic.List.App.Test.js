/// <reference path="System.ts" />
/**
* 模块System.Core
*
* 这儿放公有代码和扩展代码
*/
var System;
(function (System) {
    (function (Core) {
        var Console = (function () {
            function Console() {
            }
            Console.WriteLine = // 立即向控制台写出一行数据
            function (buf) {
                if (this._buffer.length > 0)
                    this.Flush();

                window.console && window.console.log(buf);
            };

            Console.Write = // 将数据写入到一行中
            // 需要调用Flush刷新缓冲区,缓冲区的长度为80,超过80后会被立刻输出
            // 或者下一次调用WriteLine自动刷新缓冲区
            function (buf) {
                do {
                    if (this._buffer.length >= this._buflen) {
                        this.WriteLine(this._buffer);

                        this._buffer = '';
                        break;
                    }
                    var _tmp = buf;

                    if ((this._buffer.length + _tmp.length) >= this._buflen) {
                        var pos = this._buflen - this._buffer.length;

                        this._buffer += _tmp.substr(0, pos);
                        this.WriteLine(this._buffer);

                        this._buffer = _tmp.substr(pos);
                        break;
                    }

                    this._buffer += _tmp;
                } while(0);
            };

            Console.Flush = function () {
                var _tmp = this._buffer;

                this._buffer = '';
                this.WriteLine(_tmp);
            };
            Console._buffer = '';
            Console._buflen = 80;
            return Console;
        })();
        Core.Console = Console;
    })(System.Core || (System.Core = {}));
    var Core = System.Core;
})(System || (System = {}));
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
                this._index = -1;
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

            // 实现迭代器操作.
            List.prototype.GetEnumerator = function () {
                this._index = -1;
                var _this = this;

                return {
                    get Current() {
                        if (_this._index === -1)
                            return undefined;

                        return _this._list[_this._index];
                    },
                    MoveNext: function () {
                        ++_this._index;

                        if (_this._index < _this._count)
                            return true;

                        return false;
                    }
                };
            };

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
/// <reference path="../src/System.ts" />
/// <reference path="../src/System.Core.ts" />
/// <reference path="../src/System.Generic.ts" />
// 定义using
var Console = System.Core.Console;

var list = new System.Generic.List();

list.Add("a");
list.Add("b");

Console.WriteLine(list.Count);

var iter = list.GetEnumerator();

while (iter.MoveNext()) {
    Console.Write(iter.Current + ' ');
}

if (list.Contains("a")) {
    Console.WriteLine("list contains element [a]");
}
