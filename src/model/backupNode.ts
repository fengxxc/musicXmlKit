import { Backup } from "./interface/backup";
import { Node } from "./node";
import { Durational } from "./interface/durational";

export class BackupNode extends Node implements Backup {
    constructor(index: number, parentNode: Node, name: string, attr: Object) {
        super(index, parentNode, name, attr);
    }
    // @overwrit
    Duration(): number {
        try {
            return parseInt(super.getChildNodesByName('duration')[0].getFullText());
        } catch (error) {
            return null;
        }
    }
    
}