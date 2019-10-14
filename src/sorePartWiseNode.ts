import { Node } from "./node";
import { SorePartWise } from "./interface/sorePartWise";

export class SorePartWiseNode extends Node implements SorePartWise {
    constructor(parentNode: Node, name: string, attr: Object) {
        super(parentNode, name, attr);
    }
    // @overwrite
    getIdentification(): Node {
        return super.getChildNodesByName('identification')[0];
    }
    // @overwrite
    getDefaults(): Node {
        return super.getChildNodesByName('defaults')[0];
    }
    // @overwrite
    getPartList(): Node[] {
        return super.getChildNodesByName('part-list');
    }
}