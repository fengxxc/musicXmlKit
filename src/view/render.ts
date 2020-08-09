import { MxIterator } from "./mxIterator";
import { RootNode } from "../model/rootNode";
import { Shape } from "./shape";
import { Config } from "../config";
import MxToken from "./mxToken";
import RectBound from "./rectBound";
import { Note } from "../model/interface/note";
import { Backup } from "../model/interface/backup";
import { Durational } from "../model/interface/durational";
import { BackupNode } from "../model/backupNode";

export class Render {
    
    static action(canvasDom: HTMLCanvasElement, musicXmlNode: RootNode): void {
        const cfg = new Config(canvasDom, musicXmlNode);
        const gu = new Guide(cfg);
        const shape: Shape = new Shape(canvasDom);
        const iterator = MxIterator.getIterator(musicXmlNode);
        let entry = null;
        
        let lasttoken: MxToken = null;
        while (!(entry = iterator.next()).done) {
            const token: MxToken = entry.value;
            // console.log(token);
            
            const isRowStart:boolean = gu.isRowStart();
            // 每行开始要做的事...
            if (isRowStart) {
                gu.CurMeasureHeight= (token.Clefs.length - 1) * (cfg.StaveSpace + cfg.Stave5Height) + cfg.Stave5Height;
                // 一整行谱左边的起始竖线
                shape.drawLine(gu.X, gu.Y(1), gu.X, gu.Y(1) + gu.CurMeasureHeight, cfg.LineWidth, cfg.LineColor);
                let curMeasureStartX = 0; // 本小节起始x
                token.Clefs.forEach(c => {
                    let _x = gu.X;
                    const _y: number = gu.Y(c.Number);
                    // 画五线谱 TODO 多声部
                    shape.drawMultiHorizontalLine(_x, _y, cfg.ContentWidth, cfg.LineWidth, cfg.LineColor, 5, cfg.LineSpace);
                    // 画谱号
                    const cRb: RectBound = Render.renderClefSign(shape, c.Sign, _x += cfg.RowLeftPadding, _y + cfg.Stave5Height - (c.Line - 1) * cfg.LineSpace, cfg.LineSpace);
                    // gu.stepAhead(rb.Width);
                    // 画音调符号
                    const kRb: RectBound = Render.renderKeySign(shape, _x += cRb.Width + cfg.MeasureLeftPadding, _y, token.Fifths, token.Mode, c.Sign, c.Line, cfg.LineSpace, cfg.LineColor);
                    // 画拍号
                    const tRb: RectBound = Render.renderTimeBeat(shape, _x += kRb.Width, _y, token.TimeBeatType, token.TimeBeats, cfg.LineSpace, cfg.LineColor);
                    if (c.Number == 1) {
                        curMeasureStartX = _x += tRb.Width;
                    }
                })
                gu.stepAhead(curMeasureStartX);
                // break; // for test
            }
            
            // 每小节开始要做的事...
            if (lasttoken == null || token.MeasureNo != lasttoken.MeasureNo) {
                if (!isRowStart) {
                    token.Clefs.forEach(c => {
                        // 画小节分割线
                        shape.drawVerticalLine(gu.X, gu.Y(c.Number), cfg.Stave5Height, cfg.LineWidth, cfg.LineColor);
                    })
                }
                // 画小节号
                shape.drawText(gu.X, gu.Y(1) - cfg.MeasureNoFontHeight - 2, token.MeasureNo+'', cfg.MeasureNoFontHeight, 'Microsoft Yahei', cfg.LineColor);
                gu.stepAhead(cfg.MeasureLeftPadding);
            }

            // 画主角，就是音符他们
            if (token.SpiritType == 'note') {
                const note: Note = <Note>token.Spirit;
                
                if (note.Rest()) {
                    // 画休止符
                    Render.renderRestSign(shape, gu.X, gu.Y(note.Staff()), note.Type(), cfg.LineSpace, cfg.LineColor);
                } else {
                    // TODO 画音符
                    
                }
                gu.stepAhead(note.Duration() * cfg.SingleDurationWidth)
            } else if (token.SpiritType == 'backup') {
                const backup: Backup = <Backup>token.Spirit;
                gu.stepAhead(-(backup.Duration() * cfg.SingleDurationWidth));
            }

            lasttoken = token;
            // TODO
        }

    }

    /**
     * 渲染谱号
     * @static
     * @param {Shape} shape
     * @param {string} sign
     * @param {number} x
     * @param {number} y
     * @param {number} lineSpace
     * @memberof Render
     */
    static renderClefSign(shape: Shape, sign: string, x: number, y: number, lineSpace: number): RectBound {
        switch (sign) {
            case 'G':
                return shape.drawClefG(x, y, lineSpace);
            case 'F':
                return shape.drawClefF(x, y, lineSpace);
            case 'C':
                return shape.drawClefC(x, y, lineSpace);
            default:
                console.error('Unknown ClefSign: ' + sign);
                break;
        }
    }

