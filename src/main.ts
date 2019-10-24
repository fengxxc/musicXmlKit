import { Parser } from "./model/parse";
import { Node } from "./model/node";
import { MxNodeRender } from "./mxNodeRender";
import { SorePartWiseNode } from "./model/sorePartWiseNode";
import { NoteNode } from "./model/noteNode";
import { MeasureNode } from "./model/measureNode";
import { DireMetronomeNode } from "./model/direMetronomeNode";
import { AttributesNode, ClefNode } from "./model/attributesNode";
import { Render } from "./view/render";
import { Quill } from "./view/painter";
import { Utils } from "./Utils";
import { Constant } from "./view/constant";

let xml = `
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE score-partwise PUBLIC '-//Recordare//DTD MusicXML 2.0 Partwise//EN' 'http://www.musicxml.org/dtds/2.0/partwise.dtd'>
<score-partwise version="2.0">
    <identification>
        <encoding>
            <encoding-date>2019-10-17</encoding-date>
            <software>Guitar Pro 7.5.0</software>
        </encoding>
    </identification>
    <defaults>
        <scaling>
            <millimeters>6.4</millimeters>
            <tenths>40</tenths>
        </scaling>
        <page-layout>
            <page-height>1850</page-height>
            <page-width>1310</page-width>
        </page-layout>
    </defaults>
    <part-list>
        <score-part id="P1">
            <part-name>Acoustic Piano</part-name>
            <part-abbreviation>pno.</part-abbreviation>
            <midi-instrument id="P1">
                <midi-channel>1</midi-channel>
                <midi-bank>1</midi-bank>
                <midi-program>1</midi-program>
                <volume>80</volume>
                <pan>0</pan>
            </midi-instrument>
        </score-part>
    </part-list>
    <part id="P1">
        <measure number="1">
            <attributes>
                <divisions>4</divisions>
                <key>
                    <fifths>1</fifths>
                    <mode>major</mode>
                </key>
                <time>
                    <beats>4</beats>
                    <beat-type>4</beat-type>
                </time>
                <staves>4</staves>
                <clef number="1">
                    <sign>G</sign>
                    <line>2</line>
                </clef>
                <clef number="2">
                    <sign>TAB</sign>
                    <line>5</line>
                </clef>
                <clef number="3">
                    <sign>F</sign>
                    <line>4</line>
                </clef>
                <clef number="4">
                    <sign>TAB</sign>
                    <line>5</line>
                </clef>
                <staff-details number="1">
                    <staff-tuning line="1">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="2">
                        <tuning-step>A</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="3">
                        <tuning-step>D</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="4">
                        <tuning-step>G</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="5">
                        <tuning-step>B</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="6">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>4</tuning-octave>
                    </staff-tuning>
                </staff-details>
                <staff-details number="2">
                    <staff-lines>6</staff-lines>
                    <staff-tuning line="1">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="2">
                        <tuning-step>A</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="3">
                        <tuning-step>D</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="4">
                        <tuning-step>G</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="5">
                        <tuning-step>B</tuning-step>
                        <tuning-octave>3</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="6">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>4</tuning-octave>
                    </staff-tuning>
                </staff-details>
                <staff-details number="3">
                    <staff-tuning line="1">
                        <tuning-step>B</tuning-step>
                        <tuning-octave>0</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="2">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>1</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="3">
                        <tuning-step>A</tuning-step>
                        <tuning-octave>1</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="4">
                        <tuning-step>D</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="5">
                        <tuning-step>G</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                </staff-details>
                <staff-details number="4">
                    <staff-lines>5</staff-lines>
                    <staff-tuning line="1">
                        <tuning-step>B</tuning-step>
                        <tuning-octave>0</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="2">
                        <tuning-step>E</tuning-step>
                        <tuning-octave>1</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="3">
                        <tuning-step>A</tuning-step>
                        <tuning-octave>1</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="4">
                        <tuning-step>D</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                    <staff-tuning line="5">
                        <tuning-step>G</tuning-step>
                        <tuning-octave>2</tuning-octave>
                    </staff-tuning>
                </staff-details>
            </attributes>
            <direction directive="yes">
                <direction-type>
                    <metronome parentheses="yes" default-y="40">
                        <beat-unit>quarter</beat-unit>
                        <per-minute>120</per-minute>
                    </metronome>
                </direction-type>
                <sound tempo="120" />
            </direction>
            <note>
                <pitch>
                    <step>F</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>1</voice>
                <type>eighth</type>
                <accidental>natural</accidental>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>1</string>
                        <fret>1</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>B</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>1</voice>
                <type>eighth</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <p />
                    </dynamics>
                    <technical>
                        <string>2</string>
                        <fret>12</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <chord />
                <pitch>
                    <step>F</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>1</voice>
                <type>eighth</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <p />
                    </dynamics>
                    <technical>
                        <string>3</string>
                        <fret>10</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>G</step>
                    <octave>4</octave>
                </pitch>
                <duration>1</duration>
                <voice>1</voice>
                <type>16th</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>22</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>A</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>1</voice>
                <type>eighth</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">continue</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>4</string>
                        <fret>19</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>B</step>
                    <octave>4</octave>
                </pitch>
                <duration>1</duration>
                <voice>1</voice>
                <type>16th</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>3</string>
                        <fret>16</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>E</step>
                    <octave>5</octave>
                </pitch>
                <duration>4</duration>
                <voice>1</voice>
                <type>quarter</type>
                <stem>down</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>31</fret>
                    </technical>
                </notations>
            </note>
            <direction>
                <direction-type>
                    <wedge type="diminuendo" />
                </direction-type>
            </direction>
            <direction>
                <direction-type>
                    <octave-shift size="8" type="down" />
                </direction-type>
            </direction>
            <note>
                <pitch>
                    <step>A</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>1</voice>
                <type>eighth</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>3</string>
                        <fret>14</fret>
                    </technical>
                </notations>
            </note>
            <direction>
                <direction-type>
                    <wedge type="diminuendo" />
                </direction-type>
            </direction>
            <direction>
                <direction-type>
                    <octave-shift size="8" type="down" />
                </direction-type>
            </direction>
            <note>
                <chord />
                <pitch>
                    <step>G</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>1</voice>
                <type>eighth</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>1</string>
                        <fret>3</fret>
                    </technical>
                </notations>
            </note>
            <direction>
                <direction-type>
                    <wedge type="stop" />
                </direction-type>
            </direction>
            <direction>
                <direction-type>
                    <octave-shift type="stop" />
                </direction-type>
            </direction>
            <note>
                <pitch>
                    <step>C</step>
                    <octave>5</octave>
                </pitch>
                <duration>2</duration>
                <tie type="start" />
                <voice>1</voice>
                <type>eighth</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>27</fret>
                    </technical>
                    <tied type="start" />
                </notations>
            </note>
            <backup>
                <duration>20</duration>
            </backup>
            <note>
                <pitch>
                    <step>F</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>5</voice>
                <type>eighth</type>
                <accidental>natural</accidental>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>1</string>
                        <fret>1</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>B</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>5</voice>
                <type>eighth</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <p />
                    </dynamics>
                    <technical>
                        <string>2</string>
                        <fret>12</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <chord />
                <pitch>
                    <step>F</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>5</voice>
                <type>eighth</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <p />
                    </dynamics>
                    <technical>
                        <string>3</string>
                        <fret>10</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>G</step>
                    <octave>4</octave>
                </pitch>
                <duration>1</duration>
                <voice>5</voice>
                <type>16th</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>22</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>A</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>5</voice>
                <type>eighth</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">continue</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>4</string>
                        <fret>19</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>B</step>
                    <octave>4</octave>
                </pitch>
                <duration>1</duration>
                <voice>5</voice>
                <type>16th</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>3</string>
                        <fret>16</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <pitch>
                    <step>E</step>
                    <octave>5</octave>
                </pitch>
                <duration>4</duration>
                <voice>5</voice>
                <type>quarter</type>
                <stem>down</stem>
                <staff>2</staff>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>31</fret>
                    </technical>
                </notations>
            </note>
            <direction>
                <direction-type>
                    <wedge type="diminuendo" />
                </direction-type>
            </direction>
            <note>
                <pitch>
                    <step>A</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>5</voice>
                <type>eighth</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>3</string>
                        <fret>14</fret>
                    </technical>
                </notations>
            </note>
            <direction>
                <direction-type>
                    <wedge type="diminuendo" />
                </direction-type>
            </direction>
            <note>
                <chord />
                <pitch>
                    <step>G</step>
                    <octave>4</octave>
                </pitch>
                <duration>2</duration>
                <voice>5</voice>
                <type>eighth</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">begin</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>1</string>
                        <fret>3</fret>
                    </technical>
                </notations>
            </note>
            <direction>
                <direction-type>
                    <wedge type="stop" />
                </direction-type>
            </direction>
            <note>
                <pitch>
                    <step>C</step>
                    <octave>5</octave>
                </pitch>
                <duration>2</duration>
                <tie type="start" />
                <voice>5</voice>
                <type>eighth</type>
                <stem>up</stem>
                <staff>2</staff>
                <beam number="1">end</beam>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>27</fret>
                    </technical>
                    <tied type="start" />
                </notations>
            </note>
            <backup>
                <duration>20</duration>
            </backup>
            <note>
                <rest />
                <duration>8</duration>
                <voice>9</voice>
                <type>half</type>
                <staff>3</staff>
            </note>
            <note>
                <pitch>
                    <step>D</step>
                    <octave>3</octave>
                </pitch>
                <duration>8</duration>
                <voice>9</voice>
                <type>half</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>3</staff>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>27</fret>
                    </technical>
                </notations>
            </note>
            <backup>
                <duration>16</duration>
            </backup>
            <note>
                <rest />
                <duration>8</duration>
                <voice>13</voice>
                <type>half</type>
                <staff>4</staff>
            </note>
            <note>
                <pitch>
                    <step>D</step>
                    <octave>3</octave>
                </pitch>
                <duration>8</duration>
                <voice>13</voice>
                <type>half</type>
                <stem>up</stem>
                <staff>4</staff>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>5</string>
                        <fret>27</fret>
                    </technical>
                </notations>
            </note>
        </measure>
        <measure number="2">
            <attributes>
                <divisions>1</divisions>
            </attributes>
            <note>
                <pitch>
                    <step>C</step>
                    <octave>5</octave>
                </pitch>
                <duration>2</duration>
                <tie type="stop" />
                <voice>1</voice>
                <type>half</type>
                <stem>down</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <notations>
                    <technical>
                        <string>5</string>
                        <fret>27</fret>
                    </technical>
                    <tied type="stop" />
                </notations>
            </note>
            <backup>
                <duration>2</duration>
            </backup>
            <note>
                <pitch>
                    <step>C</step>
                    <octave>5</octave>
                </pitch>
                <duration>2</duration>
                <tie type="stop" />
                <voice>5</voice>
                <type>half</type>
                <stem>down</stem>
                <staff>2</staff>
                <notations>
                    <technical>
                        <string>5</string>
                        <fret>27</fret>
                    </technical>
                    <tied type="stop" />
                </notations>
            </note>
            <backup>
                <duration>2</duration>
            </backup>
            <note>
                <pitch>
                    <step>B</step>
                    <octave>2</octave>
                </pitch>
                <duration>4</duration>
                <voice>9</voice>
                <type>whole</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>3</staff>
                <notations>
                    <technical>
                        <string>4</string>
                        <fret>19</fret>
                    </technical>
                </notations>
            </note>
            <backup>
                <duration>4</duration>
            </backup>
            <note>
                <pitch>
                    <step>B</step>
                    <octave>2</octave>
                </pitch>
                <duration>4</duration>
                <voice>13</voice>
                <type>whole</type>
                <stem>up</stem>
                <staff>4</staff>
                <notations>
                    <technical>
                        <string>4</string>
                        <fret>19</fret>
                    </technical>
                </notations>
            </note>
        </measure>
    </part>
</score-partwise>
`;
/* xml = `
<qwe>
    <as id="1" class= "xx">
        ttt
    </as>
    <ds/>
    <zz></zz>
</qwe>`; */

