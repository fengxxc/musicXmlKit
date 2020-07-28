import { Render } from "../../src/view/render"
import { Parser } from "../../src/model/parser";
import { RootNode } from "../../src/model/rootNode";
import { Utils } from "../../src/utils";

function main() {
    const xml: string = Utils.ajaxGetSync('/test/view/notes1.xml')
    const root: RootNode = Parser.parseMusicXml(xml);
    const ctx: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('can')
    Render.action(ctx, root);
    
}
main();