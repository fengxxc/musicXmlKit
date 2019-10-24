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
    var Render = /** @class */ (function () {
        function Render(musicXmlNode, quill) {
            this.setMxn(musicXmlNode).setQuill(quill);
        }
        Render.prototype.setMxn = function (mxn) {
            this.mxn = mxn;
            return this;
        };
        Render.prototype.getMxn = function () {
            return this.mxn;
        };
        Render.prototype.setQuill = function (quill) {
            this.quill = quill;
            return this;
        };
        Render.prototype.getQuill = function () {
            return this.quill;
        };
        Render.prototype.main = function () {
            var _this = this;
            var spw = this.mxn.getChildNodesByName('score-partwise')[0];
            var parts = spw.Part();
            parts.forEach(function (part) { return _this.renderPart(part); });
        };
        Render.prototype.renderPart = function (part) {
            var _this = this;
            this.posX = 10.5;
            this.posY = 10.5;
            part.forEachChildNodes(function (measure) { return _this.renderMeasure(measure); });
        };
        Render.prototype.renderMeasure = function (measure) {
            var _this = this;
            var q = this.getQuill();
            var attributes = measure.Attributes();
            var clefs = attributes.Clef();
            clefs.forEach(function (clef) {
                var sign = clef.Sign();
                var line = clef.Line();
                q.drawHorizontalLines(_this.posX, _this.posY, 30, 10, 1, 'black', 5);
            });
        };
        return Render;
    }());
    exports.Render = Render;
});
//# sourceMappingURL=render.js.map