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
        let attr: any = {};
        for (const part of parts) {
            for (const measure of part.getChildNodes()) {
                const _measure: MeasureNode = <MeasureNode>measure;
                const attributes: AttributesNode = _measure.Attributes();
                attr['keyFifths'] = attributes.KeyFifths() != null ? attributes.KeyFifths() : attr['keyFifths'];
                attr['keyMode'] = attributes.KeyMode() != null ? attributes.KeyMode() : attr['keyMode'];
                attr['timeBeatType'] = attributes.TimeBeatType() != null? attributes.TimeBeatType() : attr['timeBeatType'];
                attr['timeBeats'] = attributes.TimeBeats() != null ? attributes.TimeBeats() : attr['timeBeats'];
                attr['clef'] = (attributes.Clef() != null && attributes.Clef().length > 0) ? 
                                    attributes.Clef().map(c => new ClefToken(c.Number(), c.Sign(), c.Line())) : attr['clef'];
                for (const spirit of _measure.displayEntities()) {
                    yield new MxToken(
                        // 第几小节
                        _measure.Number(),
                        // 五度圈里的位置，暂时这么理解
                        attr['keyFifths'],
                        // 调性：大调、小调 [major | minor]
                        attr['keyMode'],
                        // 以几分音符为一拍
                        attr['timeBeatType'],
                        // 每小节有几拍
                        attr['timeBeats'],
                        // 谱号 [ {number: 1, sign: 'G', line: 2}, {number: 2, sign: TAB, line: 5} , ...]
                        attr['clef'],
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