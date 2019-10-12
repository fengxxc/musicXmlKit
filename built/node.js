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
        function Node(parentNode, name, attr, isDoubleTag, childNodes, text) {
            this.parentNode = parentNode;
            this.name = name;
            this.attr = attr;
            this.isDoubleTag = isDoubleTag == null ? true : isDoubleTag;
            this.childNodes = childNodes || [];
            this.text = text || '';
        }
        Node.prototype.getParentNode = function () {
            return this.parentNode;
        };
        Node.prototype.setParentNode = function (parentNode) {
            this.parentNode = parentNode;
        };
        Node.prototype.getName = function () {
            return this.name;
        };
        Node.prototype.setName = function (name) {
            this.name = name;
        };
        Node.prototype.getAttr = function () {
            return this.attr;
        };
        Node.prototype.setAttr = function (attr) {
            this.attr = attr;
        };
        Node.prototype.putAttr = function (k, v) {
            this.attr[k] = v;
        };
        Node.prototype.getIsDoubleTag = function () {
            return this.isDoubleTag;
        };
        Node.prototype.setIsDoubleTag = function (isDoubleTag) {
            this.isDoubleTag = isDoubleTag;
        };
        Node.prototype.getChildNodes = function () {
            return this.childNodes;
        };
        Node.prototype.setChildNodes = function (childNodes) {
            this.childNodes = childNodes;
        };
        Node.prototype.addChileNodes = function (childNode) {
            this.childNodes.push(childNode);
        };
        Node.prototype.forEachChildNodes = function (func) {
            this.getChildNodes().forEach(function (child, index, array) { return func(child, index, array); });
        };
        Node.prototype.getText = function () {
            return this.text;
        };
        Node.prototype.setText = function (text) {
            this.text = text;
        };
        Node.prototype.getFullText = function () {
            var t = [];
            this.getChildNodes().forEach(function (child) { return t.push(child.getFullText()); });
            return this.getText() + t.join('');
        };
        Node.prototype.accept = function (visitor) {
            visitor.visit(this);
        };
        return Node;
    }());
    exports.Node = Node;
});
