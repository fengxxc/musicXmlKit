import { Node } from "./node.js";
import { Root } from "./interface/root.js";
export class RootNode extends Node implements Root {
    private idIndex: Record<string, Node[]>;
    constructor(index: number, parentNode: Node, name: string, attr: Object) {
        super(index, parentNode, name, attr);
        this.idIndex = {};
    }
    // overwrite
    appendIdIndex(id: string, node: Node): void {
        if (id in this.idIndex) {
            // throw new Error(`id:"${id}"已存在`);
            this.idIndex[id].push(node);
            return;
        }
        this.idIndex[id] = [node];
    }
    // overwrite
    getNodesById(id: string): Node[] {
        return this.idIndex[id];
    }

}