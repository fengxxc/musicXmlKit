import { Config } from "../config";

export default class Guide {

    private oX: number;
    private oY: number;
    private cfg: Config;
    private curMeasureHeight: number;
    constructor(cfg: Config) {
        this.cfg = cfg;
        this.oX = cfg.PaddingLeft + 0.5;
        this.oY = cfg.PaddingTop + 0.5;
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
     * 去下一个要绘制的图形原点
     */
    public stepAhead(xLength: number): void {
        if (this.oX + xLength >= this.cfg.PaddingLeft + this.cfg.ContentWidth) {
            // 去下一行起始处
            this.oX = this.cfg.PaddingLeft + 0.5;
            this.oY += this.curMeasureHeight + this.cfg.RowSpave;
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
}