// import { zrender } from "zrender/dist/zrender";
import * as zrender from "zrender";
// import { zrender } from "../../node_modules/zrender/zrender.all";

export class Shape {
    private ctxDom: HTMLCanvasElement;
    private zr: zrender;

    constructor(ctxDom: HTMLCanvasElement) {
        this.ctxDom = ctxDom;
        this.zr = zrender.init(ctxDom);
    }

    static Circle(x: number, y: number, r: number, fillColorHex: string, strokeColorHex: string): zrender {
        return new zrender.Circle({
            shape: {
                cx: x,
                cy: y,
                r: r
            }, 
            style: {
                fill: fillColorHex,
                stroke: strokeColorHex
            }
        });
    }

    static Line(x1: number, y1: number, x2: number, y2: number, lineWidth: number, colorHex: string): zrender {
        return new zrender.Line({
            shape: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            },
            style: {
                stroke: colorHex,
                lineWidth: lineWidth
            }
        })
    }

    static Image(dataURI: string | HTMLImageElement | HTMLCanvasElement ,x: number, y: number, width: number, height: number): zrender {
        return new zrender.Image({
            style: {
                image: dataURI,
                x: x,
                y: y,
                width: width,
                height: height
            }
        })
    }

    /**
     * 画 音符头
     * @static
     * @param {number} x 坐标
     * @param {number} y 坐标
     * @param {number} s 谱线间距
     * @param {number} angle 符头旋转角度
     * @param {number} t 谱线宽度
     * @param {string} fillColorHex 填充颜色 16进制
     * @param {string} strokeColorHex 描边颜色 16进制
     * @returns {zrender}
     * @memberof Shape
     */
    static NoteHead(x: number, y: number, s: number, angle: number, t: number, fillColorHex: string, strokeColorHex: string, lineWidth: number): zrender {
        const h = (s - lineWidth) / 2;
        const rad = angle / 180 * Math.PI; // 转成弧度
        const ra: number = h / (2 * Math.sin(rad));
        // const rb: number = (3 * Math.pow(h, 2) + 2 * h * t * Math.pow(Math.cos(rad), 2)) /
        //     2 * Math.cos(rad) * Math.sqrt(4 * h * h - Math.pow(h + 2 * t * Math.pow(Math.sin(rad), 2), 2));
        const rb: number = Math.sqrt(3) * h / (2 * Math.cos(rad));
        
        console.log(ra, rb)
        return new zrender.Ellipse({
            shape: {
                cx: x,
                cy: y,
                rx: ra,
                ry: rb
            },
            rotation: rad,
            origin: [x, y],
            style: {
                fill: fillColorHex,
                stroke: strokeColorHex,
                lineWidth: lineWidth
            }
        });
    }
    static ClefG(x: number, y: number, scale: number): void {
        const _scale = scale
        return new zrender.path.createFromString(
            'M' + x + ',' + (y - 90) 
            + 'c-5.426,-0.141,-11.774,12.818,-11.563,24.375c0.049,3.52,1.16,10.659,2.782,19.625c-10.224,10.581,-22.094,21.44,-22.094,35.688c-0.163,13.057,7.816,29.695,26.75,29.531c2.906,-0.015,5.521,-0.383,7.844,-1c1.73,9.492,2.881,16.981,2.875,20.437c0.061,13.641,-17.86,14.991,-18.719,7.156c3.777,-0.129,6.781,-3.136,6.781,-6.843c0,-3.79,-3.138,-6.875,-7.031,-6.875c-2.142,0,-4.05,0.938,-5.344,2.406c-0.029,0.033,-0.065,0.06,-0.093,0.094c-0.293,0.304,-0.538,0.68,-0.782,1.093c-0.797,1.353,-1.316,3.293,-1.343,6.063c0,11.425,28.874,18.774,28.875,-3.75c0.045,-3.025,-1.258,-10.715,-3.157,-20.406c20.603,-7.457,15.427,-38.044,-3.531,-38.188c-1.47,0.015,-2.886,0.186,-4.25,0.532c-1.079,-5.197,-2.121,-10.241,-3.031,-14.875c7.199,-7.072,13.484,-16.225,13.344,-33.094c0.022,-12.114,-4.014,-21.828,-8.313,-21.969zm1.281,11.719c2.456,-0.237,4.407,2.043,4.407,7.062c0.198,8.62,-5.84,16.148,-13.032,23.719c-0.687,-4.147,-1.139,-7.507,-1.187,-9.5c0.204,-13.466,5.719,-20.886,9.812,-21.281zm-7.719,44.688c0.877,4.515,1.825,9.271,2.782,14.062c-12.549,4.465,-18.571,21.954,-0.782,29.781c-10.843,-9.231,-5.505,-20.157,2.313,-22.062c1.965,9.817,3.885,19.5,5.437,27.875c-2.107,0.733,-4.566,1.168,-7.437,1.187c-7.182,0,-21.532,-4.573,-21.532,-21.875c0,-14.494,10.047,-20.383,19.219,-28.969zm6.094,21.469c0.313,-0.019,0.652,-0.012,0.968,0c13.063,0,17.99,20.743,4.688,27.375c-1.655,-8.319,-3.662,-17.861,-5.656,-27.375z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    static ClefF(x: number, y: number, scale: number): void {
        const _scale = scale * 0.14;
        return new zrender.path.createFromString(
            'm' + (x - 55) + ',' + (y + 20)
            + 'c11.66109,14.71933,32.32286,24.49078,55.84396,24.49078c36.40052,0,65.88892,-23.37191,65.88892,-52.21386c0,-28.84194,-29.4884,-52.21385,-65.88892,-52.21385c-20.31367,4.15224,-28.5933,9.00067,-33.14336,-2.90906c17.97648,-54.32728,46.91788,-66.70942,96.54591,-66.70942c65.91378,0,96.96859,59.89675,96.96859,142.96652c-18.22512,190.63031,-205.94638,286.75353,-246.57373,316.1922c5.6938,13.10319,5.39543,12.63078,5.39543,12.00919c189.78494,-86.20259,330.68777,-204.42969,330.68777,-320.74227c0,-92.41853,-58.57898,-175.58775,-187.72125,-172.80301c-77.57488,0,-170.31663,86.20259,-118.00332,171.93278zm328.102,-89.882c0,17.85217,14.4707,32.32286,32.32286,32.32286c17.85217,0,32.32287,-14.47069,32.32287,-32.32286c0,-17.85217,-14.4707,-32.32286,-32.32287,-32.32286c-17.85216,0,-32.32286,14.47069,-32.32286,32.32286zm0,136.75058c0,17.85217,14.4707,32.32287,32.32286,32.32287c17.85217,0,32.32287,-14.4707,32.32287,-32.32287c0,-17.85217,-14.4707,-32.32286,-32.32287,-32.32286c-17.85216,0,-32.32286,14.47069,-32.32286,32.32286z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    draw(shape: zrender) {
        this.zr.add(shape);
    }

    drawPoint(x: number, y: number, r: number, fillColorHex: string, strokeColorHex: string): void {
        this.draw(Shape.Circle(x, y, r, fillColorHex, strokeColorHex));
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, colorHex: string): void {
        this.draw(Shape.Line(x1, y1, x2, y2, lineWidth, colorHex));
    }

    drawImage(dataURI: string | HTMLImageElement | HTMLCanvasElement, x: number, y: number, width: number, height: number): void {
        this.draw(Shape.Image(dataURI, x, y, width, height));
    }

    drawNoteHead(x: number, y: number, h: number, a: number, t: number, fillColorHex: string, strokeColorHex: string, lineWidth: number): void {
        this.draw(Shape.NoteHead(x, y, h, a, t, fillColorHex, strokeColorHex, lineWidth));
    }

    drawClefG(x:number, y:number, h:number): void {
        this.draw(Shape.ClefG(x, y, h));
    }

    drawClefF(x: number, y: number, h: number): void {
        this.draw(Shape.ClefF(x, y, h));
    }
}