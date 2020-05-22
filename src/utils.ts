export class Utils {
    /**
     * async loading image
     * @param {Object} imgSrc such as { name: 'aa/bb.png', ... }
     * @param {Function} callback
     */
    static loadImgs(imgSrc: Object, callback: (imgObjs: Record<string, HTMLImageElement>) => void) {
        /**
         * callback param is imgObjs
         * imgObjs such as { name: imgDom, ... }
         */
        let imgObjs = {};
        for (const name in imgSrc) {
            if (imgSrc.hasOwnProperty(name)) {
                const src = imgSrc[name];
                const entity = new Image();
                entity.src = src;
                imgObjs[name] = entity;
            }
        }
        const timer = setInterval(() => {
            let complete = true;
            for (const name in imgObjs) {
                if (!imgObjs[name].complete) {
                    complete = false;
                    break;
                }
            }
            if (complete) {
                clearInterval(timer);
                if (callback)
                    callback.call(callback, imgObjs);
            }
        }, 20)
    }

    static ajaxGetSync(url: string): string {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.overrideMimeType("text/html;charset=utf-8");
        xhr.send();
        return xhr.responseText;
    }

    static ajaxGetAsync(url: string, callback: (res: string) => void): void {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.overrideMimeType("text/html;charset=utf-8");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.responseText);
            }
        };
    }

    static getFileSync(filePathname: string): string {
        return Utils.ajaxGetSync(filePathname);
    }

    static getFileAsync(filePathname: string, callback: (res: string) => void): void {
        Utils.ajaxGetAsync(filePathname, (res: string) => {
            callback(res);
        });
    }

}