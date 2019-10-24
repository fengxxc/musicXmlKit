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
        define(["require", "exports", "./Node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Node_1 = require("./Node");
    var MeasureNode = /** @class */ (function (_super) {
        __extends(MeasureNode, _super);
        function MeasureNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeasureNode.prototype.Number = function () {
            try {
                return parseInt(_super.prototype.getAttr.call(this)['number']);
            }
            catch (error) {
                return null;
            }
        };
        MeasureNode.prototype.Attributes = function () {
            try {
                return _super.prototype.getChildNodesByName.call(this, 'attributes')[0];
            }
            catch (error) {
                return null;
            }
        };
        MeasureNode.prototype.displayEntities = function () {
            var exclude = this.Attributes();
            return _super.prototype.getChildNodes.call(this).filter(function (node) { return exclude != node; });
        };
        return MeasureNode;
    }(Node_1.Node));
    exports.MeasureNode = MeasureNode;
});
//# sourceMappingURL=measureNode.js.map