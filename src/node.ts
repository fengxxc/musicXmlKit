import { RootNode } from "./rootNode";

export class Node {
    private parentNode: Node;
    private rootNode: RootNode;
    private name: string;
    private attr: Object; // json
    private isDoubleTag: boolean;
    private childNodes: Node[]; // 这货存在的意义就是，ts里尚无有序集合，摔
    private text: string;

    // json as: Map<string, number[]> {name: [index], name2: [index2, index3]} 待优化...
    private _childNameIndex: Record<string, Node[]>;
    private _childAttrIndex: Record<string, Record<string, Node[]>>;

    constructor(parentNode: Node, name: string, attr: Object) {
        this.parentNode = parentNode;
        this.rootNode = <RootNode>(parentNode ? parentNode.getRootNode() : this);
        this.name = name;
        this.attr = attr;
        this.isDoubleTag = true;
        this.childNodes = [];
        this.text = '';
        this._childNameIndex = {};
        this._childAttrIndex = {};
    }

    getParentNode() {
        return this.parentNode;
    }
    setParentNode(parentNode: Node) {
        this.parentNode = parentNode;
        return this;
    }

    getRootNode() {
        return this.rootNode;
    }
    setRootNode(rootNode: RootNode) {
        this.rootNode = rootNode;
        return this;
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    getAttr() {
        return this.attr;
    }
    setAttr(attr: Object) {
        this.attr = attr;
        return this;
    }
    putAttr(k: string, v: string) {
        this.attr[k] = v;
        return this;
    }

    getIsDoubleTag() {
        return this.isDoubleTag;
    }
    setIsDoubleTag(isDoubleTag: boolean) {
        this.isDoubleTag = isDoubleTag;
        return this;
    }

    getChildNodes() {
        return this.childNodes;
    }
    setChildNodes(nodes: Node[]) {
        this.childNodes = [];
        this.addChileNodes(nodes);
        return this;
    }
    addChileNodes(nodes: Node[]) {
        nodes.forEach(node => this.addChileNode(node));
        return this;
    }
    addChileNode(node: Node) {
        this.childNodes.push(node);
        this.appendChildIndex(node);
        return this;
    }

    appendChildIndex(node: Node) {
        // name index
        const name: string = node.getName();
        if (name in this._childNameIndex) {
            this._childNameIndex[name].push(node);
        } else {
            this._childNameIndex[name] = [node];
        }

        // attr index
        const attrs: Object = node.getAttr();
        for (const attrK in attrs) {
            if (!attrs.hasOwnProperty(attrK)) continue;
            const attrV = attrs[attrK];
            // id 特殊处理，索引加到全局上
            if (attrK === 'id') {
                const root: RootNode = this.getRootNode();
                root.appendIdIndex(attrV, node);
                continue;
            }
            if (attrK in this._childAttrIndex) 
                if (attrV in this._childAttrIndex[attrK]) 
                    this._childAttrIndex[attrK][attrV].push(node);
                else 
                    this._childAttrIndex[attrK][attrV] = [node];
            else 
                this._childAttrIndex[attrK] = {[attrV] : [node]};
            
        }
    }
    getChildNodesByName(name: string): Node[] {
        return this._childNameIndex[name];
    }

    forEachChildNodes(fn: (child: Node, index: number, array: Node[]) => void) {
        this.getChildNodes().forEach((child: Node, index: number, array: Node[]) => fn(child, index, array));
    }

    getText() {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
        return this;
    }

    getFullText() {
        let t: string[] = [];
        this.forEachChildNodes(child => t.push(child.getFullText()));
        return this.getText() + t.join('');
    }

}
