
declare module System {
    export module Web {
        export module UI {
            export interface ISelf {
                // 引用的是顶级dom元素
                Self: JQuery;
            }
        }
    }
}