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
    private clefLeftPadding: number;
    private noteGroupLeftPadding: number;
    private staveSpace: number; // 线谱与线谱之间的距离
    private stave5Height: number; // 五线谱高度
    private rowSpace: number; // 行间距，行包括多个线谱

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
        this.clefLeftPadding = 15;
        this.noteGroupLeftPadding = 15;
        this.staveSpace = 40;
        this.stave5Height = this.lineSpace * 4;
        this.rowSpace = 60;
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
    
    public get ClefLeftPadding() : number {
        return this.clefLeftPadding;
    }
    
    /**
     * 音符组左间距
     *
     * @readonly
     * @type {number}
     * @memberof Config
     */
    public get NoteGroupLeftPadding() : number {
        return this.noteGroupLeftPadding;
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
    
}