    /**
     * 渲染音调符号 
     *
     * @param {Shape} shape
     * @param {number} x
     * @param {number} y
     * @param {number} fifths 五度圈里的位置，暂时这么理解
     * @param {string} mode 调性：大调、小调 [major | minor]
     * @param {string} clefSign 谱号 [TAB | G | F | C]
     * @param {number} clefLine
     * @param {number} lineSpace
     * @param {string} colorHex
     * @returns {RectBound}
     * @memberof Render
     */
    static renderKeySign(shape: Shape, x: number, y: number, fifths: number, mode: string, clefSign: string, clefLine: number, lineSpace: number, colorHex: string): RectBound {
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
         * -4       F/bA    F
         * -3       bE      C
         * -2       bB      G
         * -1       F       D
         */
        if (clefSign == 'TAB') // TODO
            return new RectBound(0, 0);
        const posG: Record<string, number[]> = {
            /**
             * key是fifths值，正数代表是'#'，负数代表'b'
             * value是数组；后面的数字代表位置在五线谱上第几线（+.5就是间）
             */
            '0' : [],
            '1' : [5],
            '2' : [5, 3.5],
            '3' : [5, 3.5, 5.5],
            '4' : [5, 3.5, 5.5, 4],
            '5' : [5, 3.5, 5.5, 4, 2.5],
            '6' : [5, 3.5, 5.5, 4, 2.5, 4.5],
            '7' : [5, 3.5, 5.5, 4, 2.5, 4.5, 3],
            '-7': [3, 4.5, 2.5, 4, 2, 3.5, 1.5],
            '-6': [3, 4.5, 2.5, 4, 2, 3.5],
            '-5': [3, 4.5, 2.5, 4, 2],
            '-4': [3, 4.5, 2.5, 4],
            '-3': [3, 4.5, 2.5],
            '-2': [3, 4.5],
            '-1': [3]
        }
        // F4: -1; C3: -0.5; C4: +0.5
        let pos: number[] = posG[fifths];
        if (pos.length == 0) {
            return new RectBound(0, 0);
        }
        if (clefSign + clefLine == 'F4') {
            pos = posG[fifths].map(p => p - 1);
        } else if (clefSign + clefLine == 'C3') {
            pos = posG[fifths].map(p => p - 0.5);
        } else if (clefSign + clefLine == 'C4') {
            pos = posG[fifths].map(p => p + 0.5);
        }
        y += 4 * lineSpace;
        let rb: RectBound = null;
        if (fifths < 0) {
            rb = shape.drawFlat(x, y - (pos[0] - 1) * lineSpace, lineSpace, colorHex);
            for (let i = 1; i < pos.length; i++) {
                shape.drawFlat(x += Math.round(rb.Width), y - (pos[i] - 1) * lineSpace, lineSpace, colorHex);
            }
        } else {
            rb = shape.drawSharp(x, y - (pos[0] - 1) * lineSpace, lineSpace, colorHex);
            for (let i = 1; i < pos.length; i++) {
                shape.drawSharp(x += Math.round(rb.Width), y - (pos[i] - 1) * lineSpace, lineSpace, colorHex);
            }
        }
        return new RectBound(pos.length * rb.Width, rb.Height + (Math.abs(fifths) - 1) * lineSpace);
    }

    static renderTimeBeat(shape: Shape, x: number, y: number, timeBeatType: number, timeBeats: number, lineSpace: number, colorHex: string): RectBound {
        const rb: RectBound =shape.drawText(x, y, timeBeats+'', lineSpace * 2, 'Microsoft Yahei', colorHex);
        shape.drawText(x, y + lineSpace * 2, timeBeatType+'', lineSpace * 2, 'Microsoft Yahei', colorHex);
        return new RectBound(rb.Width, lineSpace * 4);
    }

    static renderRestSign(shape: Shape, x: number, y: number, restType: string, lineSpace: number, colorHex: string): RectBound {
        switch (restType) {
            case 'quarter': // 四分休止符
                return shape.drawRest_4(x, y + lineSpace * 2, lineSpace, colorHex);
            case 'eighth': // 八分休止符
                return shape.drawRest_8(x, y + lineSpace * 2, lineSpace, colorHex);
            case 'half': // 二分休止符
                return shape.drawRest_2(x, y + lineSpace * 1.5, lineSpace, colorHex);
            case 'whole': // 全休止符
                return shape.drawRest_2(x, y + lineSpace * 1, lineSpace, colorHex);
            case 'sixteenth': // 十六分休止符
                return shape.drawRest_16(x, y + lineSpace * 2, lineSpace, colorHex);
            default: // TODO 其他分休止符 32、64等
                return null;
        }
    }
}

class Guide {
    
    private oX: number;
    private oY: number;
    private cfg: Config;
    private curMeasureHeight: number;
    constructor(cfg: Config) {
        this.cfg = cfg;
        this.oX = cfg.PaddingLeft + 0.5;
        this.oY = cfg.PaddingTop + 0.5;
    }
    
    public get X() : number {
        return this.oX;
    }
    
    public Y(staff: number) : number {
        return this.oY + (staff - 1) * (this.cfg.StaveSpace + this.cfg.Stave5Height);
    }
    
    public isRowStart(): boolean {
        return this.oX === this.cfg.PaddingLeft + 0.5;
    }

    /**
     * 去下一个要绘制的图形原点
     */
    public stepAhead(xLength: number): void {
        if (this.oX + xLength >= this.cfg.PaddingLeft + this.cfg.ContentWidth) {
            // 去下一行起始处
            this.oX = this.cfg.PaddingLeft + 0.5;
            this.oY += this.curMeasureHeight + this.cfg.RowSpave;
        } else {
            this.oX += xLength;
        }
    }

    public set CurMeasureHeight(height : number) {
        this.curMeasureHeight = height;
    }

    
    public get CurMeasureHeight() : number {
        return this.curMeasureHeight;
    }
}