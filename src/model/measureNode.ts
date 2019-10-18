import { Node } from "./Node";
import { Measure } from "./interface/measure";
import { NoteNode } from "./noteNode";

export class MeasureNode extends Node implements Measure {
    Number(): number {
        const attr = super.getAttr();
        return ('number' in attr) ? parseInt(attr['number']) : null;
    }
    Attributes(): Node[] {
        return super.getChildNodesByName('attributes');
    }
    displayEntities(): (Node | NoteNode)[] {
        const exclude: Node[] = this.Attributes();
        return super.getChildNodes().filter(node => exclude.indexOf(node) == -1);
    }


}