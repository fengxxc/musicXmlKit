import { Node } from "./Node";
import { Measure } from "./interface/measure";
import { NoteNode } from "./noteNode";
import { DireMetronomeNode } from "./direMetronomeNode";
import { DireOctaveShiftNode } from "./direOctaveShiftNode";
import { DireWedgeNode } from "./direWedgeNode";
import { AttributesNode } from "./attributesNode";

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