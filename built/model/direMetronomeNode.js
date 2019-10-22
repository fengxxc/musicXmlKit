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
    var DireMetronomeNode = /** @class */ (function (_super) {
        __extends(DireMetronomeNode, _super);
        function DireMetronomeNode(_index, parentNode, name, attr) {
            var _this = _super.call(this, _index, parentNode, name, attr) || this;
            var dt = _super.prototype.getChildNodesByName.call(_this, 'direction-type');
            if (dt.length != 0) {
                var m = dt[0].getChildNodesByName('metronome');
                if (m.length != 0)
                    _this.tempMetronome = m[0];
            }
            return _this;
        }
        /* transformOf(directionElementNode: Node) {
            const node = directionElementNode;
            this = new DireMetronomeNode(node.getParentNode(), node.getName(), );
        } */
        DireMetronomeNode.prototype.Directive = function () {
            return _super.prototype.getAttr.call(this)['directive'];
        };
        DireMetronomeNode.prototype.Parentheses = function () {
            throw new Error("Method not implemented.");
        };
        DireMetronomeNode.prototype.DefaultY = function () {
            throw new Error("Method not implemented.");
        };
        DireMetronomeNode.prototype.BeatUnit = function () {
            throw new Error("Method not implemented.");
        };
        DireMetronomeNode.prototype.PerMinute = function () {
            throw new Error("Method not implemented.");
        };
        return DireMetronomeNode;
    }(node_1.Node));
    exports.DireMetronomeNode = DireMetronomeNode;
});
//# sourceMappingURL=direMetronomeNode.js.map