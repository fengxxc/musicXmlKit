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
    var MusicXmlVisitor = /** @class */ (function () {
        function MusicXmlVisitor() {
        }
        // @overwrite
        MusicXmlVisitor.prototype.visit = function (node) {
            var name = node.getName();
            switch (name) {
                case 'score-partwise':
                    console.log("score-partwise\u7248\u672C\uFF1A" + node.getAttr()['version']);
                    break;
                case 'encoding-date':
                    console.log("\u7F16\u7801\u65E5\u671F\uFF1A" + node.getFullText());
                    break;
                case 'software':
                    console.log("\u8F6F\u4EF6\uFF1A" + node.getFullText());
                    break;
                // case 'note':
                default:
                    // console.log(name)
                    break;
            }
        };
        return MusicXmlVisitor;
    }());
    exports.MusicXmlVisitor = MusicXmlVisitor;
});
