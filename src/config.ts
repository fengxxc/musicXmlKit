import { RootNode } from "./model/rootNode";

export class Config {
    private pageWidth: number;
    private pageHeight: number;
    private paddingTop: number;
    private paddingRight: number;
    private paddingBottom: number;
    private paddingLeft: number;
    private lineSpace: number;
    private lineWidth: number;
    private lineColor: string;
    private rowLeftPadding: number;
    private measureLeftPadding: number;
    private staveSpace: number; // 线谱与线谱之间的距离
    private stave5Height: number; // 五线谱高度
    private rowSpace: number; // 行间距，行包括多个线谱
    private measureNoFontHeight: number; // 小节号文字高度
    private singleDurationWidth: number; // 一拍在线谱上的宽度
    private noteHeadAngle: number; // 符头旋转角度

    constructor(canvas: HTMLElement, musicXmlNode: RootNode) {
        
        this.pageWidth = canvas.clientWidth;
        this.pageHeight = canvas.clientHeight;
        this.paddingTop = 20;
        this.paddingRight = 10;
        this.paddingBottom = 20;
        this.paddingLeft = 10;
        this.lineSpace = 10;
        this.lineWidth = 1;
        this.lineColor = "#000";
        this.rowLeftPadding = 15;
        this.measureLeftPadding = this.lineSpace * 2;
        this.staveSpace = 40;
        this.stave5Height = this.lineSpace * 4;
        this.rowSpace = 60;
        this.measureNoFontHeight = 10;
        this.singleDurationWidth = 58;
        this.noteHeadAngle = 22;
    }

    
    public get PageWidth() : number {
        return this.pageWidth;
    }
    
    public get PageHeight() : number {
        return this.pageHeight;
    }
    
    public get PaddingTop() : number {
        return this.paddingTop;
    }
    
    public get PaddingRight() : number {
        return this.paddingRight;
    }
    
    public get PaddingBottom() : number {
        return this.paddingBottom;
    }
    
    public get PaddingLeft() : number {
        return this.paddingLeft;
    }
    
    public get LineSpace() : number {
        return this.lineSpace;
    }

    public get LineWidth() : number {
        return this.lineWidth;
    }

    public get LineColor() : string {
        return this.lineColor;
    }
    
    public get RowLeftPadding() : number {
        return this.rowLeftPadding;
    }
    
    /**
     * 小节内左内边距
     *
     * @readonly
     * @type {number}
     * @memberof Config
     */
    public get MeasureLeftPadding() : number {
        return this.measureLeftPadding;
    }
    
    public get ContentWidth() : number {
        return this.pageWidth - this.paddingLeft - this.paddingRight;
    }

    public get ContentHeight() : number {
        return this.pageHeight - this.paddingTop - this.paddingBottom;
    }

    public get StaveSpace() : number {
        return this.staveSpace;
    }
    
    
    public get Stave5Height() : number {
        return this.stave5Height;
    }
    
    public get RowSpave() : number {
        return this.rowSpace;
    }
    
    public get MeasureNoFontHeight() : number {
        return this.measureNoFontHeight;
    }
    
    public get SingleDurationWidth() : number {
        return this.singleDurationWidth;
    }

    public get NoteHeadAngle() : number {
        return this.noteHeadAngle;
    }
}