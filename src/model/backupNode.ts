import { Backup } from "./interface/backup";
import { Node } from "./node";

export class BackupNode extends Node implements Backup {
    Duration(): number {
        try {
            return parseInt(super.getChildNodesByName('duration')[0].getFullText());
        } catch (error) {
            return null;
        }
    }
    
}