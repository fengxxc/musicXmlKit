import { Visitor } from "./visitor";

export class Node {
    private parentNode: Node;
    private name: string;
    private attr: Object; // json
    private isDoubleTag: boolean;
    private childNodes: Node[];
    private text: string;
    constructor(parentNode: Node, name: string, attr: Object, isDoubleTag: boolean, childNodes: Node[], text: string) {
        this.parentNode = parentNode;
        this.name = name;
        this.attr = attr;
        this.isDoubleTag = isDoubleTag == null ? true : isDoubleTag;
        this.childNodes = childNodes || [];
        this.text = text || '';
    }

    getParentNode() {
        return this.parentNode;
    }
    setParentNode(parentNode: Node) {
        this.parentNode = parentNode;
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    
    getAttr() {
        return this.attr;
    }
    setAttr(attr: Object) {
        this.attr = attr;
    }
    putAttr(k: string, v: string) {
        this.attr[k] = v;
    }

    getIsDoubleTag() {
        return this.isDoubleTag;
    }
    setIsDoubleTag(isDoubleTag: boolean) {
        this.isDoubleTag = isDoubleTag;
    }

    getChildNodes() {
        return this.childNodes;
    }
    setChildNodes(childNodes: Node[]) {
        this.childNodes = childNodes;
    }
    addChileNodes(childNode: Node) {
        this.childNodes.push(childNode);
    }

    forEachChildNodes(func: (child: Node, index: number, array: Node[]) => void) {
        this.getChildNodes().forEach((child: Node, index: number, array: Node[]) => func(child, index, array));
    }

    getText() {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }

    getFullText() {
        let t: string[] = [];
        this.getChildNodes().forEach(child => t.push(child.getFullText()));
        return this.getText() + t.join('');
    }


    accept(visitor: Visitor) {
        visitor.visit(this);
    }
}
