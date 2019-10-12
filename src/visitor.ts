import { Node } from "./node";

export interface Visitor {
    visit(node: Node): void;
}