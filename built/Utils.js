var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * async loading image
     * @param {Object} imgSrc such as { name: 'aa/bb.png', ... }
     * @param {Function} callback
     */
    Utils.loadImgs = function (imgSrc, callback) {
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
    };
    Utils.ajaxGetSync = function (url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.overrideMimeType("text/html;charset=utf-8");
        xhr.send();
        return xhr.responseText;
    };
    Utils.ajaxGetAsync = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.overrideMimeType("text/html;charset=utf-8");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.responseText);
            }
        };
    };
    Utils.getFileSync = function (filePathname) {
        return Utils.ajaxGetSync(filePathname);
    };
    Utils.getFileAsync = function (filePathname, callback) {
        Utils.ajaxGetAsync(filePathname, function (res) {
            callback(res);
        });
    };
    return Utils;
}());
export { Utils };
//# sourceMappingURL=utils.js.map