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
    var DireOctaveShiftNode = /** @class */ (function (_super) {
        __extends(DireOctaveShiftNode, _super);
        function DireOctaveShiftNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DireOctaveShiftNode.prototype.Size = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'direction-type')[0].getChildNodesByName('octave-shift')[0].getAttr()['size']);
            }
            catch (error) {
                return null;
            }
        };
        DireOctaveShiftNode.prototype.Type = function () {
            try {
                return _super.prototype.getChildNodesByName.call(this, 'direction-type')[0].getChildNodesByName('octave-shift')[0].getAttr()['type'];
            }
            catch (error) {
                return '';
            }
        };
        return DireOctaveShiftNode;
    }(node_1.Node));
    exports.DireOctaveShiftNode = DireOctaveShiftNode;
});
//# sourceMappingURL=direOctaveShiftNode.js.map