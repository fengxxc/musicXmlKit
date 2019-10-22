import { Node } from "./node";
import { DireMetronome } from "./interface/direMetronome";

export class DireMetronomeNode extends Node implements DireMetronome {
    private tempMetronome: Node;
    constructor(_index?: number, parentNode?: Node, name?: string, attr?: Object) {
        super(_index, parentNode, name, attr);
        const dt: Node[] = super.getChildNodesByName('direction-type');
        if (dt.length != 0) {
            const m: Node[] = dt[0].getChildNodesByName('metronome');
            if (m.length != 0) this.tempMetronome = m[0];
        }
    }
    /* transformOf(directionElementNode: Node) {
        const node = directionElementNode;
        this = new DireMetronomeNode(node.getParentNode(), node.getName(), );
    } */
    Directive(): string {
        return super.getAttr()['directive'];
    }
    Parentheses(): string {
        throw new Error("Method not implemented.");
    }
    DefaultY(): number {
        throw new Error("Method not implemented.");
    }
    BeatUnit(): string {
        throw new Error("Method not implemented.");
    }
    PerMinute(): number {
        throw new Error("Method not implemented.");
    }

    
}