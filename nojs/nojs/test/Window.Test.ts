/// <reference path="../src/Console/System.Console.ts" />

module Application {
    export class TestWindowApp extends System.Web.UI.Window {
        private _btn1: System.Web.UI.IButton;
        private _btn2: System.Web.UI.IButton;

        Run(args: string[]= []): void {
            super.Run();

            this.AttachEvent();

            this._btn1.ButtonStyle = System.Web.UI.ButtonStyle.Primary;

            System.Console.WriteLine("app running...");    
        }

        //# region 事件处理程序
        private AttachEvent() {
            this._btn1.OnClick = this.OnBtn1Click;
            this._btn2.OnClick = this.OnBtn2Click;
        }

        private OnBtn1Click(Args: System.Events.EventArgs): void {
            System.Console.WriteLine(this._btn1.Text);
            System.Console.WriteObject(this);
            System.Console.WriteObject(Args);
            System.Console.WriteLine((<System.Web.UI.IButton>Args.Sender).Text);
        }   
        
        private OnBtn2Click(Args: System.Events.EventArgs): void {
            System.Console.WriteLine(this._btn2.Text);
            this._btn1.ButtonStyle = System.Web.UI.ButtonStyle.Warning;
            System.Console.WriteLine((<System.Web.UI.IButton>Args.Sender).Text);
        } 
        //# endregion 
        
        InitializeComponents(): void {
            super.InitializeComponents();

            this._btn1 = new System.Web.UI.Button();
            this._btn1.InitializeComponents(this);
            this._btn1.Text = "按钮1";

            this._btn2 = new System.Web.UI.Button();
            this._btn2.InitializeComponents(this);
            this._btn2.Text = "改变按钮1的风格";
        }             
    }
}

var TheApp = new Application.TestWindowApp();

$(document).ready(function () {
    // 运行应用程序
    TheApp.Run(); 
});