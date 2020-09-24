import { Render } from "../../src/view/render"
import { Parser } from "../../src/model/parser";
import { RootNode } from "../../src/model/rootNode";
import { Utils } from "../../src/utils";

function main() {
    const xml: string = Utils.ajaxGetSync('/test/view/notes3.xml')
    const can: HTMLElement = document.getElementById('can');
    can.setAttribute('height', '2000');
    can.insertAdjacentHTML('afterend', `<div style="display: inline-block; vertical-align: top; height: 2000px; overflow: scroll;" > <xmp id="xml" style = "width: 850px;" >${xml}</xmp></div >`);
    const root: RootNode = Parser.parseMusicXml(xml);
    const ctx: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('can')
    Render.action(ctx, root);
    
}
main();