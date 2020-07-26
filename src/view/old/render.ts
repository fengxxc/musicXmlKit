import { Node } from "../../model/Node";
import { RootNode } from "../../model/rootNode";
import { SorePartWiseNode } from "../../model/sorePartWiseNode";
import { MeasureNode } from "../../model/measureNode";
import { AttributesNode } from "../../model/attributesNode";
import { Clef } from "../../model/interface/attributes";
import { Quill } from "./painter";
import { Config } from "../../config";
import { Constant } from "./constant";

export class Render {
    // 先写个粗版的(((φ(◎ロ◎;)φ)))
    private mxn: RootNode;
    private quill: Quill;
    private config: Config;
    private posX: number;
    private posY: number;
    private firstMeasureOfLine: boolean;

    constructor(musicXmlNode: RootNode, quill: Quill, config: Config) {
        this.setMxn(musicXmlNode).setQuill(quill).setConfig(config);
    }

    setMxn(mxn: RootNode): Render {
        this.mxn = mxn;
        return this;
    }
    getMxn(): RootNode { return this.mxn; }

    setQuill(quill: Quill) {
        this.quill = quill;
        return this;
    }
    getQuill() { return this.quill; }

    setConfig(config: Config) {
        this.config = config;
        return this;
    }
    getConfig() { return this.config; }

    main(): void {
        const spw: SorePartWiseNode = <SorePartWiseNode>this.mxn.getChildNodesByName('score-partwise')[0];
        const parts = spw.Part();
        parts.forEach(part => this.renderPart(part));
    }

    renderPart(part: Node): void {
        this.posX = this.config.PaddingLeft;
        this.posY = this.config.PaddingTop;
        this.firstMeasureOfLine = true;
        part.forEachChildNodes(measure => this.renderMeasure(<MeasureNode>measure));
    }

    /**
     * 渲染一小节
     * @param {MeasureNode} measure
     * @memberof Render
     */
    renderMeasure(measure: MeasureNode): void {
        const q = this.getQuill();
        const attributes: AttributesNode = measure.Attributes();
        const clefs: Clef[] = attributes.Clef();
        clefs.forEach((clef, index) => {
            const sign = clef.Sign();
            const signLine = clef.Line();
            // 几线谱，根据staff-details > staff-lines判断 TODO
            const lineCount = sign == 'TAB' ? 6 : 5; 
            // 1. 渲染小节开始分割线
            q.drawLine(this.posX, this.posY, this.posX, this.posY + (lineCount - 1) * this.config.LineSpace, 1, 'black');
            
            if (this.firstMeasureOfLine) { // 如果是每行起始小节
                // 2. 谱号连接线
                if (index != 0) {
                    q.drawLine(this.posX, this.posY, this.posX, this.posY - this.config.ClefSpace, 1, 'black');
                }
                // 3. 渲染本小节的线谱
                q.drawHorizontalLines(this.posX, this.posY, this.config.PageWidth - 2*this.config.PaddingRight, this.config.LineSpace, 1, 'black', lineCount);
                this.step();
                // 4. 渲染谱号
                this.renderClefSign(sign, signLine, lineCount);
                // q.drawPoint(this.posX + this.config.NoteGroupSpace, this.posY + 4*this.config.LineSpace - (signLine-1)*this.config.LineSpace, 2, 'red');
                // 5. 渲染音调符号
                this.renderKeySign(attributes.KeyFifths(), attributes.KeyMode(), sign, signLine);
                // 6. 渲染拍号
                this.renderBeats(attributes.TimeBeats(), attributes.TimeBeatType(), sign);
            }

            // 坐标换行
            this.enter();
            
        })

    }
    
    renderBeats(beats: number, beatsType: number, clefSign: string) {
        if (clefSign == 'TAB') return;
        this.quill.drawBeats(this.posX+0.5, this.posY+0.5, beats, beatsType, 4*this.config.LineSpace);
        this.step();
        this.quill.drawPoint(this.posX+0.5, this.posY+0.5, 2, 'blue');
    }

    /**
     * 渲染音调符号 
     * @param fifths 五度圈里的位置，暂时这么理解
     * @param mode 调性：大调、小调 [major | minor]
     * @param clefSign 谱号 [TAB | G | F | C]
     * @param clefLine 
     */
    renderKeySign(fifths: number, mode: string, clefSign: string, clefLine: number): void {
        /**
         * musicXml中fifths值说明：
         * 数字     大调    小调
         * 0        C       A
         * 1        G       E
         * 2        D       B
         * 3        A       #F
         * 4        E       #C
         * 5/-7     B/bC    #G/bA
         * 6/-6     #F/bG   #D/bE
         * 7/-5     #C/bD   #A/bB
         * -4       bA/F    F
         * -3       bE      C
         * -2       bB      G
         * -1       F       D
         */
        if (clefSign == 'TAB') return;
        const posG: Record<string, number[]> = {
            /**
             * key是fifths值，正数代表是'#'，负数代表'b'
             * value是数组；后面的数字代表位置在五线谱上第几线（+.5就是间）
             */
            '0' : [],
            '1' : [5],
            '2' : [3.5, 5],
            '3' : [3.5, 5, 5.5],
            '4' : [3.5, 4, 5, 5.5],
            '5' : [2.5, 3.5, 4, 5, 5.5],
            '6' : [2.5, 3.5, 4, 4.5, 5, 5.5],
            '7' : [2.5, 3, 3.5, 4, 4.5, 5, 5.5],
            '-7': [1.5, 2, 2.5, 3, 3.5, 4, 4.5],
            '-6': [2, 2.5, 3, 3.5, 4, 4.5],
            '-5': [2, 2.5, 3, 4, 4.5],
            '-4': [2.5, 3, 4, 4.5],
            '-3': [2.5, 3, 4.5],
            '-2': [3, 4.5],
            '-1': [3]
        }
        // F4: -1; C3: -0.5; C4: +0.5
        let pos: number[] =  posG[fifths];
        if (clefSign + clefLine == 'F4') {
            pos = posG[fifths].map(p => p - 1);
        } else if (clefSign + clefLine == 'C3') {
            pos = posG[fifths].map(p => p - 0.5);
        } else if (clefSign + clefLine == 'C4') {
            pos = posG[fifths].map(p => p + 0.5);
        }
        this.posY += 4 * this.config.LineSpace;
        pos.forEach(p => {
            // TODO
            this.quill.drawTransp(this.posX, this.posY - (p-1) * this.config.LineSpace, Constant.SHARP);
        });
        this.step();
    }

    renderClefSign(sign: string, signLine: number, lineCount: number): void {
        let y = this.posY + 4 * this.config.LineSpace - (signLine - 1) * this.config.LineSpace;
        if (sign == 'TAB' && lineCount == 6) 
            y += this.config.LineSpace/2;
        this.quill.drawClef(this.posX, y, sign);
        this.step();
    }

    step(): void {
        this.posX += this.config.NoteGroupSpace;
        // 如果水平超出
        if (this.posX > this.config.PageWidth - 2 * this.config.PaddingRight) {
            // 就换行
            this.enter();
        }
    }

    enter(): void {
        this.posX = this.config.PaddingLeft;
        this.posY += this.config.ClefSpace;
    }
}