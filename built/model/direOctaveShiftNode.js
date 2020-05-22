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
}(Node));
export { DireOctaveShiftNode };
//# sourceMappingURL=direOctaveShiftNode.js.map