import { Node } from "../node";
import { NoteNode } from "../noteNode";
import { AttributesNode } from "../attributesNode";

export interface Measure {
    Number(): number;
    Attributes(): AttributesNode;
    /**
     * 显示的实体元素，如 note | direction | backup
     * @returns {(Array<Node|NoteNode>)}
     * @memberof Measure
     */
    displayEntities(): Array<Node|NoteNode>;
}