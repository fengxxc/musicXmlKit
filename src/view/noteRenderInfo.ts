export default class NoteRenderInfo {
    // 所在小节号
    private measureNo: number;

    // 是否是和弦音，若是，则渲染时x轴不变
    private isChord: boolean;

    // 本小节每个4分音符的分割数。我的理解是：本小节时值最小的元素占一个四分音符的几分之一
    private divisions: number; 

    // 持续时间长度。我的理解是：该音符是几个dicisions，所以，dutation / dicisions的值，就是几个4分音符的时值长度
    private duration: number; 

    // 音名
    private pitchStep: string; 

    // 八度
    private pitchOctave: number;

    // 在画布中的x坐标
    private x: number;

    // 在画布中的y坐标
    private y: number;

    constructor(measureNo: number, isChord: boolean, divisions: number, duration: number, pitchStep: string, pitchOctave: number, x: number, y: number) {
        this.measureNo = measureNo;
        this.isChord = isChord;
        this.divisions = divisions;
        this.duration = duration;
        this.pitchStep = pitchStep;
        this.pitchOctave = pitchOctave;
        this.x = x;
        this.y = y;
    }
    get MeasureNo(): number { return this.measureNo; }
    set MeasureNo(measureNo: number) { this.measureNo = measureNo; }
    get IsChord(): boolean { return this.isChord; }
    set IsChord(isChord:boolean) { this.isChord = isChord; }
    get Divisions(): number { return this.divisions; }
    set Divisions(dicisions: number) { this.divisions = dicisions; }
    get Duration(): number { return this.duration; }
    set Duration(duration: number) { this.duration = duration; }
    get PitchStep(): string { return this.pitchStep; }
    set PitchStep(pitchStep: string) { this.pitchStep = pitchStep; }
    get PitchOctave(): number { return this.pitchOctave; }
    set PitchOctave(pitchOctave: number) { this.pitchOctave = pitchOctave; }
    get X(): number { return this.x; }
    set X(x: number) { this.x = x; }
    get Y(): number { return this.y; }
    set Y(y: number) { this.y = y; }
}