import { Node } from "../node";

export interface Note {
    chord(): boolean;
    Rest(): boolean; // 休止符，此为true的话，Pitch相关的就为空
    PitchStep(): string; // 音名
    PitchOctave(): number; // 八度
    PitchAlter(): number; // ♯: 1; ♭: -1
    Duration(): number; // 时长
    Voice(): number; // ?
    Type(): string; // 几分音符, 4分音符: 'quarter'; 8分音符: 'eighth'
    Stem(): string;
    Notehead(): string;
    Staff(): number; // 在哪个五线谱上
    NotationsDynamics(): string; // 力度, 'ppp' | 'pp' | 'p' | 'mp' | 'mf' | 'f' | 'ff' | 'fff' ...
    NotationsTechString() : number; // （吉他、贝斯...）几弦
    NotationsTechFret() : number; // （吉他、贝斯...）几品
}