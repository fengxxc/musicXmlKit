import { Node } from "./node.js";
import { DireMetronome } from "./interface/direMetronome.js";

export class DireMetronomeNode extends Node implements DireMetronome {
    private tempMetronome: Node = null;
    constructor(_index?: number, parentNode?: Node, name?: string, attr?: Object) {
        super(_index, parentNode, name, attr);
        const dt: Node[] = super.getChildNodesByName('direction-type');
        if (dt.length != 0) {
            const m: Node[] = dt[0].getChildNodesByName('metronome');
            if (m.length != 0) this.tempMetronome = m[0];
        }
    }
    Directive(): string {
        const attr = super.getAttr();
        return 'directive' in attr ? attr['directive'] : '';
    }
    Parentheses(): string {
        if (this.tempMetronome == null) return '';
        const attr = this.tempMetronome.getAttr();
        return 'parentheses' in attr ? attr['parentheses'] : '';
    }
    DefaultY(): number {
        if (this.tempMetronome == null) return null;
        const attr = this.tempMetronome.getAttr();
        return 'default-y' in attr ? parseInt(attr['default-y']) : null;
    }
    BeatUnit(): string {
        if (this.tempMetronome == null) return '';
        const b: Node[] = this.tempMetronome.getChildNodesByName('beat-unit');
        return b.length == 0 ? '' : b[0].getFullText();
    }
    PerMinute(): number {
        if (this.tempMetronome == null) return null;
        const b: Node[] = this.tempMetronome.getChildNodesByName('per-minute');
        return b.length == 0 ? null : parseInt(b[0].getFullText());
    }

    
}