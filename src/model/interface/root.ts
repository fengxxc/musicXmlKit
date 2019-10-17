import { Node } from "../node";

export interface Root {
    appendIdIndex(id: string, node: Node): void;
    getNodesById(id: string): Node[];
}