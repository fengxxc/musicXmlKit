import { Node } from "./node";
import { Visitor } from "./visitor";

export class MxNodeRender implements Visitor {
    // @overwrite
    visit(node: Node): void {
        const name = node.getName();
        switch (name) {
            case 'score-partwise':
                console.log(`score-partwise版本：${node.getAttr()['version']}`);
                break;
            case 'encoding-date':
                console.log(`编码日期：${node.getFullText()}`);
                break;
            case 'software':
                console.log(`软件：${node.getFullText()}`);
                break;
            case 'note':
            
            default:
                // console.log(name)
                break;
        }
    }
    
    iterNode(root: Node) {
        root.accept(this);
        root.forEachChildNodes((child, index, array) => this.iterNode(child));
    }
}