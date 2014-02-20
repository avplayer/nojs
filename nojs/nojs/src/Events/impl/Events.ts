/// <reference path="../../System.ts" />
/// <reference path="../IEvent.ts" />
/// <reference path="../IEventArgs.ts" />
/// <reference path="../IEventHandler.ts" />
/// <reference path="CollectionModifications.ts" />

module System {
    export module Events {
        export class Event implements IEvent {
            Handlers: IEventHandle[] = [];

            OnHandlerAttached: () => void = null;
            OnHandlerAttachedContext: any = null;

            OnHandlerDettached: () => void = null;
            OnHandlerDettachedContext: any = null;

            Attach(handler: IEventHandle): void {
                if (!this.IsAttached(handler)) {
                    this.Handlers.push(handler);

                    if (this.OnHandlerAttached !== null) {
                        this.OnHandlerAttached.call(this.OnHandlerAttachedContext);
                    }
                }
            }

            Detach(handler: IEventHandle): void {
                if (this.IsAttached(handler)) {
                    this.Handlers.splice(this.Handlers.indexOf(handler), 1);

                    if (this.OnHandlerDettached !== null) {
                        this.OnHandlerDettached.call(this.OnHandlerDettachedContext);
                    }
                }
            }

            IsAttached(handler: IEventHandle): boolean {
                return this.Handlers.indexOf(handler) > -1;
            }

            Invoke(args: IEventArgs): any {
                for (var i = 0; i < this.Handlers.length; ++i) {
                    this.Handlers[i].Invoke(args);
                }
            }         
        } // end class Event

        export class EventHandler implements IEventHandle {
            constructor(public Callback: (args: IEventArgs) => void, public Context: any) {

            }

            Invoke(args: IEventArgs): void {
                this.Callback.call(this.Context, args); // 在当前上下文环境下调用回调函数
            }
        } // end class EventHandler

        export class EventArgs implements IEventArgs {
            constructor(public Sender: any) {

            }
        } // end class EventArgs

        ////////////////////////////////////////////////
        // 各种事件
        ////////////////////////////////////////////////
        export class ClickEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class ClickEventArgs

        export class ClickEventHandler extends EventHandler {
            constructor(public Callback: (args: ClickEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: ClickEventArgs) {
                super.Invoke(args);
            }
        } // end class ClickEventHandler

        // 鼠标单击事件
        export class ClickEvent extends Event {
            Handlers: ClickEventHandler[] = [];

            Attach(handler: ClickEventHandler): void {
                super.Attach(handler);
            }

            Detach(handler: ClickEventHandler): void {
                super.Detach(handler);
            }

            IsAttached(handler: ClickEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: ClickEventArgs) {
                super.Invoke(args);
            }
        } // end class ClickEvent
        // 结束鼠标单击事件

        // 鼠标按下事件  
        export class MouseDownEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseDownEventArgs              

