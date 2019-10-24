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
    var BackupNode = /** @class */ (function (_super) {
        __extends(BackupNode, _super);
        function BackupNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BackupNode.prototype.Duration = function () {
            try {
                return parseInt(_super.prototype.getChildNodesByName.call(this, 'duration')[0].getFullText());
            }
            catch (error) {
                return null;
            }
        };
        return BackupNode;
    }(node_1.Node));
    exports.BackupNode = BackupNode;
});
//# sourceMappingURL=backupNode.js.map