/// <reference path="../../System.ts" />
/// <reference path="../IControl.ts" />
/// <reference path="../../Definitions/jquery.d.ts" />
/// <reference path="../../Events/IEvent.ts" />
/// <reference path="../../Events/impl/Events.ts" />
/// <reference path="../../Generics/List/impl/List.ts" />
/// <reference path="../Global.ts" />
/// <reference path="../../Definitions/jquery.d.ts" />
/// <reference path="Animator.ts" />

module System {
    export module Web {
        export module UI {
            var __GuidGenerator = 0;
            export class Control implements IControl {
                _Guid: number = __GuidGenerator++;

                _RootElements: JQuery = null;
                AnimationElement(): JQuery {
                    return this._RootElements;
                }

                __Parent: any = null;

                __OnClick: Events.ClickEvent = new Events.ClickEvent();
                __OnMouseDown: Events.MouseDownEvent = new Events.MouseDownEvent();
                __OnMouseUp: Events.MouseUpEvent = new Events.MouseUpEvent();
                __OnMouseMove: Events.MouseMoveEvent = new Events.MouseMoveEvent();
                __OnResize: Events.ResizeEvent = new Events.ResizeEvent();
                __OnMove: Events.MoveEvent = new Events.MoveEvent();
                __OnShow: Events.ShowEvent = new Events.ShowEvent();
                __OnHide: Events.HideEvent = new Events.HideEvent();
                __OnFocus: Events.FocusEvent = new Events.FocusEvent();
                __OnBlur: Events.BlurEvent = new Events.BlurEvent();
                __OnKeyDown: Events.KeyDownEvent = new Events.KeyDownEvent();
                __OnKeyPress: Events.KeyPressEvent = new Events.KeyPressEvent();
                __OnKeyUp: Events.KeyUpEvent = new Events.KeyUpEvent();

                static OnClickEventName: string = "click";
                static OnMouseDownEventName: string = "mousedown touchstart";
                static OnMouseUpEventName: string = "mouseup touchend";
                static OnMouseMoveEventName: string = "mousemove touchmove";

                TargetDocumentForMouseUp: boolean = true;
                TargetDocumentForMouseMove: boolean = true;

                Children: Generic.IList<IControl> = new Generic.List<IControl>();
                Controls: Generic.IList<IControl> = new Generic.List<IControl>();

                _Enabled: boolean = true;

                OptimiseConstructForGraphics: boolean = false;
                static OptimiseConstructForGraphicsDelayTime = 30;

                constructor() {
                    this.__OnClick.OnHandlerAttachedContext = this.__OnClick.OnHandlerDettachedContext = this;
                    this.__OnClick.OnHandlerAttached = this.__OnClick.OnHandlerDettached = this._OnOnClickChanged;

                    this.__OnMouseDown.OnHandlerAttachedContext = this.__OnMouseDown.OnHandlerDettachedContext = this;
                    this.__OnMouseDown.OnHandlerAttached = this.__OnMouseDown.OnHandlerDettached = this._OnOnMouseDownChanged;

                    this.__OnMouseUp.OnHandlerAttachedContext = this.__OnMouseUp.OnHandlerDettachedContext = this;
                    this.__OnMouseUp.OnHandlerAttached = this.__OnMouseUp.OnHandlerDettached = this._OnOnMouseUpChanged;

                    this.__OnMouseMove.OnHandlerAttachedContext = this.__OnMouseMove.OnHandlerDettachedContext = this;
                    this.__OnMouseMove.OnHandlerAttached = this.__OnMouseMove.OnHandlerDettached = this._OnOnMouseMoveChanged;

                    this.__OnResize.OnHandlerAttachedContext = this.__OnResize.OnHandlerDettachedContext = this;
                    this.__OnResize.OnHandlerAttached = this.__OnResize.OnHandlerDettached = this._OnOnResizeChanged;

                    this.__OnMove.OnHandlerAttachedContext = this.__OnMove.OnHandlerDettachedContext = this;
                    this.__OnMove.OnHandlerAttached = this.__OnMove.OnHandlerDettached = this._OnOnMoveChanged;

                    this.__OnKeyPress.OnHandlerAttachedContext = this.__OnKeyPress.OnHandlerDettachedContext = this;
                    this.__OnKeyPress.OnHandlerAttached = this.__OnKeyPress.OnHandlerDettached = this._OnOnKeyPressChanged;

                    this.__OnKeyUp.OnHandlerAttachedContext = this.__OnKeyUp.OnHandlerDettachedContext = this;
                    this.__OnKeyUp.OnHandlerAttached = this.__OnKeyUp.OnHandlerDettached = this._OnOnKeyUpChanged;

                    this.__OnResize.Attach(new Events.ResizeEventHandler(this._This_Resized_ChainHandler, this));
                    this.__OnMove.Attach(new Events.MoveEventHandler(this._This_Moved_ChainHandler, this));

                    this._RootElements = $("<div style=\""
                        + "display: inline-block;outline: none;\"" + "></div>");

                    this.DisableSelection();

                    this.Children.OnModified.Attach(new Events.CollectionModifiedEventHandler<IControl>(this._OnChildren_Modified, this));
                    this.Controls.OnModified.Attach(new Events.CollectionModifiedEventHandler<IControl>(this._OnControl_Modified, this));
                }

