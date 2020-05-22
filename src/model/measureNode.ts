import { Node } from "./Node.js";
import { Measure } from "./interface/measure.js";
import { NoteNode } from "./noteNode.js";
import { DireMetronomeNode } from "./direMetronomeNode.js";
import { DireOctaveShiftNode } from "./direOctaveShiftNode.js";
import { DireWedgeNode } from "./direWedgeNode.js";
import { AttributesNode } from "./attributesNode.js";

export class MeasureNode extends Node implements Measure {
    Number(): number {
        try {
            return parseInt(super.getAttr()['number']);
        } catch (error) { return null; }
    }
    Attributes(): AttributesNode {
        try {
            return <AttributesNode>super.getChildNodesByName('attributes')[0];
        } catch (error) { return null; }
    }
    displayEntities(): (Node | NoteNode | DireMetronomeNode | DireOctaveShiftNode | DireWedgeNode)[] {
        const exclude: Node = this.Attributes();
        return super.getChildNodes().filter(node => exclude != node);
    }


}