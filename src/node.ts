
export class Node {
    private parentNode: Node;
    private name: string;
    private attr: Object; // json
    private isDoubleTag: boolean;
    private childNodes: Array<Node>;
    private text: string;
    // json as: Map<string, number[]> {name: [index], name2: [index2, index3]} 待优化...
    private _childNameIndex: Record<string, number[]>; 
    constructor(parentNode: Node, name: string, attr: Object) {
        this.parentNode = parentNode;
        this.name = name;
        this.attr = attr;
        this.isDoubleTag = true;
        this.childNodes = [];
        this.text = '';
        this._childNameIndex = {};
    }

    getParentNode() {
        return this.parentNode;
    }
    setParentNode(parentNode: Node) {
        this.parentNode = parentNode;
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
    setChildNodes(childNodes: Node[]) {
        this.childNodes = [];
        this.addChileNodes(childNodes);
        return this;
    }
    addChileNodes(childNodes: Node[]) {
        childNodes.forEach(node => this.addChileNode(node));
        return this;
    }
    addChileNode(childNode: Node) {
        this.childNodes.push(childNode);
        this.appendChildIndex(childNode);
        return this;
    }
    appendChildIndex(childNode: Node) {
        const name: string = childNode.getName();
        const index: number = this.childNodes.length-1;
        /* if (name in this._childNameIndex) {
            if (typeof(this._childNameIndex[name]) == 'number') 
                this._childNameIndex[name] = [this._childNameIndex[name]];
            this._childNameIndex[name].push(index);
        } else {
            this._childNameIndex[name] = index;
        } */
        if (name in this._childNameIndex) {
            this._childNameIndex[name].push(index);
        } else {
            this._childNameIndex[name] = [index];
        }
    }
    getChildNodesByName(name: string): Node[] {
        const indexs: number[] = this._childNameIndex[name];
        return indexs.map(i => this.childNodes[i]);
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
