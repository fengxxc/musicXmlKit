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
    var Render = /** @class */ (function () {
        function Render(musicXmlNode, quill, config) {
            this.setMxn(musicXmlNode).setQuill(quill).setConfig(config);
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
        Render.prototype.setConfig = function (config) {
            this.config = config;
            return this;
        };
        Render.prototype.getConfig = function () {
            return this.config;
        };
        Render.prototype.main = function () {
            var _this = this;
            var spw = this.mxn.getChildNodesByName('score-partwise')[0];
            var parts = spw.Part();
            parts.forEach(function (part) { return _this.renderPart(part); });
        };
        Render.prototype.renderPart = function (part) {
            var _this = this;
            this.posX = this.config.PaddingLeft;
            this.posY = this.config.PaddingTop;
            this.firstMeasureOfLine = true;
            part.forEachChildNodes(function (measure) { return _this.renderMeasure(measure); });
        };
        /**
         * 渲染一小节
         * @param {MeasureNode} measure
         * @memberof Render
         */
        Render.prototype.renderMeasure = function (measure) {
            var _this = this;
            var q = this.getQuill();
            var attributes = measure.Attributes();
            var clefs = attributes.Clef();
            clefs.forEach(function (clef, index) {
                var sign = clef.Sign();
                var signLine = clef.Line();
                // 几线谱，根据staff-details > staff-lines判断 TODO
                var lineCount = sign == 'TAB' ? 6 : 5;
                // 1. 渲染小节开始分割线
                q.drawLine(_this.posX, _this.posY, _this.posX, _this.posY + (lineCount - 1) * _this.config.LineSpace, 1, 'black');
                if (_this.firstMeasureOfLine) { // 如果是每行起始小节
                    // 2. 谱号连接线
                    if (index != 0) {
                        q.drawLine(_this.posX, _this.posY, _this.posX, _this.posY - _this.config.ClefSpace, 1, 'black');
                    }
                    // 3. 渲染本小节的线谱
                    q.drawHorizontalLines(_this.posX, _this.posY, _this.config.PageWidth - 2 * _this.config.PaddingRight, _this.config.LineSpace, 1, 'black', lineCount);
                    _this.step();
                    // 4. 渲染谱号
                    _this.renderClefSign(sign, signLine, lineCount);
                    // q.drawPoint(this.posX + this.config.NoteGroupSpace, this.posY + 4*this.config.LineSpace - (signLine-1)*this.config.LineSpace, 2, 'red');
                    // 5. 渲染音调符号
                    _this.renderKeySign(attributes.KeyFifths(), attributes.KeyMode(), sign, signLine);
                    // 6. 渲染拍号
                    _this.renderBeats(attributes.TimeBeats(), attributes.TimeBeatType(), sign);
                }
                // 坐标换行
                _this.enter();
            });
        };
        Render.prototype.renderBeats = function (beats, beatsType, clefSign) {
            if (clefSign == 'TAB')
                return;
            this.quill.drawBeats(this.posX, this.posY, 4, 8, 4 * this.config.LineSpace);
            this.step();
            this.quill.drawPoint(this.posX, this.posY, 2.5, 'red');
        };
        Render.prototype.renderKeySign = function (fifths, mode, clefSign, clefLine) {
            var _this = this;
            /**
             * musicXml中fifths值说明：
             * 数字     大调    小调
             * 0        C       A
             * 1        G       E
             * 2        D       B
             * 3        A       #F
             * 4        E       #C
             * 5/-7     B/bC    #G/bA
             * 6/-6     #F/bG   #D/bE
             * 7/-5     #C/bD   #A/bB
             * -4       bA/F    F
             * -3       bE      C
             * -2       bB      G
             * -1       F       D
             */
            if (clefSign == 'TAB')
                return;
            var posG = {
                /**
                 * key是fifths值，正数代表是'#'，负数代表'b'
                 * value是数组；后面的数字代表位置在五线谱上第几线（+.5就是间）
                 */
                '0': [],
                '1': [5],
                '2': [3.5, 5],
                '3': [3.5, 5, 5.5],
                '4': [3.5, 4, 5, 5.5],
                '5': [2.5, 3.5, 4, 5, 5.5],
                '6': [2.5, 3.5, 4, 4.5, 5, 5.5],
                '7': [2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                '-7': [1.5, 2, 2.5, 3, 3.5, 4, 4.5],
                '-6': [2, 2.5, 3, 3.5, 4, 4.5],
                '-5': [2, 2.5, 3, 4, 4.5],
                '-4': [2.5, 3, 4, 4.5],
                '-3': [2.5, 3, 4.5],
                '-2': [3, 4.5],
                '-1': [3]
            };
            // F4: -1; C3: -0.5; C4: +0.5
            var pos = posG[fifths];
            if (clefSign + clefLine == 'F4') {
                pos = posG[fifths].map(function (p) { return p - 1; });
            }
            else if (clefSign + clefLine == 'C3') {
                pos = posG[fifths].map(function (p) { return p - 0.5; });
            }
            else if (clefSign + clefLine == 'C4') {
                pos = posG[fifths].map(function (p) { return p + 0.5; });
            }
            this.posY += 4 * this.config.LineSpace;
            pos.forEach(function (p) {
                // TODO
                _this.quill.drawTransp(_this.posX, _this.posY - (p - 1) * _this.config.LineSpace, constant_1.Constant.SHARP);
            });
            this.step();
        };
        Render.prototype.renderClefSign = function (sign, signLine, lineCount) {
            var y = this.posY + 4 * this.config.LineSpace - (signLine - 1) * this.config.LineSpace;
            if (sign == 'TAB' && lineCount == 6)
                y += this.config.LineSpace / 2;
            this.quill.drawClef(this.posX, y, sign);
            this.step();
        };
        Render.prototype.step = function () {
            this.posX += this.config.NoteGroupSpace;
            // 如果水平超出
            if (this.posX > this.config.PageWidth - 2 * this.config.PaddingRight) {
                // 就换行
                this.enter();
            }
        };
        Render.prototype.enter = function () {
            this.posX = this.config.PaddingLeft;
            this.posY += this.config.ClefSpace;
        };
        return Render;
    }());
    exports.Render = Render;
});
//# sourceMappingURL=render.js.map