                set OnClick(Callback: (Args: Events.IEventArgs) => void) { }
                set OnMouseDown(Callback: (Args: Events.IEventArgs) => void) { }
                set OnMouseUp(Callback: (Args: Events.IEventArgs) => void) { }
                set OnMouseMove(Callback: (Args: Events.IEventArgs) => void) { }
                set OnResize(Callback: (Args: Events.IEventArgs) => void) { }
                set OnMove(Callback: (Args: Events.IEventArgs) => void) { }
                set OnShow(Callback: (Args: Events.IEventArgs) => void) { }
                set OnHide(Callback: (Args: Events.IEventArgs) => void) { }
                set OnFocus(Callback: (Args: Events.IEventArgs) => void) { }
                set OnBlur(Callback: (Args: Events.IEventArgs) => void) { }
                set OnKeyDown(Callback: (Args: Events.IEventArgs) => void) { }
                set OnKeyPress(Callback: (Args: Events.IEventArgs) => void) { }
                set OnKeyUp(Callback: (Args: Events.IEventArgs) => void) { }

                _RestoreThis(jqEvent: JQueryEventObject) {
                    return jqEvent.data._callback.call(jqEvent.data._this, jqEvent);
                }

                _OnClickAttached: boolean = false;
                _OnOnClickChanged() {
                    if (this.DOMConstructed) {
                        if (this.__OnClick.Handlers.length > 0 && !this._OnClickAttached) {
                            this._OnClickAttached = true;
                            this._RootElements.find("[rel='nojs-ui']").on(Control.OnClickEventName, { _this: this, _callback: this._OnClick }, this._RestoreThis);
                        } else if (this._OnClickAttached) {
                            this._OnClickAttached = false;
                            this._RootElements.find("[rel='nojs-ui']").off(Control.OnClickEventName, this._RestoreThis);
                        }
                    }
                }
                _OnClick(jqEvent: JQueryEventObject) {
                    if (this.ActuallyEnabled()) {
                        this.__OnClick.Invoke(new Events.ClickEventArgs(this, jqEvent));
                    }
                }

