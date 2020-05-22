import { Backup } from "./interface/backup.js";
import { Node } from "./node.js";

export class BackupNode extends Node implements Backup {
    Duration(): number {
        try {
            return parseInt(super.getChildNodesByName('duration')[0].getFullText());
        } catch (error) {
            return null;
        }
    }
    
}