        export class MouseDownEventHandler extends EventHandler {
            constructor(public Callback: (args: MouseDownEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: MouseDownEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseDownEventHandler

        export class MouseDownEvent extends Event {
            Handlers: MouseDownEventHandler[] = [];

            Attach(handler: MouseDownEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: MouseDownEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: MouseDownEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: MouseDownEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseDownEvent
        // 结束鼠标按下事件

        // 鼠标弹起事件  
        export class MouseUpEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class MouseUpEventHandler extends EventHandler {
            constructor(public Callback: (args: MouseUpEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: MouseDownEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class MouseUpEvent extends Event {
            Handlers: MouseUpEventHandler[] = [];

            Attach(handler: MouseUpEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: MouseUpEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: MouseUpEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: MouseUpEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // 结束鼠标弹起事件

        // MouseMoveEvent  
        export class MouseMoveEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class MouseMoveEventHandler extends EventHandler {
            constructor(public Callback: (args: MouseMoveEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: MouseMoveEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class MouseMoveEvent extends Event {
            Handlers: MouseMoveEventHandler[] = [];

            Attach(handler: MouseMoveEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: MouseMoveEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: MouseMoveEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: MouseMoveEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // 结束MouseMoveEvent

        // SplitterMoveEvent
        export class SplitterMoveEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class SplitterMoveEventHandler extends EventHandler {
            constructor(public Callback: (args: SplitterMoveEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: SplitterMoveEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class SplitterMoveEvent extends Event {
            Handlers: SplitterMoveEventHandler[] = [];

            Attach(handler: SplitterMoveEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: SplitterMoveEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: SplitterMoveEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: SplitterMoveEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end SplitterMoveEvent

        // OrientationChangedEvent
        export class OrientationChangedEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class OrientationChangedEventHandler extends EventHandler {
            constructor(public Callback: (args: OrientationChangedEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: OrientationChangedEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class OrientationChangedEvent extends Event {
            Handlers: OrientationChangedEventHandler[] = [];

            Attach(handler: OrientationChangedEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: OrientationChangedEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: OrientationChangedEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: OrientationChangedEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end OrientationChangedEvent

        // ResizeEvent
        export class ResizeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class ResizeEventHandler extends EventHandler {
            constructor(public Callback: (args: ResizeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: ResizeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class ResizeEvent extends Event {
            Handlers: ResizeEventHandler[] = [];

            Attach(handler: ResizeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: ResizeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: ResizeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: ResizeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end ResizeEvent

        // MoveEvent
        export class MoveEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class MoveEventHandler extends EventHandler {
            constructor(public Callback: (args: MoveEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: MoveEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class MoveEvent extends Event {
            Handlers: MoveEventHandler[] = [];

            Attach(handler: MoveEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: MoveEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: MoveEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: MoveEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end MoveEvent

        // CheckedChangeEvent
        export class CheckedChangeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class CheckedChangeEventHandler extends EventHandler {
            constructor(public Callback: (args: CheckedChangeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: CheckedChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class CheckedChangeEvent extends Event {
            Handlers: CheckedChangeEventHandler[] = [];

            Attach(handler: CheckedChangeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: CheckedChangeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: CheckedChangeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: CheckedChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end CheckedChangeEvent

        // TextChangeEvent
        export class TextChangeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class TextChangeEventHandler extends EventHandler {
            constructor(public Callback: (args: TextChangeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: TextChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class TextChangeEvent extends Event {
            Handlers: TextChangeEventHandler[] = [];

            Attach(handler: TextChangeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: TextChangeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: TextChangeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: TextChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end TextChangeEvent

        // CloseEvent
        export class CloseEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class CloseEventHandler extends EventHandler {
            constructor(public Callback: (args: CloseEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: CloseEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class CloseEvent extends Event {
            Handlers: CloseEventHandler[] = [];

            Attach(handler: CloseEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: CloseEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: CloseEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: CloseEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end CloseEvent

        // ShowEvent
        export class ShowEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class ShowEventHandler extends EventHandler {
            constructor(public Callback: (args: ShowEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: ShowEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class ShowEvent extends Event {
            Handlers: ShowEventHandler[] = [];

            Attach(handler: ShowEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: ShowEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: ShowEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: ShowEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end ShowEvent

        // HideEvent
        export class HideEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class HideEventHandler extends EventHandler {
            constructor(public Callback: (args: HideEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: HideEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class HideEvent extends Event {
            Handlers: HideEventHandler[] = [];

            Attach(handler: HideEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: HideEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: HideEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: HideEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end HideEventArgs

        // FocusEvent
        export class FocusEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class FocusEventHandler extends EventHandler {
            constructor(public Callback: (args: FocusEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: FocusEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class FocusEvent extends Event {
            Handlers: FocusEventHandler[] = [];

            Attach(handler: FocusEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: FocusEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: FocusEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: FocusEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end FocusEvent

        // BlurEvent
        export class BlurEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class BlurEventHandler extends EventHandler {
            constructor(public Callback: (args: BlurEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: BlurEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class BlurEvent extends Event {
            Handlers: BlurEventHandler[] = [];

            Attach(handler: BlurEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: BlurEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: BlurEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: BlurEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end BlurEvent

        // KeyDownEvent
        export class KeyDownEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class KeyDownEventHandler extends EventHandler {
            constructor(public Callback: (args: KeyDownEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: KeyDownEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class KeyDownEvent extends Event {
            Handlers: KeyDownEventHandler[] = [];

            Attach(handler: KeyDownEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: KeyDownEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: KeyDownEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: KeyDownEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end KeyDownEvent

        // KeyPressEvent
        export class KeyPressEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class KeyPressEventHandler extends EventHandler {
            constructor(public Callback: (args: KeyPressEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: KeyPressEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class KeyPressEvent extends Event {
            Handlers: KeyPressEventHandler[] = [];

            Attach(handler: KeyPressEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: KeyPressEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: KeyPressEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: KeyPressEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end KeyPressEvent

        // KeyUpEvent
        export class KeyUpEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class KeyUpEventHandler extends EventHandler {
            constructor(public Callback: (args: KeyUpEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: KeyUpEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class KeyUpEvent extends Event {
            Handlers: KeyUpEventHandler[] = [];

            Attach(handler: KeyUpEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: KeyUpEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: KeyUpEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: KeyUpEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end KeyUpEvent

        // ListItemTextChangeEvent
        export class ListItemTextChangeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class ListItemTextChangeEventHandler extends EventHandler {
            constructor(public Callback: (args: ListItemTextChangeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: ListItemTextChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class ListItemTextChangeEvent extends Event {
            Handlers: ListItemTextChangeEventHandler[] = [];

            Attach(handler: ListItemTextChangeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: ListItemTextChangeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: ListItemTextChangeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: ListItemTextChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end ListItemTextChangeEvent

        // SelectedIndexChangeEvent
        export class SelectedIndexChangeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class SelectedIndexChangeEventHandler extends EventHandler {
            constructor(public Callback: (args: SelectedIndexChangeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: SelectedIndexChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class SelectedIndexChangeEvent extends Event {
            Handlers: SelectedIndexChangeEventHandler[] = [];

            Attach(handler: SelectedIndexChangeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: SelectedIndexChangeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: SelectedIndexChangeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: SelectedIndexChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end SelectedIndexChangeEvent

        // ValueChangeEvent
        export class ValueChangeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class ValueChangeEventHandler extends EventHandler {
            constructor(public Callback: (args: ValueChangeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: ValueChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class ValueChangeEvent extends Event {
            Handlers: ValueChangeEventHandler[] = [];

            Attach(handler: ValueChangeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: ValueChangeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: ValueChangeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: ValueChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end ValueChangeEvent

        // NameChangeEvent
        export class NameChangeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class NameChangeEventHandler extends EventHandler {
            constructor(public Callback: (args: NameChangeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: NameChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class NameChangeEvent extends Event {
            Handlers: NameChangeEventHandler[] = [];

            Attach(handler: NameChangeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: NameChangeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: NameChangeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: NameChangeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end NameChangeEvent

        // SelectionMadeEvent
        export class SelectionMadeEventArgs extends EventArgs {
            constructor(public Sender: System.Web.UI.IControl, public e: JQueryEventObject) {
                super(Sender);
            }
        } // end class MouseUpEventArgs              

        export class SelectionMadeEventHandler extends EventHandler {
            constructor(public Callback: (args: SelectionMadeEventArgs) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: SelectionMadeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEventHandler

        export class SelectionMadeEvent extends Event {
            Handlers: SelectionMadeEventHandler[] = [];

            Attach(handler: SelectionMadeEventHandler) {
                super.Attach(handler);
            }

            Detach(handler: SelectionMadeEventHandler) {
                super.Detach(handler);
            }

            IsAttached(handler: SelectionMadeEventHandler): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: SelectionMadeEventArgs) {
                super.Invoke(args);
            }
        } // end class MouseUpEvent
        // end SelectionMadeEvent

        // CollectionModifiedEventArgs
        export class CollectionModifiedEventArgs<T> extends EventArgs {
            constructor(public Sender: Generic.IList<T>,
                public Modification: CollectionModifications,
                public ModifiedElements: Generic.IList<T>) {
                super(Sender);
            }
        }

        export class CollectionModifiedEventHandler<T> extends EventHandler {
            constructor(public Callback: (args: CollectionModifiedEventArgs<T>) => void, public Context: any) {
                super(Callback, Context);
            }

            Invoke(args: CollectionModifiedEventArgs<T>) {
                super.Invoke(args);
            }
        }

        export class CollectionModifiedEvent<T> extends Event {
            Handlers: CollectionModifiedEventHandler<T>[] = [];

            Attach(handler: CollectionModifiedEventHandler<T>): void {
                super.Attach(handler);
            }
            Detach(handler: CollectionModifiedEventHandler<T>): void {
                super.Detach(handler);
            }

            IsAttached(handler: CollectionModifiedEventHandler<T>): boolean {
                return super.IsAttached(handler);
            }

            Invoke(args: Events.CollectionModifiedEventArgs<T>) {
                super.Invoke(args);
            }
        }
        // end CollectionModifiedEvent

    }
}