                _OnMouseDownAttached: boolean = false;
                _OnOnMouseDownChanged() {
                    if (this.DOMConstructed) {
                        if (this.__OnMouseDown.Handlers.length > 0 && !this._OnMouseDownAttached) {
                            this._OnMouseDownAttached = true;
                            this._RootElements.find("[rel='nojs-ui']").on(Control.OnMouseDownEventName, { _this: this, _callback: this._OnMouseDown }, this._RestoreThis);
                        } else if (this._OnMouseDownAttached) {
                            this._OnMouseDownAttached = false;
                            this._RootElements.find("[rel='nojs-ui']").off(Control.OnMouseDownEventName, this._RestoreThis);
                        }
                    }
                }
                _OnMouseDown(jqEvent: JQueryEventObject) {
                    if (this.ActuallyEnabled()) {
                        jqEvent = Core.StandardiseEvent(jqEvent);
                        this.__OnMouseDown.Invoke(new Events.MouseDownEventArgs(this, jqEvent));
                    }
                }
                _OnMouseUpAttached: boolean = false;
                _OnMouseUp_GlobalHandler: Events.MouseUpEventHandler = null;
                _OnOnMouseUpChanged() {
                    if (this.DOMConstructed) {
                        if (this.TargetDocumentForMouseUp) {
                            if (this.__OnMouseUp.Handlers.length > 0 && !this._OnMouseUpAttached) {
                                this._OnMouseUpAttached = true;
                                this._OnMouseUp_GlobalHandler = new Events.MouseUpEventHandler(function (args: Events.MouseUpEventArgs) {
                                    this.OnMouseUp.Invoke(new Events.MouseUpEventArgs(this, args.e));
                                }, this);
                                GlobalMouseUpEvent.Attach(this._OnMouseUp_GlobalHandler);
                            } else if (this._OnMouseUpAttached) {
                                this._OnMouseUpAttached = false;
                                GlobalMouseUpEvent.Detach(this._OnMouseUp_GlobalHandler);
                            }
                        } else {
                            if (this.__OnMouseUp.Handlers.length > 0 && !this._OnMouseUpAttached) {
                                this._OnMouseUpAttached = true;
                                this._RootElements.find("[rel='nojs-ui']").on(Control.OnMouseUpEventName, { _this: this, _callback: this._OnMouseUp }, this._RestoreThis);
                            } else if (this._OnMouseUpAttached) {
                                this._OnMouseUpAttached = false;
                                this._RootElements.find("[rel='nojs-ui']").off(Control.OnMouseUpEventName, this._RestoreThis);
                            }
                        }
                    }
                }
                _OnMouseUp(jqEvent: JQueryEventObject) {
                    if (this.ActuallyEnabled()) {
                        this.__OnMouseUp.Invoke(new Events.MouseUpEventArgs(this, jqEvent));
                    }
                }
                _OnMouseMoveAttached: boolean = false;
                _OnMouseMove_GlobalHandler: Events.MouseMoveEventHandler = null;
                _OnOnMouseMoveChanged() {
                    if (this.DOMConstructed) {
                        if (this.TargetDocumentForMouseMove) {
                            if (this.__OnMouseMove.Handlers.length > 0 && !this._OnMouseMoveAttached) {
                                this._OnMouseMoveAttached = true;
                                this._OnMouseMove_GlobalHandler = new Events.MouseMoveEventHandler(function (args: Events.MouseMoveEventArgs) {
                                    this.OnMouseMove.Invoke(new Events.MouseMoveEventArgs(this, args.e));
                                }, this);
                                GlobalMouseMoveEvent.Attach(this._OnMouseMove_GlobalHandler);
                            } else if (this._OnMouseMoveAttached) {
                                this._OnMouseMoveAttached = false;
                                GlobalMouseMoveEvent.Detach(this._OnMouseMove_GlobalHandler);
                            }
                        } else {
                            if (this.__OnMouseMove.Handlers.length > 0 && !this._OnMouseMoveAttached) {
                                this._OnMouseMoveAttached = true;
                                this._RootElements.find("[rel='nojs-ui']").on(Control.OnMouseMoveEventName, { _this: this, _callback: this._OnMouseMove }, this._RestoreThis);
                            } else if (this._OnMouseMoveAttached) {
                                this._OnMouseMoveAttached = false;
                                this._RootElements.find("[rel='nojs-ui']").off(Control.OnMouseMoveEventName, this._RestoreThis);
                            }
                        }
                    }
                }
                _OnMouseMove(jqEvent: JQueryEventObject) {
                    if (this.ActuallyEnabled()) {
                        this.__OnMouseMove.Invoke(new Events.MouseMoveEventArgs(this, jqEvent));
                    }
                }
                _OnResizeAttached: boolean = false;
                _OnOnResizeChanged() {
                    if (this.DOMConstructed) {
                        if (this.__OnResize.Handlers.length > 0 && !this._OnResizeAttached) {
                            this._OnResizeAttached = true;
                            $(window).on("resize", { _this: this, _callback: this._OnResize }, this._RestoreThis);
                        } else if (this._OnResizeAttached) {
                            this._OnResizeAttached = false;
                            $(window).off("resize", this._RestoreThis);
                        }
                    }
                }
                _OnResize(jqEvent: JQueryEventObject) {
                    this.__OnResize.Invoke(new Events.ResizeEventArgs(this, jqEvent));
                }
                _OnMoveAttached: boolean = false;
                _OnOnMoveChanged() {
                    if (this.DOMConstructed) {
                        if (this.__OnMove.Handlers.length > 0 && !this._OnMoveAttached) {
                            this._OnMoveAttached = true;
                            $(window).on("resize", { _this: this, _callback: this._OnMove }, this._RestoreThis);
                        } else if (this._OnMoveAttached) {
                            this._OnMoveAttached = false;
                            $(window).off("resize", this._RestoreThis);
                        }
                    }
                }
                _OnMove(jqEvent: JQueryEventObject) {
                    this.__OnMove.Invoke(new Events.MoveEventArgs(this, jqEvent));
                }
                _OnKeyPressAttached: boolean = false;
                _OnOnKeyPressChanged() {
                    if (this.DOMConstructed) {
                        if (this.__OnKeyPress.Handlers.length > 0 && !this._OnKeyPressAttached) {
                            this._OnKeyPressAttached = true;
                            this._RootElements.find("[rel='nojs-ui']").on("keypress", { _this: this, _callback: this._OnKeyPress }, this._RestoreThis);
                        } else if (this._OnKeyPressAttached) {
                            this._OnKeyPressAttached = false;
                            this._RootElements.find("[rel='nojs-ui']").off("keypress", this._RestoreThis);
                        }
                    }
                }
                _OnKeyPress(jqEvent: JQueryEventObject) {
                    if (this.ActuallyEnabled()) {
                        this.__OnKeyPress.Invoke(new Events.KeyPressEventArgs(this, jqEvent));
                    }
                }
                _OnKeyUpAttached: boolean = false;
                _OnOnKeyUpChanged() {
                    if (this.DOMConstructed) {
                        if (this.__OnKeyUp.Handlers.length > 0 && !this._OnKeyUpAttached) {
                            this._OnKeyUpAttached = true;
                            this._RootElements.find("[rel='nojs-ui']").on("keyup", { _this: this, _callback: this._OnKeyUp }, this._RestoreThis);
                        } else if (this._OnKeyUpAttached) {
                            this._OnKeyUpAttached = false;
                            this._RootElements.find("[rel='nojs-ui']").off("keyup", this._RestoreThis);
                        }
                    }
                }
                _OnKeyUp(jqEvent: JQueryEventObject) {
                    if (this.ActuallyEnabled()) {
                        this.__OnKeyUp.Invoke(new Events.KeyUpEventArgs(this, jqEvent));
                    }
                }

