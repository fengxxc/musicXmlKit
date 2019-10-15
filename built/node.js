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
        function Node(parentNode, name, attr) {
            this.parentNode = parentNode;
            this.rootNode = (parentNode ? parentNode.getRootNode() : this);
            this.name = name;
            this.attr = attr;
            this.isDoubleTag = true;
            this.childNodes = [];
            this.text = '';
            this._childNameIndex = {};
            this._childAttrIndex = {};
        }
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
            this.appendChildIndex(node);
            return this;
        };
        Node.prototype.appendChildIndex = function (node) {
            var _a;
            // name index
            var name = node.getName();
            if (name in this._childNameIndex) {
                this._childNameIndex[name].push(node);
            }
            else {
                this._childNameIndex[name] = [node];
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
                        this._childAttrIndex[attrK][attrV].push(node);
                    else
                        this._childAttrIndex[attrK][attrV] = [node];
                else
                    this._childAttrIndex[attrK] = (_a = {}, _a[attrV] = [node], _a);
            }
        };
        Node.prototype.getChildNodesByName = function (name) {
            return this._childNameIndex[name];
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
        return Node;
    }());
    exports.Node = Node;
});
//# sourceMappingURL=node.js.map