
declare module System {
    export module Web {
        export module UI {
            export interface IParent {
                // 引用的是父级作用域
                Parent: any;
            }
        }
    }
}