                _OnFocus(jqEvent: JQueryEventObject) {
                    if (!this.ActuallyEnabled() || !this.ActuallyVisible()) {
                        Core.StopEvent(jqEvent);
                        this.Blur();
                    } else if (!this.Focusable()) {
                        this.Blur();
                    } else {
                        CurrentFocusedControl = this;
                        this.AddClass("Focused");
                        if (JustUsedTabKeyTime + 50 > Date.now()) {
                            this.AddClass("TabFocused");
                        }
                        this.__OnFocus.Invoke(new Events.FocusEventArgs(this, jqEvent));
                    }
                }
                _OnBlur(jqEvent: JQueryEventObject) {
                    if (CurrentFocusedControl == this) {
                        CurrentFocusedControl = null;
                    }
                    this.RemoveClass("Focused");
                    this.RemoveClass("TabFocused");
                    this.__OnBlur.Invoke(new Events.BlurEventArgs(this, jqEvent));
                }
                _OnKeyDown(jqEvent: JQueryEventObject) {
                    if (jqEvent.keyCode === 13) {
                        Core.StopEvent(jqEvent);
                        this.InvokeDefaultAction();
                    } else {
                        OnKeyDownGlobalFirst(jqEvent);
                        this.__OnKeyDown.Invoke(new Events.KeyDownEventArgs(this, jqEvent));
                        return OnKeyDownGlobalLast(jqEvent);
                    }
                }

