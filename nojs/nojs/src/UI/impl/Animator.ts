/// <reference path="../../System.ts" />
/// <reference path="../IAnimator.ts" />

module System {
    export module Web {
        export module UI {
            export class FadeAnimator implements IAnimator {
                static AnimationTime: number = 300;
                
                static AnimationEasing: string = "swing";

                Show(control: UI.IControl, callback: () => void = null): void {
                    control.AnimationElement().stop(true, true).css({
                        display: "",
                        visibility: "",
                        opacity: 0
                    });
                    control.AnimationElement().animate({
                        opacity: 1
                    }, FadeAnimator.AnimationTime, FadeAnimator.AnimationEasing, function () {
                            if (callback !== null) {
                                callback();
                            }
                    });
                }

                Hide(control: UI.IControl, callback: () => void = null): void {
                    control.AnimationElement().stop(true, true);
                    control.AnimationElement().animate({
                        opacity: 0
                    }, FadeAnimator.AnimationTime, FadeAnimator.AnimationEasing, function () {
                            $(this).css({
                                visibility: "hidden",
                                opacity: 1
                            });

                            if (callback !== null) {
                                callback();
                            }
                    });
                }
            }
        }
    }
}