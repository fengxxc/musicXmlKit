export const Utils = {
    /**
     * async loading image
     * @param {Object} imgSrc such as { name: 'aa/bb.png', ... }
     * @param {Function} callback
     */
    loadImgs: (imgSrc: Object, callback: (imgObjs: Record<string, HTMLImageElement>) => void) => {
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

}