                _OnChildren_Modified(eventArgs: Events.CollectionModifiedEventArgs<IControl>): void {
                    if (this.DOMConstructed) {
                        switch (eventArgs.Modification) {
                            case Events.CollectionModifications.Add:
                                for (var i = 0; i < eventArgs.ModifiedElements.Count(); i++) {
                                    eventArgs.ModifiedElements.ElementAt(i).ConstructDOM(this._RootElements);
                                }
                                break;
                            case Events.CollectionModifications.Remove:
                                for (var i = 0; i < eventArgs.ModifiedElements.Count(); i++) {
                                    eventArgs.ModifiedElements.ElementAt(i).DestroyDOM();
                                }
                                break;
                            case Events.CollectionModifications.Reorder:
                                for (var i = 0; i < eventArgs.ModifiedElements.Count(); i++) {
                                    var cObj = eventArgs.ModifiedElements.ElementAt(i);
                                    cObj.DestroyDOM();
                                    cObj.ConstructDOM(this._RootElements);
                                }
                                break;
                        }
                    }
                }

                _OnControl_Modified(eventArgs: Events.CollectionModifiedEventArgs<IControl>): void {
                    if (this.DOMConstructed) {
                        switch (eventArgs.Modification) {
                            case Events.CollectionModifications.Add:
                                for (var i = 0; i < eventArgs.ModifiedElements.Count(); i++) {
                                    eventArgs.ModifiedElements.ElementAt(i).ConstructDOM(this._RootElements);
                                }
                                break;
                            case Events.CollectionModifications.Remove:
                                for (var i = 0; i < eventArgs.ModifiedElements.Count(); i++) {
                                    eventArgs.ModifiedElements.ElementAt(i).DestroyDOM();
                                }
                                break;
                            case Events.CollectionModifications.Reorder:
                                for (var i = 0; i < eventArgs.ModifiedElements.Count(); i++) {
                                    var cObj = eventArgs.ModifiedElements.ElementAt(i);
                                    cObj.DestroyDOM();
                                    cObj.ConstructDOM(this._RootElements);
                                }
                                break;
                        }
                    }
                }

                _This_Resized_ChainHandler_Timeout: number = -1;
                _This_Resized_ChainHandler(eventArgs: Events.ResizeEventArgs) {
                    if (this._This_Resized_ChainHandler_Timeout === -1) {
                        var _this = this;
                        this._This_Resized_ChainHandler_Timeout = setTimeout(function () {
                            for (var i = 0; i < _this.Children.Count(); i++) {
                                _this.Children.ElementAt(i).__OnResize.Invoke(eventArgs);
                            }
                            _this._This_Resized_ChainHandler_Timeout = -1;
                        }, 100);
                    }
                }
                _This_Moved_ChainHandler_Timeout: number = -1;
                _This_Moved_ChainHandler(eventArgs: Events.MoveEventArgs) {
                    if (this._This_Moved_ChainHandler_Timeout === -1) {
                        var _this = this;
                        this._This_Moved_ChainHandler_Timeout = setTimeout(function () {
                            for (var i = 0; i < _this.Children.Count(); i++) {
                                _this.Children.ElementAt(i).__OnMove.Invoke(eventArgs);
                            }
                            _this._This_Moved_ChainHandler_Timeout = -1;
                        }, 100);
                    }
                }

