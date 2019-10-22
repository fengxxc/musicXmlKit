import { Node } from "./node";
import { SorePartWise } from "./interface/sorePartWise";

export class SorePartWiseNode extends Node implements SorePartWise {
    constructor(_index: number, parentNode: Node, name: string, attr: Object) {
        super(_index, parentNode, name, attr);
    }
    // @overwrite
    Identification(): Node {
        return super.getChildNodesByName('identification')[0];
    }
    // @overwrite
    Defaults(): Node {
        return super.getChildNodesByName('defaults')[0];
    }
    // @overwrite
    PartList(): Node[] {
        return super.getChildNodesByName('part-list');
    }
    // @overwrite
    Part(): Node[] {
        return super.getChildNodesByName('part');
    }
}