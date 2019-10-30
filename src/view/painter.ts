import { Constant } from "./constant";

/**
 * 基础画笔
 * 原点在左下角
 * @class Pen
 */
export class Pen {
    // private ctxDom: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    /**
     * 画 点
     * @param context, 横坐标, 纵坐标, 半径, 颜色
     */
    static DrawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
        const style = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = style;
    }

    /**
     * 画 两点间连线线
     * @param context, 始横坐标, 始纵坐标, 终横坐标, 终纵坐标, 线宽度, 颜色
     */
    static DrawLine(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number, lineWidth: number, color: string): void {
        const style = ctx.strokeStyle;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = style;
    }

    /**
     * 画 图片 原点在左下角
     * @param context, image, 原点横坐标, 原点纵坐标, 宽度, 高度
     */
    static DrawImage(ctx: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number, w: number, h: number): void {
        ctx.beginPath();
        ctx.drawImage(img, x, y - h, w, h);
        ctx.closePath();
    }

    static DrawText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, font: string, textBaseline: CanvasTextBaseline) {
        ctx.font = font;
        ctx.textBaseline = textBaseline;
        ctx.fillText(text, x, y);
    }

    drawPoint(x: number, y: number, r: number, color: string): Pen {
        Pen.DrawPoint(this.ctx, x, y, r, color);
        return this;
    }

    drawLine(x: number, y: number, x2: number, y2: number, lineWidth: number, color: string): Pen {
        Pen.DrawLine(this.ctx, x, y, x2, y2, lineWidth, color);
        return this;
    }

    drawImage(img: CanvasImageSource, x: number, y: number, w: number, h: number): Pen {
        Pen.DrawImage(this.ctx, img, x, y, w, h);
        return this;
    }

    drawText(x: number, y: number, text: string, font: string, textBaseline: CanvasTextBaseline) {
        Pen.DrawText(this.ctx, x, y, text, font, textBaseline);
    }

    context(): CanvasRenderingContext2D {
        return this.ctx;
    }
}

/**
 * 画谱子的画笔（还是个羽毛笔耶(＾－＾)V）
 * 原点在左下角
 * @class Quill
 * @extends {Pen}
 */
export class Quill extends Pen {
    private imgObjs: Record<string, HTMLImageElement>;
    constructor(ctx: CanvasRenderingContext2D, imgObjs: Record<string, HTMLImageElement>) {
        super(ctx);
        this.imgObjs = imgObjs;
    }

    /**
     * 画几条水平线 原点在左上角
     * @param {Number} x
     * @param {Number} y
     * @param {Number} lineLength 线长
     * @param {Number} lineSpace 线间距
     * @param {Number} lineWidth 线宽
     * @param {String} lineColor 线颜色
     * @param {Number} lineCont 几条横线
     * @memberof Quill
     */
    drawHorizontalLines(x: number, y: number, lineLength: number, lineSpace: number, lineWidth: number, lineColor: string, lineCont: number): Quill {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        for (let i = 0, _y = y; i < lineCont; i++ , _y += lineSpace) {
            ctx.moveTo(x, _y);
            ctx.lineTo(x + lineLength, _y);
        }
        ctx.stroke();
        ctx.closePath();
        return this;
    }

    /**
     * 画 音符头 原点在中心
     * @param {Number} x
     * @param {Number} y
     * @param {Number} lineSpace 线之间的距离
     * @param {Boolean} [hollow=false] 是否空心
     * @memberof Quill
     */
    drawNoteHead(x: number, y: number, lineSpace: number, hollow: boolean = false): Quill {
        let note = this.imgObjs.NOTE_HEAD;
        if (hollow)
            note = this.imgObjs.NOTE_HEAD_HOLLOW;
        /* 将图片转成合适的尺寸 */
        const w = note.width / 2.3;
        const h = note.height / 2;
        super.drawImage(note, x - w / 2, y - h + lineSpace / 2, w, h);
        return this;
    }