                DOMConstructed: boolean = false;
                ConstructDOM(parent: JQuery, onComplete: () => void = null): void {
                    if (!this.DOMConstructed) {                        
                        parent.append(this._RootElements);                    

                        this.DOMConstructed = true;

                        this._OnOnClickChanged();
                        this._OnOnKeyPressChanged();
                        this._OnOnKeyUpChanged();
                        this._OnOnMouseDownChanged();
                        this._OnOnMouseMoveChanged();
                        this._OnOnMouseUpChanged();
                        this._OnOnResizeChanged();

                        this._RootElements.on("focus", { _this: this, _callback: this._OnFocus }, this._RestoreThis);
                        this._RootElements.on("blur", { _this: this, _callback: this._OnBlur }, this._RestoreThis);
                        this._RootElements.on("keydown", { _this: this, _callback: this._OnKeyDown }, this._RestoreThis);
                    }

                    if (!this.OptimiseConstructForGraphics) {
                        for (var i = 0; i < this.Children.Count(); i++) {
                            var child = this.Children.ElementAt(i);
                            child.ConstructDOM(this._RootElements);
                        }
                        if (onComplete) {
                            onComplete();
                        }
                    } else if (this.Children.Count() > 0) {
                        var i = 0;
                        var _this = this;
                        var func = function () {
                            var child = _this.Children.ElementAt(i);
                            if (!!child) {
                                child.OptimiseConstructForGraphics = true;
                                child.ConstructDOM(_this._RootElements, function () {
                                    i++;
                                    if (i < _this.Children.Count()) {
                                        setTimeout(func, Control.OptimiseConstructForGraphicsDelayTime);
                                    } else if (onComplete) {
                                        onComplete();
                                    }
                                });
                            } else {
                                i++;
                                if (i < _this.Children.Count()) {
                                    setTimeout(func, Control.OptimiseConstructForGraphicsDelayTime);
                                } else if (onComplete) {
                                    onComplete();
                                }
                            }
                        };
                        func();
                    } else if (onComplete) {
                        onComplete();
                    }
                }
                DestroyDOM(): void {
                    if (this.DOMConstructed) {
                        this._RootElements.remove();
                        this._RootElements.off();
                        this._OnClickAttached = false;
                        this._OnMouseDownAttached = false;
                        this._OnMouseUpAttached = false;
                        this._OnMouseMoveAttached = false;
                        this._OnResizeAttached = false;
                        this._OnKeyPressAttached = false;
                        this._OnKeyUpAttached = false;
                        this.DOMConstructed = false;
                    }

                    for (var i = 0; i < this.Children.Count(); i++) {
                        this.Children.ElementAt(i).DestroyDOM();
                    }
                }

                InitializeComponents(scope: ISelf, onComplete?: () => void): void {
                    //this._RootElements = scope.Self;
                    this.__Parent = scope;
                    this.ConstructDOM(scope.Self, onComplete);
                }

                ID(value: string = null): string {
                    if (value !== null) {
                        this._RootElements.attr("id", value);
                    }
                    return this._RootElements.attr("id");
                }

                GetStyle(name: string): string {
                    return this._RootElements.find("[rel='nojs-ui']").css(name);
                }
                SetStyle(name: string, value: string): void {
                    this._RootElements.find("[rel='nojs-ui']").css(name, value);
                }
                ApplyStyles(cssProps: any): void {
                    this._RootElements.find("[rel='nojs-ui']").css(cssProps);
                }
                AddClass(name: string): void {
                    if (!this.HasClass(name)) {
                        this._RootElements.find("[rel='nojs-ui']").addClass(name);
                    }
                }
                RemoveClass(name?: string): void {
                    this._RootElements.find("[rel='nojs-ui']").removeClass(name);
                }
                HasClass(name: string): boolean {
                    return this._RootElements.find("[rel='nojs-ui']").hasClass(name);
                }

                BackColor(color: string = null): string {
                    if (color !== null) {
                        this._RootElements.find("[rel='nojs-ui']").css("backgroundColor", color);
                    }
                    return this._RootElements.find("[rel='nojs-ui']").css("backgroundColor");
                }
                ForeColor(color?: string): string {
                    if (color !== null) {
                        this._RootElements.find("[rel='nojs-ui']").css("color", color);
                    }
                    return this._RootElements.find("[rel='nojs-ui']").css("color");
                }

