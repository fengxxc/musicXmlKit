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
var DireWedgeNode = /** @class */ (function (_super) {
    __extends(DireWedgeNode, _super);
    function DireWedgeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DireWedgeNode.prototype.Type = function () {
        try {
            return _super.prototype.getChildNodesByName.call(this, 'direction-type')[0].getChildNodesByName('wedge')[0].getAttr()['type'];
        }
        catch (error) {
            return '';
        }
    };
    return DireWedgeNode;
}(Node));
export { DireWedgeNode };
//# sourceMappingURL=direWedgeNode.js.map