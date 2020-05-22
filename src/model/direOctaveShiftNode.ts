import { Node } from "./node";
import { DireOctaveShift } from "./interface/direOctaveShift";

export class DireOctaveShiftNode extends Node implements DireOctaveShift {
    Size(): number {
        try {
            return parseInt(super.getChildNodesByName('direction-type')[0].getChildNodesByName('octave-shift')[0].getAttr()['size']);
        } catch (error) {
            return null;
        }
    }
    Type(): string {
        try {
            return super.getChildNodesByName('direction-type')[0].getChildNodesByName('octave-shift')[0].getAttr()['type'];
        } catch (error) {
            return '';
        }
    }
}