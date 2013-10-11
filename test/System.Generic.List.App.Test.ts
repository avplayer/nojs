/// <reference path="../src/System.ts" />
/// <reference path="../src/System.Core.ts" />
/// <reference path="../src/System.Generic.ts" />

// 定义using
var Console = System.Core.Console;

var list = new System.Generic.List<string>();

list.Add("a");
list.Add("b");

Console.WriteLine(list.Count); 

var iter = list.GetEnumerator();

while (iter.MoveNext()) {
    Console.Write(iter.Current + ' ');
}

if (list.Contains("a")) {
    Console.WriteLine("list contains element [a]");
}

/*module App {
    class App {
        private _buttom1: System.UI.Bottom;
        private _maps: System.UI.Map;
        private _work: System.Core.WebWork;
        private _grid: System.UI.Grid;

        constructor() {
            this._buttom1.Width = 150;
            this._buttom1.Height = 100;

            this._buttom1.Top = 50;
            this._buttom1.Left = 200;

            this._buttom1.OnClicked = this.OnBtnClick;
        }

        OnBtnClick(sender: System.Event.Args, e: System.Event.Args) {
            this._maps.ShowMaps();

            this._work.Send();
            this._grid.DataSource = this._source;
        }
    }
}*/