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
            // 'M' + (x + 2) + ',' + (y - 0) 
            // + 'c-1.291,-3.295,-2.057,-6.195,-2.057,-10.601c0,-8.534,4.164,-19.954,23.314,-34.846c-1.159,-8.129,-2.273,-19.945,0.229,-27.23c1.89,-5.504,6.707,-15.462,11.428,-15.462c4.191,0,8.151,16.382,7.315,23.538c-1.322,11.313,-2.692,18.149,-15.315,28.847c0.788,5.72,1.383,10.121,1.829,14.307c13.36,0,19.04,8.137,19.2,18.923c0.114,7.691,-2.856,14.828,-13.943,19.385c1.734,12.678,3.282,20.47,0.949,25.24c-2.552,5.215,-6.993,7.37,-13.292,7.76c-7.299,0.452,-14.491,-5.884,-13.943,-12.923c0.429,-5.501,3.432,-8.766,8.458,-8.769c4.569,-0.004,6.99,5.57,6.857,8.077c-0.202,3.799,-1.716,7.248,-8.229,7.384c1.446,2.968,5.83,3.184,8,3.231c3.379,0.074,11.364,-2.83,10.743,-12.692c-0.485,-7.699,-1.451,-13.919,-1.829,-16.616c-15.926,1.548,-25.55,-6.926,-29.714,-17.553zm23.314,-47.293c-0.433,-8.191,-0.615,-11.081,1.143,-17.538c2.104,-7.724,7.219,-13.548,10.743,-10.846c3.787,2.902,1.248,10.807,-0.228,13.846c-2.251,4.629,-6.309,9.819,-11.658,14.538zm-0.457,13.616c-6.735,5.863,-10.719,9.549,-13.485,12.923c-4.028,4.912,-6.844,11.441,-6.172,18.23c1.247,12.587,13.214,20.77,26.057,17.539c-1.321,-10.215,-3.098,-24.421,-3.428,-27c-5.073,0.831,-9.259,5.683,-9.143,10.615c0.139,5.919,3.139,7.382,5.714,9c0.775,0.487,0.409,1.252,-0.457,1.154c-4.341,-0.489,-9.084,-6.081,-9.371,-11.538c-0.512,-9.73,5.058,-16.036,12.114,-18c-0.487,-3.267,-1.344,-9.335,-1.829,-12.923zm17.372,33.923c0.06,-4.191,-3.123,-12.237,-12.343,-12.231c0.581,3.128,3.274,23.049,3.657,26.308c9.252,-3.59,8.644,-11.125,8.686,-14.077z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    static ClefF(x: number, y: number, scale: number): void {
        const _scale = scale * 0.14;
        return new zrender.path.createFromString(
            // 'M' + (x - 60) + ',' + (y + 20)
            'M' + (x) + ',' + (y + 20)
            + 'c11.66109,14.71933,32.32286,24.49078,55.84396,24.49078c36.40052,0,65.88892,-23.37191,65.88892,-52.21386c0,-28.84194,-29.4884,-52.21385,-65.88892,-52.21385c-20.31367,4.15224,-28.5933,9.00067,-33.14336,-2.90906c17.97648,-54.32728,46.91788,-66.70942,96.54591,-66.70942c65.91378,0,96.96859,59.89675,96.96859,142.96652c-18.22512,190.63031,-205.94638,286.75353,-246.57373,316.1922c5.6938,13.10319,5.39543,12.63078,5.39543,12.00919c189.78494,-86.20259,330.68777,-204.42969,330.68777,-320.74227c0,-92.41853,-58.57898,-175.58775,-187.72125,-172.80301c-77.57488,0,-170.31663,86.20259,-118.00332,171.93278zm328.102,-89.882c0,17.85217,14.4707,32.32286,32.32286,32.32286c17.85217,0,32.32287,-14.47069,32.32287,-32.32286c0,-17.85217,-14.4707,-32.32286,-32.32287,-32.32286c-17.85216,0,-32.32286,14.47069,-32.32286,32.32286zm0,136.75058c0,17.85217,14.4707,32.32287,32.32286,32.32287c17.85217,0,32.32287,-14.4707,32.32287,-32.32287c0,-17.85217,-14.4707,-32.32286,-32.32287,-32.32286c-17.85216,0,-32.32286,14.47069,-32.32286,32.32286z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    static ClefC(x: number, y: number, scale: number): void {
        const _scale = scale;
        return new zrender.path.createFromString(
            'M'+ (x - 0) + ',' + (y - 40)
            + 'h10.179v80h-10.179v-80zm13.679,80.057h3.391v-39.35c2.034,-0.04,2.044,0.813,5.611,6.411c2.189,3.435,3.957,5.867,1.525,8.7c0.933,2.379,4.729,1.475,5.423,0.791c0.914,-2.831,2.825,-8.948,7.287,-8.475s6.6,4.5,7.23,13.9s-1.98,13.642,-6.836,13.785s-5.6,0.231,-5.7,-1.751s0.106,-1.458,0.565,-2.09c1.721,0.152,5.344,-0.454,4.971,-4.011a5.663,5.663,0,0,0,-2.768,-3.9c-2.371,-1.443,-4.179,-1,-6.27,0.226c-1.154,0.678,-1.928,1.952,-2.2,4.237c-0.251,2.084,0.3,3.629,0.226,6.554c2.585,2.053,5.118,4.658,10.619,4.746c5.276,0.085,15.061,-3.337,14.847,-19.43c-0.136,-10.272,-5.117,-15.907,-8.247,-17.684c-2.195,-1.246,-7.913,-1.233,-9.885,1.243s-3.045,3.964,-4.293,5.311c-6.121,-7.107,-7.188,-9.27,-7.188,-9.27s1.052,-2.133,7.178,-9.231c1.249,1.346,2.322,2.832,4.3,5.307s7.695,2.487,9.891,1.242c3.131,-1.776,8.116,-7.406,8.252,-17.671c0.21,-16.086,-9.582,-19.505,-14.869,-19.421c-5.505,0.088,-8.039,2.69,-10.626,4.742c0.07,2.923,-0.477,4.466,-0.226,6.549c0.275,2.284,1.05,3.557,2.2,4.234c2.092,1.228,3.9,1.668,6.274,0.226a5.658,5.658,0,0,0,2.77,-3.9c0.374,-3.555,-3.252,-4.16,-4.974,-4.009c-0.457,-0.626,-0.67,-0.103,-0.557,-2.084s0.85,-1.893,5.709,-1.75s7.466,4.384,6.839,13.776s-2.774,13.416,-7.239,13.89s-6.377,-5.639,-7.291,-8.469c-0.694,-0.683,-4.492,-1.587,-5.426,0.79c2.433,2.831,0.664,5.262,-1.526,8.694c-3.57,5.594,-3.579,6.447,-5.615,6.407v-39.322h-3.394v40z'
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

    drawClefG(x:number, y:number, scale:number): void {
        this.draw(Shape.ClefG(x, y, scale));
    }

    drawClefF(x: number, y: number, scale: number): void {
        this.draw(Shape.ClefF(x, y, scale));
    }

    drawClefC(x: number, y: number, scale: number): void {
        this.draw(Shape.ClefC(x, y, scale));
    }
}