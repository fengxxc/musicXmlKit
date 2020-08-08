import { Node } from "../model/Node";
import { NoteNode } from "../model/noteNode";
import { DireMetronomeNode } from "../model/direMetronomeNode";
import { DireOctaveShiftNode } from "../model/direOctaveShiftNode";
import { DireWedgeNode } from "../model/direWedgeNode";

export default class MxToken {
    private measureNo: number;
    private fifths: number;
    private mode: string;
    private timeBeatType: number;
    private timeBeats: number;
    private clefs: ClefToken[];
    private spiritType: string;
    private spirit: (Node | NoteNode | DireMetronomeNode | DireOctaveShiftNode | DireWedgeNode);
    constructor(measureNo: number, fifths: number, mode: string, timeBeatType: number, timeBeats: number, clefs: ClefToken[], spiritType: string, spirit: (Node | NoteNode | DireMetronomeNode | DireOctaveShiftNode | DireWedgeNode)) {
        this.measureNo = measureNo;
        this.fifths = fifths;
        this.mode = mode;
        this.timeBeatType = timeBeatType;
        this.timeBeats = timeBeats;
        this.clefs = clefs;
        this.spiritType = spiritType;
        this.spirit = spirit;
    }
    get MeasureNo(): number { return this.measureNo; }
    get Fifths(): number { return this.fifths; }
    get Mode(): string { return this.mode; }
    get TimeBeatType(): number { return this.timeBeatType; }
    get TimeBeats(): number { return this.timeBeats; }
    get Clefs(): ClefToken[] { return this.clefs; }
    get SpiritType(): string { return this.spiritType; }
    get Spirit(): (Node | NoteNode | DireMetronomeNode | DireOctaveShiftNode | DireWedgeNode) { return this.spirit; }
}

export class ClefToken {
    private number: number;
    private sign: string;
    private line: number;
    constructor(number: number, sign: string, line: number) {
        this.number = number;
        this.sign = sign;
        this.line = line;
    }
    get Number(): number { return this.number;}
    get Sign(): string { return this.sign; }
    get Line(): number { return this.line; }
}