/**
 * 
 * 比较接口
 */

declare module System {
    export module Generic {
        export interface IComparer {
            /**
             * 比较两个对象
             * 
             * @param x 第一个对象
             * @param y 第二个对象
             *
             * @return -1 if x < y; 0 if x == y; 1 if x > y
             */
            Compare(x: any, y: any): number;  
        }
    }
}