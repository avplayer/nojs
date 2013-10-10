/// <reference path="System.ts" />
/**
* ģ��System.Generic
*
* ʵ�ַ���:IList, List
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
                get: // ��������ǲ���ȫ��
                // ��ΪĿǰ��û�а취�������this._list[1023] = 12�����Ĳ���
                // ������,������������Ѿ�Խ����
                // ����ȷ��������쳣
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
