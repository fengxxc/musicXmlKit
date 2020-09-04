export default class RenderHelper {

    /**
     * 获取音符在五线谱上的位置
     * 例如：在一线上，返回就是1；在一间上，返回就是1.5；在下加一线上，返回就是0
     * @param step 本音符的音名
     * @param octave 本音符在第几个八度
     * @param clefSign 本小节谱号
     * @param clefLine 本小节谱号所在第几线上
     */
    static getLineByPitchSign(step: string, octave: number, clefSign: string, clefLine: number): number {
        let res: number = 0;
        // 获取step相对于'C'的ASCII距离，如step等于'E'，结果为2
        const letterDistance4C = ({'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6})[step.toUpperCase()];
        const C1_ON_G2_POS: number = -10.5; // G谱号（谱号在2线上）的C1: -10.5
        res = C1_ON_G2_POS + (letterDistance4C) * 0.5; // 音名 Get √
        res += (octave - 1) * 7 * 0.5; // 几个八度 Get √
        // 根据谱号偏移 
        if (clefSign == 'G') {
            res += 0 + (clefLine - 2);
        } else if (clefSign == 'F') {
            res += 6 + (clefLine - 4);
        } else if (clefSign == 'C') {
            res += 3 + (clefLine - 3);
        } // Get √
        return res;
    }


    /**
     * 计算：设4分音符长度为1，在一组连体音符中有多少个4分音符长度
     * @static
     * @param {number} beats 一小节有几拍
     * @param {number} beatType 以几分音符为一拍
     * @returns
     * @memberof Render
     */
    static computeQuarterCountInSiamesed(beats: number, beatType: number) {
        // const eighthCount: number = 8 / down * up;
        if (beatType >= 8)
            if (beats % 3 == 0) return 1.5;
            else return 1;
        else if (beatType >= 4)
            return 1;
        else
            return 2;
    }

    /**
     * 计算：音符有多少条尾巴(或者有多少条符杠)
     * @static
     * @param {boolean} isDot 是附点音符吗
     * @param {number} duration 持续时间长度。我的理解是：该音符是几个dicisions，所以，dutation / dicisions的值，就是几个4分音符的时值长度
     * @param {number} divisions 本小节每个4分音符的分割数。我的理解是：本小节时值最小的元素占一个四分音符的几分之一
     * @returns
     * @memberof RenderHelper
     */
    static computeTailCount(isDot: boolean, duration: number, divisions: number) {
        const durationWithoutDot: number = isDot ? duration * 2 / 3 : duration;
        return Math.log(0.5 / (durationWithoutDot / divisions)) / Math.log(2) + 1;
    }
}