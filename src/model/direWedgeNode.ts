import { Node } from "./node";
import { DireWedge } from "./interface/direWedge";

export class DireWedgeNode extends Node implements DireWedge {
    Type(): string {
        try {
            return super.getChildNodesByName('direction-type')[0].getChildNodesByName('wedge')[0].getAttr()['type'];
        } catch (error) {
            return '';
        }
    }
}