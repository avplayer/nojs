/// <reference path="System.ts" />
/**
 * 模块System.Core
 *
 * 这儿放公有代码和扩展代码
 */
module System {
    export module Core {
        export class Console {
            static _buffer = '';
            static _buflen = 80;

            // 立即向控制台写出一行数据
            static WriteLine(buf: any) {
                if (this._buffer.length > 0) this.Flush();

                window.console && window.console.log(buf); 
            }

            // 将数据写入到一行中
            // 需要调用Flush刷新缓冲区,缓冲区的长度为80,超过80后会被立刻输出
            // 或者下一次调用WriteLine自动刷新缓冲区
            static Write(buf: any) {
                do {
                    if (this._buffer.length >= this._buflen) {
                        this.WriteLine(this._buffer);

                        this._buffer = '';
                        break;
                    }
                    var _tmp = <string>buf;

                    if ((this._buffer.length + _tmp.length) >= this._buflen) {
                        var pos = this._buflen - this._buffer.length;

                        this._buffer += _tmp.substr(0, pos);
                        this.WriteLine(this._buffer);

                        this._buffer = _tmp.substr(pos);
                        break;
                    }

                    this._buffer += _tmp;
                } while (0);
            }

            static Flush() {
                var _tmp = this._buffer; // 避免堆栈递归调用.

                this._buffer = '';
                this.WriteLine(_tmp);                
            }
        }
    }
}