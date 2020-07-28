import { MxIterator } from "./mxIterator";
import { RootNode } from "../model/rootNode";
import { Shape } from "./shape";
import { Config } from "../config";

export class Render {
    static ConfigDef = {
        marginTop: 20,
        marginRight: 10,
        marginBottom: 20,
        marginLeft: 10,
        pageWidth: 1000,
        pageHeight: 800,
        lineDstc: 10,
        lineWidth: 1,
        lineColor: '#000',
    }
    static action(canvasDom: HTMLCanvasElement, musicXmlNode: RootNode): void {
        const cfg = new Config(canvasDom);
        const shape: Shape = new Shape(canvasDom);
        const iterator = MxIterator.getIterator(musicXmlNode);
        let entry = null;
        let x: number = cfg.PaddingLeft + 0.5, y: number = cfg.PaddingTop + 0.5;
        while (!(entry = iterator.next()).done) {
            const token = entry.value;
            for (let i = 0; i < 5; i++) {
                shape.drawLine(x, y + cfg.LineSpace*i, cfg.PageWidth - cfg.PaddingRight, y + cfg.LineSpace*i, cfg.LineWidth, cfg.LineColor);
            }
            // TODO
        }

        // for (const token of MxIterator.getIterator(musicXmlNode)) {
        //     for...of这样不行，不造为啥
        // }
    }

}