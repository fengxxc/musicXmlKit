import { Parser } from "../../src/model/parser";
import { SorePartWiseNode } from "../../src/model/sorePartWiseNode";
import { readFileSync } from "fs";
import { MeasureNode } from "../../src/model/measureNode";

test('Parser test', () => {
    const xml = readFileSync('./test/model/testData1.xml', 'utf-8');
    const root = Parser.parseMusicXml(xml);
    const spn = <SorePartWiseNode>root.getChildNodesByName('score-partwise')[0];

    expect(spn.getName()).toBe('score-partwise');

    const m: MeasureNode[] = <MeasureNode[]>spn.getChildNodesByName('part')[0].getChildNodesByName('measure');
    expect(m[0].Number()).toBe(1);

})