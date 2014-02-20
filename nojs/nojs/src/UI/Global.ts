/// <reference path="impl/Control.ts" />

module System {
    export module Web {
        export module UI {
            export var OpenWindows: number = 0;

            export var JustUsedTabKeyTime: number = 0;

            export var CurrentFocusedControl: IControl = null;

            export var _currTabIndex = 0;

            export var GlobalMouseUpEvent: Events.MouseUpEvent = new Events.MouseUpEvent();

            export var GlobalMouseMoveEvent: Events.MouseMoveEvent = new Events.MouseMoveEvent();

            export var PreventTabKey: boolean = false;

            export var OnKeyDownGlobalFirst = function (jqEvent: JQueryEventObject) {
                if (jqEvent.keyCode === 9) {
                    JustUsedTabKeyTime = Date.now();
                }
                return true;
            };

            export var OnKeyDownGlobalLast = function (jqEvent: JQueryEventObject) {
                if (jqEvent.keyCode === 9) {
                    if (PreventTabKey) {
                        PreventTabKey = false;
                        Core.StopEvent(jqEvent);
                        return false;
                    }
                }

                return !jqEvent.isDefaultPrevented();
            };

            $(document).on(Control.OnMouseUpEventName, function (event: JQueryEventObject) {
                event = Core.StandardiseEvent(event);

                GlobalMouseUpEvent.Invoke(new Events.MouseUpEventArgs(null, event));

                if (!event.isPropagationStopped() && CurrentFocusedControl !== null &&
                    !$(event.target).is("input") && !$(event.target).is("select")) {
                    CurrentFocusedControl.Blur();
                }
            });
            
            $(document).on(Control.OnMouseMoveEventName, function (event) {
                {
                    event = Core.StandardiseEvent(event);
                    GlobalMouseMoveEvent.Invoke(new Events.MouseMoveEventArgs(null, event));
                }
            });

            $(document).on("keyup", function (event) {
                if (!event.isPropagationStopped() && CurrentFocusedControl !== null &&
                    event.keyCode === 27) {
                    CurrentFocusedControl.Blur();
                }
            });
        }
    }
}