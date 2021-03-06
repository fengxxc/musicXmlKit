import NoteRenderInfo from "./noteRenderInfo";

export default class RenderHelper {
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
     * -4       bA      F
     * -3       bE      C
     * -2       bB      G
     * -1       F       D
     */

    /**
     * 各五度的调号对应在五线谱上第几根线
     * @static
     * @type {Record<string, number[]>}
     * @memberof RenderHelper
     */
    public static FIFTH_TO_KEY_LINES_ON_G: Record<string, number[]> = {
        /**
         * key是fifths值，正数代表是'#'，负数代表'b'
         * value是数组；后面的数字代表位置在五线谱上第几线（+.5就是间）
         */
        '0' : [],
        '1' : [5],
        '2' : [5, 3.5],
        '3' : [5, 3.5, 5.5],
        '4' : [5, 3.5, 5.5, 4],
        '5' : [5, 3.5, 5.5, 4, 2.5],
        '6' : [5, 3.5, 5.5, 4, 2.5, 4.5],
        '7' : [5, 3.5, 5.5, 4, 2.5, 4.5, 3],
        '-7': [3, 4.5, 2.5, 4, 2, 3.5, 1.5],
        '-6': [3, 4.5, 2.5, 4, 2, 3.5],
        '-5': [3, 4.5, 2.5, 4, 2],
        '-4': [3, 4.5, 2.5, 4],
        '-3': [3, 4.5, 2.5],
        '-2': [3, 4.5],
        '-1': [3]
    }

    /**
     * 各五度的升降号信息
     * @static
     * @type {Record<string, Record<string, number>>}
     * @memberof RenderHelper
     */
    public static MEASURE_ALTER_SET: Record<string, Record<string, number>> = {
        '0' : {},
        '1' : {'F': 1},
        '2' : {'C': 1, 'F': 1},
        '3' : {'C':1, 'F':1, 'G':1},
        '4' : {'C':1, 'D':1, 'F':1, 'G':1},
        '5' : {'C':1, 'D':1, 'F':1, 'G':1, 'A':1},
        '6' : {'C':1, 'D':1, 'F':1, 'G':1, 'A':1},
        '7' : {'C':1, 'D':1, 'F':1, 'G':1, 'A':1},
        '-7': {'D':-1, 'E': -1, 'G': -1, 'A': -1, 'B': -1, 'C': -1, 'F': -1},
        '-6': {'D':-1, 'E': -1, 'G': -1, 'A': -1, 'B': -1, 'C': -1},
        '-5': {'D':-1, 'E': -1, 'G': -1, 'A': -1, 'B': -1},
        '-4': {'D':-1, 'E': -1, 'A': -1, 'B': -1},
        '-3': {'E': -1, 'B': -1, 'A': -1},
        '-2': {'E': -1, 'B': -1},
        '-1': {'B': -1}
    };

    /**
     * 获取音符在实际渲染中的升降符号信息
     * @static
     * @param {Record<string, number>} measureAlters 本小节属性：最新的升降信息
     * @param {string} noteStep 音符属性: 音名
     * @param {number} noteAlter 音符属性: 升降 (0: 还原; 1: 升; -1: 降)
     * @returns {[number, Record<string, number>]} 0: 还原; 1: 升; -1: 降; null: 没有符号
     * @memberof RenderHelper
     */
    static getNoteAlter(measureAlters: Record<string, number>, noteStep: string, noteAlter: number): [number, Record<string, number>] {
        if ((noteStep) in measureAlters) {
            if (!noteAlter) {
                // 小节开头已经画升降了，但此音符是还原音，需显式地画还原记号
                measureAlters[noteStep] = 0;
                return [0, measureAlters]; 
            }
            const subAlter: number = noteAlter - measureAlters[noteStep];
            if (subAlter == 0) {
                // 小节开头已经画升降了，就不用画升降号了
                return [null, measureAlters]; 
            } else {
                measureAlters[noteStep] = subAlter;
                return [subAlter, measureAlters];
            }
        } else {
            return [noteAlter, measureAlters];
        }
    }