                CssStyle(style: string, value: Core.Pixel = null): Core.Pixel {
                    if (value !== null) {
                        this._RootElements.find("[rel='nojs-ui']").css(style, value.ToString());
                    }
                    return Core.Pixel.FromString(this._RootElements.find("[rel='nojs-ui']").css(style));
                }

                Width(value: Core.Pixel = null): Core.Pixel {
                    var result = this.CssStyle("width", value);
                    if (value !== null) {
                        this.__OnResize.Invoke(new Events.ResizeEventArgs(this, null));
                    }
                    return result;
                }
                Height(value: Core.Pixel = null): Core.Pixel {
                    var result = this.CssStyle("height", value);
                    if (value !== null) {
                        this.__OnResize.Invoke(new Events.ResizeEventArgs(this, null));
                    }
                    return result;
                }

                ActualWidth(): number {
                    return this._RootElements.outerWidth();
                }
                ActualHeight(): number {
                    return this._RootElements.outerHeight();
                }

                Top(value: Core.Pixel = null): Core.Pixel {
                    var result = this.CssStyle("top", value);
                    this.__OnMove.Invoke(new Events.MoveEventArgs(this, null));
                    return result;
                }
                Bottom(value: Core.Pixel = null): Core.Pixel {
                    return this.CssStyle("bottom", value);
                }
                Left(value: Core.Pixel = null): Core.Pixel {
                    var result = this.CssStyle("left", value);
                    this.__OnMove.Invoke(new Events.MoveEventArgs(this, null));
                    return result;
                }
                Right(value: Core.Pixel = null): Core.Pixel {
                    return this.CssStyle("right", value);
                }

                PageTop(): number {
                    return this._RootElements.offset().top;
                }
                PageLeft(): number {
                    return this._RootElements.offset().left;
                }
                PageBottom(): number {
                    return this._RootElements.offset().top + this.ActualHeight();
                }
                PageRight(): number {
                    return this._RootElements.offset().left + this.ActualWidth();
                }

                MinWidth(value: Core.Pixel = null): Core.Pixel {
                    return this.CssStyle("minWidth", value);
                }
                MinHeight(value: Core.Pixel = null): Core.Pixel {
                    return this.CssStyle("minHeight", value);
                }
                MaxWidth(value: Core.Pixel = null): Core.Pixel {
                    return this.CssStyle("maxWidth", value);
                }
                MaxHeight(value: Core.Pixel = null): Core.Pixel {
                    return this.CssStyle("maxHeight", value);
                }

