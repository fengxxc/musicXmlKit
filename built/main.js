(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./model/parse", "./model/node", "./mxNodeRender", "./model/sorePartWiseNode", "./model/noteNode", "./model/measureNode", "./model/direMetronomeNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parse_1 = require("./model/parse");
    var node_1 = require("./model/node");
    var mxNodeRender_1 = require("./mxNodeRender");
    var sorePartWiseNode_1 = require("./model/sorePartWiseNode");
    var noteNode_1 = require("./model/noteNode");
    var measureNode_1 = require("./model/measureNode");
    var direMetronomeNode_1 = require("./model/direMetronomeNode");
    var xml = "\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<!DOCTYPE score-partwise PUBLIC '-//Recordare//DTD MusicXML 2.0 Partwise//EN' 'http://www.musicxml.org/dtds/2.0/partwise.dtd'>\n<score-partwise version=\"2.0\">\n    <identification>\n        <encoding>\n            <encoding-date>2019-10-09</encoding-date>\n            <software>Guitar Pro 7.5.0</software>\n        </encoding>\n    </identification>\n    <defaults>\n        <scaling>\n            <millimeters>6.4</millimeters>\n            <tenths>40</tenths>\n        </scaling>\n        <page-layout>\n            <page-height>1850</page-height>\n            <page-width>1310</page-width>\n        </page-layout>\n    </defaults>\n    <part-list>\n        <score-part id=\"P1\">\n            <part-name>Acoustic Piano</part-name>\n            <part-abbreviation>pno.</part-abbreviation>\n            <midi-instrument id=\"P1\">\n                <midi-channel>1</midi-channel>\n                <midi-bank>1</midi-bank>\n                <midi-program>1</midi-program>\n                <volume>80</volume>\n                <pan>0</pan>\n            </midi-instrument>\n        </score-part>\n    </part-list>\n    <part id=\"P1\">\n        <measure number=\"1\">\n            <attributes>\n                <divisions>1</divisions>\n                <key>\n                    <fifths>-4</fifths>\n                    <mode>major</mode>\n                </key>\n                <time>\n                    <beats>6</beats>\n                    <beat-type>8</beat-type>\n                </time>\n                <staves>2</staves>\n                <clef number=\"1\">\n                    <sign>G</sign>\n                    <line>2</line>\n                </clef>\n                <clef number=\"2\">\n                    <sign>F</sign>\n                    <line>4</line>\n                </clef>\n                <staff-details number=\"1\">\n                    <staff-tuning line=\"1\">\n                        <tuning-step>E</tuning-step>\n                        <tuning-octave>2</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"2\">\n                        <tuning-step>A</tuning-step>\n                        <tuning-octave>2</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"3\">\n                        <tuning-step>D</tuning-step>\n                        <tuning-octave>3</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"4\">\n                        <tuning-step>G</tuning-step>\n                        <tuning-octave>3</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"5\">\n                        <tuning-step>B</tuning-step>\n                        <tuning-octave>3</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"6\">\n                        <tuning-step>E</tuning-step>\n                        <tuning-octave>4</tuning-octave>\n                    </staff-tuning>\n                </staff-details>\n                <staff-details number=\"2\">\n                    <staff-tuning line=\"1\">\n                        <tuning-step>B</tuning-step>\n                        <tuning-octave>0</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"2\">\n                        <tuning-step>E</tuning-step>\n                        <tuning-octave>1</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"3\">\n                        <tuning-step>A</tuning-step>\n                        <tuning-octave>1</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"4\">\n                        <tuning-step>D</tuning-step>\n                        <tuning-octave>2</tuning-octave>\n                    </staff-tuning>\n                    <staff-tuning line=\"5\">\n                        <tuning-step>G</tuning-step>\n                        <tuning-octave>2</tuning-octave>\n                    </staff-tuning>\n                </staff-details>\n            </attributes>\n            <direction directive=\"yes\">\n                <direction-type>\n                    <metronome parentheses=\"yes\" default-y=\"40\">\n                        <beat-unit>quarter</beat-unit>\n                        <per-minute>120</per-minute>\n                    </metronome>\n                </direction-type>\n                <sound tempo=\"120\" />\n            </direction>\n            <note>\n                <pitch>\n                    <step>E</step>\n                    <octave>4</octave>\n                </pitch>\n                <duration>1</duration>\n                <voice>1</voice>\n                <type>quarter</type>\n                <stem>up</stem>\n                <notehead>normal</notehead>\n                <staff>1</staff>\n                <notations>\n                    <dynamics>\n                        <mf />\n                    </dynamics>\n                    <technical>\n                        <string>4</string>\n                        <fret>14</fret>\n                    </technical>\n                </notations>\n            </note>\n            <note>\n                <chord />\n                <pitch>\n                    <step>D</step>\n                    <alter>-1</alter>\n                    <octave>5</octave>\n                </pitch>\n                <duration>1</duration>\n                <voice>1</voice>\n                <type>quarter</type>\n                <stem>up</stem>\n                <notehead>normal</notehead>\n                <staff>1</staff>\n                <notations>\n                    <dynamics>\n                        <mf />\n                    </dynamics>\n                    <technical>\n                        <string>1</string>\n                        <fret>9</fret>\n                    </technical>\n                </notations>\n            </note>\n        </measure>\n    </part>\n</score-partwise>\n";
    /* xml = `
    <qwe>
        <as id="1" class= "xx">
            ttt
        </as>
        <ds/>
        <zz></zz>
    </qwe>`; */
    var root = parse_1.Parser.parseXml(xml, function (index, parent, tag, attrs) {
        var res;
        switch (tag) {
            case 'score-partwise':
                res = new sorePartWiseNode_1.SorePartWiseNode(index, parent, tag, attrs);
                break;
            case 'measure':
                res = new measureNode_1.MeasureNode(index, parent, tag, attrs);
                break;
            case 'note':
                res = new noteNode_1.NoteNode(index, parent, tag, attrs);
                break;
            case 'metronome':
                /* let direNode: Node = parent.getParentNode();
                const newDireNode = new DireMetronomeNode(direNode.getIndex(), direNode.getParentNode(), direNode.getName(), direNode.getAttr());
                Node.replace(parent.getParentNode(), newDireNode); */
                var direNode = parent.getParentNode();
                node_1.Node.replace(direNode, new direMetronomeNode_1.DireMetronomeNode());
                res = new node_1.Node(index, parent, tag, attrs);
                break;
            default:
                res = new node_1.Node(index, parent, tag, attrs);
                break;
        }
        return res;
    }, function (node) {
        // let res: Node = node;
        switch (node.getName()) {
            case 'metronome':
                // const direNode: Node = node.getParentNode().getParentNode();
                // Node.replace(direNode, new DireMetronomeNode());
                break;
            default:
                break;
        }
        // return res;
    });
    // start
    console.time('-------------执行时间------------');
    console.dir(root);
    var spn = root.getChildNodesByName('score-partwise')[0];
    console.log(spn);
    console.log('~~~ test MeasureNode ~~~');
    var m = spn.getChildNodesByName('part')[0].getChildNodesByName('measure');
    console.log(m);
    console.log(m[0].Number());
    console.log(m[0].Attributes());
    console.log(m[0].displayEntities());
    console.log('~~~ test NoteNode ~~~');
    var n1 = m[0].getChildNodesByName('note')[0];
    console.log(n1.Duration());
    console.log(n1.PitchStep());
    console.log(n1.PitchOctave());
    console.log(n1.PitchAlter());
    console.log(n1.NotationsDynamics());
    console.log(n1.NotationsTechFret());
    console.log(n1.NotationsTechString());
    mxNodeRender_1.MxNodeRender.render(root);
    console.log(root.getFullText());
    console.timeEnd('-------------执行时间------------');
});
// end
//# sourceMappingURL=main.js.map