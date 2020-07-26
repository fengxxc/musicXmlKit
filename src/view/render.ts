import { MxIterator } from "./mxIterator";
import { RootNode } from "../model/rootNode";
import { Shape } from "./shape";

export class Render {
    static ConfigDef = {
        marginTop: 20,
        marginRight: 10,
        marginBottom: 20,
        marginLeft: 10,
        pageWidth: 960,
        pageHeight: 600,
        lineDstc: 10,
        lineWidth: 1,
        lineColor: '#000',
    }
    static action(canvasDom: HTMLCanvasElement, musicXmlNode: RootNode, cfg: any): void {
        const shape: Shape = new Shape(canvasDom);
        const iterator = MxIterator.getIterator(musicXmlNode);
        let entry = null;
        let x: number = cfg.marginLeft, y: number = cfg.marginTop;
        while (!(entry = iterator.next()).done) {
            const token = entry.value;
            for (let i = 0; i < 5; i++) {
                shape.drawLine(x, y + cfg.lineDstc*i, cfg.pageWidth - cfg.marginRight, y + cfg.lineDstc*i, cfg.lineWidth, cfg.lineColor);
            }
            // TODO
        }

        // for (const token of MxIterator.getIterator(musicXmlNode)) {
        //     for...of这样不行，不造为啥
        // }
    }

}