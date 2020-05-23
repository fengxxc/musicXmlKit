import { RootNode } from "./rootNode";

export class Node {
    // 在父节点中的孩子索引， 从0开始
    private index: number;
    private parentNode: Node;
    private rootNode: RootNode;
    private name: string;
    private attr: Object; // json
    private isDoubleTag: boolean;
    private childNodes: Node[];
    private text: string;

    // json as: Map<string, number[]> {name: [index], name2: [index2, index3]} 待优化...
    private _childNameIndexer: Record<string, number[]>;
    private _childAttrIndex: Record<string, Record<string, number[]>>;

    constructor(index?: number, parentNode?: Node, name?: string, attr?: Object) {
        this.index = index;
        this.parentNode = parentNode;
        this.rootNode = <RootNode>(parentNode ? parentNode.getRootNode() : this);
        this.name = name;
        this.attr = attr || {};
        this.isDoubleTag = true;
        this.childNodes = [];
        this.text = '';
        this._childNameIndexer = {};
        this._childAttrIndex = {};
    }

    getIndex(): number {
        return this.index;
    }
    setIndex(_index: number): Node {
        this.index = _index;
        return this;
    }

    getParentNode(): Node {
        return this.parentNode;
    }
    setParentNode(parentNode: Node): Node {
        this.parentNode = parentNode;
        return this;
    }

    getRootNode(): RootNode {
        return this.rootNode;
    }
    setRootNode(rootNode: RootNode): Node {
        this.rootNode = rootNode;
        return this;
    }

    getName(): string {
        return this.name;
    }
    setName(name: string): Node {
        this.name = name;
        return this;
    }
    
    getAttr(): Object {
        return this.attr;
    }
    setAttr(attr: Object): Node {
        this.attr = attr;
        return this;
    }
    putAttr(k: string, v: string): Node {
        this.attr[k] = v;
        return this;
    }

    getIsDoubleTag(): boolean {
        return this.isDoubleTag;
    }
    setIsDoubleTag(isDoubleTag: boolean): Node {
        this.isDoubleTag = isDoubleTag;
        return this;
    }

    getChildNodes(): Node[] {
        return this.childNodes;
    }
    setChildNodes(nodes: Node[]): Node {
        this.childNodes = [];
        this.addChileNodes(nodes);
        return this;
    }
    addChileNodes(nodes: Node[]): Node {
        nodes.forEach(node => this.addChileNode(node));
        return this;
    }
    addChileNode(node: Node): Node {
        this.childNodes.push(node);
        const index = this.childNodes.length - 1;
        this.appendChildIndex(node, index);
        return this;
    }
    putChildNode(index: number, childNode: Node): Node {
        this.childNodes[index] = childNode;
        return this;
    }
    getChildSize(): number {
        return this.childNodes.length;
    }

    appendChildIndex(node: Node, index: number): void {
        // name index
        const name: string = node.getName();
        if (name in this._childNameIndexer) {
            this._childNameIndexer[name].push(index);
        } else {
            this._childNameIndexer[name] = [index];
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
                    this._childAttrIndex[attrK][attrV].push(index);
                else 
                    this._childAttrIndex[attrK][attrV] = [index];
            else 
                this._childAttrIndex[attrK] = { [attrV]: [index]};
            
        }
    }
    protected getChildNodesIndexByName(name: string): number[] {
        if (name in this._childNameIndexer) 
            return this._childNameIndexer[name];
        return [];
    }
    getChildNodesByName(name: string): Node[] {
        return this.getChildNodesIndexByName(name).map((index) => this.childNodes[index]);
    }

    forEachChildNodes(fn: (child: Node, index: number, array: Node[]) => void): void {
        this.getChildNodes().forEach((child: Node, index: number, array: Node[]) => fn(child, index, array));
    }

    getText(): string {
        return this.text;
    }

    setText(text: string): Node {
        this.text = text;
        return this;
    }

    getFullText(): string {
        let t: string[] = [];
        this.forEachChildNodes(child => t.push(child.getFullText()));
        return this.getText() + t.join('');
    }

    /**
     * 替换节点，包装新类型
     * @static
     * @param {Node} source
     * @param {Node} target new T<? extends Node>()
     * @memberof Node
     */
    static replace(source: Node, target: Node) {
        target.setIndex(source.getIndex())
                .setName(source.getName())
                .setAttr(source.getAttr())
                .setParentNode(source.getParentNode())
                .setChildNodes(source.getChildNodes())
                .setRootNode(source.getRootNode());
        source.getParentNode().putChildNode(source.getIndex(), target);
        source.forEachChildNodes(child => child.setParentNode(target));
        source = null;
    }

    static toTreeString(nodes: Node[], prefix: string, emptyTab: string, lineSeparator: string): string {
        let BRANCH = "├─ ";
        let LAST_BRANCH = "└─ ";
        let TAB = "│" + emptyTab;

        let str = [''];
        for (let i = 0; i < nodes.length; i++) {
            let n = nodes[i];
            let pref = prefix + BRANCH;
            let subPref = prefix+TAB;
            if (i == nodes.length-1) {
                pref = prefix + LAST_BRANCH;
                subPref = prefix + emptyTab;
            }
            const attr = Object.keys(n.getAttr()).length > 0 ? ' '+JSON.stringify(n.getAttr()) : '';
            const text = n.getText() ? ': "' + n.getText() + '"' : '';
            str.push(pref, n.getName(), attr, text,  lineSeparator);
            str.push(this.toTreeString(n.getChildNodes(), subPref, emptyTab, lineSeparator));
        }
        return str.join('');
    }

    toTreeString(emptyTab: string, lineSeparator: string): string {
        return Node.toTreeString([this], '', emptyTab, lineSeparator);
    }
}
