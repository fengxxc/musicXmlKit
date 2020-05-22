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
import { Node } from "./node.js";
var RootNode = /** @class */ (function (_super) {
    __extends(RootNode, _super);
    function RootNode(index, parentNode, name, attr) {
        var _this = _super.call(this, index, parentNode, name, attr) || this;
        _this.idIndex = {};
        return _this;
    }
    // overwrite
    RootNode.prototype.appendIdIndex = function (id, node) {
        if (id in this.idIndex) {
            // throw new Error(`id:"${id}"已存在`);
            this.idIndex[id].push(node);
            return;
        }
        this.idIndex[id] = [node];
    };
    // overwrite
    RootNode.prototype.getNodesById = function (id) {
        return this.idIndex[id];
    };
    return RootNode;
}(Node));
export { RootNode };
//# sourceMappingURL=rootNode.js.map