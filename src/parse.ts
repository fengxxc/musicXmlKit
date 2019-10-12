import { Node } from "./node";

export class Parser {
    static parseXml(xmlStr: string) {
        const chars = xmlStr.trim().replace(/\n/g, '');
        let curTag: string = '';
        let curAttrs: Object = null;
        let nodeStack: Node[] = [new Node(null, '_root_', {}, null, null, null)];
        let i = 0; // char index
        while (i < chars.length) {
            // parse tag
            if (chars.charAt(i) == '<') {
                i++;
                if (chars.charAt(i) == '?') {
                    // parse xml 头部声明
                    i++;
                    let declare = '';
                    for (; i < chars.length && chars.charAt(i) != '?'; i++) declare += chars.charAt(i);
                    if (chars.charAt(i) + chars.charAt(i + 1) != '?>') {
                        console.error(`Parse xml error: 声明标签未正确闭合： <? ... chars.charAt(i) + chars.charAt(i+1)`);
                        return null;
                    }
                    nodeStack[nodeStack.length - 1].putAttr('declare', declare.trim());
                    i += 2;
                } else if (chars.charAt(i) == '!') {
                    i++;
                    let doctype = '';
                    for (; i < chars.length && chars.charAt(i) != '>'; i++) doctype += chars.charAt(i);
                    nodeStack[nodeStack.length - 1].putAttr('doctype', doctype.trim());
                    i++;
                } else if (chars.charAt(i) == '/') {
                    // parse 双标签之 闭合标签
                    i++;
                    let _curTag = '';
                    for (; i < chars.length && chars.charAt(i) != '>'; i++) _curTag += chars.charAt(i);
                    const node = nodeStack.pop();
                    if (node.getName() !== _curTag.trim()) {
                        console.error(`Parse xml error: 标签未正确闭合: <${node.getName()}> ... </${_curTag.trim()}>`);
                        return null;
                    }
                    nodeStack[nodeStack.length - 1].addChileNodes(node);
                    curTag = '', curAttrs = null;
                    i++;
                } else {
                    for (; i < chars.length && chars.charAt(i) != ' ' && chars.charAt(i) != '/' && chars.charAt(i) != '>'; i++)
                        curTag += chars.charAt(i);

                    // over space
                    for (; i < chars.length && chars.charAt(i) == ' '; i++) {}

                    // parse attrbute
                    curAttrs = parseAttrbutes(); // result json or null

                    if (chars.charAt(i) + chars.charAt(i + 1) == '/>') {
                        // parse 单标签
                        i++;
                        const node = new Node(nodeStack[nodeStack.length - 1], curTag, curAttrs, false, null, null);
                        nodeStack[nodeStack.length - 1].addChileNodes(node);
                    } else {
                        // parse 双标签之 开始标签 (chars.charAt(i) == '>')
                        const node = new Node(nodeStack[nodeStack.length - 1], curTag, curAttrs, true, null, null);
                        nodeStack.push(node);
                    }
                    i++;
                    curTag = '', curAttrs = null;
                }
                // over space
                for (; i < chars.length && chars.charAt(i) == ' '; i++) {}
                continue;
            }

            // parse text
            let text = '';
            for (; i < chars.length && chars.charAt(i) != '<'; i++) text += chars.charAt(i);
            const node = new Node(nodeStack[nodeStack.length - 1], '_text_', null, false, null, text.trim());
            nodeStack[nodeStack.length - 1].addChileNodes(node);
        }

        function parseAttrbutes() {
            const start = i;
            for (; i < chars.length && chars.charAt(i) != '/' && chars.charAt(i) != '>'; i++) {}
            return start == i ?
                null : JSON.parse('{"' + chars.slice(start, i).trim().replace(/"\s+/g, '","').replace(/\s*=\s*"/g, '":"') + '}');
        }

        return nodeStack[0];
    }
} 