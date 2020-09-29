import { Node } from "../node";
import { Durational } from "./durational";

export interface Note extends Durational {
    /**
     * 与上一个音构成和弦，单标签
     */
    Chord(): boolean;

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
     * 延音线， 'start' | 'end'
     * @returns {string}
     * @memberof Note
     */
    TieType(): string;

    // lyric() TODO

    /**
     * 音轨？
     * @returns {number}
     * @memberof Note
     */
    Voice(): number;

    /**
     * 几分音符
     * 二全: 'breve'; 全: 'whole'; 2分: 'half'; 4分: 'quarter'; 8分: 'eighth'; 
     * 16分: '16th'; 32分: '32th'; 64分: '64th'; 128分: '128th'; 
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

    /**
     * 非椭圆形的音符头 'x' | ...
     */
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

    /**
     * 有符点吗？
     * @returns {boolean}
     * @memberof Note
     */
    Dot() : boolean;

    Beams() : string[];
}