    /**
     * 画 谱号 原点在手绘起笔处
     * @param {Number} x
     * @param {Number} y
     * @param {String} [sign='G'] 谱号类型 'G' | 'F' | 'C' | 'TAB'
     * @param {Number} h 指定高度，若null则为原始高度
     * @memberof Quill
     */
    drawClef(x: number, y: number, sign: string = 'G', h?: number): Quill {
        switch (sign) {
            case 'G':
                this.drawClefG(x, y, h);
                break;
            case 'F':
                this.drawClefF(x, y, h);
                break;
            case 'C':
                this.drawClefC(x, y, h);
                break;
            case 'TAB':
                this.drawClefTAB(x, y, h);
                break;
            default:
                break;
        }
        return this;
    }
    drawClefG(x: number, y: number, h?: number): Quill {
        const clefHeightSpe = 0.64; // G谱号中心点距顶部 与 G谱号高度的比值
        let img: HTMLImageElement = this.imgObjs['CLEF_G'], _y: number = null;
        const coe = img.height / img.width;
        h = h ? h : img.height;
        // _y = y - h * clefHeightSpe + h;
        _y = y + (h - h * clefHeightSpe);
        const w = h / coe;
        const _x = x - w / 2;
        super.drawImage(img, _x, _y, w, h);
        return this;
    }
    drawClefF(x: number, y: number, h?: number): Quill {
        const clefHeightSpe = 0.317; // F谱号中心点距顶部 与 F谱号高度的比值
        let img: HTMLImageElement = this.imgObjs['CLEF_F'], _y: number = null;
        const coe = img.height / img.width;
        h = h ? h : img.height;
        // _y = y + h * clefHeightSpe;
        _y = y + (h - h * clefHeightSpe);
        const w = h / coe;
        const _x = x - w / 2;
        super.drawImage(img, _x, _y, w, h);
        return this;
    }
    drawClefC(x: number, y: number, h?: number): Quill {
        const clefHeightSpe = 0.769; // C谱号中心点距顶部 与 C谱号高度的比值
        let img: HTMLImageElement = this.imgObjs['CLEF_C'], _y: number = null;
        const coe = img.height / img.width;
        h = h ? h : img.height;
        _y = y + (h - h * clefHeightSpe);
        const w = h / coe;
        const _x = x - w / 2;
        super.drawImage(img, _x, _y, w, h);
        return this;
    }
    drawClefTAB(x: number, y: number, h?: number): Quill {
        const clefHeightSpe = 0;
        let img: HTMLImageElement = this.imgObjs['CLEF_TAB'], _y: number = null;
        const coe = img.height / img.width;
        h = h ? h : img.height / 2;
        _y = y + (h - h * clefHeightSpe);
        const w = h / coe;
        const _x = x - w / 2;
        super.drawImage(img, _x, _y, w, h);
        return this;
    }

    /**
     * 画 符点
     * @param {Number} x
     * @param {Number} y
     * @param {String} color
     * @memberof Quill
     */
    drawDot(x: number, y: number, color: string): Quill {
        super.drawPoint(x, y, 2, color);
        return this;
    }

    /**
     * 画 升降符号 原点在左中
     * @param {Number} x
     * @param {Number} y
     * @param {String} type '#' | 'b'
     * @memberof Quill
     */
    drawTransp(x: number, y: number, type: string): Quill {
        let img: HTMLImageElement = null, w: number = 0, h: number = 0;
        if (type === Constant.SHARP) // #
            img = this.imgObjs.SHARP;
        else if (type === Constant.FLAT) // b
            img = this.imgObjs.FLAT;
        /* 将图片转成合适的尺寸 */
        w = img.width / 4;
        h = img.width / 2;
        super.drawImage(img, x, y + h / 2, w, h);
        return this;
    }

    /**
     * 画 八分音符符尾 原点在手绘起笔处
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} forward 1:up; -1:down
     */
    drawNoteTail(x: number, y: number, forward: number): Quill {
        let img: HTMLImageElement = this.imgObjs.NOTE8_TAIL;
        let oX: number = x, oY: number = y;
        /* 将图片转成合适的尺寸 */
        const w: number = img.width / 2.5, h = img.height / 2;
        if (forward < 0) {
            img = this.imgObjs.NOTE8_TAIL_REV;
            oY = y - h;
        }
        super.drawImage(img, oX, oY, w, h);
        return this;
    }

    drawBeats(x: number, y: number, beats: number, beatsType: number, h: number) {
        const fontSize = h / 2;
        const _font = 'bold ' + fontSize + "px Microsoft JhengHei";
        super.drawText(x, y, beatsType+'', _font, 'bottom');
        super.drawText(x, y - fontSize, beats+'', _font, 'bottom');
        
    }
}