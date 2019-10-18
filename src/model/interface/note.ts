import { Node } from "../node";

export interface Note {
    chord(): boolean;

    /**
     * 休止符，此为true的话，Pitch相关的就为空
     * @returns {boolean}
     * @memberof Note
     */
    Rest(): boolean;

    /**
     * 音名
     * @returns {string}
     * @memberof Note
     */
    PitchStep(): string;

    /**
     * 八度
     * @returns {number}
     * @memberof Note
     */
    PitchOctave(): number;

    /**
     * 升降调 ♯: 1; ♭: -1
     * @returns {number}
     * @memberof Note
     */
    PitchAlter(): number; //

    /**
     * 时长
     * @returns {number}
     * @memberof Note
     */
    Duration(): number;

    /**
     * 音轨？
     * @returns {number}
     * @memberof Note
     */
    Voice(): number;

    /**
     * 几分音符, 4分音符: 'quarter'; 8分音符: 'eighth'
     * @returns {string}
     * @memberof Note
     */
    Type(): string;
    
    /**
     * 符干方向 'up' | 'down'
     *
     * @returns {string}
     * @memberof Note
     */
    Stem(): string;

    Notehead(): string;

    /**
     * 在哪个五线谱上
     * @returns {number}
     * @memberof Note
     */
    Staff(): number;
    
    /**
     * 力度, 'ppp' | 'pp' | 'p' | 'mp' | 'mf' | 'f' | 'ff' | 'fff' ...
     * @returns {string}
     * @memberof Note
     */
    NotationsDynamics(): string;

    /**
     * （吉他、贝斯...）几弦
     * @returns {number}
     * @memberof Note
     */
    NotationsTechString() : number;

    /**
     * （吉他、贝斯...）几品
     * @returns {number}
     * @memberof Note
     */
    NotationsTechFret() : number;
}