import { readFileSync } from "fs";
import { Parser } from "../../src/model/parser";
import { RootNode } from "../../src/model/rootNode";
import { MxIterator } from "../../src/view/mxIterator";

test('MxIterator test', () => {
    const xml: string = readFileSync('./test/view/notes1.xml', 'utf-8');
    const root: RootNode = Parser.parseMusicXml(xml);

    const iter = MxIterator.getIterator(root);
    let item = iter.next().value;
    // console.log(JSON.stringify(item));
    expect(item.measure_no).toBe(1);
    expect(item.spirit_type).toBe('direction');
    expect(item.fifths).toBe(0);
    expect(item.mode).toBe('major');
    expect(item.time_beat_type).toBe(4);
    expect(item.time_beats).toBe(4);
    expect(item.clefs).toEqual([{sign: 'G', line: 2}, {sign: 'TAB', line: 5}]);

    item = iter.next().value;
    // console.log(JSON.stringify(item));
    expect(item.measure_no).toBe(1);
    expect(item.spirit_type).toBe('note');
    expect(item.fifths).toBe(0);
    expect(item.mode).toBe('major');
    expect(item.time_beat_type).toBe(4);
    expect(item.time_beats).toBe(4);
    expect(item.clefs).toEqual([{sign: 'G', line: 2}, {sign: 'TAB', line: 5}]);
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    // console.log(iter.next());
    
    
})