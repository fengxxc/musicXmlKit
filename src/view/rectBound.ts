export default class RectBound {
    private width: number;
    private height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    public get Width() : number { return this.width; }
    public get Height() : number { return this.height; }
}