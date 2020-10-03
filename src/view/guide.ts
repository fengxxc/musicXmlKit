import { Config } from "../config";

export default class Guide {

    private oX: number;
    private oY: number;
    private cfg: Config;
    // 当前乐谱行高度
    private curMeasureHeight: number;
    // 当前在乐谱的第几行，从1开始
    private curViewRow: number;
    constructor(cfg: Config) {
        this.cfg = cfg;
        this.oX = cfg.PaddingLeft + 0.5;
        this.oY = cfg.PaddingTop + 0.5;
        this.curViewRow = 0;
    }

    public get X(): number {
        return this.oX;
    }

    /**
     * 获取y轴坐标
     * @param staff 在从上往下数第几个线谱上
     */
    public Y(staff: number): number {
        return this.oY + (staff - 1) * (this.cfg.StaveSpace + this.cfg.Stave5Height);
    }

    public isRowStart(): boolean {
        return this.oX === this.cfg.PaddingLeft + 0.5;
    }

    /**
     * 获取y轴方向上前进一步（也就是换行）所需的距离
     * @returns {number}
     * @memberof Guide
     */
    public getYStepDistance(): number {
        return this.curMeasureHeight + this.cfg.RowSpave;
    }

    /**
     * 去下一个要绘制的图形原点
     */
    public stepAhead(xLength: number): void {
        if (this.oX + xLength >= this.cfg.PaddingLeft + 0.5 + this.cfg.ContentWidth) {
            // 去下一行起始处
            this.oX = this.cfg.PaddingLeft + 0.5;
            this.oY += this.getYStepDistance();
        } else if (this.oX + xLength < this.cfg.PaddingLeft + 0.5) {
            // 去上一行结束处
            this.oX = this.cfg.ContentWidth + (this.oX + xLength);
            this.oY -= this.getYStepDistance();
        } else {
            this.oX += Math.round(xLength);
        }
    }

    public set CurMeasureHeight(height: number) {
        this.curMeasureHeight = height;
    }

    public get CurMeasureHeight(): number {
        return this.curMeasureHeight;
    }

    public set CurViewRow(curViewRow: number) {
        this.curViewRow = curViewRow;
    }

    public get CurViewRow(): number {
        return this.curViewRow;
    }
}