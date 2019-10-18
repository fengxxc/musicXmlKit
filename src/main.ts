import { Parser } from "./model/parse";
import { Node } from "./model/node";
import { MxNodeRender } from "./mxNodeRender";
import { SorePartWiseNode } from "./model/sorePartWiseNode";
import { NoteNode } from "./model/noteNode";
import { MeasureNode } from "./model/measureNode";

let xml = `
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE score-partwise PUBLIC '-//Recordare//DTD MusicXML 2.0 Partwise//EN' 'http://www.musicxml.org/dtds/2.0/partwise.dtd'>
<score-partwise version="2.0">
    <identification>
        <encoding>
            <encoding-date>2019-10-09</encoding-date>
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
                <divisions>1</divisions>
                <key>
                    <fifths>-4</fifths>
                    <mode>major</mode>
                </key>
                <time>
                    <beats>6</beats>
                    <beat-type>8</beat-type>
                </time>
                <staves>2</staves>
                <clef number="1">
                    <sign>G</sign>
                    <line>2</line>
                </clef>
                <clef number="2">
                    <sign>F</sign>
                    <line>4</line>
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
                    <step>E</step>
                    <octave>4</octave>
                </pitch>
                <duration>1</duration>
                <voice>1</voice>
                <type>quarter</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>4</string>
                        <fret>14</fret>
                    </technical>
                </notations>
            </note>
            <note>
                <chord />
                <pitch>
                    <step>D</step>
                    <alter>-1</alter>
                    <octave>5</octave>
                </pitch>
                <duration>1</duration>
                <voice>1</voice>
                <type>quarter</type>
                <stem>up</stem>
                <notehead>normal</notehead>
                <staff>1</staff>
                <notations>
                    <dynamics>
                        <mf />
                    </dynamics>
                    <technical>
                        <string>1</string>
                        <fret>9</fret>
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

const root = Parser.parseXml(xml, (parent: Node, tag: string, attrs: Object) => {
    let res: Node;
    switch (tag) {
        case 'score-partwise':
            res = new SorePartWiseNode(parent, tag, attrs);
            break;
        case 'measure':
            res = new MeasureNode(parent, tag, attrs);
            break;
        case 'note':
            res = new NoteNode(parent, tag, attrs);
            break;
        default:
            res = new Node(parent, tag, attrs);
            break;
    }
    return res;
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

console.timeEnd('-------------执行时间------------');
// end