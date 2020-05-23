import { Node } from "./node";
import { RootNode } from "./rootNode";
import { SorePartWiseNode } from "./sorePartWiseNode";
import { MeasureNode } from "./measureNode";
import { NoteNode } from "./noteNode";
import { DireMetronomeNode } from "./direMetronomeNode";
import { AttributesNode, ClefNode } from "./attributesNode";

export class Parser {
    static parseXml(
        xmlStr: string, 
        initNodeCallback: (index: number, parent: Node, tag: string, attrs: Object) => Node, 
        mountNodeCallback: (node: Node) => void
    ): RootNode {
        const chars = xmlStr.trim().replace(/\n/g, '');
        let curTag: string = '';
        let curAttrs: Object = null;
        const root: RootNode = new RootNode(0, null, '_root_', {});
        let parent: Node = root;
        let i = 0; // char index
        while (i < chars.length) {
            // parse tag
            if (chars.charAt(i) == '<') {
                i++;
                if (chars.charAt(i) == '?') { /* <? ... ?> */
                    // parse xml 头部声明
                    i++;
                    let declare = '';
                    for (; i < chars.length && chars.charAt(i) != '?'; i++) declare += chars.charAt(i);
                    if (chars.charAt(i) + chars.charAt(i + 1) != '?>') {
                        console.error(`Parse xml error: 声明标签未正确闭合： <? ... chars.charAt(i) + chars.charAt(i+1)`);
                        return null;
                    }
                    parent.putAttr('declare', declare.trim());
                    i += 2;
                } else if (chars.charAt(i) == '!') { /* '<! ... >' */
                    i++;
                    let doctype = '';
                    for (; i < chars.length && chars.charAt(i) != '>'; i++) doctype += chars.charAt(i);
                    parent.putAttr('doctype', doctype.trim());
                    i++;
                } else if (chars.charAt(i) == '/') { /* '</ .. >' */
                    // parse 双标签之 闭合标签
                    i++;
                    let _curTag = '';
                    for (; i < chars.length && chars.charAt(i) != '>'; i++) _curTag += chars.charAt(i);
                    let node = parent;
                    parent = node.getParentNode();
                    if (node.getName() !== _curTag.trim()) {
                        console.error(`Parse xml error: 标签未正确闭合: <${node.getName()}> ... </${_curTag.trim()}>`);
                        return null;
                    }
                    if (mountNodeCallback) {
                        mountNodeCallback(node);
                    }
                    curTag = '', curAttrs = null;
                    i++;
                } else { /*  < ... /> | < ... >  */
                    for (; i < chars.length && chars.charAt(i) != ' ' && chars.charAt(i) != '/' && chars.charAt(i) != '>'; i++)
                        curTag += chars.charAt(i);

                    // over  space | tab | c return | linefeed
                    for (; i < chars.length && /\s|\t|(\r\n)|\n/.test(chars.charAt(i)); i++) {}

                    // parse attrbute
                    curAttrs = parseAttrbutes(); // result json or null
                    // if (curTag == 'metronome') debugger;
                    let node: Node;
                    if (initNodeCallback) 
                        node = initNodeCallback(parent.getChildSize(), parent, curTag, curAttrs);
                    else 
                        node = new Node(parent.getChildSize(), parent, curTag, curAttrs);
                    if (chars.charAt(i) + chars.charAt(i + 1) == '/>') { // < ... />
                        // parse 单标签
                        i++;
                        node.setIsDoubleTag(false);
                        parent.addChileNode(node);
                    } else { // < ... >
                        // parse 双标签之 开始标签 (chars.charAt(i) == '>')
                        node.setIsDoubleTag(true);
                        parent.addChileNode(node);
                        parent = node;
                    }
                    i++;
                    curTag = '', curAttrs = null;
                }
                // over  space | tab | c return | linefeed
                for (; i < chars.length && /\s|\t|(\r\n)|\n/.test(chars.charAt(i)); i++) {}
                continue;
            }

            // parse text
            let text: string = '';
            for (; i < chars.length && chars.charAt(i) != '<'; i++) text += chars.charAt(i);
            const node = new Node(parent.getChildSize(), parent, '_text_', null).setText(text.trim()).setIsDoubleTag(false);
            parent.addChileNode(node);
        }

        function parseAttrbutes(): Object {
            const start = i;
            for (; i < chars.length && chars.charAt(i) != '/' && chars.charAt(i) != '>'; i++) {}
            return start == i ?
                null : JSON.parse('{"' + chars.slice(start, i).trim().replace(/"\s+/g, '","').replace(/\s*=\s*"/g, '":"') + '}');
        }

        return <RootNode>root;
    }

    static parseMusicXml(xmlStr: string): RootNode {
        return Parser.parseXml(xmlStr, (index: number, parent: Node, tag: string, attrs: Object) => {
            let res: Node;
            switch (tag) {
                case 'score-partwise':
                    res = new SorePartWiseNode(index, parent, tag, attrs);
                    break;
                case 'measure':
                    res = new MeasureNode(index, parent, tag, attrs);
                    break;
                case 'note':
                    res = new NoteNode(index, parent, tag, attrs);
                    break;
                case 'metronome':
                    /* let direNode: Node = parent.getParentNode();
                    const newDireNode = new DireMetronomeNode(direNode.getIndex(), direNode.getParentNode(), direNode.getName(), direNode.getAttr());
                    Node.replace(parent.getParentNode(), newDireNode); */
                    const direNode: Node = parent.getParentNode();
                    Node.replace(direNode, new DireMetronomeNode());
                    res = new Node(index, parent, tag, attrs);
                    break;
                case 'attributes':
                    res = new AttributesNode(index, parent, tag, attrs);
                    break;
                case 'clef':
                    res = new ClefNode(index, parent, tag, attrs);
                    break;
                default:
                    res = new Node(index, parent, tag, attrs);
                    break;
            }
            return res;
        }, node => {
            // let res: Node = node;
            /* switch (node.getName()) {
                case 'metronome':
                    // const direNode: Node = node.getParentNode().getParentNode();
                    // Node.replace(direNode, new DireMetronomeNode());
                    break;
                default:
                    break;
            } */
            // return res;
        });
    }
} 