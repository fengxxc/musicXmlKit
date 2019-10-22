import { Node } from "./node";
import { Note } from "./interface/note";

export class NoteNode extends Node implements Note {
    private tempRest: boolean = null;
    private tempPitch: Node[] = null;
    private tempNotations: Node[] = null;
    constructor(index: number, parentNode: Node, name: string, attr: Object) {
        super(index, parentNode, name, attr);
    }
    // @overwrite
    chord(): boolean {
        return super.getChildNodesByName('chord').length == 0;
    }
    // @overwrite
    Rest(): boolean {
        return (this.tempRest == null) ? (this.tempRest = (super.getChildNodesByName('rest').length != 0)) : this.tempRest;
    }
    // @overwrite
    PitchStep(): string {
        if (this.Rest()) return null;
        if (this.tempPitch == null) this.tempPitch = super.getChildNodesByName('pitch');
        if (this.tempPitch.length == 0) return null;
        const s = this.tempPitch[0].getChildNodesByName('step');
        return s.length == 0 ? null : s[0].getFullText();
    }
    // @overwrite
    PitchOctave(): number {
        if (this.Rest()) return null;
        if (this.tempPitch == null) this.tempPitch = super.getChildNodesByName('pitch');
        if (this.tempPitch.length == 0) return null;
        const o = this.tempPitch[0].getChildNodesByName('octave');
        return o.length == 0? null : parseInt(o[0].getFullText());
    }
    // @overwrite
    PitchAlter(): number {
        if (this.Rest()) return null;
        if (this.tempPitch == null) this.tempPitch = super.getChildNodesByName('pitch');
        if (this.tempPitch.length == 0) return null;
        const a = this.tempPitch[0].getChildNodesByName('alter');
        return a.length == 0 ? null : parseInt(a[0].getFullText());
    }
    // @overwrite
    Duration(): number {
        const d = super.getChildNodesByName('duration');
        return d.length == 0 ? null : parseInt(d[0].getFullText());
    }
    // @overwrite
    TieType(): string {
        const t = super.getChildNodesByName('tie');
        return t.length == 0 ? '' : t[0].getAttr()['type'];
    }
    // @overwrite
    Voice(): number {
        const v = super.getChildNodesByName('voice');
        return v.length == 0 ? null : parseInt(v[0].getFullText());
    }
    // @overwrite
    Type(): string {
        const t = super.getChildNodesByName('type');
        return t.length == 0? null : t[0].getFullText();
    }
    // @overwrite
    Stem(): string {
        const s = super.getChildNodesByName('stem');
        return s.length == 0 ? null : s[0].getFullText();
    }
    // @overwrite
    Notehead(): string {
        const n = super.getChildNodesByName('notehead');
        return n.length == 0 ? null : n[0].getFullText();
    }
    // @overwrite
    Staff(): number {
        const s = super.getChildNodesByName('staff');
        return s.length == 0 ? null : parseInt(s[0].getFullText());
    }
    NotationsDynamics(): string {
        if (this.tempNotations == null) 
            this.tempNotations = super.getChildNodesByName('notations');
        if (this.tempNotations.length == 0) return '';
        const d = this.tempNotations[0].getChildNodesByName('dynamics');
        if (d.length == 0) return '';
        const dc = d[0].getChildNodes();
        if (dc.length == 0) return '';
        return dc[0].getName();
    }
    // @overwrite
    NotationsTechString(): number {
        if (this.tempNotations == null)
            this.tempNotations = super.getChildNodesByName('notations');
        if (this.tempNotations.length == 0) return null
        const t = this.tempNotations[0].getChildNodesByName('technical');
        if (t.length == 0) return null;
        const s = t[0].getChildNodesByName('string');
        if (s.length == 0) return null;
        return parseInt(s[0].getFullText());
    }
    // @overwrite
    NotationsTechFret(): number {
        if (this.tempNotations == null)
            this.tempNotations = super.getChildNodesByName('notations');
        if (this.tempNotations.length == 0) return null
        const t = this.tempNotations[0].getChildNodesByName('technical');
        if (t.length == 0) return null;
        const f = t[0].getChildNodesByName('fret');
        if (f.length == 0) return null;
        return parseInt(f[0].getFullText());
    }

}