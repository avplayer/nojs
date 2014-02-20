/**
 * 
 * 列表接口
 */

declare module System {
    export module Generic {
        export interface IList<T> {
            OnModified: Events.CollectionModifiedEvent<T>;

            /**
             * 增加一个指定的元素到列表尾
             * 
             * @param object 待增加的元素
             */
            Add(object: T): void;
            
            /**
             * 增加一个列表对象到列表尾
             * 
             * @param objects 待增加的列表对象
             */
            AddRange(objects: IList<T>): void;

            /**
             * 清空列表对象
             */
            Clear(): void;

            /**
             * 创建一个快照.注意:不是深拷贝
             *
             * @return IList<T> 返回当前列表的快照
             */
            Clone(): IList<T>;
            
            /** 
             * 连接两个列表.注意:这不会修改原列表,连接后的列表通过返回值返回
             *
             * @param other 待连接列表
             *
             * @return IList<T> 返回连接后的列表 
             */
            Concat(other: IList<T>): IList<T>;
            
            /**  
             * 判断某个元素是否包含在列表中
             * 
             * @param object 待搜索元素
             *
             * @return boolean true如果找到,否则false
             */
            Contains(object: T): boolean;
           
            /**
             * 复制一个列表到另外一个列表
             *
             * @param dest 目标列表
             */
            CopyTo(dest: IList<T>): void;
            
            /**
             * 从指定位置复制一个列表到另外一个列表
             *
             * @param dest 目标列表
             * @param offset 复制起始位置
             */
            CopyTo(dest: IList<T>, offset: number): void;
            
            /**
             * 从指定位置复制指定数目到另外一个列表
             *
             * @param dest 目标列表
             * @param offset 复制起始位置
             * @param count 复制的个数
             */
            CopyTo(dest: IList<T>, offset: number, count: number): void;

            /**
             * 返回列表中元素的个数
             *             
             * @return number 集合中元素的个数
             */
            Count(): number;

            /**
             * 返回指定索引的元素
             *             
             * @return T 索引处的元素或者null如果超出范围
             */
            ElementAt(index: number): T;
            
            /**
             * 判断列表是否与指定的对象相等
             *     
             * @param object 待比较的对象
             *        
             * @return boolean 相等则返回true
             */
            Equals(object: any): boolean;

            /**
             * 返回指定元素所在的索引
             *     
             * @param object 待搜索对象
             *        
             * @return number 对象所在的列表索引或者-1如果没有找到
             */
            IndexOf(object: T): number;

            /**
             * 在指定索引处插入一个元素
             *     
             * @param object 待插入对象
             * @param index 插入位置
             */
            Insert(object: T, index: number): void;
            
            /**
             * 在指定索引处插入一个列表
             *     
             * @param object 待插入列表
             * @param index 插入位置
             */
            InsertRange(objects: IList<T>, index: number): void;

            /**
             * 从指定位置处返回一个列表
             *     
             * @param index 返回的起始位置
             */
            Range(index: number): IList<T>;

            /**
             * 从指定位置处返回一个列表
             *     
             * @param count optional 返回的个数
             * @param index 插入位置
             */
            Range(index: number, count?: number): IList<T>;

            /**
             * 删除指定的元素
             *     
             * @param object 待删除元素
             */
            Remove(object: T): void;
            
            /**
             * 删除指定的所有元素
             *     
             * @param object 待删除集合
             */
            RemoveAll(objects: IList<T>): void;
            
            /**
             * 删除指定位置的元素并返回
             *     
             * @param index 索引
             *
             * @return T 被删除的元素
             */
            RemoveAt(index: number): T;
            
            /**
             * 从指定位置删除指定个数的元素
             *     
             * @param index 起始位置
             * @param count 待删除个数
             *
             * @return IList<T> 被删除的所有元素
             */
            RemoveRange(index: number, count: number): IList<T>;

            /**
             * 反转一个列表
             *
             */
            Reverse(): void;

            /**
             * 排序
             *
             */
            Sort(): void;
            
            /**
             * 根据指定的比较函数排序
             *
             * @param comparer 谓词
             */
            Sort(comparer: IComparer): void;

            /**
             * 转换为数组
             *
             */
            ToArray(): T[];
        }
    }
}