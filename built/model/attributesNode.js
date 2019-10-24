var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_1 = require("./node");
    var AttributesNode = /** @class */ (function (_super) {
        __extends(AttributesNode, _super);
        function AttributesNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AttributesNode.prototype.Divisions = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'divisions')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        AttributesNode.prototype.KeyFifths = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'key')[0].getChildNodesByName('fifths')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        AttributesNode.prototype.KeyMode = function () {
            try {
                return _super.prototype.getChildNodesByName.call(this, 'key')[0].getChildNodesByName('mode')[0].getFullText();
            }
            catch (error) {
                return '';
            }
        };
        AttributesNode.prototype.TimeBeats = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'time')[0].getChildNodesByName('beats')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        AttributesNode.prototype.TimeBeatType = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'time')[0].getChildNodesByName('beat-type')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        AttributesNode.prototype.Staves = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'staves')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        AttributesNode.prototype.Clef = function () {
            try {
                return _super.prototype.getChildNodesByName.call(this, 'clef');
            }
            catch (error) {
                return null;
            }
        };
        return AttributesNode;
    }(node_1.Node));
    exports.AttributesNode = AttributesNode;
    var ClefNode = /** @class */ (function (_super) {
        __extends(ClefNode, _super);
        function ClefNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClefNode.prototype.Number = function () {
            try {
                return parseInt(_super.prototype.getAttr.call(this)['number']);
            }
            catch (error) {
                return null;
            }
        };
        ClefNode.prototype.Sign = function () {
            try {
                return _super.prototype.getChildNodesByName.call(this, 'sign')[0].getFullText();
            }
            catch (error) {
                return null;
            }
        };
        ClefNode.prototype.Line = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'line')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        return ClefNode;
    }(node_1.Node));
    exports.ClefNode = ClefNode;
});
//# sourceMappingURL=attributesNode.js.map