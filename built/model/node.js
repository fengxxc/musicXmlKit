(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Node = /** @class */ (function () {
        function Node(index, parentNode, name, attr) {
            this.index = index;
            this.parentNode = parentNode;
            this.rootNode = (parentNode ? parentNode.getRootNode() : this);
            this.name = name;
            this.attr = attr || {};
            this.isDoubleTag = true;
            this.childNodes = [];
            this.text = '';
            this._childNameIndex = {};
            this._childAttrIndex = {};
        }
        Node.prototype.getIndex = function () {
            return this.index;
        };
        Node.prototype.setIndex = function (_index) {
            this.index = _index;
            return this;
        };
        Node.prototype.getParentNode = function () {
            return this.parentNode;
        };
        Node.prototype.setParentNode = function (parentNode) {
            this.parentNode = parentNode;
            return this;
        };
        Node.prototype.getRootNode = function () {
            return this.rootNode;
        };
        Node.prototype.setRootNode = function (rootNode) {
            this.rootNode = rootNode;
            return this;
        };
        Node.prototype.getName = function () {
            return this.name;
        };
        Node.prototype.setName = function (name) {
            this.name = name;
            return this;
        };
        Node.prototype.getAttr = function () {
            return this.attr;
        };
        Node.prototype.setAttr = function (attr) {
            this.attr = attr;
            return this;
        };
        Node.prototype.putAttr = function (k, v) {
            this.attr[k] = v;
            return this;
        };
        Node.prototype.getIsDoubleTag = function () {
            return this.isDoubleTag;
        };
        Node.prototype.setIsDoubleTag = function (isDoubleTag) {
            this.isDoubleTag = isDoubleTag;
            return this;
        };
        Node.prototype.getChildNodes = function () {
            return this.childNodes;
        };
        Node.prototype.setChildNodes = function (nodes) {
            this.childNodes = [];
            this.addChileNodes(nodes);
            return this;
        };
        Node.prototype.addChileNodes = function (nodes) {
            var _this = this;
            nodes.forEach(function (node) { return _this.addChileNode(node); });
            return this;
        };
        Node.prototype.addChileNode = function (node) {
            this.childNodes.push(node);
            var index = this.childNodes.length - 1;
            this.appendChildIndex(node, index);
            return this;
        };
        Node.prototype.putChildNode = function (index, childNode) {
            this.childNodes[index] = childNode;
            return this;
        };
        Node.prototype.getChildSize = function () {
            return this.childNodes.length;
        };
        Node.prototype.appendChildIndex = function (node, index) {
            var _a;
            // name index
            var name = node.getName();
            if (name in this._childNameIndex) {
                this._childNameIndex[name].push(index);
            }
            else {
                this._childNameIndex[name] = [index];
            }
            // attr index
            var attrs = node.getAttr();
            for (var attrK in attrs) {
                if (!attrs.hasOwnProperty(attrK))
                    continue;
                var attrV = attrs[attrK];
                // id 特殊处理，索引加到全局上
                if (attrK === 'id') {
                    var root = this.getRootNode();
                    root.appendIdIndex(attrV, node);
                    continue;
                }
                if (attrK in this._childAttrIndex)
                    if (attrV in this._childAttrIndex[attrK])
                        this._childAttrIndex[attrK][attrV].push(index);
                    else
                        this._childAttrIndex[attrK][attrV] = [index];
                else
                    this._childAttrIndex[attrK] = (_a = {}, _a[attrV] = [index], _a);
            }
        };
        Node.prototype.getChildNodesIndexByName = function (name) {
            if (name in this._childNameIndex)
                return this._childNameIndex[name];
            return [];
        };
        Node.prototype.getChildNodesByName = function (name) {
            var _this = this;
            return this.getChildNodesIndexByName(name).map(function (index) { return _this.childNodes[index]; });
        };
        Node.prototype.forEachChildNodes = function (fn) {
            this.getChildNodes().forEach(function (child, index, array) { return fn(child, index, array); });
        };
        Node.prototype.getText = function () {
            return this.text;
        };
        Node.prototype.setText = function (text) {
            this.text = text;
            return this;
        };
        Node.prototype.getFullText = function () {
            var t = [];
            this.forEachChildNodes(function (child) { return t.push(child.getFullText()); });
            return this.getText() + t.join('');
        };
        /**
         * 替换节点，包装新类型
         * @static
         * @param {Node} source
         * @param {Node} target new T<? extends Node>()
         * @memberof Node
         */
        Node.replace = function (source, target) {
            target.setIndex(source.getIndex())
                .setName(source.getName())
                .setAttr(source.getAttr())
                .setParentNode(source.getParentNode())
                .setChildNodes(source.getChildNodes())
                .setRootNode(source.getRootNode());
            source.getParentNode().putChildNode(source.getIndex(), target);
            source.forEachChildNodes(function (child) { return child.setParentNode(target); });
            source = null;
        };
        Node.toTreeString = function (nodes, prefix, emptyTab, lineSeparator) {
            var BRANCH = '├─ ';
            var LAST_BRANCH = "└─ ";
            var TAB = "│" + emptyTab;
            var str = [''];
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                var pref = prefix + BRANCH;
                var subPref = prefix + TAB;
                if (i == nodes.length - 1) {
                    pref = prefix + LAST_BRANCH;
                    subPref = prefix + emptyTab;
                }
                var attr = Object.keys(n.getAttr()).length > 0 ? ' ' + JSON.stringify(n.getAttr()) : '';
                var text = n.getText() ? ': "' + n.getText() + '"' : '';
                str.push(pref, n.getName(), attr, text, lineSeparator);
                str.push(this.toTreeString(n.getChildNodes(), subPref, emptyTab, lineSeparator));
            }
            return str.join('');
        };
        Node.prototype.toTreeString = function (emptyTab, lineSeparator) {
            return Node.toTreeString([this], '', emptyTab, lineSeparator);
        };
        return Node;
    }());
    exports.Node = Node;
});
//# sourceMappingURL=node.js.map