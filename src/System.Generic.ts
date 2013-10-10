/// <reference path="System.ts" />
/**
 * System.Generic
 *
 * IList, List
 */
module System {
    export module Generic {
        export interface IEnumerator<T> {
            Current: T;
            MoveNext: () => boolean;
        }
        
        export interface IEnumerable<T> {
            GetEnumerator: IEnumerator<T>;
        }
            
        export interface IList<T> {
            Count: number;
            Item: any;

            Add(element: T): void;
            Clear(): void;
            Contains(element: T): T;
        }
        
        export class List<T> implements IList<T> {
            private _list: T[];
            private _count: number;

            constructor() {
                this._count = 0;

                this._list = [];
            }

            get Count(): number {
                return this._count;
            }

            // 这个方法是不安全的
            // 因为目前还没有办法检查诸如this._list[1023] = 12这样的操作
            // 很明显,上面这个操作已经越界了
            // 但是确不会出现异常
            get Item(): T[] {
                return this._list;
            }

            Add(element: T) {
                try {
                    this._list.push(element);
                    ++this._count;
                } catch (e) {
                    throw e;
                }
            }

            Clear() {
                this._list = [];
            }

            Contains(element: T) {
                do {
                    for (var i = 0; i < this._list.length; i++) {
                        if (this._list[i] === element) return true;
                    }
                } while (0);

                return false;
            }
        }
    }
}