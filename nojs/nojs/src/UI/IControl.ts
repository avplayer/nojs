/// <reference path="../Definitions/jquery.d.ts" />
/// <reference path="../Generics/List/IList.ts" />
/// <reference path="IAnimator.ts" />
/// <reference path="ISelf.ts" />
/// <reference path="IPanel.ts" />
/// <reference path="../Core/System.Core.ts" />

declare module System {
    export module Web {
        export module UI {  
            export interface IControl {
                // 控件的唯一标识符
                _Guid: number;

                // 根元素
                _RootElements: JQuery;

                AnimationElement(): JQuery;

                // 子元素,用于构造复合控件
                Children: Generic.IList<IControl>;
                // 子控件,用于panel等
                Controls: Generic.IList<IControl>;

                OnClick: (Args: Events.IEventArgs) => void;
                OnMouseDown: (Args: Events.IEventArgs) => void;
                OnMouseUp: (Args: Events.IEventArgs) => void;
                OnMouseMove: (Args: Events.IEventArgs) => void;
                OnResize: (Args: Events.IEventArgs) => void;
                OnMove: (Args: Events.IEventArgs) => void;
                OnShow: (Args: Events.IEventArgs) => void;
                OnHide: (Args: Events.IEventArgs) => void;
                OnFocus: (Args: Events.IEventArgs) => void;
                OnBlur: (Args: Events.IEventArgs) => void;
                OnKeyDown: (Args: Events.IEventArgs) => void;
                OnKeyPress: (Args: Events.IEventArgs) => void;
                OnKeyUp: (Args: Events.IEventArgs) => void;

                __OnClick: Events.ClickEvent;
                __OnMouseDown: Events.MouseDownEvent;
                __OnMouseUp: Events.MouseUpEvent;
                __OnMouseMove: Events.MouseMoveEvent;
                __OnResize: Events.ResizeEvent;
                __OnMove: Events.MoveEvent;
                __OnShow: Events.ShowEvent;
                __OnHide: Events.HideEvent;
                __OnFocus: Events.FocusEvent;
                __OnBlur: Events.BlurEvent;
                __OnKeyDown: Events.KeyDownEvent;
                __OnKeyPress: Events.KeyPressEvent;
                __OnKeyUp: Events.KeyUpEvent;

                TargetDocumentForMouseUp: boolean;
                TargetDocumentForMouseMove: boolean;
                OptimiseConstructForGraphics: boolean;

                DOMConstructed: boolean;
                ConstructDOM(parent: JQuery, onComplete?: () => void): void;
                DestroyDOM(): void;
                InitializeComponents(scope: ISelf, onComplete?: () => void): void;

                // 设置或者获取控件ID
                ID(value?: string): string;

                GetStyle(name: string): string;
                SetStyle(name: string, value: string): void;
                ApplyStyles(cssProps: any): void;

                AddClass(name: string): void;
                RemoveClass(name?: string): void;
                HasClass(name: string): boolean;

                BackColor(color?: string): string;
                ForeColor(color?: string): string;

                CssStyle(style: string, value?: Core.Pixel): Core.Pixel;

                Width(value?: Core.Pixel): Core.Pixel;
                Height(value?: Core.Pixel): Core.Pixel;

                ActualWidth(): number;
                ActualHeight(): number;

                Top(value?: Core.Pixel): Core.Pixel;
                Bottom(value?: Core.Pixel): Core.Pixel;
                Left(value?: Core.Pixel): Core.Pixel;
                Right(value?: Core.Pixel): Core.Pixel;

                PageTop(): number;
                PageLeft(): number;
                PageBottom(): number;
                PageRight(): number;

                MinWidth(value?: Core.Pixel): Core.Pixel;
                MinHeight(value?: Core.Pixel): Core.Pixel;
                MaxWidth(value?: Core.Pixel): Core.Pixel;
                MaxHeight(value?: Core.Pixel): Core.Pixel;

                SetParentVisible(value: boolean): void;
                ActuallyVisible(): boolean;
                Visible(value?: boolean): boolean;

                Enabled(value?: boolean): boolean;
                ActuallyEnabled(): boolean;

                Focusable(value?: boolean): boolean;

                EnableByParent(): void;
                DisableByParent(): void;

                Show(callback?: () => void, animator?: IAnimator): void;
                Hide(callback?: () => void, animator?: IAnimator): void;

                EnableSelection(): void;
                DisableSelection(): void;

                Focus(): void;
                Blur(): void;

                InvokeDefaultAction(): void;

                IsRelativeLayout(): boolean;
                RelativeLayoutOn(): void;

                RelativeLayoutOff(): void;

                TabIndex(value?: number): number;

                GetType(): string;

                ToString(): string;
            }
        }
    }
}