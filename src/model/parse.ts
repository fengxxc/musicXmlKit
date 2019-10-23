import { Node } from "./node";
import { RootNode } from "./rootNode";

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

                    // over space
                    for (; i < chars.length && chars.charAt(i) == ' '; i++) {}

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
                // over space
                for (; i < chars.length && chars.charAt(i) == ' '; i++) {}
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
} 