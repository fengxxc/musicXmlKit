import MxToken from "./mxToken";
import { Note } from "../model/interface/note";

export default class NoteRenderInfo {
    /* 小节信息 */
    // 所在小节号
    private measureNo: number;
    // 五度信息（调号）
    private fifths: number;
    // 以几分音符为一拍
    private timeBeatType: number;
    // 每小节有几拍
    private timeBeats: number;

    /* 音符信息 */
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
    // 符头宽度
    private headWidth: number;
    // 符桿朝向
    private stem: string;
    // 在哪个五线谱上
    private staff: number;
    // 是否是附点音符
    private isDot: boolean;
    // 符杠 0: 没有符杠, 1: 符杠开始, 2: 符杠结束
    private beamType: number;

    /* 实际渲染信息 */
    // 在画布中的x坐标
    private x: number;
    // 在画布中的y坐标
    private y: number;
    // 在渲染出的乐谱中第几行，从1开始
    private viewLine: number;

    constructor(
        measureNo: number, fifths: number, timeBeatType: number, timeBeats: number, isRest: boolean , isChord: boolean
        , divisions: number, duration: number , pitchStep: string, pitchOctave: number , x: number, y: number
        , viewLine: number, headWidth: number, stem: string, staff: number, isDot: boolean, beams: string[]
    ) {

        this.measureNo = measureNo;
        this.fifths = fifths;
        this.timeBeatType = timeBeatType;
        this.timeBeats = timeBeats;
        this.isRest = isRest;
        this.isChord = isChord;
        this.divisions = divisions;
        this.duration = duration;
        this.pitchStep = pitchStep;
        this.pitchOctave = pitchOctave;
        this.x = x;
        this.y = y;
        this.viewLine = viewLine;
        this.headWidth = headWidth;
        this.stem = stem;
        this.staff = staff;
        this.isDot = isDot;
        this.beamType = 0;
        if (beams != null && beams.length > 0) {
            if      (beams[0] == 'begin') this.beamType = 1;
            else if (beams[0] == 'end'  ) this.beamType = 2;
        }
    }
    public static instance(x: number, y: number, viewLine: number, headWidth: number, token: MxToken, note: Note): NoteRenderInfo {
        return new NoteRenderInfo(
            token.MeasureNo, token.Fifths, token.TimeBeatType, token.TimeBeats, note.Rest()
            , note.Chord() , token.Divisions , note.Duration() , note.PitchStep() , note.PitchOctave()
            , x, y, viewLine, headWidth , note.Stem(), note.Staff(), note.Dot(), note.Beams()
        );
    }

    /**
     * 实例化一个虚拟音
     * @static
     * @return {NoteRenderInfo}
     * @memberof NoteRenderInfo
     */
    public static instanceVirtual(viewLine: number): NoteRenderInfo {
        return new NoteRenderInfo(0, 0, 0, 0, false, false, 0, 0, '', 0, 0, 0, viewLine, 0, '', 0, false, null);
    }

    public static instanceVirtualDisplayed(x: number, y: number, viewLine: number, isDot: boolean, duration: number, divisions: number, stem: string): NoteRenderInfo {
        return new NoteRenderInfo(0, 0, 0, 0, false, false, divisions, duration, '', 0, x, y, viewLine, 0, stem, 0, isDot , null);
    }

    get MeasureNo(): number { return this.measureNo; }
    set MeasureNo(measureNo: number) { this.measureNo = measureNo; }
    get Fifths(): number { return this.fifths; }
    set Fifths(fifths: number) { this.fifths = fifths; }
    get TimeBeatType(): number { return this.timeBeatType; }
    set TimeBeatType(timeBeatType: number) { this.timeBeatType = timeBeatType; }
    get TimeBeats(): number { return this.timeBeats; }
    set TimeBeats(timeBeats: number) { this.timeBeats = timeBeats; }
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
    get ViewLine(): number { return this.viewLine; }
    set ViewLine(viewLine: number) { this.viewLine = viewLine; }
    get HeadWidth(): number { return this.headWidth; }
    set HeadWidth(headWidth: number) { this.headWidth = headWidth; }
    get Stem(): string { return this.stem; }
    set Stem(stem: string) { this.stem = stem; }
    get Staff(): number { return this.staff; }
    set Staff(staff: number) { this.staff = staff; }
    get IsDot(): boolean { return this.isDot; }
    set IsDot(isDot: boolean) { this.isDot = isDot; }
    get BeamType(): number { return this.beamType; }
    set BeamType(beamType: number) { this.beamType = beamType; }
}