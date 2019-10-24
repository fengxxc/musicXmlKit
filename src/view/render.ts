import { Node } from "../model/node";
import { RootNode } from "../model/rootNode";
import { SorePartWiseNode } from "../model/sorePartWiseNode";
import { MeasureNode } from "../model/measureNode";
import { AttributesNode } from "../model/attributesNode";
import { Clef } from "../model/interface/attributes";
import { Quill } from "./painter";
export class Render {
    // 先写个粗版的(((φ(◎ロ◎;)φ)))
    private mxn: RootNode;
    private quill: Quill;
    private posX: number;
    private posY: number;

    constructor(musicXmlNode: RootNode, quill: Quill) {
        this.setMxn(musicXmlNode).setQuill(quill);
    }

    setMxn(mxn: RootNode): Render {
        this.mxn = mxn;
        return this;
    }
    getMxn(): RootNode {
        return this.mxn;
    }

    setQuill(quill: Quill) {
        this.quill = quill;
        return this;
    }
    getQuill() {
        return this.quill;
    }

    main(): void {
        const spw: SorePartWiseNode = <SorePartWiseNode>this.mxn.getChildNodesByName('score-partwise')[0];
        const parts = spw.Part();
        parts.forEach(part => this.renderPart(part));
    }

    renderPart(part: Node): void {
        this.posX = 10.5;
        this.posY = 10.5;
        part.forEachChildNodes(measure => this.renderMeasure(<MeasureNode>measure));
    }

    renderMeasure(measure: MeasureNode): void {
        const q = this.getQuill();
        const attributes: AttributesNode = measure.Attributes();
        const clefs: Clef[] = attributes.Clef();
        clefs.forEach(clef => {
            const sign = clef.Sign();
            const line = clef.Line();
            q.drawHorizontalLines(this.posX, this.posY, 30, 10, 1, 'black', 5);
        })
    }
}