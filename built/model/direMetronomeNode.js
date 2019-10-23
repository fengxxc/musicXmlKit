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
            _this.tempMetronome = null;
            var dt = _super.prototype.getChildNodesByName.call(_this, 'direction-type');
            if (dt.length != 0) {
                var m = dt[0].getChildNodesByName('metronome');
                if (m.length != 0)
                    _this.tempMetronome = m[0];
            }
            return _this;
        }
        DireMetronomeNode.prototype.Directive = function () {
            var attr = _super.prototype.getAttr.call(this);
            return 'directive' in attr ? attr['directive'] : '';
        };
        DireMetronomeNode.prototype.Parentheses = function () {
            if (this.tempMetronome == null)
                return '';
            var attr = this.tempMetronome.getAttr();
            return 'parentheses' in attr ? attr['parentheses'] : '';
        };
        DireMetronomeNode.prototype.DefaultY = function () {
            if (this.tempMetronome == null)
                return null;
            var attr = this.tempMetronome.getAttr();
            return 'default-y' in attr ? parseInt(attr['default-y']) : null;
        };
        DireMetronomeNode.prototype.BeatUnit = function () {
            if (this.tempMetronome == null)
                return '';
            var b = this.tempMetronome.getChildNodesByName('beat-unit');
            return b.length == 0 ? '' : b[0].getFullText();
        };
        DireMetronomeNode.prototype.PerMinute = function () {
            if (this.tempMetronome == null)
                return null;
            var b = this.tempMetronome.getChildNodesByName('per-minute');
            return b.length == 0 ? null : parseInt(b[0].getFullText());
        };
        return DireMetronomeNode;
    }(node_1.Node));
    exports.DireMetronomeNode = DireMetronomeNode;
});
//# sourceMappingURL=direMetronomeNode.js.map