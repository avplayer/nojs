/// <reference path="../../../System.ts" />
/// <reference path="../../../Core/System.Core.ts" />
/// <reference path="../../../Exception/impl/Exception.ts" />

/**
 * System.Generic
 *
 * IList, List
 */
module System {
    export module Generic {
        export class List<T> implements IList<T>
        {
            private items: any[] = [];

            OnModified: Events.CollectionModifiedEvent<T> = new Events.CollectionModifiedEvent<T>();

            constructor(obj: any = null) {
                if (obj !== null) {
                    if (Core.IsNumber(obj)) {
                        this.items = new Array<T>(<number>obj);
                    }
                    else if (Core.IsArray(obj)) {
                        this.items = (<any[]>obj).slice(0);
                    }
                    else {
                        throw new ArgumentException("obj",
                            "Components.List:constructor",
                            new IncorrectTypeException(typeof (obj),
                                "number or array",
                                "Components.List:constructor"));
                    }
                }
                else {
                    this.items = [];
                }
            }

            Add(object: T): void {
                this.items.push(object);
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Add, new List<T>([object])));
            }
            
            AddRange(objects: IList<T>): void {
                this.items.push(objects.ToArray());
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Add, objects));
            }

            Clear(): void {
                var _thisClone = this.Clone();
                this.items = [];
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Remove, _thisClone));
            }

            Clone(): IList<T> {
                return new List<T>(this.items.slice(0));
            }

            Concat(other: IList<T>): IList<T> {
                var NewList: List<T> = new List<T>(this.Count() + other.Count());
                NewList.AddRange(this);
                NewList.AddRange(other);
                return NewList;
            }

            Contains(object: T): boolean {
                return this.IndexOf(object) > -1;
            }

            CopyTo(dest: IList<T>, offset: number = 0, count: number = this.Count()): void {
                dest.AddRange(this.Range(offset, count));
            }

            Count(): number {
                return this.items.length;
            }

            ElementAt(index: number): T {
                if (index > -1 && index < this.Count()) {
                    return this.items[index];
                }
                return null;
            }
            
            Equals(object: any): boolean {
                return this === object;
            }

            IndexOf(object: T): number {
                return this.items.indexOf(object);
            }

            Insert(object: T, index: number): void {
                this.items.splice(index, 0, object);
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Add, new List<T>([object])));
            }
            
            InsertRange(objects: IList<T>, index: number): void {
                this.items.splice(index, 0, []);
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Add, new List<T>(objects)));
            }

            Range(index: number, count: number = this.Count() - index): IList<T> {
                var max = Math.min(index + count, this.Count());
                return new List<T>(this.items.slice(index, max));
            }

            Remove(object: T, event: boolean = true): void {
                var index = this.IndexOf(object);
                if (index > -1) {
                    this.items.splice(index, 1);
                    if (event) {
                        this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Remove, new List<T>([object])));
                    }
                }
            }
           
            RemoveAll(objects: IList<T>): void {
                for (var i = 0; i < objects.Count(); i++) {
                    this.Remove(objects.ElementAt(i), false);
                }
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Remove, objects));
            }
            
            RemoveAt(index: number): T {
                var x = this.items.splice(index, 1)[0];
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Remove, new List<T>([x])));
                return x;
            }
            
            RemoveRange(index: number, count: number): IList<T> {
                count = Math.min(count, this.Count());
                var ReturnList: List<T> = new List<T>(this.items.splice(index, count));
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Remove, ReturnList));
                return ReturnList;
            }

            Reverse(): void {
                this.items = this.items.reverse();
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Reorder, this));
            }

            Sort(comparer: IComparer = new ToStringComparer()): void {
                this.items = this.items.sort(comparer.Compare);
                this.OnModified.Invoke(new Events.CollectionModifiedEventArgs(this, Events.CollectionModifications.Reorder, this));
            }

            ToArray(): T[] {
                return this.items.slice(0);
            }
        }
    }
}