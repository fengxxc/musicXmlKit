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
    exports.Utils = {
        /**
         * async loading image
         * @param {Object} imgSrc such as { name: 'aa/bb.png', ... }
         * @param {Function} callback
         */
        loadImgs: function (imgSrc, callback) {
            /**
             * callback param is imgObjs
             * imgObjs such as { name: imgDom, ... }
             */
            var imgObjs = {};
            for (var name_1 in imgSrc) {
                if (imgSrc.hasOwnProperty(name_1)) {
                    var src = imgSrc[name_1];
                    var entity = new Image();
                    entity.src = src;
                    imgObjs[name_1] = entity;
                }
            }
            var timer = setInterval(function () {
                var complete = true;
                for (var name_2 in imgObjs) {
                    if (!imgObjs[name_2].complete) {
                        complete = false;
                        break;
                    }
                }
                if (complete) {
                    clearInterval(timer);
                    if (callback)
                        callback.call(callback, imgObjs);
                }
            }, 20);
        }
    };
});
//# sourceMappingURL=Utils.js.map