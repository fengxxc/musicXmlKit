export default class NoteRenderInfo {
    // 所在小节号
    private measureNo: number;

    // 是否是休止符
    private isRest: boolean;

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

    // 符头宽度
    private headWidth: number;

    // 符桿朝向
    private stem: string;

    // 在哪个五线谱上
    private staff: number;

    constructor(measureNo: number, isRest: boolean, isChord: boolean, divisions: number, duration: number, pitchStep: string, pitchOctave: number, x: number, y: number, headWidth: number, stem: string, staff: number) {
        this.measureNo = measureNo;
        this.isRest = isRest;
        this.isChord = isChord;
        this.divisions = divisions;
        this.duration = duration;
        this.pitchStep = pitchStep;
        this.pitchOctave = pitchOctave;
        this.x = x;
        this.y = y;
        this.headWidth = headWidth;
        this.stem = stem;
        this.staff = staff;
    }
    get MeasureNo(): number { return this.measureNo; }
    set MeasureNo(measureNo: number) { this.measureNo = measureNo; }
    get IsRest(): boolean { return this.isRest; }
    set IsRest(isRest: boolean) { this.isRest = isRest; }
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
    get HeadWidth(): number { return this.headWidth; }
    set HeadWidth(headWidth: number) { this.headWidth = headWidth; }
    get Stem(): string { return this.stem; }
    set Stem(stem: string) { this.stem = stem; }
    get Staff(): number { return this.staff; }
    set Staff(staff: number) { this.staff = staff; }
}