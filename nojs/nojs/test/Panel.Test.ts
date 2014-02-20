/// <reference path="../src/Console/System.Console.ts" />

module Application {
    export class TestPanelApp extends System.Web.UI.Window {
        private _panel1: System.Web.UI.Panel;
        private _panel2: System.Web.UI.Panel;
        private _panel3: System.Web.UI.Panel;
        private _panel4: System.Web.UI.Panel;

        private _btn1: System.Web.UI.IButton;
        private _btn2: System.Web.UI.IButton;
        private _btn3: System.Web.UI.IButton;
        private _btn4: System.Web.UI.IButton;
        private _btn5: System.Web.UI.IButton;

        Run(args: string[]= []): void {
            super.Run();

            this.AttachEvent();

            System.Console.WriteLine("app running...");
        }

        private AttachEvent() {
            this._btn1.OnClick = this.OnBtn1Clicked;
        }

        //# region

        private OnBtn1Clicked(Args: System.Events.EventArgs) {
            System.Console.WriteObject(Args.Sender);
            System.Console.WriteObject(this);            
        }

        //# endregion

        InitializeComponents(): void {
            super.InitializeComponents();

            this._panel1 = new System.Web.UI.Panel();
            this._panel2 = new System.Web.UI.Panel(); 
            this._panel3 = new System.Web.UI.Panel(); 
            this._panel4 = new System.Web.UI.Panel(); 

            this._btn1 = new System.Web.UI.Button(); 
            this._btn2 = new System.Web.UI.Button(); 
            this._btn3 = new System.Web.UI.Button();
            this._btn4 = new System.Web.UI.Button(); 
            this._btn5 = new System.Web.UI.Button(); 

            // 设置为流式布局
            this._panel2.Layout(System.Web.UI.LayoutStyle.FlowLayout, 6);
            this._panel3.Layout(System.Web.UI.LayoutStyle.FlowLayout, 6);             

            this._panel1.Controls.Add(this._panel2);
            this._panel1.Controls.Add(this._panel3);

            this._panel2.Controls.Add(this._btn1);
            this._panel3.Controls.Add(this._btn2);
            this._panel2.Controls.Add(this._btn3);
            this._panel3.Controls.Add(this._btn4);
            this._panel4.Controls.Add(this._btn5);

            this._panel1.InitializeComponents(this);
            this._panel2.InitializeComponents(this);
            this._panel3.InitializeComponents(this);
            this._panel4.InitializeComponents(this);

            this._btn1.InitializeComponents(this);
            this._btn2.InitializeComponents(this);
            this._btn3.InitializeComponents(this);
            this._btn4.InitializeComponents(this);
            this._btn5.InitializeComponents(this);

            this._btn1.Text = "按钮1";     
            this._btn2.Text = "按钮2";  
            this._btn3.Text = "按钮3";
            this._btn4.Text = "按钮4"; 
            this._btn5.Text = "按钮5";      
        }
    }
}

var TheApp = new Application.TestPanelApp();

$(document).ready(function () {
    // 运行应用程序
    TheApp.Run();
});