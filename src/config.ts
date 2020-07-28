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
    private clefSpace: number;
    private noteGroupSpace: number;

    constructor(canvas: HTMLElement) {
        
        this.pageWidth = canvas.clientWidth;
        this.pageHeight = canvas.clientHeight;
        this.paddingTop = 20;
        this.paddingRight = 10;
        this.paddingBottom = 20;
        this.paddingLeft = 10;
        this.lineSpace = 10;
        this.lineWidth = 1;
        this.lineColor = "#000";
        this.clefSpace = 80;
        this.noteGroupSpace = 20;
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
    
    public get ClefSpace() : number {
        return this.clefSpace;
    }
    
    public get NoteGroupSpace() : number {
        return this.noteGroupSpace;
    }
    
}