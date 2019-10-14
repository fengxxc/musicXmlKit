import { Node } from "./node";

export class MxNodeRender {
    
    static render(root: Node) {
        const name = root.getName();
        switch (name) {
            case 'score-partwise':
                console.log(`score-partwise版本：${root.getAttr()['version']}`);
                break;
            case 'encoding-date':
                console.log(`编码日期：${root.getFullText()}`);
                break;
            case 'software':
                console.log(`软件：${root.getFullText()}`);
                break;
            case 'note':
                
            default:
                // console.log(name)
                break;
        }
        root.forEachChildNodes((child, index, array) => MxNodeRender.render(child));
    }
}