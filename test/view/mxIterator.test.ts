import { readFileSync } from "fs";
import { Parser } from "../../src/model/parser";
import { RootNode } from "../../src/model/rootNode";
import { MxIterator } from "../../src/view/mxIterator";
import MxToken from "../../src/view/mxToken";

test('MxIterator test', () => {
    const xml: string = readFileSync('./test/view/notes1.xml', 'utf-8');
    const root: RootNode = Parser.parseMusicXml(xml);

    const iter = MxIterator.getIterator(root);
    let item: MxToken = iter.next().value;
    // console.log(JSON.stringify(item));
    expect(item.MeasureNo).toBe(1);
    expect(item.SpiritType).toBe('direction');
    expect(item.Fifths).toBe(0);
    expect(item.Mode).toBe('major');
    expect(item.TimeBeatType).toBe(4);
    expect(item.TimeBeats).toBe(4);

    item = iter.next().value;
    // console.log(JSON.stringify(item));
    expect(item.MeasureNo).toBe(1);
    expect(item.SpiritType).toBe('note');
    expect(item.Fifths).toBe(0);
    expect(item.Mode).toBe('major');
    expect(item.TimeBeatType).toBe(4);
    expect(item.TimeBeats).toBe(4);
    expect(item.Clefs[0].Sign).toBe('G');
    expect(item.Clefs[0].Line).toBe(2);
    expect(item.Clefs[1].Sign).toBe('TAB');
    expect(item.Clefs[1].Line).toBe(5);
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    
    
})