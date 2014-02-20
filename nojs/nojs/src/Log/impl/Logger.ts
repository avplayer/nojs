/// <reference path="../../System.ts" />
/// <reference path="../../Core/System.Core.ts" />
/// <reference path="../ILogger.ts" />
/// <reference path="TraceType.ts" />
/// <reference path="RecoveryModes.ts" />

module System {
    export class Logger implements ILogger {
        Enabled: boolean = true;

        Logs: ILog[] = [];

        TraceTypesToShow: string[] = [
            TraceTypes[TraceTypes.Log],
            TraceTypes[TraceTypes.Common],

            TraceTypes[TraceTypes.DataTrace],
            TraceTypes[TraceTypes.ErrorTrace],
            TraceTypes[TraceTypes.LogicTrace]
        ];

        Log(log: ILog): void {
            if (this.Enabled) {
                this.Logs.push(log);

                if (this.TraceTypesToShow.indexOf(log.TraceType) > -1) {
                    var text = this._buildLog(log);
                    if (log.ErrorTrace) {
                        console.error(text);
                    } else if (log.DataTrace) {
                        console.debug(text);
                    } else {
                        console.log(text);
                    }
                }

                this.OnLog.Invoke(new Events.TextChangeEventArgs(<any>log, null));
            }
        }

        GetFullLog(): string {
            var result = "";

            for (var i = this.Logs.length - 1; i > -1; i--) {
                var log = this.Logs[i];

                if (this.TraceTypesToShow.indexOf(log.TraceType) > -1) {
                    result += this._buildLog(log);
                }
            }

            return result;
        }

        _buildLog(log: ILog): string {
            var tracePad = "                ";

            var logText = "\n";

            logText += Core.Pad(log.TraceType, tracePad) + " : ";

            var lines = log.Message.split('\n');
            logText += lines[0] + "\n";

            for (var lineNum = 1; lineNum < lines.length; lineNum++) {
                logText += tracePad + "   " + lines[lineNum].trim() + "\n";
            }

            if (log.ErrorTrace) {
                logText += "\n";

                logText += Core.Pad(log.ErrorTrace.Type, tracePad) + " : ";

                var lines = log.ErrorTrace.Message.split('\n');
                logText += lines[0] + "\n";

                for (var lineNum = 1; lineNum < lines.length; lineNum++) {
                    logText += tracePad + "   " + lines[lineNum] + "\n";
                }

                if (log.ErrorTrace.RecoveryInfo) {
                    logText += "\n";

                    logText += Core.Pad(RecoveryModes[log.ErrorTrace.RecoveryInfo.Mode], tracePad) + " : ";

                    var lines = log.ErrorTrace.RecoveryInfo.Info.split('\n');
                    logText += lines[0] + "\n";

                    for (var lineNum = 1; lineNum < lines.length; lineNum++) {
                        logText += tracePad + "   " + lines[lineNum] + "\n";
                    }
                }
            }

            if (log.DataTrace) {
                logText += "\n";

                logText += Core.Pad(log.DataTrace.Type, tracePad) + " : ";

                var lines = (log.DataTrace.Value + '').split('\n');
                logText += lines[0] + "\n";

                for (var lineNum = 1; lineNum < lines.length; lineNum++) {
                    logText += tracePad + "   " + lines[lineNum] + "\n";
                }
            }

            if (log.StackTrace) {
                logText += "\n";
                logText += Core.Pad("STACK TRACE", tracePad) + " : \n";
                logText += log.StackTrace.trim();
                logText += "\n";
            }

            logText += "\n";
            logText += "-------------------------------------------\n";

            return logText;
        }

        WriteLine(text: string) {
            console.log(text);
            this.Log({
                Message: text,
                TraceType: TraceTypes[TraceTypes.Log]
            });
        }

        OnLog: Events.TextChangeEvent = new Events.TextChangeEvent();
    }

    // 创建全局log实例
    var _nojs_logger = new Logger();
}