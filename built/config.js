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
    var Config = /** @class */ (function () {
        function Config(canvas) {
            this.pageWidth = canvas.clientWidth;
            this.pageHeight = canvas.clientHeight;
            this.paddingTop = 10.5;
            this.paddingRight = 10.5;
            this.paddingBottom = 10.5;
            this.paddingLeft = 10.5;
            this.lineSpace = 10;
            this.clefSpace = 80;
            this.noteGroupSpace = 20;
        }
        Object.defineProperty(Config.prototype, "PageWidth", {
            get: function () {
                return this.pageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "PageHeight", {
            get: function () {
                return this.pageHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "PaddingTop", {
            get: function () {
                return this.paddingTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "PaddingRight", {
            get: function () {
                return this.paddingRight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "PaddingBottom", {
            get: function () {
                return this.paddingBottom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "PaddingLeft", {
            get: function () {
                return this.paddingLeft;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "LineSpace", {
            get: function () {
                return this.lineSpace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "ClefSpace", {
            get: function () {
                return this.clefSpace;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Config.prototype, "NoteGroupSpace", {
            get: function () {
                return this.noteGroupSpace;
            },
            enumerable: true,
            configurable: true
        });
        return Config;
    }());
    exports.Config = Config;
});
//# sourceMappingURL=config.js.map