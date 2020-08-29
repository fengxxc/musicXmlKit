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
}