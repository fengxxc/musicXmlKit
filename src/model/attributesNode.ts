import { Node } from "./node.js";
import { Attributes, Clef } from "./interface/attributes.js";

export class AttributesNode extends Node implements Attributes {
    Divisions(): number {
        try {
            return parseInt(super.getChildNodesByName('divisions')[0].getFullText());
        } catch (error) { return null; }
    }
    KeyFifths(): number {
        try {
            return parseInt(super.getChildNodesByName('key')[0].getChildNodesByName('fifths')[0].getFullText());
        } catch (error) { return null; }
    }
    KeyMode(): string {
        try {
            return super.getChildNodesByName('key')[0].getChildNodesByName('mode')[0].getFullText();
        } catch (error) { return ''; }
    }
    TimeBeats(): number {
        try {
            return parseInt(super.getChildNodesByName('time')[0].getChildNodesByName('beats')[0].getFullText());
        } catch (error) { return null; }
    }
    TimeBeatType(): number {
        try {
            return parseInt(super.getChildNodesByName('time')[0].getChildNodesByName('beat-type')[0].getFullText());
        } catch (error) { return null; }
    }
    Staves(): number {
        try {
            return parseInt(super.getChildNodesByName('staves')[0].getFullText());
        } catch (error) { return null; }
    }
    Clef(): Clef[] {
        try {
            return <ClefNode[]>super.getChildNodesByName('clef');
        } catch (error) { return null; }
    }
}

export class ClefNode extends Node implements Clef {
    Number(): number {
        try {
            return parseInt(super.getAttr()['number']);
        } catch (error) { return null; }
    }
    Sign(): string {
        try {
            return super.getChildNodesByName('sign')[0].getFullText();
        } catch (error) { return null; }
    }
    Line(): number {
        try {
            return parseInt(super.getChildNodesByName('line')[0].getFullText());
        } catch (error) { return null; }
    }


}