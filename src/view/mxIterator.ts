import { RootNode } from "../model/rootNode"
import { Config } from "../config";
import { SorePartWiseNode } from "../model/sorePartWiseNode";
import { MeasureNode } from "../model/measureNode";
import { AttributesNode } from "../model/attributesNode";
import { Clef } from "../model/interface/attributes";
import { Node } from "../model/node"

export class MxIterator {
    static *getIterator(musicXmlNode: RootNode): any {
        const spw: SorePartWiseNode = <SorePartWiseNode> musicXmlNode.getChildNodesByName('score-partwise')[0];
        const parts: Node[] = spw.Part();
        for (const part of parts) {
            for (const measure of part.getChildNodes()) {
                const _measure: MeasureNode = <MeasureNode>measure;
                const attributes: AttributesNode = _measure.Attributes();
                for (const spirit of _measure.displayEntities()) {
                    let token = {
                        // 第几小节
                        measure_no: _measure.Number(),
                        // 五度圈里的位置，暂时这么理解
                        fifths: attributes.KeyFifths(),
                        // 调性：大调、小调 [major | minor]
                        mode: attributes.KeyMode(),
                        // 以几分音符为一拍
                        time_beat_type: attributes.TimeBeatType(),
                        // 每小节有几拍
                        time_beats: attributes.TimeBeats(),
                        // 谱号 [ {sign: 'G', line: 2}, {sign: TAB, line: 5} , ...]
                        clefs: attributes.Clef().map(c => { return {sign: c.Sign(), line: c.Line()} }),
                        // 要渲染的这个小东西，是什么类型，如: direction | note | backup | ...
                        spirit_type: spirit.getName(),
                        spirit: spirit
                    };
                    yield token;
                }
            }
        }
        return {spirit_type: 'END'}
    }
}