                _parentVisible: boolean = true;
                SetParentVisible(value: boolean): void {
                    this._parentVisible = value;

                    var len = this.Children.Count();
                    for (var i = 0; i < len; i++) {
                        this.Children.ElementAt(i).SetParentVisible(value);
                    }
                }
                ActuallyVisible(): boolean {
                    return this._parentVisible && this.Visible();
                }
                Visible(value: boolean = null): boolean {
                    if (value !== null) {
                        this._RootElements.css({
                            visibility: value ? "" : "hidden",
                            display: ""
                        });

                        var len = this.Children.Count();
                        for (var i = 0; i < len; i++) {
                            this.Children.ElementAt(i).SetParentVisible(value);
                        }
                    }
                    return this._RootElements.css("visibility") !== "hidden" && this._RootElements.css("display") !== "none";
                }
                EnableByParent(): void {
                    this._HandleEnableSet(this._Enabled);
                    if (this._Enabled) {
                        for (var i = 0; i < this.Children.Count(); i++) {
                            this.Children.ElementAt(i).EnableByParent();
                        }
                    }
                }
                DisableByParent(): void {
                    this._HandleEnableSet(false);
                    for (var i = 0; i < this.Children.Count(); i++) {
                        this.Children.ElementAt(i).DisableByParent();
                    }
                }
                _WasSelectionEnabled: boolean = false;
                Enabled(value: boolean = null): boolean {
                    if (value !== null) {
                        this._Enabled = value;

                        for (var i = 0; i < this.Children.Count(); i++) {
                            var elem = this.Children.ElementAt(i);
                            if (this._Enabled) {
                                elem.EnableByParent();
                            } else {
                                elem.DisableByParent();
                            }
                        }

                        this._HandleEnableSet(this._Enabled);
                    }
                    return this._Enabled;
                }
                ActuallyEnabled(): boolean {
                    return !this.HasClass("disabled");
                }
                _HandleEnableSet(enabled: boolean) {
                    if (enabled) {
                        this._RootElements.removeClass("disabled");
                        if (this._WasSelectionEnabled) {
                            this.EnableSelection();
                        }
                    } else {
                        this._RootElements.addClass("disabled");
                        this._WasSelectionEnabled = this._SelectionEnabled;
                        this.DisableSelection();
                    }

                    this._HandleFocusableSet(this.Focusable());
                }
                _HandleFocusableSet(focusable: boolean) {
                    if (focusable && !this.HasClass("disabled")) {
                        this._RootElements.attr("tabindex", this._TabIndex.toString());

                        if (this._RootElements.is(":focus") && !this.HasClass("Focused")) {
                            this.Focus();
                        }
                    } else {
                        this._RootElements.removeAttr("tabindex");
                    }

                    if (!this._Focusable && this._RootElements.is(":focus")) {
                        this.Blur();
                    }
                }
                _Focusable: boolean = false;
                Focusable(value: boolean = null): boolean {
                    if (value !== null) {
                        this._Focusable = value;
                        if (this._TabIndex === 0) {
                            this._TabIndex = ++_currTabIndex;
                        }

                        this._HandleFocusableSet(value);
                    }
                    return this._Focusable;
                }
                Show(callback: () => void = null, animator: IAnimator = new FadeAnimator()): void {
                    if (!this.Visible()) {
                        this.Enabled(false);
                        var _this = this;
                        animator.Show(this, function () {
                            _this.Enabled(true);
                            _this.Visible(true);
                            _this.__OnShow.Invoke(new Events.ShowEventArgs(_this, null));
                            if (callback !== null)
                                callback();
                        });
                    } else if (callback !== null) {
                        callback();
                    }
                }
                Hide(callback: () => void = null, animator: IAnimator = new FadeAnimator()): void {
                    if (this.Visible()) {
                        this.Enabled(false);
                        var _this = this;
                        setTimeout(function () {
                            animator.Hide(_this, function () {
                                _this.Enabled(true);
                                _this.Visible(false);
                                _this.__OnHide.Invoke(new Events.HideEventArgs(_this, null));
                                if (callback !== null)
                                    callback();
                            });
                        }, 200);
                    } else if (callback !== null) {
                        callback();
                    }
                }

                _SelectionEnabled: boolean = false;
                EnableSelection(): void {
                    //this._RootElements.enableSelection();
                    this._SelectionEnabled = true;
                }
                DisableSelection(): void {
                    //this._RootElements.disableSelection();
                    this._SelectionEnabled = false;
                }

                Focus(): void {
                    this._RootElements.focus();
                }
                Blur(): void {
                    this._RootElements.blur();
                }

                InvokeDefaultAction(): void {

                }

                IsRelativeLayout(): boolean {
                    return this._RootElements.hasClass("RelativeLayout");
                }
                RelativeLayoutOn(): void {
                    this.AddClass("RelativeLayout");
                }
                RelativeLayoutOff(): void {
                    this.RemoveClass("RelativeLayout");
                }

                _TabIndex: number = 0;
                TabIndex(value: number = null): number {
                    if (value !== null) {
                        this._TabIndex = value;
                        if (value === -2) {
                            this._RootElements.removeAttr("tabindex");
                        } else {
                            this._RootElements.attr("tabindex", value.toString());
                        }
                    }
                    var retVal = parseInt(this._RootElements.attr("tabindex"), 10);
                    if (isNaN(retVal)) {
                        retVal = -2;
                    }
                    return retVal;
                }

                GetType(): string {
                    return Core.GetType(this);
                }

                ToString(): string {
                    return this.GetType().toString();
                }

                public get Parent(): any {
                    return this.__Parent;
                }

                public get Self(): JQuery {
                    return this._RootElements;
                }

            } // end control
        }
    }
}