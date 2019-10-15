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
    var SorePartWiseNode = /** @class */ (function (_super) {
        __extends(SorePartWiseNode, _super);
        function SorePartWiseNode(parentNode, name, attr) {
            return _super.call(this, parentNode, name, attr) || this;
        }
        // @overwrite
        SorePartWiseNode.prototype.getIdentification = function () {
            return _super.prototype.getChildNodesByName.call(this, 'identification')[0];
        };
        // @overwrite
        SorePartWiseNode.prototype.getDefaults = function () {
            return _super.prototype.getChildNodesByName.call(this, 'defaults')[0];
        };
        // @overwrite
        SorePartWiseNode.prototype.getPartList = function () {
            return _super.prototype.getChildNodesByName.call(this, 'part-list');
        };
        // @overwrite
        SorePartWiseNode.prototype.getPart = function () {
            return _super.prototype.getChildNodesByName.call(this, 'part');
        };
        return SorePartWiseNode;
    }(node_1.Node));
    exports.SorePartWiseNode = SorePartWiseNode;
});
//# sourceMappingURL=sorePartWiseNode.js.map