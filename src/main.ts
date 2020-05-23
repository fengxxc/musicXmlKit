import { Parser } from "./model/parser";
import { Node } from "./model/node";
import { MxNodeRender } from "./mxNodeRender";
import { SorePartWiseNode } from "./model/sorePartWiseNode";
import { NoteNode } from "./model/noteNode";
import { MeasureNode } from "./model/measureNode";
import { DireMetronomeNode } from "./model/direMetronomeNode";
import { AttributesNode, ClefNode } from "./model/attributesNode";
import { Render } from "./view/render";
import { Quill } from "./view/painter";
import { Utils } from "./utils";
import { Constant } from "./view/constant";
import { Config } from "./config";


let xml = Utils.ajaxGetSync('./test/model/testData1.xml');
const root = Parser.parseMusicXml(xml);
const spn = <SorePartWiseNode>root.getChildNodesByName('score-partwise')[0];

// start
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
    const config = new Config(canvas);
    const render: Render = new Render(root, quill, config);
    render.main();

    // quill.drawClef(50, 40, 'G');
    // quill.drawPoint(50, 40, 2, 'red');
    console.timeEnd('-------------执行时间------------');
})

// end