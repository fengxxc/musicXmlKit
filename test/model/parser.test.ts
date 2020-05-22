import { Parser } from "../../src/model/parser.js";
import { SorePartWiseNode } from "../../src/model/sorePartWiseNode.js";
import { expect } from "chai";
import { readFileSync } from "fs";
import { MeasureNode } from "../../src/model/measureNode.js";

describe('parser test', () => {
    const xml = readFileSync('./test/model/testData1.xml', 'utf-8');
    const root = Parser.parseMusicXml(xml);
    const spn = <SorePartWiseNode>root.getChildNodesByName('score-partwise')[0];

    it('expect: score-partwise', () => {
        expect(spn.getName()).to.be.equal('score-partwise');
    });

    it('expect: MeasureNode', () => {
        const m: MeasureNode[] = <MeasureNode[]>spn.getChildNodesByName('part')[0].getChildNodesByName('measure');
        expect(m[0].Number()).to.be.equal(1);
    });
})