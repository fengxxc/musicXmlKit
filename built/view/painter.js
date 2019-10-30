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
        define(["require", "exports", "./constant"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constant_1 = require("./constant");
    /**
     * 基础画笔
     * 原点在左下角
     * @class Pen
     */
    var Pen = /** @class */ (function () {
        function Pen(ctx) {
            this.ctx = ctx;
        }
        /**
         * 画 点
         * @param context, 横坐标, 纵坐标, 半径, 颜色
         */
        Pen.DrawPoint = function (ctx, x, y, r, color) {
            var style = ctx.fillStyle;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = style;
        };
        /**
         * 画 两点间连线线
         * @param context, 始横坐标, 始纵坐标, 终横坐标, 终纵坐标, 线宽度, 颜色
         */
        Pen.DrawLine = function (ctx, x, y, x2, y2, lineWidth, color) {
            var style = ctx.strokeStyle;
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
            ctx.strokeStyle = style;
        };
        /**
         * 画 图片 原点在左下角
         * @param context, image, 原点横坐标, 原点纵坐标, 宽度, 高度
         */
        Pen.DrawImage = function (ctx, img, x, y, w, h) {
            ctx.beginPath();
            ctx.drawImage(img, x, y - h, w, h);
            ctx.closePath();
        };
        Pen.DrawText = function (ctx, x, y, text, font, textBaseline) {
            ctx.font = font;
            ctx.textBaseline = textBaseline;
            ctx.fillText(text, x, y);
        };
        Pen.prototype.drawPoint = function (x, y, r, color) {
            Pen.DrawPoint(this.ctx, x, y, r, color);
            return this;
        };
        Pen.prototype.drawLine = function (x, y, x2, y2, lineWidth, color) {
            Pen.DrawLine(this.ctx, x, y, x2, y2, lineWidth, color);
            return this;
        };
        Pen.prototype.drawImage = function (img, x, y, w, h) {
            Pen.DrawImage(this.ctx, img, x, y, w, h);
            return this;
        };
        Pen.prototype.drawText = function (x, y, text, font, textBaseline) {
            Pen.DrawText(this.ctx, x, y, text, font, textBaseline);
        };
        Pen.prototype.context = function () {
            return this.ctx;
        };
        return Pen;
    }());
    exports.Pen = Pen;
    /**
     * 画谱子的画笔（还是个羽毛笔耶(＾－＾)V）
     * 原点在左下角
     * @class Quill
     * @extends {Pen}
     */
    var Quill = /** @class */ (function (_super) {
        __extends(Quill, _super);
        function Quill(ctx, imgObjs) {
            var _this = _super.call(this, ctx) || this;
            _this.imgObjs = imgObjs;
            return _this;
        }
        /**
         * 画几条水平线 原点在左上角
         * @param {Number} x
         * @param {Number} y
         * @param {Number} lineLength 线长
         * @param {Number} lineSpace 线间距
         * @param {Number} lineWidth 线宽
         * @param {String} lineColor 线颜色
         * @param {Number} lineCont 几条横线
         * @memberof Quill
         */
        Quill.prototype.drawHorizontalLines = function (x, y, lineLength, lineSpace, lineWidth, lineColor, lineCont) {
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            for (var i = 0, _y = y; i < lineCont; i++, _y += lineSpace) {
                ctx.moveTo(x, _y);
                ctx.lineTo(x + lineLength, _y);
            }
            ctx.stroke();
            ctx.closePath();
            return this;
        };
        /**
         * 画 音符头 原点在中心
         * @param {Number} x
         * @param {Number} y
         * @param {Number} lineSpace 线之间的距离
         * @param {Boolean} [hollow=false] 是否空心
         * @memberof Quill
         */
        Quill.prototype.drawNoteHead = function (x, y, lineSpace, hollow) {
            if (hollow === void 0) { hollow = false; }
            var note = this.imgObjs.NOTE_HEAD;
            if (hollow)
                note = this.imgObjs.NOTE_HEAD_HOLLOW;
            /* 将图片转成合适的尺寸 */
            var w = note.width / 2.3;
            var h = note.height / 2;
            _super.prototype.drawImage.call(this, note, x - w / 2, y - h + lineSpace / 2, w, h);
            return this;
        };
        /**
         * 画 谱号 原点在手绘起笔处
         * @param {Number} x
         * @param {Number} y
         * @param {String} [sign='G'] 谱号类型 'G' | 'F' | 'C' | 'TAB'
         * @param {Number} h 指定高度，若null则为原始高度
         * @memberof Quill
         */
        Quill.prototype.drawClef = function (x, y, sign, h) {
            if (sign === void 0) { sign = 'G'; }
            switch (sign) {
                case 'G':
                    this.drawClefG(x, y, h);
                    break;
                case 'F':
                    this.drawClefF(x, y, h);
                    break;
                case 'C':
                    this.drawClefC(x, y, h);
                    break;
                case 'TAB':
                    this.drawClefTAB(x, y, h);
                    break;
                default:
                    break;
            }
            return this;
        };
        Quill.prototype.drawClefG = function (x, y, h) {
            var clefHeightSpe = 0.64; // G谱号中心点距顶部 与 G谱号高度的比值
            var img = this.imgObjs['CLEF_G'], _y = null;
            var coe = img.height / img.width;
            h = h ? h : img.height;
            // _y = y - h * clefHeightSpe + h;
            _y = y + (h - h * clefHeightSpe);
            var w = h / coe;
            var _x = x - w / 2;
            _super.prototype.drawImage.call(this, img, _x, _y, w, h);
            return this;
        };
        Quill.prototype.drawClefF = function (x, y, h) {
            var clefHeightSpe = 0.317; // F谱号中心点距顶部 与 F谱号高度的比值
            var img = this.imgObjs['CLEF_F'], _y = null;
            var coe = img.height / img.width;
            h = h ? h : img.height;
            // _y = y + h * clefHeightSpe;
            _y = y + (h - h * clefHeightSpe);
            var w = h / coe;
            var _x = x - w / 2;
            _super.prototype.drawImage.call(this, img, _x, _y, w, h);
            return this;
        };
        Quill.prototype.drawClefC = function (x, y, h) {
            var clefHeightSpe = 0.769; // C谱号中心点距顶部 与 C谱号高度的比值
            var img = this.imgObjs['CLEF_C'], _y = null;
            var coe = img.height / img.width;
            h = h ? h : img.height;
            _y = y + (h - h * clefHeightSpe);
            var w = h / coe;
            var _x = x - w / 2;
            _super.prototype.drawImage.call(this, img, _x, _y, w, h);
            return this;
        };
        Quill.prototype.drawClefTAB = function (x, y, h) {
            var clefHeightSpe = 0;
            var img = this.imgObjs['CLEF_TAB'], _y = null;
            var coe = img.height / img.width;
            h = h ? h : img.height / 2;
            _y = y + (h - h * clefHeightSpe);
            var w = h / coe;
            var _x = x - w / 2;
            _super.prototype.drawImage.call(this, img, _x, _y, w, h);
            return this;
        };
        /**
         * 画 符点
         * @param {Number} x
         * @param {Number} y
         * @param {String} color
         * @memberof Quill
         */
        Quill.prototype.drawDot = function (x, y, color) {
            _super.prototype.drawPoint.call(this, x, y, 2, color);
            return this;
        };
        /**
         * 画 升降符号 原点在左中
         * @param {Number} x
         * @param {Number} y
         * @param {String} type '#' | 'b'
         * @memberof Quill
         */
        Quill.prototype.drawTransp = function (x, y, type) {
            var img = null, w = 0, h = 0;
            if (type === constant_1.Constant.SHARP) // #
                img = this.imgObjs.SHARP;
            else if (type === constant_1.Constant.FLAT) // b
                img = this.imgObjs.FLAT;
            /* 将图片转成合适的尺寸 */
            w = img.width / 4;
            h = img.width / 2;
            _super.prototype.drawImage.call(this, img, x, y + h / 2, w, h);
            return this;
        };
        /**
         * 画 八分音符符尾 原点在手绘起笔处
         * @param {Number} x
         * @param {Number} y
         * @param {Number} forward 1:up; -1:down
         */
        Quill.prototype.drawNoteTail = function (x, y, forward) {
            var img = this.imgObjs.NOTE8_TAIL;
            var oX = x, oY = y;
            /* 将图片转成合适的尺寸 */
            var w = img.width / 2.5, h = img.height / 2;
            if (forward < 0) {
                img = this.imgObjs.NOTE8_TAIL_REV;
                oY = y - h;
            }
            _super.prototype.drawImage.call(this, img, oX, oY, w, h);
            return this;
        };
        Quill.prototype.drawBeats = function (x, y, beats, beatsType, h) {
            var fontSize = h / 2;
            var _font = 'bold ' + fontSize + "px Microsoft JhengHei";
            _super.prototype.drawText.call(this, x, y, beatsType + '', _font, 'bottom');
            _super.prototype.drawText.call(this, x, y - fontSize, beats + '', _font, 'bottom');
        };
        return Quill;
    }(Pen));
    exports.Quill = Quill;
});
//# sourceMappingURL=painter.js.map