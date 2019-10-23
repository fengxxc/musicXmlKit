(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./node", "./rootNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = require("./node");
    var rootNode_1 = require("./rootNode");
    var Parser = /** @class */ (function () {
        function Parser() {
        }
        Parser.parseXml = function (xmlStr, initNodeCallback, mountNodeCallback) {
            var chars = xmlStr.trim().replace(/\n/g, '');
            var curTag = '';
            var curAttrs = null;
            var root = new rootNode_1.RootNode(0, null, '_root_', {});
            var parent = root;
            var i = 0; // char index
            while (i < chars.length) {
                // parse tag
                if (chars.charAt(i) == '<') {
                    i++;
                    if (chars.charAt(i) == '?') { /* <? ... ?> */
                        // parse xml 头部声明
                        i++;
                        var declare = '';
                        for (; i < chars.length && chars.charAt(i) != '?'; i++)
                            declare += chars.charAt(i);
                        if (chars.charAt(i) + chars.charAt(i + 1) != '?>') {
                            console.error("Parse xml error: \u58F0\u660E\u6807\u7B7E\u672A\u6B63\u786E\u95ED\u5408\uFF1A <? ... chars.charAt(i) + chars.charAt(i+1)");
                            return null;
                        }
                        parent.putAttr('declare', declare.trim());
                        i += 2;
                    }
                    else if (chars.charAt(i) == '!') { /* '<! ... >' */
                        i++;
                        var doctype = '';
                        for (; i < chars.length && chars.charAt(i) != '>'; i++)
                            doctype += chars.charAt(i);
                        parent.putAttr('doctype', doctype.trim());
                        i++;
                    }
                    else if (chars.charAt(i) == '/') { /* '</ .. >' */
                        // parse 双标签之 闭合标签
                        i++;
                        var _curTag = '';
                        for (; i < chars.length && chars.charAt(i) != '>'; i++)
                            _curTag += chars.charAt(i);
                        var node_2 = parent;
                        parent = node_2.getParentNode();
                        if (node_2.getName() !== _curTag.trim()) {
                            console.error("Parse xml error: \u6807\u7B7E\u672A\u6B63\u786E\u95ED\u5408: <" + node_2.getName() + "> ... </" + _curTag.trim() + ">");
                            return null;
                        }
                        if (mountNodeCallback) {
                            mountNodeCallback(node_2);
                        }
                        curTag = '', curAttrs = null;
                        i++;
                    }
                    else { /*  < ... /> | < ... >  */
                        for (; i < chars.length && chars.charAt(i) != ' ' && chars.charAt(i) != '/' && chars.charAt(i) != '>'; i++)
                            curTag += chars.charAt(i);
                        // over space
                        for (; i < chars.length && chars.charAt(i) == ' '; i++) { }
                        // parse attrbute
                        curAttrs = parseAttrbutes(); // result json or null
                        // if (curTag == 'metronome') debugger;
                        var node_3 = void 0;
                        if (initNodeCallback)
                            node_3 = initNodeCallback(parent.getChildSize(), parent, curTag, curAttrs);
                        else
                            node_3 = new node_1.Node(parent.getChildSize(), parent, curTag, curAttrs);
                        if (chars.charAt(i) + chars.charAt(i + 1) == '/>') { // < ... />
                            // parse 单标签
                            i++;
                            node_3.setIsDoubleTag(false);
                            parent.addChileNode(node_3);
                        }
                        else { // < ... >
                            // parse 双标签之 开始标签 (chars.charAt(i) == '>')
                            node_3.setIsDoubleTag(true);
                            parent.addChileNode(node_3);
                            parent = node_3;
                        }
                        i++;
                        curTag = '', curAttrs = null;
                    }
                    // over space
                    for (; i < chars.length && chars.charAt(i) == ' '; i++) { }
                    continue;
                }
                // parse text
                var text = '';
                for (; i < chars.length && chars.charAt(i) != '<'; i++)
                    text += chars.charAt(i);
                var node = new node_1.Node(parent.getChildSize(), parent, '_text_', null).setText(text.trim()).setIsDoubleTag(false);
                parent.addChileNode(node);
            }
            function parseAttrbutes() {
                var start = i;
                for (; i < chars.length && chars.charAt(i) != '/' && chars.charAt(i) != '>'; i++) { }
                return start == i ?
                    null : JSON.parse('{"' + chars.slice(start, i).trim().replace(/"\s+/g, '","').replace(/\s*=\s*"/g, '":"') + '}');
            }
            return root;
        };
        return Parser;
    }());
    exports.Parser = Parser;
});
//# sourceMappingURL=parse.js.map