const root = Parser.parseXml(xml, (index: number, parent: Node, tag: string, attrs: Object) => {
    let res: Node;
    switch (tag) {
        case 'score-partwise':
            res = new SorePartWiseNode(index, parent, tag, attrs);
            break;
        case 'measure':
            res = new MeasureNode(index, parent, tag, attrs);
            break;
        case 'note':
            res = new NoteNode(index, parent, tag, attrs);
            break;
        case 'metronome':
            /* let direNode: Node = parent.getParentNode();
            const newDireNode = new DireMetronomeNode(direNode.getIndex(), direNode.getParentNode(), direNode.getName(), direNode.getAttr());
            Node.replace(parent.getParentNode(), newDireNode); */
            const direNode: Node = parent.getParentNode();
            Node.replace(direNode, new DireMetronomeNode());
            res = new Node(index, parent, tag, attrs);
            break;
        case 'attributes':
            res = new AttributesNode(index, parent, tag, attrs);
            break;
        case 'clef':
            res = new ClefNode(index, parent, tag, attrs);
            break;
        default:
            res = new Node(index, parent, tag, attrs);
            break;
    }
    return res;
}, node => {
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
const spn = <SorePartWiseNode>root.getChildNodesByName('score-partwise')[0];
console.log(spn);

console.log('~~~ test MeasureNode ~~~');
const m: MeasureNode[] = <MeasureNode[]>spn.getChildNodesByName('part')[0].getChildNodesByName('measure');
console.log(m);
console.log(m[0].Number());
console.log(m[0].Attributes());
console.log(m[0].displayEntities());


console.log('~~~ test NoteNode ~~~');
const n1 = <NoteNode>m[0].getChildNodesByName('note')[0];
console.log(n1.Duration());
console.log(n1.PitchStep());
console.log(n1.PitchOctave());
console.log(n1.PitchAlter());
console.log(n1.NotationsDynamics());
console.log(n1.NotationsTechFret());
console.log(n1.NotationsTechString());


MxNodeRender.render(root);

console.log(root.getFullText());

console.log(root.toTreeString('   ', '\n'));
// document.write(root.toTreeString('&emsp;&emsp;', '<br>'));

Utils.loadImgs(Constant.ImgSrc, imgObj => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    const quill: Quill = new Quill(canvas.getContext('2d'), imgObj);
    const render: Render = new Render(root, quill);
    render.main();

})

console.timeEnd('-------------执行时间------------');
// end