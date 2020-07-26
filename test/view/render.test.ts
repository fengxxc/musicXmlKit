import { Render } from "../../src/view/render"
import { readFileSync } from "fs";
import { Parser } from "../../src/model/parser";
import { RootNode } from "../../src/model/rootNode";

test('render test', () => {
    const xml: string = readFileSync('./test/view/notes1.xml', 'utf-8');
    const root: RootNode = Parser.parseMusicXml(xml);
    const ctx: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('can')
    Render.action(ctx, root, Render.ConfigDef)
})