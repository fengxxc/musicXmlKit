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
            this.name = name;
            this.attr = attr;
            this.isDoubleTag = true;
            this.childNodes = [];
            this.text = '';
            this._childNameIndex = {};
        }
        Node.prototype.getParentNode = function () {
            return this.parentNode;
        };
        Node.prototype.setParentNode = function (parentNode) {
            this.parentNode = parentNode;
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
        Node.prototype.setChildNodes = function (childNodes) {
            this.childNodes = [];
            this.addChileNodes(childNodes);
            return this;
        };
        Node.prototype.addChileNodes = function (childNodes) {
            var _this = this;
            childNodes.forEach(function (node) { return _this.addChileNode(node); });
            return this;
        };
        Node.prototype.addChileNode = function (childNode) {
            this.childNodes.push(childNode);
            this.appendChildIndex(childNode);
            return this;
        };
        Node.prototype.appendChildIndex = function (childNode) {
            var name = childNode.getName();
            var index = this.childNodes.length - 1;
            /* if (name in this._childNameIndex) {
                if (typeof(this._childNameIndex[name]) == 'number')
                    this._childNameIndex[name] = [this._childNameIndex[name]];
                this._childNameIndex[name].push(index);
            } else {
                this._childNameIndex[name] = index;
            } */
            if (name in this._childNameIndex) {
                this._childNameIndex[name].push(index);
            }
            else {
                this._childNameIndex[name] = [index];
            }
        };
        Node.prototype.getChildNodesByName = function (name) {
            var _this = this;
            var indexs = this._childNameIndex[name];
            return indexs.map(function (i) { return _this.childNodes[i]; });
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