    /**
     * 获取音符在五线谱上的位置
     * 例如：在一线上，返回就是1；在一间上，返回就是1.5；在下加一线上，返回就是0
     * @static
     * @param {string} step 本音符的音名
     * @param {number} octave 本音符在第几个八度
     * @param {string} clefSign 本小节谱号
     * @param {number} clefLine 本小节谱号所在第几线上
     * @returns {number}
     * @memberof RenderHelper
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
     * @returns {number}
     * @memberof Render
     */
    static computeQuarterCountInSiamesed(beats: number, beatType: number): number {
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
     * @returns {number}
     * @memberof RenderHelper
     */
    static computeTailCount(isDot: boolean, duration: number, divisions: number): number {
        if (duration <= 0) return 0;
        const durationWithoutDot: number = isDot ? duration * 2 / 3 : duration;
        return Math.log(0.5 / (durationWithoutDot / divisions)) / Math.log(2) + 1;
    }

    /**
     * 符杠倾斜角度的正切值
     * @static
     * @param {NoteRenderInfo} start
     * @param {NoteRenderInfo} end
     * @param {number} yStepDistance        y轴方向上前进一步（也就是换行）所需的距离
     * @param {number} noteBeamSlopeFactor  符杠倾斜系数 0~1
     * @returns {number}
     * @memberof RenderHelper
     */
    static computeBeamTangent(start: NoteRenderInfo, end: NoteRenderInfo, yStepDistance: number, noteBeamSlopeFactor: number): number {
        if (start.X == end.X) return 0; // 一个音符或者一组和弦音，不需要符杠，故返回0
        let endY = end.Y;
        if (end.ViewRow != start.ViewRow)
            endY -= (end.ViewRow - start.ViewRow) * yStepDistance;
        return (endY - start.Y) / (end.X - start.X) * noteBeamSlopeFactor;
    }

    /**
     * 计算音符头的宽度
     * @static
     * @param {number} lineSpace    谱线间距
     * @param {number} strokeWidth  符头的描边宽度
     * @param {number} angle        符头倾斜角度
     * @return {number}
     * @memberof RenderHelper
     */
    static computeNoteHeadWidth(lineSpace: number, strokeWidth: number, angle: number): number {
        const h = (lineSpace - strokeWidth) / 2;
        const rad = angle / 180 * Math.PI; // 转成弧度
        const ra: number = h / (2 * Math.sin(rad));
        const rb: number = Math.sqrt(3) * h / (2 * Math.cos(rad));
        return ra * Math.cos(rad) * Math.sqrt(1 + (Math.pow(rb, 2) * Math.pow(Math.tan(rad), 2) / Math.pow(ra, 2))) * 2 + strokeWidth * 2;
    }

    /**
     * 初始符杠基准点Y
     *
     * @static
     * @param {NoteRenderInfo[]} noteRenderInfos 一组连音音符的信息
     * @param {number} stemDire 符桿朝上吗？1 是下；-1是上
     * @param {number} tan 符杠倾斜角度的正切值
     * @param {number} noteStemHeight   符桿高度
     * @return {number}
     * @memberof RenderHelper
     */
    static computeTupletNotesBaseTailY(noteRenderInfos: NoteRenderInfo[], stemDire: number, tan: number, noteStemHeight: number): number {
        let high: NoteRenderInfo = noteRenderInfos[0], low: NoteRenderInfo = noteRenderInfos[0];
        // 符桿朝上就取最高的，朝下就取最低的
        for (let i = 1; i <= noteRenderInfos.length - 1; i++) {
            const nri: NoteRenderInfo = noteRenderInfos[i];
            if (nri.Y > low.Y)  low  = nri;
            if (nri.Y < high.Y) high = nri;
        }
        const target: NoteRenderInfo = stemDire == -1 ? high : low;
        return target.Y - (target.X - noteRenderInfos[0].X) * tan + (noteStemHeight * stemDire);
    }
}