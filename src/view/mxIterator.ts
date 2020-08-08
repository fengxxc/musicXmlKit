import { RootNode } from "../model/rootNode"
import { SorePartWiseNode } from "../model/sorePartWiseNode";
import { MeasureNode } from "../model/measureNode";
import { AttributesNode } from "../model/attributesNode";
import { Node } from "../model/node"
import MxToken, { ClefToken } from "./mxToken";

export class MxIterator {
    static *getIterator(musicXmlNode: RootNode) {
        const spw: SorePartWiseNode = <SorePartWiseNode> musicXmlNode.getChildNodesByName('score-partwise')[0];
        const parts: Node[] = spw.Part();
        for (const part of parts) {
            for (const measure of part.getChildNodes()) {
                const _measure: MeasureNode = <MeasureNode>measure;
                const attributes: AttributesNode = _measure.Attributes();
                for (const spirit of _measure.displayEntities()) {
                    yield new MxToken(
                        // 第几小节
                        _measure.Number(),
                        // 五度圈里的位置，暂时这么理解
                        attributes.KeyFifths(),
                        // 调性：大调、小调 [major | minor]
                        attributes.KeyMode(),
                        // 以几分音符为一拍
                        attributes.TimeBeatType(),
                        // 每小节有几拍
                        attributes.TimeBeats(),
                        // 谱号 [ {number: 1, sign: 'G', line: 2}, {number: 2, sign: TAB, line: 5} , ...]
                        attributes.Clef().map(c => new ClefToken(c.Number(), c.Sign(), c.Line())),
                        // 要渲染的这个小东西，是什么类型，如: direction | note | backup | ...
                        spirit.getName(),
                        spirit
                    )
                }
            }
        }
        return null;
    }
}