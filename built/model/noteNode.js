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
    var NoteNode = /** @class */ (function (_super) {
        __extends(NoteNode, _super);
        function NoteNode(index, parentNode, name, attr) {
            var _this = _super.call(this, index, parentNode, name, attr) || this;
            _this.tempRest = null;
            _this.tempPitch = null;
            _this.tempNotations = null;
            return _this;
        }
        // @overwrite
        NoteNode.prototype.chord = function () {
            return _super.prototype.getChildNodesByName.call(this, 'chord').length == 0;
        };
        // @overwrite
        NoteNode.prototype.Rest = function () {
            return (this.tempRest == null) ? (this.tempRest = (_super.prototype.getChildNodesByName.call(this, 'rest').length != 0)) : this.tempRest;
        };
        // @overwrite
        NoteNode.prototype.PitchStep = function () {
            if (this.Rest())
                return null;
            if (this.tempPitch == null)
                this.tempPitch = _super.prototype.getChildNodesByName.call(this, 'pitch');
            if (this.tempPitch.length == 0)
                return null;
            var s = this.tempPitch[0].getChildNodesByName('step');
            return s.length == 0 ? null : s[0].getFullText();
        };
        // @overwrite
        NoteNode.prototype.PitchOctave = function () {
            if (this.Rest())
                return null;
            if (this.tempPitch == null)
                this.tempPitch = _super.prototype.getChildNodesByName.call(this, 'pitch');
            if (this.tempPitch.length == 0)
                return null;
            var o = this.tempPitch[0].getChildNodesByName('octave');
            return o.length == 0 ? null : parseInt(o[0].getFullText());
        };
        // @overwrite
        NoteNode.prototype.PitchAlter = function () {
            if (this.Rest())
                return null;
            if (this.tempPitch == null)
                this.tempPitch = _super.prototype.getChildNodesByName.call(this, 'pitch');
            if (this.tempPitch.length == 0)
                return null;
            var a = this.tempPitch[0].getChildNodesByName('alter');
            return a.length == 0 ? null : parseInt(a[0].getFullText());
        };
        // @overwrite
        NoteNode.prototype.Duration = function () {
            var d = _super.prototype.getChildNodesByName.call(this, 'duration');
            return d.length == 0 ? null : parseInt(d[0].getFullText());
        };
        // @overwrite
        NoteNode.prototype.TieType = function () {
            var t = _super.prototype.getChildNodesByName.call(this, 'tie');
            return t.length == 0 ? '' : t[0].getAttr()['type'];
        };
        // @overwrite
        NoteNode.prototype.Voice = function () {
            var v = _super.prototype.getChildNodesByName.call(this, 'voice');
            return v.length == 0 ? null : parseInt(v[0].getFullText());
        };
        // @overwrite
        NoteNode.prototype.Type = function () {
            var t = _super.prototype.getChildNodesByName.call(this, 'type');
            return t.length == 0 ? null : t[0].getFullText();
        };
        // @overwrite
        NoteNode.prototype.Stem = function () {
            var s = _super.prototype.getChildNodesByName.call(this, 'stem');
            return s.length == 0 ? null : s[0].getFullText();
        };
        // @overwrite
        NoteNode.prototype.Notehead = function () {
            var n = _super.prototype.getChildNodesByName.call(this, 'notehead');
            return n.length == 0 ? null : n[0].getFullText();
        };
        // @overwrite
        NoteNode.prototype.Staff = function () {
            var s = _super.prototype.getChildNodesByName.call(this, 'staff');
            return s.length == 0 ? null : parseInt(s[0].getFullText());
        };
        NoteNode.prototype.NotationsDynamics = function () {
            if (this.tempNotations == null)
                this.tempNotations = _super.prototype.getChildNodesByName.call(this, 'notations');
            if (this.tempNotations.length == 0)
                return '';
            var d = this.tempNotations[0].getChildNodesByName('dynamics');
            if (d.length == 0)
                return '';
            var dc = d[0].getChildNodes();
            if (dc.length == 0)
                return '';
            return dc[0].getName();
        };
        // @overwrite
        NoteNode.prototype.NotationsTechString = function () {
            if (this.tempNotations == null)
                this.tempNotations = _super.prototype.getChildNodesByName.call(this, 'notations');
            if (this.tempNotations.length == 0)
                return null;
            var t = this.tempNotations[0].getChildNodesByName('technical');
            if (t.length == 0)
                return null;
            var s = t[0].getChildNodesByName('string');
            if (s.length == 0)
                return null;
            return parseInt(s[0].getFullText());
        };
        // @overwrite
        NoteNode.prototype.NotationsTechFret = function () {
            if (this.tempNotations == null)
                this.tempNotations = _super.prototype.getChildNodesByName.call(this, 'notations');
            if (this.tempNotations.length == 0)
                return null;
            var t = this.tempNotations[0].getChildNodesByName('technical');
            if (t.length == 0)
                return null;
            var f = t[0].getChildNodesByName('fret');
            if (f.length == 0)
                return null;
            return parseInt(f[0].getFullText());
        };
        return NoteNode;
    }(node_1.Node));
    exports.NoteNode = NoteNode;
});
//# sourceMappingURL=noteNode.js.map