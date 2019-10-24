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
    exports.Constant = {
        /* 图片路径 */
        ImgSrc: {
            NOTE1: './img/合适尺寸/全音符.png',
            // NOTE2: './img/合适尺寸/二分音符.png',
            // NOTE4: './img/合适尺寸/四分音符.png',
            // NOTE8: './img/合适尺寸/八分音符.png',
            CLEF_G: './img/合适尺寸/G谱号.png',
            CLEF_C: './img/合适尺寸/C谱号.png',
            CLEF_F: './img/合适尺寸/F谱号.png',
            NOTE_HEAD: './img/合适尺寸/四分音符头.png',
            NOTE_HEAD_HOLLOW: './img/合适尺寸/二分音符头.png',
            NOTE8_TAIL: './img/合适尺寸/八分音符尾1.png',
            NOTE8_TAIL_REV: './img/合适尺寸/八分音符尾2.png',
            SHARP: './img/合适尺寸/升调.png',
            FLATS: './img/合适尺寸/降调.png',
        },
        CLEF_C_SPE: 0.769,
        DOT_R: 1.5,
        LINE_SPACE: 10,
        SHARP: '#',
        FLAT: 'b'
    };
});
//# sourceMappingURL=constant.js.map